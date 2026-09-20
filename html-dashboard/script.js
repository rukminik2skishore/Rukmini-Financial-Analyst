/* =========================================================
   FP&A PERFORMANCE DASHBOARD
   ========================================================= */

let financialData = [];

let revenueChart;
let costChart;
let grossMarginChart;


/* =========================================================
   MONTH ORDER
   ========================================================= */

const monthOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


/* =========================================================
   LOAD CSV DATA
   ========================================================= */

async function loadData() {

    try {

        const response = await fetch("data/financial_data.csv");

        if (!response.ok) {
            throw new Error("Could not load financial_data.csv");
        }

        const csvText = await response.text();

        financialData = parseCSV(csvText);

        console.log("Financial records loaded:", financialData.length);

        populateFilters();

        updateDashboard();

    } catch (error) {

        console.error("Error loading dashboard data:", error);

        alert(
            "Dashboard data could not be loaded. " +
            "Please check that financial_data.csv is inside the data folder."
        );
    }
}


/* =========================================================
   CSV PARSER
   ========================================================= */

function parseCSV(csvText) {

    const lines = csvText
        .replace(/\r/g, "")
        .trim()
        .split("\n");

    const headers = parseCSVLine(lines[0]);

    return lines.slice(1).map(line => {

        const values = parseCSVLine(line);

        const row = {};

        headers.forEach((header, index) => {
            row[header.trim()] =
                values[index] !== undefined
                    ? values[index].trim()
                    : "";
        });

        return row;
    });
}


/* Handles commas inside quoted CSV cells */

function parseCSVLine(line) {

    const values = [];

    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {

        const character = line[i];

        if (character === '"') {

            if (
                insideQuotes &&
                line[i + 1] === '"'
            ) {
                current += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }

        } else if (
            character === "," &&
            !insideQuotes
        ) {

            values.push(current);
            current = "";

        } else {

            current += character;
        }
    }

    values.push(current);

    return values;
}


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function number(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return 0;
    }

    const cleanedValue = String(value)
        .replace(/,/g, "")
        .replace(/₹/g, "")
        .replace(/%/g, "")
        .trim();

    const result = Number(cleanedValue);

    return Number.isFinite(result) ? result : 0;
}


function sum(data, column) {

    return data.reduce(
        (total, row) => total + number(row[column]),
        0
    );
}


function uniqueValues(column) {

    return [
        ...new Set(
            financialData
                .map(row => row[column])
                .filter(value => value !== "")
        )
    ];
}


/* =========================================================
   POPULATE FILTERS
   ========================================================= */

function populateFilters() {

       const businessUnitFilter =
        document.getElementById("businessUnitFilter");

    const clientFilter =
        document.getElementById("clientFilter");


    /* BUSINESS UNIT */

    const businessUnits =
        uniqueValues("Business Unit").sort();

    businessUnits.forEach(unit => {

        const option =
            document.createElement("option");

        option.value = unit;
        option.textContent = unit;

        businessUnitFilter.appendChild(option);
    });


    /* CLIENT */

    const clients =
        uniqueValues("Client").sort();

    clients.forEach(client => {

        const option =
            document.createElement("option");

        option.value = client;
        option.textContent = client;

        clientFilter.appendChild(option);
    });
}


/* =========================================================
   FILTER DATA
   ========================================================= */

function getFilteredData() {

    const selectedBusinessUnit =
        document.getElementById("businessUnitFilter").value;

    const selectedClient =
        document.getElementById("clientFilter").value;


    return financialData.filter(row => {

        const businessUnitMatch =
            selectedBusinessUnit === "All" ||
            row["Business Unit"] === selectedBusinessUnit;

        const clientMatch =
            selectedClient === "All" ||
            row["Client"] === selectedClient;


        return (
    businessUnitMatch &&
    clientMatch
        );
    });
}


/* =========================================================
   NUMBER FORMATTING
   ========================================================= */

