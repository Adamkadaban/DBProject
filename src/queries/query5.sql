-- Query 5
-- Used on the Time Series Analysis Page: Flight Delays by Cause
-- Finds the number of flights that wee delayed, each year, by the different delay causes

SELECT
    EXTRACT(YEAR FROM TakeOffDate) AS FlightYear,
    SUM(
        CASE WHEN CarrierDelay IS NOT NULL AND CarrierDelay != 0 THEN 1 ELSE 0 END
        ) AS CarrierDelayCount,
    SUM(
        CASE WHEN WeatherDelay IS NOT NULL AND WeatherDelay != 0 THEN 1 ELSE 0 END
        ) AS WeatherDelayCount,
    SUM(
        CASE WHEN NASDelay IS NOT NULL AND NASDelay != 0 THEN 1 ELSE 0 END
        ) AS NASDelay,
    SUM(
        CASE WHEN SecurityDelay IS NOT NULL AND SecurityDelay != 0 THEN 1 ELSE 0 END
        ) AS SecurityDelay,
    SUM(
        CASE WHEN LateAircraftDelay IS NOT NULL AND LateAircraftDelay != 0 THEN 1 ELSE 0 END
        ) AS LateAircraftDelay
FROM Flight
GROUP BY EXTRACT(YEAR FROM TakeOffDate)
ORDER BY 1;