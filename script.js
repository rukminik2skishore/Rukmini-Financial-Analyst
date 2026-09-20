/* =====================================================
   NAVIGATION
   ===================================================== */

function showSection(id, clickedLink) {

  // Hide all sections
  document
    .querySelectorAll(".section")
    .forEach(function(section) {
      section.classList.remove("active");
    });

  // Show selected section
  const selectedSection = document.getElementById(id);

  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  // Remove active state from navigation
  document
    .querySelectorAll("nav a")
    .forEach(function(link) {
      link.classList.remove("active");
    });

  // Add active state to clicked navigation
  if (clickedLink) {
    clickedLink.classList.add("active");
  }

  // Scroll to top
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

            <li>Validates the underlying financial dataset before performing analysis.</li>

            <li>Calculates executive-level Budget, Actual and Forecast KPIs.</li>

            <li>Identifies cost centres operating over or under budget.</li>

            <li>Highlights expense categories driving unfavorable budget variance.</li>

            <li>Analyses month-over-month changes in actual spending.</li>

            <li>Analyses quarter-over-quarter spending trends.</li>

            <li>Compares annual forecast against the approved annual budget.</li>

            <li>Identifies departments with potential forecast risk.</li>

            <li>Analyses the contribution of major expense groups to total spending.</li>

            <li>
              Flags expense categories that may require management
              attention based on actual and forecast variance.
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

if (project === "dashboard") {

  content.innerHTML = `

    <div class="portfolio-detail-card">


      <!-- =====================================================
           PROJECT HEADING
           ===================================================== -->

      <h2>Interactive FP&amp;A Performance Dashboard</h2>

      <p class="project-subtitle">

        FP&amp;A Portfolio Project |
        Revenue, Cost &amp; Gross Margin Analysis

      </p>


      <!-- =====================================================
           PROJECT OVERVIEW
           ===================================================== -->

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


      <!-- =====================================================
           WHAT THE DASHBOARD DOES
           ===================================================== -->

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


      <!-- =====================================================
           SKILLS DEMONSTRATED
           ===================================================== -->

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


      <!-- =====================================================
           DATASET
           ===================================================== -->

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


      <!-- =====================================================
           INTERACTIVE DASHBOARD
           ===================================================== -->

      <div class="project-info-section">

        <h3>Interactive Dashboard</h3>

        <p>

          Select <strong>View Dashboard</strong> to explore
          the interactive financial dashboard. Use the
          Business Unit and Client filters to analyse
          financial performance dynamically.

        </p>


        <!-- VIEW DASHBOARD BUTTON -->

        <button
          class="sql-file-btn"
          onclick="toggleDashboard()">

          View Dashboard

        </button>


        <!-- =================================================
             DASHBOARD VIEWER
             ================================================= -->

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

        <p>
          Financial planning and analysis project covering
          budgeting, forecasting, variance analysis and
          management reporting.
        </p>

        <div class="portfolio-preview">

          <p>
            FP&amp;A project analysis and supporting files
            will be displayed here.
          </p>

        </div>

      </div>

    `;

  }


  /* =====================================================
     FINANCIAL MODELLING PROJECT
     ===================================================== */

  else if (project === "model") {

    content.innerHTML = `

      <div class="portfolio-detail-card">

        <h2>Financial Modelling</h2>

        <p>
          Excel-based financial model demonstrating
          forecasting, scenario analysis and structured
          financial planning.
        </p>

        <div class="portfolio-preview">

          <p>
            Financial model screenshots and analysis
            will be displayed here.
          </p>

        </div>

      </div>

    `;

  }


  document
    .getElementById("projects")
    .scrollIntoView({
      behavior: "smooth"
    });
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

    .then(function(response) {

      if (!response.ok) {
        throw new Error(
          "File not found. HTTP status: " + response.status
        );
      }

      return response.text();
    })

    .then(function(sqlCode) {
      codeContent.textContent = sqlCode;
    })

    .catch(function(error) {

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

  const viewer =
    document.getElementById("dashboardViewer");

  if (!viewer) {
    return;
  }

  if (viewer.style.display === "none") {

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

  document
    .getElementById("portfolioProjectDetail")
    .style.display = "none";

  document
    .getElementById("projectsMain")
    .style.display = "block";

  document
    .getElementById("projects")
    .scrollIntoView({
      behavior: "smooth"
    });
}
