'use strict';

const $ = id => document.getElementById(id);

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const SCENARIOS = ['Actual', 'Budget', 'Forecast'];
const FILTER_IDS = ['country', 'unit', 'client', 'month'];
const CURRENCY = 'USD';
const DATA_PATH = 'data/financial_data.csv';

let rows = [];

// All financial amounts are treated as USD.
// No exchange-rate conversion is applied.
function num(value) {
  let text = String(value ?? '').trim();

  if (!text) return 0;

  const negative = /^\(.*\)$/.test(text);

  text = text.replace(/[(),\s]/g, '');

  const number = Number(text);

  if (!Number.isFinite(number)) {
    throw new Error(`Invalid financial value: ${value}`);
  }

  return negative ? -Math.abs(number) : number;
}

function sum(data, key) {
  return data.reduce((total, row) => total + num(row[key]), 0);
}

function money(value) {
  return `${CURRENCY} ${(value / 1000000).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}m`;
}

function pct(value) {
  return value === null || !Number.isFinite(value)
    ? '—'
    : `${value.toFixed(1)}%`;
}

function delta(actual, budget) {
  return budget
    ? ((actual - budget) / Math.abs(budget)) * 100
    : null;
}

function signed(value) {
  if (value === null || !Number.isFinite(value)) return '—';

  // Avoid displaying "-0.0".
  const rounded = Number(value.toFixed(1));

  return `${rounded > 0 ? '+' : ''}${rounded.toFixed(1)}`;
}

