
/* ============================================================
   FP&A PORTFOLIO ANALYTICS
   Project: Budget, Actuals & Forecast Analysis
   Database: fpna_portfolio
   Table: consolidated

   Business Objective:
   Analyze financial performance across cost centres,
   departments and expense categories using Budget, Actual
   and Forecast data.

   Key FP&A Questions:
   1. What is the overall budget vs actual performance?
   2. Which cost centres are over or under budget?
   3. Which expense categories are driving unfavorable variance?
   4. How is spending changing month-over-month and quarter-over-quarter?
   5. Where are the major forecast risks?
   6. Which expense groups contribute most to total spend?
   7. Which areas require management attention?

   Note:
   Forecast risk thresholds of 5% and 10% are illustrative
   analytical assumptions and can be adjusted based on
   management tolerance.
   ============================================================ */


USE fpna_portfolio;


/* ============================================================
   01. DATA VALIDATION
   ============================================================ */

-- Check sample records and confirm the table structure/data
SELECT *
FROM consolidated
LIMIT 10;


-- Check total number of records available for analysis
SELECT
    COUNT(*) AS total_records
FROM consolidated;


/* ============================================================
   02. EXECUTIVE KPI SUMMARY
   ============================================================

   Purpose:
   Provides a high-level view of Budget, Actual and Forecast
   performance for management reporting.
   ============================================================ */

