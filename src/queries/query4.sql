-- Query 4

-- Used on the Time Series Analysis Page: Flight Delay Duration
-- Finds the Mean, Median, Min, Max, 25th Percentile, and 75th Percentile of total Flight Delay Duration by year

-- Explanation of query
-- 1) First the data is filtered for flights that were delayed
-- 2) Next the mean, median, min, max, and percentiles are calculated for the total flight delay duration

SELECT
    DISTINCT FlightYear,
    AVG(TotalDelay) OVER(PARTITION BY FlightYear ORDER BY FlightYear) AS MeanTotalDelay,
    MEDIAN(TotalDelay) OVER(PARTITION BY FlightYear) AS MedianTotalDelay,
    MIN(TotalDelay) OVER(PARTITION BY FlightYear) AS MinTotalDelay,
    MAX(TotalDelay) OVER(PARTITION BY FlightYear) AS MaxTotalDelay,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY TotalDelay) OVER(PARTITION BY FlightYear) AS TwentyFifthPercTotalDelay,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY TotalDelay) OVER(PARTITION BY FlightYear) AS SeventyFifthPercTotalDelay
FROM (
    SELECT 
        f.*,
        EXTRACT(YEAR FROM TakeOffDate) AS FlightYear,
        (COALESCE(f.CarrierDelay, 0) + 
         COALESCE(f.WeatherDelay, 0) + 
         COALESCE(f.NASDelay, 0) + 
         COALESCE(f.SecurityDelay, 0) + 
         COALESCE(f.LateAirCraftDelay, 0)) AS TotalDelay
    FROM Flight F
)
WHERE TotalDelay != 0
ORDER BY 1;