-- Query 1

-- Used on the Geospatial Analysis Page
-- Only considers flights that were actually delayed
-- 1) Finds the average delay time and # of delays, by year, for each state where a flight departed from
-- 2) Finds the average delay time and # of delays, by year,  for each state where a flight arrived at

-- Explanation of query:
-- 1) First all the flights that departed from a particular airport are selected
-- 2) Next all the flights that arrived at a particular airport are selected
-- 3) For the departing and arriving flights, the following attributes are queried
--      1) state code
--      2) state name
--      3) flight year
--      4) number of delays 
--      5) average total delay duration
-- 4) Finally the departing flight delay information is combined with the arriving flight delay information


WITH departing_flights AS (
    SELECT f.*, s.*,
        (
            COALESCE(f.CarrierDelay, 0) + 
            COALESCE(f.WeatherDelay, 0) + 
            COALESCE(f.NASDelay, 0) + 
            COALESCE(f.SecurityDelay, 0) + 
            COALESCE(f.LateAirCraftDelay, 0)
       ) AS Total_Delay
    FROM Flight f
    LEFT JOIN Airport a ON f.DepartingAirportCode = a.AirportCode
    LEFT JOIN State s ON a.StateCode = s.StateCode
), arriving_flights AS (
    SELECT f.*, s.*,
        (
            COALESCE(f.CarrierDelay, 0) + 
            COALESCE(f.WeatherDelay, 0) + 
            COALESCE(f.NASDelay, 0) + 
            COALESCE(f.SecurityDelay, 0) + 
            COALESCE(f.LateAirCraftDelay, 0)
        ) AS Total_Delay
    FROM Flight f
    LEFT JOIN Airport a ON f.ArrivingAirportCode = a.AirportCode
    LEFT JOIN State s ON a.StateCode = s.StateCode
), departing_flights_delays AS (
    SELECT 
        StateCode,
        Name,
        EXTRACT(YEAR FROM TakeOffDate) AS FlightYear,
        COUNT(*) AS NUMBER_OF_DELAYS,
        AVG(Total_Delay) AS AVG_DELAY_TIME_MINUTES
    FROM departing_flights
    WHERE Total_Delay != 0
    GROUP BY StateCode, Name, EXTRACT(YEAR FROM TakeOffDate)
), arriving_flights_delays AS (
    SELECT 
        StateCode,
        Name,
        EXTRACT(YEAR FROM TakeOffDate) AS FlightYear,
        COUNT(*) AS NUMBER_OF_DELAYS,
        AVG(Total_Delay) AS AVG_DELAY_TIME_MINUTES
    FROM arriving_flights
    WHERE Total_Delay != 0
    GROUP BY StateCode, Name, EXTRACT(YEAR FROM TakeOffDate)
)

SELECT 
    dfd.StateCode,
    dfd.Name,
    dfd.FlightYear,
    dfd.Number_Of_Delays AS Departing_Flights_Delays_Count,
    ROUND(dfd.Avg_Delay_Time_Minutes, 3) AS Departing_Flights_Average_Delay_Time,
    afd.Number_Of_Delays AS Arriving_Flights_Delays_Count,
    ROUND(afd.Avg_Delay_Time_Minutes, 3) AS Arriving_Flights_Average_Delay_Time
FROM departing_flights_delays dfd
JOIN arriving_flights_delays afd
    ON dfd.StateCode = afd.StateCode AND dfd.FlightYear = afd.FlightYear
ORDER BY 3, 1;