function formatCurrency(value) {

    const absoluteValue = Math.abs(value);

    if (absoluteValue >= 10000000) {

        return "₹" +
            (value / 10000000).toFixed(2) +
            " Cr";
    }

    if (absoluteValue >= 100000) {

        return "₹" +
            (value / 100000).toFixed(2) +
            " L";
    }

    if (absoluteValue >= 1000) {

        return "₹" +
            (value / 1000).toFixed(1) +
            "K";
    }

    return "₹" +
        value.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });
}


function formatPercent(value) {

    if (!Number.isFinite(value)) {
        return "0.0%";
    }

    return value.toFixed(1) + "%";
}


/* =========================================================
   KPI CALCULATIONS
   ========================================================= */

function updateKPIs(data) {

    const revenueActual =
        sum(data, "Revenue Actual");

    const revenueBudget =
        sum(data, "Revenue Budget");


    const costActual =
        sum(data, "Total Cost Actual");

    const costBudget =
        sum(data, "Total Cost Budget");


    /*
       Gross Profit is calculated from totals.

       GP = Revenue - Cost
    */

    const grossProfitActual =
        revenueActual - costActual;


    /*
       IMPORTANT:

       Gross Margin is NOT the simple average
       of row-level margin percentages.

       GM % =
       Total Gross Profit / Total Revenue
    */

    const grossMarginActual =
        revenueActual !== 0
            ? (grossProfitActual / revenueActual) * 100
            : 0;


    /* Revenue variance */

    const revenueVariance =
        revenueActual - revenueBudget;

    const revenueVariancePct =
        revenueBudget !== 0
            ? (revenueVariance / revenueBudget) * 100
            : 0;


    /* Cost variance */

    const costVariance =
        costActual - costBudget;

    const costVariancePct =
        costBudget !== 0
            ? (costVariance / costBudget) * 100
            : 0;


    /* Update KPI cards */

    document.getElementById(
        "revenueKPI"
    ).textContent =
        formatCurrency(revenueActual);


    document.getElementById(
        "costKPI"
    ).textContent =
        formatCurrency(costActual);


    document.getElementById(
        "grossProfitKPI"
    ).textContent =
        formatCurrency(grossProfitActual);


    document.getElementById(
        "grossMarginKPI"
    ).textContent =
        formatPercent(grossMarginActual);


    /* Variance text */

    const revenueVarianceElement =
        document.getElementById(
            "revenueVariance"
        );

    revenueVarianceElement.textContent =
        `${formatCurrency(revenueVariance)} ` +
        `(${formatPercent(revenueVariancePct)}) vs Budget`;


    const costVarianceElement =
        document.getElementById(
            "costVariance"
        );

    costVarianceElement.textContent =
        `${formatCurrency(costVariance)} ` +
        `(${formatPercent(costVariancePct)}) vs Budget`;
}


/* =========================================================
   MONTHLY AGGREGATION
   ========================================================= */

function aggregateByMonth(data) {

    return monthOrder.map(month => {

        const monthData =
            data.filter(
                row => row["Month"] === month
            );


        /* Revenue */

        const revenueActual =
            sum(monthData, "Revenue Actual");

        const revenueBudget =
            sum(monthData, "Revenue Budget");

        const revenueForecast =
            sum(monthData, "Revenue Forecast");


        /* Cost */

        const costActual =
            sum(monthData, "Total Cost Actual");

        const costBudget =
            sum(monthData, "Total Cost Budget");

        const costForecast =
            sum(monthData, "Total Cost Forecast");


        /* Gross Profit */

        const gpActual =
            revenueActual - costActual;

        const gpBudget =
            revenueBudget - costBudget;

        const gpForecast =
            revenueForecast - costForecast;


        /* Gross Margin */

        const gmActual =
            revenueActual !== 0
                ? (gpActual / revenueActual) * 100
                : 0;

        const gmBudget =
            revenueBudget !== 0
                ? (gpBudget / revenueBudget) * 100
                : 0;

        const gmForecast =
            revenueForecast !== 0
                ? (gpForecast / revenueForecast) * 100
                : 0;


        return {

            month,

            revenueActual,
            revenueBudget,
            revenueForecast,

            costActual,
            costBudget,
            costForecast,

            gmActual,
            gmBudget,
            gmForecast
        };
    });
}


