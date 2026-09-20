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
   FP&A FORECASTING & BUDGET ANALYSIS MODEL
   ===================================================== */

else if (project === "forecast-budget") {

  content.innerHTML = `

    <div class="portfolio-detail-card">

      <h2>FP&amp;A Forecasting and Budget Analysis Model</h2>

      <p class="project-subtitle">
        FP&amp;A Portfolio Project |
        Forecasting, Budgeting, Variance &amp; Scenario Analysis
      </p>


      <!-- PROJECT OVERVIEW -->

      <div class="project-info-section">

        <h3>Project Overview</h3>

        <p>
          This project demonstrates the development of a
          structured FP&amp;A forecasting and budgeting model
          built in Excel to support financial planning,
          performance analysis and management decision-making.
        </p>

        <p>
          The model combines historical actuals with revenue,
          headcount and operating expense forecasts to develop
          a forward-looking Profit &amp; Loss view.
        </p>

        <p>
          A separate 2027 budget is developed and compared
          against the forecast to identify financial variances,
          while scenario analysis evaluates the impact of
          changes in key business assumptions.
        </p>

      </div>


      <!-- MODEL STRUCTURE -->

      <div class="project-info-section">

        <h3>Model Structure</h3>

        <ul class="project-feature-list">

          <li>
            <strong>Assumptions:</strong>
            Centralised operating and financial assumptions
            used throughout the model.
          </li>

          <li>
            <strong>Actuals:</strong>
            Historical financial performance used as the
            starting point for forecasting.
          </li>

          <li>
            <strong>Revenue Forecast:</strong>
            Driver-based revenue projections based on
            business assumptions.
          </li>

          <li>
            <strong>Headcount Plan:</strong>
            Workforce planning and personnel cost forecasting.
          </li>

          <li>
            <strong>Opex Forecast:</strong>
            Forecasting of major operating expense categories.
          </li>

          <li>
            <strong>P&amp;L:</strong>
            Consolidated forecast of revenue, operating costs
            and profitability.
          </li>

          <li>
            <strong>Forecast vs Budget:</strong>
            Variance analysis comparing expected performance
            against the financial budget.
          </li>

          <li>
            <strong>Scenarios:</strong>
            Scenario analysis evaluating changes in key
            planning assumptions.
          </li>

          <li>
            <strong>Budget 2027:</strong>
            Independent financial budget used as the planning
            benchmark for forecast comparison.
          </li>

          <li>
            <strong>Checks:</strong>
            Model validation checks designed to improve
            consistency and reliability.
          </li>

        </ul>

      </div>


      <!-- WHAT MODEL DOES -->

      <div class="project-info-section">

        <h3>What the Model Does</h3>

        <ul class="project-feature-list">

          <li>
            Develops structured revenue forecasts using
            business and operating assumptions.
          </li>

          <li>
            Builds headcount and personnel cost planning.
          </li>

          <li>
            Forecasts major operating expense categories.
          </li>

          <li>
            Consolidates forecasts into a projected
            Profit &amp; Loss statement.
          </li>

          <li>
            Develops an independent 2027 financial budget.
          </li>

          <li>
            Compares Forecast against Budget and calculates
            financial variances.
          </li>

          <li>
            Provides detailed P&amp;L analysis for management
            review.
          </li>

          <li>
            Evaluates alternative business scenarios and
            their impact on financial performance.
          </li>

          <li>
            Includes validation checks to improve model
            accuracy and consistency.
          </li>

        </ul>

      </div>


      <!-- SKILLS -->

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
          <span>Financial Planning</span>
          <span>Model Validation</span>
          <span>Excel</span>

        </div>

      </div>


      <!-- DOWNLOAD -->

      <div class="project-info-section">

        <h3>Download Forecasting &amp; Budget Model</h3>

        <p>
          The complete Excel workbook contains the assumptions,
          historical actuals, revenue forecast, headcount plan,
          operating expense forecast, P&amp;L, forecast versus
          budget analysis, scenarios and 2027 budget.
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
   3 STATEMENT MODEL & DCF VALUATION
   ===================================================== */

else if (project === "model") {

  content.innerHTML = `

    <div class="portfolio-detail-card">


      <!-- =====================================================
           PROJECT HEADING
           ===================================================== -->

      <h2>3 Statement Model &amp; DCF Valuation</h2>

      <p class="project-subtitle">
        Financial Modelling Portfolio Project |
        Integrated Financial Statements, DCF &amp; Sensitivity Analysis
      </p>


      <!-- =====================================================
           PROJECT OVERVIEW
           ===================================================== -->

      <div class="project-info-section">

        <h3>Project Overview</h3>

        <p>
          This project demonstrates the development of a fully
          integrated 3-statement financial model and Discounted
          Cash Flow (DCF) valuation for an illustrative IT
          services company.
        </p>

        <p>
          The model combines historical financial performance
          from 2023–2025 with a driver-based five-year forecast
          covering 2026–2030.
        </p>

        <p>
          The Income Statement, Balance Sheet and Cash Flow
          Statement are dynamically linked through supporting
          schedules, allowing operating assumptions to flow
          through the complete financial model.
        </p>

        <p>
          Forecast Free Cash Flow to Firm (FCFF) is then used
          in a DCF valuation to estimate Enterprise Value and
          implied value per share, supported by WACC and
          terminal growth sensitivity analysis.
        </p>

      </div>


      <!-- =====================================================
           MODEL STRUCTURE
           ===================================================== -->

      <div class="project-info-section">

        <h3>Model Structure</h3>

        <ul class="project-feature-list">

          <li>
            <strong>Assumptions:</strong>
            Centralised operating, financial and valuation
            assumptions used throughout the model.
          </li>

          <li>
            <strong>Historical Data:</strong>
            Historical financial information covering
            2023–2025 provides the foundation for forecasting.
          </li>

          <li>
            <strong>Revenue Build:</strong>
            Driver-based revenue forecast covering 2026–2030.
          </li>

          <li>
            <strong>Income Statement:</strong>
            Forecasts revenue, COGS, operating expenses,
            EBITDA, depreciation, EBIT, interest, tax
            and net income.
          </li>

          <li>
            <strong>Balance Sheet:</strong>
            Forecasts cash, working capital, PP&amp;E,
            debt and other balance sheet accounts.
          </li>

          <li>
            <strong>Cash Flow Statement:</strong>
            Links operating, investing and financing
            activities to calculate ending cash.
          </li>

          <li>
            <strong>Supporting Schedules:</strong>
            Models working capital, PP&amp;E, depreciation,
            CapEx and debt-related financial drivers.
          </li>

          <li>
            <strong>DCF Valuation:</strong>
            Converts operating forecasts into FCFF and
            estimates the value of the business.
          </li>

          <li>
            <strong>Sensitivity Analysis:</strong>
            Evaluates valuation changes across different
            WACC and terminal growth assumptions.
          </li>

          <li>
            <strong>Dashboard:</strong>
            Summarises key forecast and valuation outputs
            for management-level review.
          </li>

        </ul>

      </div>


      <!-- =====================================================
           3 STATEMENT MODEL
           ===================================================== -->

      <div class="project-info-section">

        <h3>Integrated 3-Statement Model</h3>

        <p>
          The core of the model is the integration of the
          Income Statement, Balance Sheet and Cash Flow Statement.
        </p>

        <ul class="project-feature-list">

          <li>
            <strong>Income Statement:</strong>
            Revenue assumptions drive projected revenue,
            COGS, operating expenses, profitability,
            interest, tax and net income.
          </li>

          <li>
            <strong>Balance Sheet:</strong>
            Working capital and operating assumptions drive
            accounts receivable, inventory, accounts payable,
            PP&amp;E and other balance sheet accounts.
          </li>

          <li>
            <strong>Cash Flow Statement:</strong>
            Net income is adjusted for non-cash items,
            working capital movements, investing activities
            and financing activities to calculate cash flow.
          </li>

        </ul>

        <p>
          Linking the three statements ensures that changes
          in operating assumptions automatically flow through
          profitability, financial position and cash generation.
        </p>

      </div>


      <!-- =====================================================
           FORECASTING
           ===================================================== -->

      <div class="project-info-section">

        <h3>5-Year Financial Forecast</h3>

        <p>
          The model uses operating assumptions to forecast
          financial performance from 2026 through 2030.
        </p>

        <ul class="project-feature-list">

          <li>Forecasts revenue using annual growth assumptions.</li>

          <li>Forecasts COGS as a percentage of revenue.</li>

          <li>Forecasts operating expenses based on revenue.</li>

          <li>Calculates EBITDA and operating profitability.</li>

          <li>Forecasts depreciation and capital expenditure.</li>

          <li>
            Models working capital requirements using
            operating assumptions.
          </li>

          <li>Forecasts net income and cash generation.</li>

        </ul>

      </div>


      <!-- =====================================================
           SUPPORTING SCHEDULES
           ===================================================== -->

      <div class="project-info-section">

        <h3>Supporting Schedules</h3>

        <p>
          Supporting schedules connect the operating
          assumptions to the three financial statements
          and improve transparency of the forecast.
        </p>

        <ul class="project-feature-list">

          <li>Accounts Receivable forecasting using DSO.</li>

          <li>
            Inventory forecasting based on operating assumptions.
          </li>

          <li>
            Accounts Payable and working capital modelling.
          </li>

          <li>PP&amp;E and depreciation forecasting.</li>

          <li>Capital expenditure forecasting.</li>

          <li>Debt and financing schedule integration.</li>

        </ul>

      </div>


      <!-- =====================================================
           DCF VALUATION
           ===================================================== -->

      <div class="project-info-section">

        <h3>DCF Valuation</h3>

        <p>
          The Discounted Cash Flow valuation estimates the
          intrinsic value of the business using forecast
          Free Cash Flow to Firm (FCFF).
        </p>

        <p>
          FCFF is calculated using operating profit after tax,
          depreciation, capital expenditure and changes in
          net working capital.
        </p>

        <ul class="project-feature-list">

          <li>Calculates EBIT from the operating forecast.</li>

          <li>
            Calculates NOPAT after applying the forecast tax rate.
          </li>

          <li>Adds back non-cash depreciation expense.</li>

          <li>Incorporates forecast capital expenditure.</li>

          <li>Incorporates changes in net working capital.</li>

          <li>
            Calculates Free Cash Flow to Firm (FCFF)
            for 2026–2030.
          </li>

          <li>
            Discounts forecast FCFF using the Weighted
            Average Cost of Capital (WACC).
          </li>

          <li>
            Calculates Terminal Value using a perpetual
            growth methodology.
          </li>

          <li>
            Calculates Enterprise Value from the present
            value of forecast cash flows and Terminal Value.
          </li>

          <li>
            Converts Enterprise Value into implied
            equity value and value per share.
          </li>

        </ul>

      </div>


      <!-- =====================================================
           VALUATION FRAMEWORK
           ===================================================== -->

      <div class="project-info-section">

        <h3>Valuation Framework</h3>

        <p>
          The model follows a Free Cash Flow to Firm
          valuation approach:
        </p>

        <div class="formula-box">

          <strong>FCFF =</strong>
          NOPAT + D&amp;A − CapEx − Change in Net Working Capital

        </div>

        <div class="formula-box">

          <strong>Terminal Value =</strong>
          Final Year FCFF × (1 + Terminal Growth Rate)
          ÷ (WACC − Terminal Growth Rate)

        </div>

        <p>
          Forecast FCFF and Terminal Value are discounted
          to present value using WACC to calculate the
          Enterprise Value of the business.
        </p>

      </div>


      <!-- =====================================================
           SENSITIVITY ANALYSIS
           ===================================================== -->

      <div class="project-info-section">

        <h3>DCF Sensitivity Analysis</h3>

        <p>
          Because DCF valuation is highly dependent on
          valuation assumptions, the model includes a
          sensitivity analysis to evaluate how implied
          value per share changes under different assumptions.
        </p>

        <p>
          The sensitivity table tests multiple combinations
          of <strong>WACC</strong> and
          <strong>Terminal Growth Rate</strong>, providing
          a range of potential valuation outcomes rather
          than relying on a single valuation assumption.
        </p>

        <ul class="project-feature-list">

          <li>Tests multiple WACC assumptions.</li>

          <li>Tests multiple terminal growth rates.</li>

          <li>
            Calculates implied value per share for each
            assumption combination.
          </li>

          <li>
            Demonstrates the sensitivity of DCF valuation
            to changes in key assumptions.
          </li>

        </ul>

      </div>


      <!-- =====================================================
           SKILLS
           ===================================================== -->

      <div class="project-info-section">

        <h3>Skills Demonstrated</h3>

        <div class="sql-skills-grid">

          <span>Financial Modelling</span>
          <span>3-Statement Modelling</span>
          <span>Financial Forecasting</span>
          <span>Income Statement</span>
          <span>Balance Sheet</span>
          <span>Cash Flow Statement</span>
          <span>Revenue Forecasting</span>
          <span>Working Capital</span>
          <span>Supporting Schedules</span>
          <span>PP&amp;E Forecasting</span>
          <span>CapEx Forecasting</span>
          <span>Free Cash Flow</span>
          <span>FCFF</span>
          <span>DCF Valuation</span>
          <span>WACC</span>
          <span>Terminal Value</span>
          <span>Enterprise Value</span>
          <span>Sensitivity Analysis</span>
          <span>Excel</span>

        </div>

      </div>


      <!-- =====================================================
           DOWNLOAD
           ===================================================== -->

      <div class="project-info-section">

        <h3>Download Financial Model</h3>

        <p>
          The complete Excel workbook includes historical
          financial data, forecast assumptions, revenue build,
          integrated financial statements, supporting schedules,
          DCF valuation, sensitivity analysis and financial
          dashboard.
        </p>

        <p>
          All financial data used in this project is fictional
          and has been created for portfolio and learning purposes.
        </p>

        <div class="dashboard-action-buttons">

          <a
            href="./financial-model/Integrated 3 Statement & DCF Valuation.xlsx"
            download
            class="portfolio-download-btn">

            ↓ Download 3 Statement &amp; DCF Model

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
