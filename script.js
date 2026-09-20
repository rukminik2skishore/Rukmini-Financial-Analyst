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
     POWER BI PROJECT
     ===================================================== */

  else if (project === "powerbi") {

    content.innerHTML = `

      <div class="portfolio-detail-card">

        <h2>Power BI Financial Dashboard</h2>

        <p>
          Interactive dashboard developed to analyse
          financial performance and communicate key
          management insights.
        </p>

        <div class="portfolio-preview">

          <img
            src="dashboards/powerbi_dashboard.png"
            alt="Power BI Dashboard">

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