/* =========================================================
   CHART DEFAULTS
   ========================================================= */

Chart.defaults.color = "#c7dce5";

Chart.defaults.borderColor =
    "rgba(199, 220, 229, 0.10)";

Chart.defaults.font.family =
    "Arial, Helvetica, sans-serif";


/* =========================================================
   CHART OPTIONS
   ========================================================= */

function moneyChartOptions() {

    return {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            mode: "index",
            intersect: false
        },

        plugins: {

            legend: {

                labels: {
                    color: "#c7dce5",
                    usePointStyle: true,
                    padding: 20
                }
            },

            tooltip: {

                callbacks: {

                    label: function(context) {

                        return (
                            context.dataset.label +
                            ": " +
                            formatCurrency(
                                context.parsed.y
                            )
                        );
                    }
                }
            }
        },

        scales: {

            x: {

                ticks: {
                    color: "#9fb9c4"
                },

                grid: {
                    display: false
                }
            },

            y: {

                beginAtZero: true,

                ticks: {

                    color: "#9fb9c4",

                    callback: function(value) {
                        return formatCurrency(value);
                    }
                },

                grid: {
                    color:
                        "rgba(199,220,229,0.08)"
                }
            }
        }
    };
}


function marginChartOptions() {

    return {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            mode: "index",
            intersect: false
        },

        plugins: {

            legend: {

                labels: {
                    color: "#c7dce5",
                    usePointStyle: true,
                    padding: 20
                }
            },

            tooltip: {

                callbacks: {

                    label: function(context) {

                        return (
                            context.dataset.label +
                            ": " +
                            formatPercent(
                                context.parsed.y
                            )
                        );
                    }
                }
            }
        },

        scales: {

            x: {

                ticks: {
                    color: "#9fb9c4"
                },

                grid: {
                    display: false
                }
            },

            y: {

                ticks: {

                    color: "#9fb9c4",

                    callback: function(value) {
                        return value + "%";
                    }
                },

                grid: {
                    color:
                        "rgba(199,220,229,0.08)"
                }
            }
        }
    };
}


/* =========================================================
   UPDATE CHARTS
   ========================================================= */

