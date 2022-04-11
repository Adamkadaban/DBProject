-- Query 2

-- Used on the Flight Optimization page
-- Finds the airports and airlines in a given location as well as the average delay, by cause, for a given month
-- Replace <state> with the correct state
-- Replace <month> with the correct flight month
-- Replace the order by with the correct order of priority

-- Explanation of query:
-- 1) First the Flight, Airport, State, and Airline tables are combined
-- 2) Next the flights are filtered for those that occurred in a particular month and the delay stats by state, airline are calculated
-- 3) Next the information for a particular airline's total delay over time is joined to this information

WITH all_data AS (
    SELECT 
        f.TakeOffDate,
        s.Name AS State,
        a.Name AS Airport,
        a.AirportCode,
        aa.Name AS Airline,
        aa.CarrierCode,
        f.CarrierDelay,
        f.WeatherDelay,
        f.NASDelay,
        f.SecurityDelay,
        f.LateAircraftDelay,
        (COALESCE(f.CarrierDelay, 0) + 
         COALESCE(f.WeatherDelay, 0) + 
         COALESCE(f.NASDelay, 0) + 
         COALESCE(f.SecurityDelay, 0) + 
         COALESCE(f.LateAirCraftDelay, 0)) AS TotalDelay
    FROM Flight f
    LEFT JOIN Airport a ON f.DepartingAirportCode = a.AirportCode
    LEFT JOIN State s On a.StateCode = s.StateCode
    LEFT JOIN Airline aa ON f.CarrierCode = aa.CarrierCode
    WHERE s.Name = '<state>'
), all_data_filtered AS (
    SELECT 
        ad.Airport,
        ad.Airline,
        AVG(ad.CarrierDelay) AS CarrierDelay,
        AVG(ad.WeatherDelay) AS WeatherDelay,
        AVG(ad.NASDelay) AS NASDelay,
        AVG(ad.SecurityDelay) AS SecurityDelay,
        AVG(ad.LateAircraftDelay) AS LateAircraftDelay
    FROM all_data ad
    WHERE EXTRACT(MONTH FROM ad.TakeOffDate) = <month>
    GROUP BY ad.AirportCode, ad.Airport, ad.CarrierCode, ad.Airline
)

SELECT
    adf.*,
    tmp.FlightMonth,
    tmp.AvgTotalDelay
FROM all_data_filtered adf
RIGHT JOIN (
    SELECT
        Airport, 
        Airline,
        EXTRACT(MONTH FROM TakeOffDate) AS FlightMonth,
        AVG(TotalDelay) AS AvgTotalDelay
    FROM all_data
    GROUP BY Airport, Airline, EXTRACT(MONTH FROM TakeOffDate)
) tmp ON adf.Airport = tmp.Airport AND adf.Airline = tmp.Airline
WHERE adf.Airport IS NOT NULL AND adf.Airline IS NOT NULL
ORDER BY <sort1> , <sort2> , <sort3> , <sort4> , <sort5> , adf.Airport, adf.Airline, tmp.FlightMonth;