SELECT
    SUM(budget_amount) AS total_budget,

    SUM(actual_amount) AS total_actual,

    SUM(forecast_amount) AS total_forecast,

    -- Actual spend variance against budget
    SUM(actual_amount) - SUM(budget_amount)
        AS actual_variance,

    -- Forecast variance against budget
    SUM(forecast_amount) - SUM(budget_amount)
        AS forecast_variance,

    -- Actual variance as % of budget
    ROUND(
        (
            SUM(actual_amount) - SUM(budget_amount)
        )
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS actual_variance_pct,

    -- Forecast variance as % of budget
    ROUND(
        (
            SUM(forecast_amount) - SUM(budget_amount)
        )
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS forecast_variance_pct

FROM consolidated;


/* ============================================================
   03. COST CENTRE BUDGET PERFORMANCE
   ============================================================

   Purpose:
   Identify cost centres with the largest favorable and
   unfavorable budget variances.

   Positive variance = Actual spend above Budget
   Negative variance = Actual spend below Budget
   ============================================================ */

SELECT
    cost_center_id,
    cost_center,

    SUM(budget_amount) AS budget,

    SUM(actual_amount) AS actual,

    SUM(actual_amount)
        - SUM(budget_amount) AS variance,

    ROUND(
        (
            SUM(actual_amount)
            - SUM(budget_amount)
        )
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS variance_pct,

    CASE
        WHEN SUM(actual_amount) > SUM(budget_amount)
            THEN 'Over Budget'

        WHEN SUM(actual_amount) < SUM(budget_amount)
            THEN 'Under Budget'

        ELSE 'On Budget'
    END AS budget_status

FROM consolidated

GROUP BY
    cost_center_id,
    cost_center

ORDER BY
    variance DESC;


/* ============================================================
   04. EXPENSE CATEGORIES ABOVE BUDGET
   ============================================================

   Purpose:
   Identify expense categories where actual spending exceeded
   the approved budget.

   This helps FP&A teams focus variance analysis on the major
   unfavorable spending areas.
   ============================================================ */

SELECT
    expense_category,

    SUM(budget_amount) AS budget,

    SUM(actual_amount) AS actual,

    SUM(actual_amount)
        - SUM(budget_amount) AS unfavorable_variance,

    ROUND(
        (
            SUM(actual_amount)
            - SUM(budget_amount)
        )
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS variance_pct

FROM consolidated

GROUP BY
    expense_category

HAVING
    SUM(actual_amount) > SUM(budget_amount)

ORDER BY
    unfavorable_variance DESC;


/* ============================================================
   05. MONTH-OVER-MONTH ACTUAL SPEND TREND
   ============================================================

   Purpose:
   Track monthly changes in actual spending and identify
   periods with significant increases or decreases.
   ============================================================ */

WITH monthly_spend AS (

    SELECT
        fiscal_year,
        fiscal_month,

        SUM(actual_amount) AS actual_spend

    FROM consolidated

    GROUP BY
        fiscal_year,
        fiscal_month
)

SELECT
    fiscal_year,
    fiscal_month,

    actual_spend,

    -- Previous month's actual spend
    LAG(actual_spend) OVER (
        ORDER BY fiscal_year, fiscal_month
    ) AS previous_month_spend,

    -- Absolute month-over-month change
    actual_spend
        - LAG(actual_spend) OVER (
            ORDER BY fiscal_year, fiscal_month
        ) AS mom_change,

    -- Percentage month-over-month change
    ROUND(
        (
            actual_spend
            - LAG(actual_spend) OVER (
                ORDER BY fiscal_year, fiscal_month
            )
        )
        / NULLIF(
            LAG(actual_spend) OVER (
                ORDER BY fiscal_year, fiscal_month
            ),
            0
        ) * 100,
        2
    ) AS mom_change_pct

FROM monthly_spend

ORDER BY
    fiscal_year,
    fiscal_month;


/* ============================================================
   06. QUARTER-OVER-QUARTER ACTUAL SPEND TREND
   ============================================================

   Purpose:
   Analyze quarterly spending patterns and identify significant
   changes in business expenditure.
   ============================================================ */

WITH quarterly_spend AS (

    SELECT
        fiscal_year,
        fiscal_quarter,

        SUM(actual_amount) AS actual_spend

    FROM consolidated

    GROUP BY
        fiscal_year,
        fiscal_quarter
)

SELECT
    fiscal_year,
    fiscal_quarter,

    actual_spend,

    -- Previous quarter spending
    LAG(actual_spend) OVER (
        ORDER BY fiscal_year, fiscal_quarter
    ) AS previous_quarter_spend,

    -- Absolute QoQ change
    actual_spend
        - LAG(actual_spend) OVER (
            ORDER BY fiscal_year, fiscal_quarter
        ) AS qoq_change,

    -- Percentage QoQ change
    ROUND(
        (
            actual_spend
            - LAG(actual_spend) OVER (
                ORDER BY fiscal_year, fiscal_quarter
            )
        )
        / NULLIF(
            LAG(actual_spend) OVER (
                ORDER BY fiscal_year, fiscal_quarter
            ),
            0
        ) * 100,
        2
    ) AS qoq_change_pct

FROM quarterly_spend

ORDER BY
    fiscal_year,
    fiscal_quarter;


/* ============================================================
   07. FORECAST VS ANNUAL BUDGET
   ============================================================

   Purpose:
   Compare the annual forecast with the approved budget to
   identify potential year-end overspend or underspend.
   ============================================================ */

SELECT
    fiscal_year,

    SUM(budget_amount) AS annual_budget,

    SUM(forecast_amount) AS annual_forecast,

    SUM(forecast_amount)
        - SUM(budget_amount) AS forecast_variance,

    ROUND(
        (
            SUM(forecast_amount)
            - SUM(budget_amount)
        )
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS forecast_variance_pct

FROM consolidated

GROUP BY
    fiscal_year

ORDER BY
    fiscal_year;


/* ============================================================
   08. DEPARTMENT FORECAST RISK
   ============================================================

   Purpose:
   Identify departments where forecast spending is materially
   above budget.

   Risk Classification:
   >10% above budget  = High Risk
   >5% above budget   = Medium Risk
   <=5% variance      = Low Risk

   These thresholds are illustrative and can be customized.
   ============================================================ */

SELECT
    department,

    SUM(budget_amount) AS budget,

    SUM(forecast_amount) AS forecast,

    SUM(forecast_amount)
        - SUM(budget_amount) AS forecast_variance,

    ROUND(
        (
            SUM(forecast_amount)
            - SUM(budget_amount)
        )
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS forecast_variance_pct,

    CASE
        WHEN SUM(forecast_amount)
             > SUM(budget_amount) * 1.10
            THEN 'High Risk'

        WHEN SUM(forecast_amount)
             > SUM(budget_amount) * 1.05
            THEN 'Medium Risk'

        ELSE 'Low Risk'
    END AS forecast_risk

FROM consolidated

GROUP BY
    department

ORDER BY
    forecast_variance_pct DESC;


/* ============================================================
   09. EXPENSE GROUP SPEND MIX
   ============================================================

   Purpose:
   Understand how total actual spending is distributed across
   major expense groups such as Headcount, Software and Other
   Operating Expenses.

   Spend Share = Expense Group Actual Spend / Total Actual Spend
   ============================================================ */

SELECT
    expense_group,

    SUM(budget_amount) AS budget,

    SUM(actual_amount) AS actual,

    SUM(actual_amount)
        - SUM(budget_amount) AS variance,

    ROUND(
        SUM(actual_amount)
        / NULLIF(
            (
                SELECT SUM(actual_amount)
                FROM consolidated
            ),
            0
        ) * 100,
        2
    ) AS spend_share_pct

FROM consolidated

GROUP BY
    expense_group

ORDER BY
    actual DESC;


/* ============================================================
   10. EXPENSE CATEGORY MANAGEMENT ATTENTION
   ============================================================

   Purpose:
   Flag expense categories that may require management review
   based on actual or forecast variance against budget.

   >10% variance = Management Attention
   >5% variance  = Monitor
   <=5% variance = Normal

   Thresholds are illustrative analytical assumptions.
   ============================================================ */

SELECT
    expense_category,

    SUM(budget_amount) AS budget,

    SUM(actual_amount) AS actual,

    SUM(forecast_amount) AS forecast,

    -- Actual variance
    SUM(actual_amount)
        - SUM(budget_amount) AS actual_variance,

    -- Forecast variance
    SUM(forecast_amount)
        - SUM(budget_amount) AS forecast_variance,

    -- Actual variance percentage
    ROUND(
        (
            SUM(actual_amount)
            - SUM(budget_amount)
        )
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS actual_variance_pct,

    CASE
        WHEN
            SUM(actual_amount)
                > SUM(budget_amount) * 1.10
            OR
            SUM(forecast_amount)
                > SUM(budget_amount) * 1.10
            THEN 'Management Attention'

        WHEN
            SUM(actual_amount)
                > SUM(budget_amount) * 1.05
            OR
            SUM(forecast_amount)
                > SUM(budget_amount) * 1.05
            THEN 'Monitor'

        ELSE 'Normal'
    END AS management_status

FROM consolidated

GROUP BY
    expense_category

ORDER BY
    actual_variance DESC;


/* ============================================================
   11. DATA QUALITY / CATEGORY CHECK
   ============================================================

   Purpose:
   Review available expense groups before using them in
   dashboards or management reports.
   ============================================================ */

SELECT DISTINCT
    expense_group

FROM consolidated

ORDER BY
    expense_group;


/* ============================================================
   END OF FP&A ANALYSIS
   ============================================================

   Key analytical techniques demonstrated:

   - Aggregations using SUM()
   - Variance analysis
   - Variance percentages
   - CASE-based business classification
   - CTEs
   - Window functions
   - LAG() for MoM and QoQ analysis
   - Subqueries
   - NULLIF() for divide-by-zero protection
   - GROUP BY / HAVING
   - Management-oriented risk classification

   ============================================================ */