function updateCharts(data) {

   const monthly =
    aggregateByMonth(data);

const chartData = monthly;

const labels =
    chartData.map(
        item => item.month
    );

    /* Destroy old charts before rebuilding */

    if (revenueChart) {
        revenueChart.destroy();
    }

    if (costChart) {
        costChart.destroy();
    }

    if (grossMarginChart) {
        grossMarginChart.destroy();
    }


    /* =====================================================
       REVENUE CHART
       ===================================================== */

    revenueChart =
        new Chart(
            document.getElementById(
                "revenueChart"
            ),
            {

                type: "line",

                data: {

                    labels,

                    datasets: [

                        {
                            label: "Actual",
                            data:
                                chartData.map(
                                    item =>
                                        item.revenueActual
                                ),

                            borderColor: "#00cfff",
                            backgroundColor: "#00cfff",

                            borderWidth: 3,

                            tension: 0.35,

                            pointRadius: 4
                        },

                        {
                            label: "Budget",
                            data:
                                chartData.map(
                                    item =>
                                        item.revenueBudget
                                ),

                            borderColor: "#94a3b8",
                            backgroundColor: "#94a3b8",

                            borderWidth: 2,

                            borderDash: [6, 5],

                            tension: 0.35,

                            pointRadius: 3
                        },

                        {
                            label: "Forecast",
                            data:
                                chartData.map(
                                    item =>
                                        item.revenueForecast
                                ),

                            borderColor: "#ffffff",
                            backgroundColor: "#ffffff",

                            borderWidth: 2,

                            tension: 0.35,

                            pointRadius: 3
                        }
                    ]
                },

                options:
                    moneyChartOptions()
            }
        );


    /* =====================================================
       COST CHART
       ===================================================== */

    costChart =
        new Chart(
            document.getElementById(
                "costChart"
            ),
            {

                type: "line",

                data: {

                    labels,

                    datasets: [

                        {
                            label: "Actual",
                            data:
                                chartData.map(
                                    item =>
                                        item.costActual
                                ),

                            borderColor: "#00cfff",
                            backgroundColor: "#00cfff",

                            borderWidth: 3,

                            tension: 0.35,

                            pointRadius: 4
                        },

                        {
                            label: "Budget",
                            data:
                                chartData.map(
                                    item =>
                                        item.costBudget
                                ),

                            borderColor: "#94a3b8",
                            backgroundColor: "#94a3b8",

                            borderWidth: 2,

                            borderDash: [6, 5],

                            tension: 0.35,

                            pointRadius: 3
                        },

                        {
                            label: "Forecast",
                            data:
                                chartData.map(
                                    item =>
                                        item.costForecast
                                ),

                            borderColor: "#ffffff",
                            backgroundColor: "#ffffff",

                            borderWidth: 2,

                            tension: 0.35,

                            pointRadius: 3
                        }
                    ]
                },

                options:
                    moneyChartOptions()
            }
        );


    /* =====================================================
       GROSS MARGIN CHART
       ===================================================== */

    grossMarginChart =
        new Chart(
            document.getElementById(
                "grossMarginChart"
            ),
            {

                type: "line",

                data: {

                    labels,

                    datasets: [

                        {
                            label: "Actual",
                            data:
                                chartData.map(
                                    item =>
                                        item.gmActual
                                ),

                            borderColor: "#00cfff",
                            backgroundColor: "#00cfff",

                            borderWidth: 3,

                            tension: 0.35,

                            pointRadius: 4
                        },

                        {
                            label: "Budget",
                            data:
                                chartData.map(
                                    item =>
                                        item.gmBudget
                                ),

                            borderColor: "#94a3b8",
                            backgroundColor: "#94a3b8",

                            borderWidth: 2,

                            borderDash: [6, 5],

                            tension: 0.35,

                            pointRadius: 3
                        },

                        {
                            label: "Forecast",
                            data:
                                chartData.map(
                                    item =>
                                        item.gmForecast
                                ),

                            borderColor: "#ffffff",
                            backgroundColor: "#ffffff",

                            borderWidth: 2,

                            tension: 0.35,

                            pointRadius: 3
                        }
                    ]
                },

                options:
                    marginChartOptions()
            }
        );
}


/* =========================================================
   UPDATE ENTIRE DASHBOARD
   ========================================================= */

function updateDashboard() {

    const filteredData =
        getFilteredData();

    updateKPIs(filteredData);

    updateCharts(filteredData);
}


/* =========================================================
   FILTER EVENTS
   ========================================================= */


document
    .getElementById("businessUnitFilter")
    .addEventListener(
        "change",
        updateDashboard
    );


document
    .getElementById("clientFilter")
    .addEventListener(
        "change",
        updateDashboard
    );


/* =========================================================
   RESET FILTERS
   ========================================================= */

document
    .getElementById("resetFilters")
    .addEventListener(
        "click",
        function() {
           
            document.getElementById(
                "businessUnitFilter"
            ).value = "All";

            document.getElementById(
                "clientFilter"
            ).value = "All";

            updateDashboard();
        }
    );


/* =========================================================
   START DASHBOARD
   ========================================================= */

loadData();
