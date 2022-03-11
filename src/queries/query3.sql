-- Query 3
-- Used on the Time Series Analysis Page: Flight Delays By Airline
-- Finds the number of delayed flights, by year, for the top 10 airlines with the most flights

WITH Top_10_Most_Popular_Airlines AS (
    SELECT CarrierCode
    FROM (
        SELECT
            a.CarrierCode,
            COUNT(f.FlightId)
        FROM Flight f
        LEFT JOIN Airline a ON f.CarrierCode = a.CarrierCode
        GROUP BY a.CarrierCode
        ORDER BY 2 DESC
    )
    WHERE ROWNUM <= 10
), Top_10_Airlines_Flights AS (
    SELECT 
        a.CarrierCode,
        a.Name,
        f.FlightId,
        EXTRACT(YEAR FROM f.TakeOffDate) AS FlightYear,
        (
            COALESCE(f.CarrierDelay, 0) + 
            COALESCE(f.WeatherDelay, 0) + 
            COALESCE(f.NASDelay, 0) + 
            COALESCE(f.SecurityDelay, 0) + 
            COALESCE(f.LateAirCraftDelay, 0)
        ) AS Total_Delay
    FROM Flight f
    LEFT JOIN Airline a ON f.CarrierCode = a.CarrierCode
    WHERE a.CarrierCode IN (SELECT * FROM Top_10_Most_Popular_Airlines)
)

SELECT
    CarrierCode,
    Name,
    FlightYear,
    COUNT(FlightId) AS Number_Delayed_Flights
FROM Top_10_Airlines_Flights
WHERE Total_Delay != 0
GROUP BY CarrierCode, Name, FlightYear
ORDER BY 2, 1;