function varianceClass(value, inverse = false) {
  if (value === null || !Number.isFinite(value)) return '';

  return (inverse ? value <= 0 : value >= 0)
    ? 'good'
    : 'bad';
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

// Supports quoted CSV values, including numbers containing commas.
function parseCSV(text) {
  text = text.replace(/^\uFEFF/, '');

  const records = [];
  let record = [];
  let value = '';
  let quoted = false;

  function finishRecord() {
    record.push(value.trim());

    if (record.some(cell => cell !== '')) {
      records.push(record);
    }

    record = [];
    value = '';
  }

  for (let i = 0; i < text.length; i++) {
    const character = text[i];

    if (character === '"') {
      if (quoted && text[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (!quoted && character === ',') {
      record.push(value.trim());
      value = '';
    } else if (
      !quoted &&
      (character === '\n' || character === '\r')
    ) {
      finishRecord();

      if (character === '\r' && text[i + 1] === '\n') {
        i++;
      }
    } else {
      value += character;
    }
  }

  if (quoted) {
    throw new Error('CSV contains an unclosed quotation mark.');
  }

  if (value !== '' || record.length) {
    finishRecord();
  }

  if (!records.length) return [];

  const headers = records.shift();

  return records.map(values =>
    Object.fromEntries(
      headers
        .map((header, index) => [header, values[index] ?? ''])
        .filter(([header]) => header !== '')
    )
  );
}

// Gross margin is calculated from aggregated revenue and cost.
function totals(data, scenario = 'Actual') {
  const revenue = sum(data, `Revenue ${scenario}`);
  const cost = sum(data, `Total Cost ${scenario}`);
  const profit = revenue - cost;

  return {
    r: revenue,
    c: cost,
    p: profit,
    m: revenue ? (profit / revenue) * 100 : null
  };
}

function populateOptions(id, values, allLabel) {
  const select = $(id);

  select.replaceChildren(
    new Option(allLabel, 'All'),
    ...values.map(value => new Option(value, value))
  );

  select.value = 'All';
}

function uniqueValues(column) {
  return [...new Set(
    rows.map(row => row[column]).filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));
}

// All four filters work together.
function filtered() {
  return rows.filter(row =>
    ($('country').value === 'All' ||
      row.Country === $('country').value) &&

    ($('unit').value === 'All' ||
      row['Business Unit'] === $('unit').value) &&

    ($('client').value === 'All' ||
      row.Client === $('client').value) &&

    ($('month').value === 'All' ||
      row.Month === $('month').value)
  );
}

function chart(key, title, unit, data) {
  const selectedMonths = MONTHS.filter(month =>
    $('month').value === 'All' ||
    month === $('month').value
  );

  const series = SCENARIOS.map(scenario =>
    selectedMonths.map(month => {
      const monthData = data.filter(row => row.Month === month);

      return monthData.length
        ? totals(monthData, scenario)[key]
        : null;
    })
  );

  const values = series
    .flat()
    .filter(value => value !== null && Number.isFinite(value));

  let low = 0;
  let high = 1;

  if (values.length) {
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);

    if (key === 'm') {
      low = Math.floor(minimum / 5) * 5;
      high = Math.ceil(maximum / 5) * 5;
    } else {
      low = Math.min(0, minimum);
      high = Math.max(0, maximum);

      const padding = (high - low) * 0.1;

      if (low < 0) low -= padding;
      if (high > 0) high += padding;
    }

    if (high === low) {
      high = low + (key === 'm' ? 5 : 1);
    }
  }

  const width = 650;
  const height = 120;
  const left = 49;
  const right = 18;
  const top = 10;
  const bottom = 22;

  const x = index =>
    selectedMonths.length === 1
      ? (width + left - right) / 2
      : left +
        index * (width - left - right) /
        (selectedMonths.length - 1);

  const y = value =>
    top +
    ((high - value) / (high - low)) *
    (height - top - bottom);

  let svg = '';

  // Horizontal gridlines and axis labels.
  for (let i = 0; i < 3; i++) {
    const value = low + ((high - low) * i) / 2;
    const position = y(value);

    const label = key === 'm'
      ? `${value.toFixed(0)}%`
      : (value / 1000000).toFixed(1);

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

  selectedMonths.forEach((month, index) => {
    svg += `
      <text
        x="${x(index)}"
        y="${height - 4}"
        text-anchor="middle"
      >${month}</text>
    `;
  });

  const colors = ['#d6b875', '#9aaebc', '#69c5cd'];

  series.forEach((scenarioValues, scenarioIndex) => {
    let path = '';
    let active = false;

    scenarioValues.forEach((value, index) => {
      if (value === null || !Number.isFinite(value)) {
        active = false;
        return;
      }

      path += `${active ? 'L' : 'M'}${x(index)},${y(value)} `;
      active = true;
    });

    const color = colors[scenarioIndex];
    const dash = scenarioIndex === 1
      ? 'stroke-dasharray="5 4"'
      : '';

    svg += `
      <path
        d="${path}"
        fill="none"
        stroke="${color}"
        stroke-width="2"
        ${dash}
      />
    `;

    scenarioValues.forEach((value, index) => {
      if (value === null || !Number.isFinite(value)) return;

      const formatted = key === 'm' ? pct(value) : money(value);

      svg += `
        <circle
          cx="${x(index)}"
          cy="${y(value)}"
          r="3"
          fill="${color}"
        >
          <title>${selectedMonths[index]} · ${SCENARIOS[scenarioIndex]}: ${formatted}</title>
        </circle>
      `;
    });
  });

  if (!values.length) {
    svg += `
      <text
        x="${(width + left - right) / 2}"
        y="${height / 2}"
        text-anchor="middle"
      >No data for this selection</text>
    `;
  }

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

  const marginVariance =
    actual.m === null || budget.m === null
      ? null
      : actual.m - budget.m;

  const cards = [
    ['Actual revenue', money(actual.r), delta(actual.r, budget.r), false],
    ['Actual cost', money(actual.c), delta(actual.c, budget.c), true],
    ['Gross profit', money(actual.p), delta(actual.p, budget.p), false],
    ['Gross margin', pct(actual.m), marginVariance, false]
  ];

  $('kpis').innerHTML = cards.map(
    ([label, value, variance, inverse], index) => {
      const comparison = variance === null
        ? '— vs budget'
        : `${signed(variance)}${index === 3 ? ' pp' : '%'} vs budget`;

      return `
        <article class="kpi">
          <p>${label}</p>
          <strong>${data.length ? value : '—'}</strong>
          <small class="${varianceClass(variance, inverse)}">
            ${comparison}
          </small>
        </article>
      `;
    }
  ).join('');

  $('charts').innerHTML =
    chart('r', 'Revenue', 'USD million', data) +
    chart('c', 'Cost', 'USD million', data) +
    chart('m', 'Gross margin', '% of revenue', data);

  const units = [...new Set(
    data.map(row => row['Business Unit'])
  )].map(name => {
    const unitData = data.filter(
      row => row['Business Unit'] === name
    );

    return {
      name,
      actual: totals(unitData),
      budget: totals(unitData, 'Budget')
    };
  }).sort((a, b) => b.actual.r - a.actual.r);

  const maximumRevenue = Math.max(
    ...units.map(unit => unit.actual.r),
    1
  );

  $('units').innerHTML = units.map(unit => {
    const variance = delta(unit.actual.r, unit.budget.r);

    const comparison = variance === null
      ? 'Rev — vs budget'
      : `Rev ${signed(variance)}% vs budget`;

    const barWidth = Math.max(
      0,
      Math.min(100, unit.actual.r / maximumRevenue * 100)
    );

    return `
      <div>
        <div class="unit-head">
          ${escapeHTML(unit.name)}
          <span>${money(unit.actual.r)}</span>
        </div>

        <div class="track">
          <i style="width:${barWidth}%"></i>
        </div>

        <div class="unit-bottom">
          <span>GM ${pct(unit.actual.m)}</span>
          <span class="${varianceClass(variance)}">
            ${comparison}
          </span>
        </div>
      </div>
    `;
  }).join('') || '<p>No records match these filters.</p>';

  if (!data.length) {
    $('insight').textContent =
      'No records match this selection. Change a filter or select Reset filters.';
  } else {
    const revenueVariance = delta(actual.r, budget.r);
    let revenueMessage;

    if (revenueVariance === null) {
      revenueMessage = 'Revenue cannot be compared with a zero budget.';
    } else if (Math.abs(revenueVariance) < 0.05) {
      revenueMessage = 'Revenue is broadly in line with budget.';
    } else {
      revenueMessage =
        `Revenue is ${Math.abs(revenueVariance).toFixed(1)}% ` +
        `${revenueVariance >= 0 ? 'above' : 'below'} budget.`;
    }

    const leader = units[0];
    let leaderMessage = '';

    if (leader && actual.r > 0) {
      leaderMessage =
        ` ${leader.name} leads revenue at ` +
        `${(leader.actual.r / actual.r * 100).toFixed(1)}% ` +
        'of this selection.';
    }

    $('insight').textContent =
      revenueMessage +
      leaderMessage +
      ` Gross margin is ${pct(actual.m)}.`;
  }

  const countryLabel = $('country').value === 'All'
    ? 'All countries'
    : $('country').value;

  const unitLabel = $('unit').value === 'All'
    ? 'All business units'
    : $('unit').value;

  const clientLabel = $('client').value === 'All'
    ? 'All clients'
    : $('client').value;

  const periodLabel = $('month').value === 'All'
    ? 'Jan–Dec'
    : $('month').value;

  $('scope').textContent =
    `${countryLabel} · ${unitLabel} · ${clientLabel} · ` +
    `${CURRENCY} · ${periodLabel} 2026 · ` +
    `${data.length.toLocaleString('en-US')} records`;
}

async function init() {
  try {
    const requiredIds = [
      ...FILTER_IDS,
      'reset',
      'kpis',
      'charts',
      'units',
      'insight',
      'scope',
      'error'
    ];

    const missingIds = requiredIds.filter(id => !$(id));

    if (missingIds.length) {
      throw new Error(
        'Update index.html to the four-filter version. ' +
        `Missing elements: ${missingIds.join(', ')}.`
      );
    }

    FILTER_IDS.forEach(id => {
      $(id).disabled = true;
    });

    $('reset').disabled = true;
    $('error').hidden = true;

    const response = await fetch(DATA_PATH, { cache: 'no-cache' });

    if (!response.ok) {
      throw new Error(
        `Cannot load ${DATA_PATH} (HTTP ${response.status}).`
      );
    }

    rows = parseCSV(await response.text());

    if (!rows.length) {
      throw new Error('The CSV contains no data rows.');
    }

    const requiredColumns = [
      'Country',
      'Business Unit',
      'Client',
      'Month',
      ...SCENARIOS.flatMap(scenario => [
        `Revenue ${scenario}`,
        `Total Cost ${scenario}`
      ])
    ];

    const missingColumns = requiredColumns.filter(
      column => !Object.prototype.hasOwnProperty.call(rows[0], column)
    );

    if (missingColumns.length) {
      throw new Error(
        `Missing CSV columns: ${missingColumns.join(', ')}.`
      );
    }

    // Validate financial values before enabling the dashboard.
    rows.forEach(row => {
      SCENARIOS.forEach(scenario => {
        num(row[`Revenue ${scenario}`]);
        num(row[`Total Cost ${scenario}`]);
      });
    });

    populateOptions(
      'country',
      uniqueValues('Country'),
      'All countries'
    );

    populateOptions(
      'unit',
      uniqueValues('Business Unit'),
      'All business units'
    );

    populateOptions(
      'client',
      uniqueValues('Client'),
      'All clients'
    );

    populateOptions('month', MONTHS, 'All months');

    FILTER_IDS.forEach(id => {
      $(id).disabled = false;
      $(id).addEventListener('change', update);
    });

    $('reset').disabled = false;
    $('reset').textContent = 'Reset filters ↺';

    $('reset').onclick = () => {
      FILTER_IDS.forEach(id => {
        $(id).value = 'All';
      });

      update();
    };

    update();
  } catch (error) {
    console.error(error);

    if ($('error')) {
      $('error').hidden = false;
      $('error').textContent =
        `${error.message} Keep financial_data.csv inside the data ` +
        'folder and open the dashboard through GitHub Pages or a local web server.';
    }

    if ($('scope')) {
      $('scope').textContent = 'Unable to load dashboard.';
    }
  }
}

function startDashboard() {
  if ($('present')) {
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
  }

  init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startDashboard, {
    once: true
  });
} else {
  startDashboard();
}
