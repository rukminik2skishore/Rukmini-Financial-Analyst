'use strict';

const $ = id => document.getElementById(id);

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

let rows = [];

// All source amounts are treated as USD.
// The Currency column is ignored; no FX conversion is applied.
const currency = 'USD';

const num = value =>
  Number(String(value || '0').replace(/,/g, ''));

const sum = (data, key) =>
  data.reduce((total, row) => total + num(row[key]), 0);

const money = value =>
  `${currency} ${(value / 1e6).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}m`;

const pct = value =>
  value === null ? '—' : value.toFixed(1) + '%';

const delta = (actual, budget) =>
  budget ? ((actual - budget) / Math.abs(budget)) * 100 : null;

const signed = value =>
  value === null
    ? '—'
    : `${value > 0 ? '+' : ''}${value.toFixed(1)}`;

// Read CSV, including quoted numbers containing commas.
function parseCSV(text) {
  const output = [];
  let row = [];
  let value = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const character = text[i];

    if (character === '"') {
      if (quoted && text[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (
      !quoted &&
      (character === ',' || character === '\n')
    ) {
      row.push(value.trim());
      value = '';

      if (character === '\n') {
        if (row.some(Boolean)) output.push(row);
        row = [];
      }
    } else if (character !== '\r') {
      value += character;
    }
  }

  if (value || row.length) {
    row.push(value.trim());
    output.push(row);
  }

  const headers = output.shift();

  return output.map(values =>
    Object.fromEntries(
      headers.map((header, index) => [
        header,
        values[index] || ''
      ])
    )
  );
}

// Gross margin uses total profit divided by total revenue.
function totals(data, scenario = 'Actual') {
  const revenue = sum(data, 'Revenue ' + scenario);
  const cost = sum(data, 'Total Cost ' + scenario);

  return {
    r: revenue,
    c: cost,
    p: revenue - cost,
    m: revenue ? ((revenue - cost) / revenue) * 100 : null
  };
}

function options(id, values, all) {
  const items = all ? ['All', ...values] : values;

  $(id).replaceChildren(
    ...items.map(value =>
      new Option(
        value === 'All' ? 'All ' + all : value,
        value
      )
    )
  );
}

// Country is the only dashboard filter.
function filtered() {
  return rows.filter(row =>
    $('country').value === 'All' ||
    row.Country === $('country').value
  );
}

function chart(key, title, unit, data) {
  const selected = months;
  const scenarios = ['Actual', 'Budget', 'Forecast'];

  const series = scenarios.map(scenario =>
    selected.map(month => {
      const monthData = data.filter(row => row.Month === month);

      return monthData.length
        ? totals(monthData, scenario)[key]
        : null;
    })
  );

  const values = series.flat().filter(value => value !== null);

  let low = key === 'm'
    ? Math.floor(Math.min(...values) / 5) * 5
    : 0;

  let high = key === 'm'
    ? Math.ceil(Math.max(...values) / 5) * 5
    : Math.max(...values) * 1.1;

  if (!values.length) {
    low = 0;
    high = 1;
  }

  if (high === low) high = low + 1;

  const width = 650;
  const height = 120;
  const left = 49;
  const right = 18;
  const top = 10;
  const bottom = 22;

  const x = index =>
    selected.length === 1
      ? (width + left - right) / 2
      : left +
        index * (width - left - right) / (selected.length - 1);

  const y = value =>
    top +
    ((high - value) / (high - low)) * (height - top - bottom);

  let svg = '';

  for (let i = 0; i < 3; i++) {
    const value = low + ((high - low) * i) / 2;
    const position = y(value);

    const label = key === 'm'
      ? value.toFixed(0) + '%'
      : (value / 1e6).toFixed(1);

    svg += `
      <line
        x1="${left}"
        x2="${width - right}"
        y1="${position}"
        y2="${position}"
        stroke="#29404a"
      />
      <text
        x="${left - 7}"
        y="${position + 3}"
        text-anchor="end"
      >${label}</text>
    `;
  }

  selected.forEach((month, index) => {
    svg += `
      <text
        x="${x(index)}"
        y="${height - 4}"
        text-anchor="middle"
      >${month}</text>
    `;
  });

  series.forEach((values, scenarioIndex) => {
    let path = '';
    let active = false;

    values.forEach((value, index) => {
      if (value === null) {
        active = false;
        return;
      }

      path += `${active ? 'L' : 'M'}${x(index)},${y(value)} `;
      active = true;
    });

    const color = [
      '#d6b875',
      '#9aaebc',
      '#69c5cd'
    ][scenarioIndex];

    svg += `
      <path
        d="${path}"
        fill="none"
        stroke="${color}"
        stroke-width="2"
        ${scenarioIndex === 1 ? 'stroke-dasharray="5 4"' : ''}
      />
    `;

    values.forEach((value, index) => {
      if (value === null) return;

      const formattedValue = key === 'm'
        ? pct(value)
        : money(value);

      svg += `
        <circle
          cx="${x(index)}"
          cy="${y(value)}"
          r="3"
          fill="${color}"
        >
          <title>${selected[index]} · ${scenarios[scenarioIndex]}: ${formattedValue}</title>
        </circle>
      `;
    });
  });

  return `
    <div class="chart-row">
      <div class="chart-label">
        ${title}
        <small>${unit}</small>
      </div>

      <svg
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="none"
        role="img"
        aria-label="${title}: actual, budget and forecast by month"
      >
        ${svg}
      </svg>
    </div>
  `;
}

function update() {
  const data = filtered();
  const actual = totals(data);
  const budget = totals(data, 'Budget');

  const cards = [
    [
      'Actual revenue',
      money(actual.r),
      delta(actual.r, budget.r),
      false
    ],
    [
      'Actual cost',
      money(actual.c),
      delta(actual.c, budget.c),
      true
    ],
    [
      'Gross profit',
      money(actual.p),
      delta(actual.p, budget.p),
      false
    ],
    [
      'Gross margin',
      pct(actual.m),
      actual.m === null || budget.m === null
        ? null
        : actual.m - budget.m,
      false
    ]
  ];

  $('kpis').innerHTML = cards.map(
    ([label, value, variance, inverse], index) => {
      const status = variance === null
        ? ''
        : (inverse ? variance <= 0 : variance >= 0)
          ? 'good'
          : 'bad';

      const suffix = variance === null
        ? ''
        : index === 3
          ? ' pp'
          : '%';

      return `
        <article class="kpi">
          <p>${label}</p>
          <strong>${data.length ? value : '—'}</strong>
          <small class="${status}">
            ${signed(variance)}${suffix} vs budget
          </small>
        </article>
      `;
    }
  ).join('');

  $('charts').innerHTML =
    chart('r', 'Revenue', currency + ' million', data) +
    chart('c', 'Cost', currency + ' million', data) +
    chart('m', 'Gross margin', '% of revenue', data);

  const units = [...new Set(
    data.map(row => row['Business Unit'])
  )].map(name => {
    const unitData = data.filter(
      row => row['Business Unit'] === name
    );

    return {
      name,
      a: totals(unitData),
      b: totals(unitData, 'Budget')
    };
  }).sort((first, second) => second.a.r - first.a.r);

  const maximumRevenue = Math.max(
    ...units.map(unit => unit.a.r),
    1
  );

  $('units').innerHTML = units.map(unit => {
    const variance = delta(unit.a.r, unit.b.r);

    return `
      <div>
        <div class="unit-head">
          ${unit.name}
          <span>${money(unit.a.r)}</span>
        </div>

        <div class="track">
          <i style="width:${unit.a.r / maximumRevenue * 100}%"></i>
        </div>

        <div class="unit-bottom">
          <span>GM ${pct(unit.a.m)}</span>
          <span class="${variance >= 0 ? 'good' : 'bad'}">
            Rev ${signed(variance)}% vs budget
          </span>
        </div>
      </div>
    `;
  }).join('') || '<p>No records match these filters.</p>';

  const revenueVariance = delta(actual.r, budget.r);

  const budgetComparison = revenueVariance === null
    ? 'not comparable to budget'
    : Math.abs(revenueVariance).toFixed(1) +
      '% ' +
      (revenueVariance >= 0 ? 'above' : 'below') +
      ' budget';

  $('insight').textContent = data.length
    ? `Revenue is ${budgetComparison}. ${units[0].name} leads revenue at ${(units[0].a.r / actual.r * 100).toFixed(1)}% of this selection. Gross margin is ${pct(actual.m)}.`
    : 'Choose another filter combination to view performance.';

  const countryLabel = $('country').value === 'All'
    ? 'All countries'
    : $('country').value;

  $('scope').textContent =
    `${countryLabel} · ${currency} · Jan–Dec 2026 · ${data.length.toLocaleString()} records`;
}

async function init() {
  try {
    const response = await fetch('data/financial_data.csv');

    if (!response.ok) {
      throw Error('Data unavailable');
    }

    rows = parseCSV(await response.text());

    if (!rows.length || !rows[0]['Revenue Actual']) {
      throw Error('Invalid data');
    }

    options(
      'country',
      [...new Set(rows.map(row => row.Country))].sort(),
      'countries'
    );

    $('country').value = 'All';
    $('country').addEventListener('change', update);

    $('reset').onclick = () => {
      $('country').value = 'All';
      update();
    };

    update();
  } catch (error) {
    $('error').hidden = false;
    $('error').textContent =
      'Unable to load data. Keep financial_data.csv inside the data folder and open this dashboard through GitHub Pages or a local web server.';
  }
}

$('present').onclick = async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    $('present').textContent = 'Use browser full screen (F11)';
  }
};

init();
