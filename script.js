/* =====================================================
   NAVIGATION
   ===================================================== */

function showSection(id, clickedLink) {
  document.querySelectorAll(".section").forEach(function (section) {
    section.classList.remove("active");
  });

  const selectedSection = document.getElementById(id);

  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  document.querySelectorAll("nav a").forEach(function (link) {
    link.classList.remove("active");
  });

  if (clickedLink) {
    clickedLink.classList.add("active");
  }

  if (id === "projects") {
    const main = document.getElementById("projectsMain");
    const detail = document.getElementById("portfolioProjectDetail");

    if (main) main.hidden = false;
    if (detail) detail.hidden = true;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =====================================================
   PORTFOLIO PROJECTS
   ===================================================== */

function showPortfolioProject(project) {
  const main = document.getElementById("projectsMain");
  const detail = document.getElementById("portfolioProjectDetail");
  const content = document.getElementById("portfolioProjectContent");

  if (!main || !detail || !content) {
    console.error("Portfolio project containers could not be found.");
    return;
  }

  main.hidden = true;
  detail.hidden = false;

  /* =====================================================
     SQL PROJECT
     ===================================================== */

  if (project === "sql") {
    content.innerHTML = `
      <div class="portfolio-detail-card">

        <h2>Financial Data Analysis Using SQL</h2>

        <p class="project-subtitle">
          FP&amp;A Portfolio Project |
          Budget, Actual &amp; Forecast Analysis
        </p>

        <div class="project-info-section">
          <h3>Project Overview</h3>

          <p>
            Developed MySQL queries to analyse budget, actual
            and forecast expenditure across cost centres,
            departments and expense categories.
          </p>

          <p>
            The analysis identifies overspend, spending patterns
            and forecast gaps, translating financial data into
            structured insights for management review.
          </p>
        </div>

        <div class="project-info-section">
          <h3>What the Analysis Does</h3>

          <ul class="project-feature-list">
            <li>
              Summarises Budget, Actual and Forecast performance.
            </li>
            <li>
              Highlights overspend by cost centre and expense category.
            </li>
            <li>
              Tracks monthly and quarterly spending trends.
            </li>
            <li>
              Assesses annual forecast gaps and departmental risk.
            </li>
            <li>
              Breaks down spending by expense group and flags
              areas for review.
            </li>
          </ul>
        </div>

        <div class="project-info-section">
          <h3>SQL Skills Demonstrated</h3>

          <div class="sql-skills-grid">
            <span>SUM() Aggregations</span>
            <span>GROUP BY</span>
            <span>HAVING</span>
            <span>CASE Statements</span>
            <span>CTEs</span>
            <span>Window Functions</span>
            <span>LAG()</span>
            <span>Subqueries</span>
            <span>NULLIF()</span>
          </div>
        </div>

        <div class="project-info-section">
          <h3>SQL Analysis File</h3>

          <p>
            Review the queries directly on this page or download
            the complete SQL file.
          </p>

          <button
            type="button"
            class="sql-file-btn"
            data-action="toggle-sql">
            View SQL Code
          </button>

          <div
            id="sqlCodeViewer"
            class="sql-code-viewer"
            hidden>

            <div class="sql-code-header">
              <span>SQL for Portfolio.sql</span>

              <button
                type="button"
                class="sql-close-btn"
                data-action="toggle-sql"
                aria-label="Close SQL viewer">
                ✕
              </button>
            </div>

            <pre id="sqlCodeContent">Loading SQL file...</pre>
          </div>

          <div class="sql-download-area">
            <a
              href="./projects/SQL%20for%20Portfolio.sql"
              download="Financial_Data_Analysis_SQL.sql"
              class="portfolio-download-btn">
              ↓ Download SQL File
            </a>
          </div>
        </div>

      </div>
    `;
  }

  /* =====================================================
     HTML DASHBOARD PROJECT
     ===================================================== */

  else if (project === "dashboard") {
    content.innerHTML = `
      <div class="portfolio-detail-card">

        <h2>Interactive FP&amp;A Performance Dashboard</h2>

        <p class="project-subtitle">
          FP&amp;A Portfolio Project |
          Revenue, Cost &amp; Gross Margin Analysis
        </p>

        <div class="project-info-section">
          <h3>Project Overview</h3>

          <p>
            An interactive dashboard built with HTML, CSS and
            JavaScript to present financial performance through
            KPI summaries, monthly trends and business unit
            scorecards.
          </p>
        </div>

        <div class="project-info-section">
          <h3>What the Dashboard Does</h3>

          <ul class="project-feature-list">
            <li>
              Compares monthly Actual, Budget and Forecast
              performance.
            </li>
            <li>
              Summarises revenue, cost and gross margin.
            </li>
            <li>
              Supports country, business unit, client and
              period filters.
            </li>
            <li>
              Uses country-specific currency reporting to
              maintain meaningful comparisons.
            </li>
            <li>
              Recalculates KPIs and charts as filters change.
            </li>
          </ul>
        </div>

        <div class="project-info-section">
          <h3>Skills Demonstrated</h3>

          <div class="sql-skills-grid">
            <span>FP&amp;A Reporting</span>
            <span>Forecast &amp; Budget Analysis</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>CSV Data Handling</span>
            <span>Financial Storytelling</span>
            <span>Data Visualisation</span>
          </div>
        </div>

        <div class="project-info-section">
          <h3>Dashboard Dataset</h3>

          <p>
            A structured financial dataset provides monthly
            Budget, Actual and Forecast information across
            business units and clients. Revenue and cost data
            support profitability calculations, variance
            indicators and performance trends.
          </p>

          <div class="dashboard-action-buttons">
            <a
              href="./html-dashboard/data/financial_data.csv"
              download="FPA_Dashboard_Data.csv"
              class="portfolio-download-btn">
              ↓ Download Dashboard Data
            </a>
          </div>
        </div>

        <div class="project-info-section">
          <h3>Interactive Dashboard</h3>

          <p>
            Select <strong>View Dashboard</strong> to explore
            the analysis and use the filters to review
            financial performance.
          </p>

          <button
            type="button"
            class="sql-file-btn"
            data-action="toggle-dashboard">
            View Dashboard
          </button>

          <div
            id="dashboardViewer"
            class="dashboard-viewer"
            hidden>

            <div class="dashboard-viewer-header">
              <span>FP&amp;A Performance Dashboard</span>

              <button
                type="button"
                class="sql-close-btn"
                data-action="toggle-dashboard"
                aria-label="Close dashboard viewer">
                ✕
              </button>
            </div>

            <iframe
              src="./html-dashboard/index.html"
              class="dashboard-frame"
              title="FP&A Performance Dashboard">
            </iframe>
          </div>
        </div>

      </div>
    `;
  }

  /* =====================================================
     FP&A PROJECT
     ===================================================== */

  else if (project === "fpa") {
    content.innerHTML = `
      <div class="portfolio-detail-card">

        <h2>FP&amp;A / Financial Analytics</h2>

        <p class="project-subtitle">
          Financial Planning &amp; Analysis Portfolio Project
        </p>

        <div class="project-info-section">
          <h3>Project Overview</h3>

          <p>
            Financial analysis covering budgeting, forecasting,
            variance analysis and management reporting.
            The project demonstrates how financial information
            supports planning, performance reviews and
            business decisions.
          </p>
        </div>

        <div class="project-info-section">
          <h3>FP&amp;A Skills Demonstrated</h3>

          <div class="sql-skills-grid">
            <span>Budgeting</span>
            <span>Forecasting</span>
            <span>Variance Analysis</span>
            <span>Management Reporting</span>
            <span>Cost Analysis</span>
            <span>Financial Analysis</span>
            <span>Business Performance</span>
            <span>Excel</span>
          </div>
        </div>

      </div>
    `;
  }

  /* =====================================================
     FORECASTING & BUDGET ANALYSIS
     ===================================================== */

  else if (project === "forecast-budget") {
    content.innerHTML = `
      <div class="portfolio-detail-card">

        <h2>FP&amp;A Forecasting and Budget Analysis Model</h2>

        <p class="project-subtitle">
          FP&amp;A Portfolio Project |
          Forecasting, Budgeting, Variance &amp; Scenario Analysis
        </p>

        <div class="project-info-section">
          <h3>Project Overview</h3>

          <p>
            An Excel-based FP&amp;A model integrating revenue,
            workforce and operating expense forecasts into a
            projected Profit &amp; Loss statement.
          </p>

          <p>
            Historical actuals provide the forecasting baseline.
            A separate 2027 budget supports variance analysis,
            while alternative scenarios evaluate the effect
            of changes in key business assumptions.
          </p>
        </div>

        <div class="project-info-section">
          <h3>Model Structure</h3>

          <ul class="project-feature-list">
            <li>
              <strong>Assumptions:</strong>
              Centralised operating and financial inputs.
            </li>

            <li>
              <strong>Actuals:</strong>
              Historical performance used as the forecasting baseline.
            </li>

            <li>
              <strong>Revenue Forecast:</strong>
              Driver-based revenue projections.
            </li>

            <li>
              <strong>Headcount Plan:</strong>
              Workforce and personnel cost planning.
            </li>

            <li>
              <strong>Opex Forecast:</strong>
              Projections for major operating expense categories.
            </li>

            <li>
              <strong>P&amp;L:</strong>
              Consolidated revenue, cost and profitability forecasts.
            </li>

            <li>
              <strong>Forecast vs Budget:</strong>
              Comparison of expected performance with the budget.
            </li>

            <li>
              <strong>Scenarios:</strong>
              Evaluation of alternative planning assumptions.
            </li>

            <li>
              <strong>Budget 2027:</strong>
              Independent financial budget used as the planning benchmark.
            </li>

            <li>
              <strong>Checks:</strong>
              Validation checks for model consistency.
            </li>
          </ul>
        </div>

        <div class="project-info-section">
          <h3>What the Model Does</h3>

          <ul class="project-feature-list">
            <li>
              Connects revenue, headcount and operating cost
              drivers to financial outcomes.
            </li>
            <li>
              Consolidates forecasts into a projected P&amp;L.
            </li>
            <li>
              Compares the forecast with the independent
              2027 budget and calculates variances.
            </li>
            <li>
              Evaluates alternative scenarios and their
              impact on profitability.
            </li>
            <li>
              Supports management review through structured
              analysis and validation checks.
            </li>
          </ul>
        </div>
<!-- FORECAST MODEL SCREENSHOT -->
<div class="project-info-section">
  <h3>Forecast Model Preview</h3>

  <p>
    A snapshot of the Excel forecasting and budget analysis model.
    Click the image to view it in full size.
  </p>

  <a
    href="financial-model/forecast-model-preview.png"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open forecast model screenshot in a new tab"
  >
    <img
      src="financial-model/forecast-model-preview.png"
      alt="Excel forecasting and budget analysis model preview"
      loading="lazy"
      style="
        display: block;
        width: 100%;
        height: auto;
        margin-top: 18px;
        border: 1px solid rgba(201, 169, 97, 0.35);
        border-radius: 12px;
        cursor: zoom-in;
      "
    >
  </a>
</div>
        <div class="project-info-section">
          <h3>Skills Demonstrated</h3>

          <div class="sql-skills-grid">
            <span>FP&amp;A</span>
            <span>Financial Forecasting</span>
            <span>Budgeting</span>
            <span>Revenue Forecasting</span>
            <span>Headcount Planning</span>
            <span>Opex Forecasting</span>
            <span>P&amp;L Forecasting</span>
            <span>Variance Analysis</span>
            <span>Scenario Analysis</span>
            <span>Driver-Based Planning</span>
            <span>Model Validation</span>
            <span>Excel</span>
          </div>
        </div>

        <div class="project-info-section">
          <h3>Download Forecasting &amp; Budget Model</h3>

          <p>
            Explore the assumptions, historical actuals,
            supporting forecasts, projected P&amp;L, budget
            comparisons and scenario analysis in the
            complete Excel workbook.
          </p>

          <div class="dashboard-action-buttons">
            <a
              href="./financial-model/Integrated_Financial_Model.xlsx"
              download
              class="portfolio-download-btn">
              ↓ Download Excel Model
            </a>
          </div>
        </div>

      </div>
    `;
  }

  /* =====================================================
     3-STATEMENT MODEL & DCF VALUATION
     ===================================================== */

  else if (project === "model") {
    content.innerHTML = `
      <div class="portfolio-detail-card">

        <h2>3-Statement Model &amp; DCF Valuation</h2>

        <p class="project-subtitle">
          Financial Modelling Portfolio Project |
          Integrated Financial Statements, DCF &amp; Sensitivity Analysis
        </p>

        <div class="project-info-section">
          <h3>Project Overview</h3>

          <p>
            An integrated Excel financial model for an
            illustrative IT services company, using
            2023–2025 historical performance to forecast
            financial results for 2026–2030.
          </p>

          <p>
            Linked financial statements and supporting
            schedules connect operating assumptions with
            profitability and cash generation. A DCF valuation
            estimates enterprise value and implied value per
            share, supported by sensitivity analysis.
          </p>
        </div>

        <div class="project-info-section">
          <h3>Key Features</h3>

          <ul class="project-feature-list">
            <li>
              <strong>Integrated Statements:</strong>
              Links the Income Statement, Balance Sheet and
              Cash Flow Statement through revenue, working
              capital, CapEx, depreciation and debt schedules.
            </li>

            <li>
              <strong>DCF Valuation:</strong>
              Discounts forecast Free Cash Flow to Firm
              to estimate enterprise value, equity value
              and implied value per share.
            </li>

            <li>
              <strong>Sensitivity Analysis:</strong>
              Assesses the impact of WACC and terminal
              growth assumptions on valuation.
            </li>

            <li>
              <strong>Management Dashboard:</strong>
              Summarises forecast performance and
              key valuation outputs.
            </li>
          </ul>
        </div>

        <div class="project-info-section">
          <h3>Business Value</h3>

          <p>
            Connects operating assumptions with profitability,
            cash generation and valuation to support
            financial planning and investment assessment.
          </p>
        </div>

        <div class="project-info-section">
          <h3>Skills Demonstrated</h3>

          <div class="sql-skills-grid">
            <span>Financial Modelling</span>
            <span>3-Statement Modelling</span>
            <span>Financial Forecasting</span>
            <span>Revenue Forecasting</span>
            <span>Free Cash Flow</span>
            <span>DCF Valuation</span>
            <span>WACC</span>
            <span>Terminal Value</span>
            <span>Enterprise Value</span>
            <span>Sensitivity Analysis</span>
          </div>
        </div>

        <div class="project-info-section">
          <h3>Download Financial Model</h3>

          <p>
            The workbook includes historical data, forecast
            assumptions, integrated financial statements,
            supporting schedules, DCF valuation, sensitivity
            analysis and a financial dashboard.
          </p>

          <p>
            All financial data is fictional and has been
            created for portfolio demonstration purposes.
          </p>

          <div class="dashboard-action-buttons">
            <a
              href="./financial-model/Integrated%203%20Statement%20%26%20DCF%20Valuation.xlsx"
              download
              class="portfolio-download-btn">
              ↓ Download 3-Statement &amp; DCF Model
            </a>
          </div>
        </div>

      </div>
    `;
  }

  /* =====================================================
     UNKNOWN PROJECT
     ===================================================== */

  else {
    content.innerHTML = `
      <div class="portfolio-detail-card">
        <h2>Project Not Found</h2>
        <p>The selected project could not be loaded.</p>
      </div>
    `;
  }

  const projectsSection = document.getElementById("projects");

  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* =====================================================
   SQL FILE VIEWER
   ===================================================== */

function toggleSQLFile() {
  const viewer = document.getElementById("sqlCodeViewer");
  const codeContent = document.getElementById("sqlCodeContent");

  if (!viewer || !codeContent) return;

  if (!viewer.hidden) {
    viewer.hidden = true;
    return;
  }

  viewer.hidden = false;
  codeContent.textContent = "Loading SQL code...";

  fetch("./projects/SQL%20for%20Portfolio.sql")
    .then(function (response) {
      if (!response.ok) {
        throw new Error(
          "File not found. HTTP status: " + response.status
        );
      }

      return response.text();
    })
    .then(function (sqlCode) {
      codeContent.textContent = sqlCode;
    })
    .catch(function (error) {
      codeContent.textContent =
        "Unable to load SQL file.\n\n" +
        "Please check that the file exists at:\n" +
        "projects/SQL for Portfolio.sql\n\n" +
        "Open the portfolio through your website or a local server " +
        "to use the SQL viewer.\n\n" +
        "Error: " + error.message;

      console.error("SQL loading error:", error);
    });
}

/* =====================================================
   DASHBOARD VIEWER
   ===================================================== */

function toggleDashboard() {
  const viewer = document.getElementById("dashboardViewer");

  if (!viewer) return;

  if (viewer.hidden) {
    viewer.hidden = false;

    viewer.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else {
    viewer.hidden = true;
  }
}

/* =====================================================
   BACK TO PROJECTS
   ===================================================== */

function backToPortfolioProjects() {
  const detail = document.getElementById("portfolioProjectDetail");
  const main = document.getElementById("projectsMain");

  if (detail) detail.hidden = true;
  if (main) main.hidden = false;

  const projectsSection = document.getElementById("projects");

  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* =====================================================
   NAVIGATION AND BUTTON EVENTS
   ===================================================== */

document.addEventListener("click", function (event) {
  const control = event.target.closest(
    "[data-section], [data-project], [data-rk-project], " +
    "[data-rk-resume], [data-rka-education], [data-action]"
  );

  if (!control) return;

  if (
    control.tagName === "A" &&
    (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
  ) {
    return;
  }

  event.preventDefault();

  const section =
    control.dataset.section ||
    (control.hasAttribute("data-rk-resume") ? "resume" : "") ||
    (control.hasAttribute("data-rka-education") ? "education" : "");

  const project =
    control.dataset.project || control.dataset.rkProject;

  if (section) {
    const navLink = document.querySelector(
      'nav a[data-section="' + section + '"]'
    );

    showSection(section, navLink);
  } else if (project) {
    const navLink = document.querySelector(
      'nav a[data-section="projects"]'
    );

    showSection("projects", navLink);
    showPortfolioProject(project);

    const heading = document.querySelector(
      "#portfolioProjectContent h2"
    );

    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  } else {
    const actions = {
      "back-projects": backToPortfolioProjects,
      "toggle-sql": toggleSQLFile,
      "toggle-dashboard": toggleDashboard
    };

    const action = actions[control.dataset.action];

    if (action) action();
  }
});

/* =====================================================
   CONTACT SECTION PORTFOLIO LINK
   ===================================================== */

(function () {
  const link = document.getElementById("rc-portfolio-link");

  // Optional: enter your full public portfolio URL here.
  const portfolioURL = "";

  const url =
    portfolioURL ||
    (/^https?:$/.test(location.protocol)
      ? location.origin + location.pathname
      : "");

  if (link && url) {
    link.href = url;
    link.textContent = url
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
})();
