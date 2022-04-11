-- Query 7

-- Used on the home page
-- Gets the number of tuples in the database

SELECT 
    COUNT(*) + 
    (SELECT COUNT(*) FROM Airport)  + 
    (SELECT COUNT(*) FROM Flight) + 
    (SELECT COUNT(*) FROM FlightDate) + 
    (SELECT COUNT(*) FROM State) row_count
FROM Airline
GROUP BY 1;