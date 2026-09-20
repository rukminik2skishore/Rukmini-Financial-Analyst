/* =====================================================
   NAVIGATION
   ===================================================== */

function showSection(id, clickedLink) {

  // Hide all sections
  document.querySelectorAll(".section").forEach(function (section) {
    section.classList.remove("active");
  });

  // Show selected section
  const selectedSection = document.getElementById(id);

  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  // Remove active state from navigation
  document.querySelectorAll("nav a").forEach(function (link) {
    link.classList.remove("active");
  });

  // Add active state to clicked navigation
  if (clickedLink) {
    clickedLink.classList.add("active");
  }

  // If Projects is opened again, return to main project screen
  if (id === "projects") {
    const main = document.getElementById("projectsMain");
    const detail = document.getElementById("portfolioProjectDetail");

    if (main) {
      main.style.display = "block";
    }

    if (detail) {
      detail.style.display = "none";
    }
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

  main.style.display = "none";
  detail.style.display = "block";


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
            This project demonstrates the application of SQL
            within Financial Planning &amp; Analysis (FP&amp;A)
            using a structured financial dataset containing
            Budget, Actual and Forecast information.
          </p>

          <p>
            Financial performance is analysed across cost centres,
            departments, expense categories and reporting periods
            to transform transactional financial data into
            management-focused insights.
          </p>

          <p>
            The project replicates practical FP&amp;A reporting
            requirements including variance analysis, spending
            trends, forecast monitoring and management-level
            performance reporting.
          </p>

        </div>


        <div class="project-info-section">

          <h3>What the Analysis Does</h3>

          <ul class="project-feature-list">

            <li>
              Validates the underlying financial dataset before
              performing analysis.
            </li>

            <li>
              Calculates executive-level Budget, Actual and
              Forecast KPIs.
            </li>

            <li>
              Identifies cost centres operating over or
              under budget.
            </li>

            <li>
              Highlights expense categories driving
              unfavorable budget variance.
            </li>

            <li>
              Analyses month-over-month changes in
              actual spending.
            </li>

            <li>
              Analyses quarter-over-quarter spending trends.
            </li>

            <li>
              Compares annual forecast against the
              approved annual budget.
            </li>

            <li>
              Identifies departments with potential
              forecast risk.
            </li>

            <li>
              Analyses the contribution of major expense
              groups to total spending.
            </li>

            <li>
              Flags expense categories that may require
              management attention based on actual and
              forecast variance.
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
            <span>Variance Analysis</span>
            <span>MoM Analysis</span>
            <span>QoQ Analysis</span>
            <span>Forecast Analysis</span>
            <span>Risk Classification</span>

          </div>

        </div>


        <div class="project-info-section">

          <h3>SQL Analysis File</h3>

          <p>
            The complete SQL script used for this financial
            analysis is available below. Select
            <strong>View SQL Code</strong> to review the queries
            directly on this page or download the SQL file for
            further review.
          </p>

          <button
            class="sql-file-btn"
            onclick="toggleSQLFile()">
            View SQL Code
          </button>


          <div
            id="sqlCodeViewer"
            class="sql-code-viewer"
            style="display:none;">

            <div class="sql-code-header">

              <span>SQL for Portfolio.sql</span>

              <button
                class="sql-close-btn"
                onclick="toggleSQLFile()">
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
            This project demonstrates the development of an
            interactive financial performance dashboard using
            HTML, CSS and JavaScript.
          </p>

          <p>
            The dashboard analyses Budget, Actual and Forecast
            performance across revenue, cost and profitability
            using a structured FP&amp;A dataset covering a
            12-month reporting period.
          </p>

          <p>
            Interactive Business Unit and Client filters allow
            financial performance to be analysed dynamically,
            while KPI cards and trend charts provide a
            management-level view of business performance.
          </p>

        </div>


        <div class="project-info-section">

          <h3>What the Dashboard Does</h3>

          <ul class="project-feature-list">

            <li>
              Presents executive-level Actual Revenue,
              Actual Cost and Gross Profit KPIs.
            </li>

            <li>
              Calculates Gross Margin based on aggregated
              revenue and cost performance.
            </li>

            <li>
              Compares Actual Revenue against Budget and
              Forecast across a 12-month period.
            </li>

            <li>
              Analyses monthly Actual Cost against Budget
              and Forecast.
            </li>

            <li>
              Tracks Gross Margin trends across Budget,
              Actual and Forecast scenarios.
            </li>

            <li>
              Provides interactive Business Unit filtering
              for performance analysis.
            </li>

            <li>
              Provides interactive Client filtering to
              analyse account-level financial performance.
            </li>

            <li>
              Dynamically recalculates KPIs and charts
              whenever dashboard filters are changed.
            </li>

            <li>
              Uses structured financial data to replicate
              practical FP&amp;A performance reporting.
            </li>

          </ul>

        </div>


        <div class="project-info-section">

          <h3>Skills Demonstrated</h3>

          <div class="sql-skills-grid">

            <span>FP&amp;A Analysis</span>
            <span>Budget vs Actual</span>
            <span>Forecast Analysis</span>
            <span>Revenue Analysis</span>
            <span>Cost Analysis</span>
            <span>Gross Margin Analysis</span>
            <span>Variance Analysis</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>Chart.js</span>
            <span>CSV Data Processing</span>
            <span>Interactive Filters</span>
            <span>Data Visualization</span>

          </div>

        </div>


        <div class="project-info-section">

          <h3>Dashboard Dataset</h3>

          <p>
            The dashboard is powered by a structured financial
            dataset containing monthly Budget, Actual and
            Forecast information across multiple business units,
            clients and financial performance measures.
          </p>

          <p>
            The dataset includes revenue, cost and profitability
            information used to calculate the dashboard KPIs,
            variance indicators and monthly performance trends.
          </p>


          <div class="dashboard-action-buttons">

            <a
              href="./html-dashboard/data/financial_data.csv"
              download="FP&A_Dashboard_Data.csv"
              class="portfolio-download-btn">

              ↓ Download Dashboard Data

            </a>

          </div>

        </div>


        <div class="project-info-section">

          <h3>Interactive Dashboard</h3>

          <p>
            Select <strong>View Dashboard</strong> to explore
            the interactive financial dashboard. Use the
            Business Unit and Client filters to analyse
            financial performance dynamically.
          </p>


          <button
            class="sql-file-btn"
            onclick="toggleDashboard()">

            View Dashboard

          </button>


          <div
            id="dashboardViewer"
            class="dashboard-viewer"
            style="display:none;">

            <div class="dashboard-viewer-header">

              <span>
                FP&amp;A Performance Dashboard
              </span>

              <button
                class="sql-close-btn"
                onclick="toggleDashboard()">

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
            Financial planning and analysis project covering
            budgeting, forecasting, variance analysis and
            management reporting.
          </p>

          <p>
            The project demonstrates how financial information
            can be transformed into structured management
            insights to support planning and business
            decision-making.
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
     FP&A FORECASTING & BUDGET MODEL
     ===================================================== */

  else if (project === "forecast-budget") {

    content.innerHTML = `

      <div class="portfolio-detail-card">

        <h2>FP&amp;A Forecasting and Budget Analysis Model</h2>

        <p class="project-subtitle">
          FP&amp;A Portfolio Project |
          Forecasting, Budgeting &amp; Scenario Analysis
        </p>


        <div class="project-info-section">

          <h3>Project Overview</h3>

          <p>
            This project demonstrates the development of a
            driver-based FP&amp;A forecasting and budgeting model
            designed to support financial planning and
            management decision-making.
          </p>

          <p>
            The model combines revenue forecasting, headcount
            planning, operating expense forecasting and
            independent budget assumptions to compare expected
            business performance against financial targets.
          </p>

          <p>
            Base, Upside and Downside scenarios are incorporated
            to evaluate the potential financial impact of
            changes in key business assumptions.
          </p>

        </div>


        <div class="project-info-section">

          <h3>What the Model Does</h3>

          <ul class="project-feature-list">

            <li>
              Develops driver-based revenue forecasts.
            </li>

            <li>
              Builds headcount and personnel cost planning.
            </li>

            <li>
              Forecasts major operating expense categories.
            </li>

            <li>
              Creates an independent financial budget.
            </li>

            <li>
              Compares Forecast against Budget.
            </li>

            <li>
              Calculates financial variances and
              variance percentages.
            </li>

            <li>
              Supports Base, Upside and Downside scenarios.
            </li>

            <li>
              Highlights areas requiring management attention.
            </li>

            <li>
              Provides structured financial planning outputs
              suitable for FP&amp;A reporting.
            </li>

          </ul>

        </div>


        <div class="project-info-section">

          <h3>Skills Demonstrated</h3>

          <div class="sql-skills-grid">

            <span>FP&amp;A</span>
            <span>Budgeting</span>
            <span>Forecasting</span>
            <span>Driver-Based Planning</span>
            <span>Revenue Forecasting</span>
            <span>Headcount Planning</span>
            <span>Cost Forecasting</span>
            <span>Variance Analysis</span>
            <span>Scenario Analysis</span>
            <span>Financial Planning</span>
            <span>Excel</span>

          </div>

        </div>

      </div>

    `;
  }


  /* =====================================================
     FINANCIAL MODELLING / 3-STATEMENT / DCF PROJECT
     ===================================================== */

  else if (project === "model") {

    content.innerHTML = `

      <div class="portfolio-detail-card">


        <h2>Integrated Financial Forecasting Model</h2>

        <p class="project-subtitle">

          Financial Modelling Portfolio Project |
          3-Statement Forecast, DCF Valuation &amp; Scenario Analysis

        </p>


        <div class="project-info-section">

          <h3>Project Overview</h3>

          <p>
            This project demonstrates the development of an
            integrated financial forecasting model built in Excel
            to analyse historical performance and forecast future
            financial results.
          </p>

          <p>
            The model integrates the Income Statement, Balance Sheet
            and Cash Flow Statement while using operating assumptions
            to forecast revenue, costs, profitability, working capital
            and cash generation.
          </p>

          <p>
            The project also incorporates DCF valuation and
            sensitivity analysis to demonstrate how financial
            forecasts can support business planning and valuation
            decisions.
          </p>

        </div>


        <div class="project-info-section">

          <h3>Model Preview</h3>

          <p>
            Integrated financial model showing historical
            performance and forecast revenue, operating costs,
            profitability, financial position and cash flow.
          </p>


          <div class="financial-model-preview">

            <img
              src="./financial-model/forecast-model-preview.png"
              alt="Integrated Financial Forecasting Model"
              class="financial-model-image">

          </div>

        </div>


        <div class="project-info-section">

          <h3>What the Model Does</h3>

          <ul class="project-feature-list">

            <li>
              Forecasts revenue using structured
              operating assumptions.
            </li>

            <li>
              Models personnel, subcontractor, software,
              facilities and other operating costs.
            </li>

            <li>
              Calculates Gross Profit and Gross Margin
              across historical and forecast periods.
            </li>

            <li>
              Forecasts EBITDA and EBITDA Margin to evaluate
              operating profitability.
            </li>

            <li>
              Integrates the Income Statement, Balance Sheet
              and Cash Flow Statement.
            </li>

            <li>
              Models working capital movements including
              receivables, payables and other operating items.
            </li>

            <li>
              Calculates Free Cash Flow used for
              discounted cash flow valuation.
            </li>

            <li>
              Applies WACC and terminal value assumptions
              to estimate Enterprise Value.
            </li>

            <li>
              Includes sensitivity analysis to evaluate
              valuation changes under different WACC and
              terminal growth assumptions.
            </li>

            <li>
              Demonstrates scenario-based forecasting for
              financial planning and management decision support.
            </li>

          </ul>

        </div>


        <div class="project-info-section">

          <h3>Integrated Financial Statements</h3>

          <ul class="project-feature-list">

            <li>
              <strong>Income Statement:</strong>
              Forecasts revenue, costs, operating profit,
              interest, tax and net income.
            </li>

            <li>
              <strong>Balance Sheet:</strong>
              Forecasts assets, liabilities, working capital
              and shareholders' equity.
            </li>

            <li>
              <strong>Cash Flow Statement:</strong>
              Links operating, investing and financing activities
              to calculate ending cash.
            </li>

          </ul>

        </div>


        <div class="project-info-section">

          <h3>DCF Valuation</h3>

          <p>
            The Discounted Cash Flow valuation estimates the
            value of the business based on its forecast future
            free cash flows.
          </p>

          <p>
            Forecast Free Cash Flow is discounted using the
            Weighted Average Cost of Capital (WACC), while a
            terminal value captures the estimated value of the
            business beyond the explicit forecast period.
          </p>

          <p>
            The resulting present values are used to estimate
            Enterprise Value.
          </p>

        </div>


        <div class="project-info-section">

          <h3>Sensitivity Analysis</h3>

          <p>
            The sensitivity analysis evaluates how the estimated
            valuation changes when key valuation assumptions change.
          </p>

          <p>
            Different combinations of WACC and terminal growth
            rates are tested to illustrate the range of possible
            enterprise values and demonstrate the sensitivity of
            DCF valuation to key assumptions.
          </p>

        </div>


        <div class="project-info-section">

          <h3>Skills Demonstrated</h3>

          <div class="sql-skills-grid">

            <span>Financial Modelling</span>
            <span>FP&amp;A</span>
            <span>Financial Forecasting</span>
            <span>3-Statement Modelling</span>
            <span>Income Statement</span>
            <span>Balance Sheet</span>
            <span>Cash Flow Statement</span>
            <span>Revenue Forecasting</span>
            <span>Cost Forecasting</span>
            <span>Working Capital</span>
            <span>Cash Flow Forecasting</span>
            <span>Free Cash Flow</span>
            <span>DCF Valuation</span>
            <span>WACC</span>
            <span>Terminal Value</span>
            <span>Sensitivity Analysis</span>
            <span>Scenario Analysis</span>
            <span>Excel</span>

          </div>

        </div>


        <div class="project-info-section">

          <h3>Download Financial Model</h3>

          <p>
            The complete Excel workbook contains the integrated
            financial statements, forecast assumptions, DCF
            valuation and sensitivity analysis used in this project.
          </p>


          <div class="dashboard-action-buttons">

            <a
              href="./financial-model/Integrated_Financial_Model.xlsx"
              download
              class="portfolio-download-btn">

              ↓ Download Excel Financial Model

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

        <p>
          The selected project could not be loaded.
        </p>

      </div>

    `;

  }


  /* =====================================================
     SCROLL TO PROJECT
     ===================================================== */

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

  if (!viewer || !codeContent) {
    return;
  }

  if (viewer.style.display === "block") {

    viewer.style.display = "none";
    return;

  }

  viewer.style.display = "block";

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
        "Error: " + error.message;

      console.error("SQL loading error:", error);

    });
}


/* =====================================================
   TOGGLE HTML DASHBOARD
   ===================================================== */

function toggleDashboard() {

  const viewer = document.getElementById("dashboardViewer");

  if (!viewer) {
    return;
  }

  if (
    viewer.style.display === "none" ||
    viewer.style.display === ""
  ) {

    viewer.style.display = "block";

    viewer.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  } else {

    viewer.style.display = "none";

  }
}


/* =====================================================
   BACK TO PROJECTS
   ===================================================== */

function backToPortfolioProjects() {

  const detail =
    document.getElementById("portfolioProjectDetail");

  const main =
    document.getElementById("projectsMain");

  if (detail) {
    detail.style.display = "none";
  }

  if (main) {
    main.style.display = "block";
  }

  const projectsSection =
    document.getElementById("projects");

  if (projectsSection) {

    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
}


/* =====================================================
   INITIAL PAGE SETUP
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  console.log("Portfolio JavaScript loaded successfully.");

});
