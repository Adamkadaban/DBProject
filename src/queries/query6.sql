-- Query 6
-- Used on the Time Series Analysis Page: Departing to Arriving Delays
-- Finds the ratio of the number of departing delays to arriving delays for the top 10 most busy airports by year

WITH Arriving_Flights AS (
    SELECT
        a.AirportCode,
        COUNT(f.FlightId) AS Flights
    FROM Flight f
    LEFT JOIN Airport a ON f.ArrivingAirportCode = a.AirportCode
    GROUP BY a.AirportCode
), Arriving_Delays AS (
    SELECT
        a.AirportCode,
        a.Name,
        EXTRACT(YEAR FROM f.TakeOffDate) AS FlightYear,
        COUNT(f.FlightId) AS Flights
    FROM Flight f
    LEFT JOIN Airport a ON f.ArrivingAirportCode = a.AirportCode
    WHERE (f.CarrierDelay + f.WeatherDelay + f.NASDelay + 
         f.SecurityDelay + f.LateAircraftDelay) IS NOT NULL
    GROUP BY a.AirportCode, a.Name, EXTRACT(YEAR FROM f.TakeOffDate)
),Departing_Flights AS (
    SELECT
        a.AirportCode,
        COUNT(f.FlightId) AS Flights
    FROM Flight f
    LEFT JOIN Airport a ON f.DepartingAirportCode = a.AirportCode
    GROUP BY a.AirportCode
), Departing_Delays AS (
    SELECT
        a.AirportCode,
        a.Name,
        EXTRACT(YEAR FROM f.TakeOffDate) AS FlightYear,
        COUNT(f.FlightId) AS Flights
    FROM Flight f
    LEFT JOIN Airport a ON f.DepartingAirportCode = a.AirportCode
    WHERE (f.CarrierDelay + f.WeatherDelay + f.NASDelay + 
         f.SecurityDelay + f.LateAircraftDelay) IS NOT NULL
    GROUP BY a.AirportCode, a.Name, EXTRACT(YEAR FROM f.TakeOffDate)
), Top_10_Busiest_Airports AS (
    SELECT AirportCode
    FROM (
        SELECT 
            af.AirportCode,
            af.Flights + df.Flights
        FROM Arriving_Flights af
        JOIN Departing_Flights df ON af.AirportCode = df.AirportCode 
        ORDER BY 2 DESC
    )
    WHERE ROWNUM <= 10
)

SELECT 
    a.AirportCode,
    a.Name,
    a.FlightYear,
    ROUND(d.Flights / a.Flights, 4) AS Departing_Delays_To_Arriving_Delays
FROM Arriving_Delays a
JOIN Departing_Delays d ON a.AirportCode = d.AirportCode AND a.FlightYear = d.FlightYear
WHERE a.AirportCode IN (SELECT * FROM Top_10_Busiest_Airports)
ORDER BY 3, 1;