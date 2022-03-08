-- Script to create tables

CREATE TABLE State
(StateCode VARCHAR2(10) PRIMARY KEY,
Name VARCHAR2(50) UNIQUE NOT NULL);

CREATE TABLE Airline
(CarrierCode VARCHAR2(10) PRIMARY KEY,
Name VARCHAR2(200) UNIQUE NOT NULL);

CREATE TABLE FlightDate
(TakeOffDate DATE PRIMARY KEY,
DayOfWeek INTEGER NOT NULL,
Quarter INTEGER NOT NULL); 

CREATE TABLE Airport
(AirportCode INTEGER PRIMARY KEY,
Name VARCHAR2(200) NOT NULL,
StateCode VARCHAR2(10) NOT NULL,
FOREIGN KEY (StateCode) REFERENCES State (StateCode));

CREATE TABLE Flight
(FlightID INTEGER PRIMARY KEY,
ArrivingAirportCode INTEGER NOT NULL,
DepartingAirportCode INTEGER NOT NULL,
CarrierCode VARCHAR2(10) NOT NULL,
TakeOffDate DATE NOT NULL,
Canceled INTEGER,
Diverted INTEGER,
AirTime INTEGER,
Distance INTEGER,
CarrierDelay INTEGER,
WeatherDelay INTEGER,
NASDelay INTEGER,
SecurityDelay INTEGER,
LateAircraftDelay INTEGER,
FOREIGN KEY (ArrivingAirportCode) REFERENCES Airport(AirportCode),
FOREIGN KEY (DepartingAirportCode) REFERENCES Airport(AirportCode),
FOREIGN KEY (CarrierCode) REFERENCES Airline(CarrierCode),
FOREIGN KEY (TakeOffDate) REFERENCES FlightDate(TakeOffDate));