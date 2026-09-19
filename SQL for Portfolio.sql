USE fpna_portfolio;

SELECT *
FROM consolidated
LIMIT 10;

SELECT COUNT(*) AS total_records
FROM consolidated;


-- Executive KPI Summary
SELECT
    SUM(budget_amount) AS total_budget,
    SUM(actual_amount) AS total_actual,
    SUM(forecast_amount) AS total_forecast,

    SUM(actual_amount) - SUM(budget_amount)
        AS actual_variance,

    SUM(forecast_amount) - SUM(budget_amount)
        AS forecast_variance,

    ROUND(
        (SUM(actual_amount) - SUM(budget_amount))
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS actual_variance_pct,

    ROUND(
        (SUM(forecast_amount) - SUM(budget_amount))
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS forecast_variance_pct

FROM consolidated;

-- Which Cost Centres Are Over/Under Budget?
SELECT
    cost_center_id,
    cost_center,

    SUM(budget_amount) AS budget,
    SUM(actual_amount) AS actual,

    SUM(actual_amount) - SUM(budget_amount)
        AS variance,

    ROUND(
        (SUM(actual_amount) - SUM(budget_amount))
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

ORDER BY variance DESC;


-- Which Cost Centres Are Over/Under Budget?
SELECT
    expense_category,

    SUM(budget_amount) AS budget,
    SUM(actual_amount) AS actual,

    SUM(actual_amount) - SUM(budget_amount)
        AS unfavorable_variance,

    ROUND(
        (SUM(actual_amount) - SUM(budget_amount))
        / NULLIF(SUM(budget_amount), 0) * 100,
        2
    ) AS variance_pct

FROM consolidated

GROUP BY expense_category

HAVING SUM(actual_amount) > SUM(budget_amount)

ORDER BY unfavorable_variance DESC;

-- MoM Actual Spend Trend
SELECT
    fiscal_year,
    fiscal_month,

    SUM(actual_amount) AS actual_spend,

    LAG(SUM(actual_amount)) OVER (
        ORDER BY fiscal_year, fiscal_month
    ) AS previous_month_spend,

    SUM(actual_amount)
        - LAG(SUM(actual_amount)) OVER (
            ORDER BY fiscal_year, fiscal_month
        ) AS mom_change,

    ROUND(
        (
            SUM(actual_amount)
            - LAG(SUM(actual_amount)) OVER (
                ORDER BY fiscal_year, fiscal_month
            )
        )
        / NULLIF(
            LAG(SUM(actual_amount)) OVER (
                ORDER BY fiscal_year, fiscal_month
            ),
            0
        ) * 100,
        2
    ) AS mom_change_pct

FROM consolidated

GROUP BY
    fiscal_year,
    fiscal_month

ORDER BY
    fiscal_year,
    fiscal_month;
    
    -- QoQ Actual Spend Trend
    SELECT
    fiscal_year,
    fiscal_quarter,

    SUM(actual_amount) AS actual_spend,

    LAG(SUM(actual_amount)) OVER (
        ORDER BY fiscal_year, fiscal_quarter
    ) AS previous_quarter_spend,

    SUM(actual_amount)
        - LAG(SUM(actual_amount)) OVER (
            ORDER BY fiscal_year, fiscal_quarter
        ) AS qoq_change,

    ROUND(
        (
            SUM(actual_amount)
            - LAG(SUM(actual_amount)) OVER (
                ORDER BY fiscal_year, fiscal_quarter
            )
        )
        / NULLIF(
            LAG(SUM(actual_amount)) OVER (
                ORDER BY fiscal_year, fiscal_quarter
            ),
            0
        ) * 100,
        2
    ) AS qoq_change_pct

FROM consolidated

GROUP BY
    fiscal_year,
    fiscal_quarter

ORDER BY
    fiscal_year,
    fiscal_quarter;
    
    
    -- Forecast vs Annual Budget
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

GROUP BY fiscal_year

ORDER BY fiscal_year;


-- Which Departments Have the Highest Forecast Risk?
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

GROUP BY department

ORDER BY forecast_variance_pct DESC;

SELECT DISTINCT
    expense_group
FROM consolidated
ORDER BY expense_group;

SELECT
    expense_group,

    SUM(budget_amount) AS budget,

    SUM(actual_amount) AS actual,

    SUM(actual_amount)
        - SUM(budget_amount) AS variance,

    ROUND(
        SUM(actual_amount)
        / NULLIF(
            (SELECT SUM(actual_amount)
             FROM consolidated),
            0
        ) * 100,
        2
    ) AS spend_share_pct

FROM consolidated

GROUP BY expense_group

ORDER BY actual DESC;

SELECT
    expense_category,

    SUM(budget_amount) AS budget,

    SUM(actual_amount) AS actual,

    SUM(forecast_amount) AS forecast,

    SUM(actual_amount)
        - SUM(budget_amount) AS actual_variance,

    SUM(forecast_amount)
        - SUM(budget_amount) AS forecast_variance,

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

GROUP BY expense_category

ORDER BY actual_variance DESC;

-- Forecast risk is classified using a 5%/10% variance threshold for analytical purposes. These thresholds are illustrative assumptions and can be adjusted according to management tolerance.


-- Headcount vs Software vs Other Opex
SELECT DISTINCT
    expense_group
FROM consolidated
ORDER BY expense_group;

SELECT
    expense_group,

    SUM(budget_amount) AS budget,

    SUM(actual_amount) AS actual,

    SUM(actual_amount)
        - SUM(budget_amount) AS variance,

    ROUND(
        SUM(actual_amount)
        / NULLIF(
            (SELECT SUM(actual_amount)
             FROM consolidated),
            0
        ) * 100,
        2
    ) AS spend_share_pct

FROM consolidated

GROUP BY expense_group

ORDER BY actual DESC;