#!/bin/python3
from kaggle.api.kaggle_api_extended import KaggleApi
from zipfile import ZipFile
import pandas as pd
import os

# Constants
DATASET = "danialh/flight-delays-new"

def download_dataset(
    api: KaggleApi,
    file_name: str,
    dataset: str = DATASET,
    path: str = os.getcwd() + "/temp"
) -> None:
    """Downloads dataset from Kaggle and extracts the file"""
    print("Internal -- Started Downloading")
    api.dataset_download_file(
        dataset = dataset, 
        file_name = file_name, 
        path = path,
        quiet = False
    )
    print("Internal -- Finished downloading")

    zf = ZipFile(f"{path}/{file_name}.zip")
    zf.extractall(path)
    zf.close()


def delete_dataset(
    file_name: str
) -> None:
    """Delete downloaded file"""
    try:
        os.remove(os.getcwd() + f"/temp/{file_name}") # Delete the file
        os.remove(os.getcwd() + f"/temp/{file_name}.zip") # Delete the zip
    except:
        print("File not deleted")


def read_dataset(
    file_name: str
) -> pd.DataFrame:
    """Read dataframe and remove unecessary columns"""
    data = pd.read_csv(f"temp/{file_name}", sep = "|")
    data = data.iloc[:,:-45]
    return data


def create_base_tables() -> None:
    """Creates the following tables: 1) Airport 2) State 3) Airline 4) Date"""
    # FlightDate Table
    date_table = pd.DataFrame(columns = ["TakeOffDate", "DayOfWeek", "Quarter"])
    date_table["TakeOffDate"] = pd.date_range(start = "1/1/2010", end = "12/31/2020")
    date_table["DayOfWeek"] = date_table["TakeOffDate"].dt.weekday
    date_table["Quarter"] = date_table["TakeOffDate"].dt.quarter

    # State Table
    state_table = pd.read_csv("raw_files/L_STATE_ABR_AVIATION.csv").rename(
        columns={ "Code": "StateCode", "Description": "Name" }).dropna()

    # Airline Table
    airline_table = pd.read_csv("raw_files/L_UNIQUE_CARRIERS.csv").rename(
        columns={ "Code": "CarrierCode", "Description": "Name" }).dropna()

    # Airport Table
    airport_table = pd.read_csv("raw_files/L_AIRPORT_ID.csv").rename(
        columns={ "Code": "AirportCode", "Description": "Name" }).dropna()

    airport_table["StateCode"] = airport_table["Name"].apply(lambda x: x.split(":")[0][-2:])

    airport_table = airport_table.merge( 
        state_table, how = "inner", on = "StateCode", suffixes = ("", "_r")
        )[["AirportCode", "Name", "StateCode"]]

    date_table.to_csv("processed_files/FlightDate.csv", index = False)
    state_table.to_csv("processed_files/State.csv", index = False)
    airport_table.to_csv("processed_files/Airport.csv", index = False)
    airline_table.to_csv("processed_files/Airline.csv", index = False)


def create_flight_table(
    data: pd.DataFrame,
    id_incrementer: int
) -> pd.DataFrame:
    """Creates the flight tables"""
    COLUMNS = [
        "FL_DATE", "OP_UNIQUE_CARRIER", "ORIGIN_AIRPORT_ID", "DEST_AIRPORT_ID",
        "CANCELLED", "DIVERTED", "AIR_TIME", "DISTANCE", 
        "CARRIER_DELAY", "WEATHER_DELAY", "NAS_DELAY",
        "SECURITY_DELAY", "LATE_AIRCRAFT_DELAY"
    ]

    flight_table = data[COLUMNS].rename(
        columns = {
            "FL_DATE": "FlightDate", 
            "OP_UNIQUE_CARRIER": "CarrierCode", 
            "ORIGIN_AIRPORT_ID": "DepartingAirportCode", 
            "DEST_AIRPORT_ID": "ArrivingAirportCode",
            "CANCELLED": "Cancelled", 
            "DIVERTED": "Diverted", 
            "AIR_TIME": "AirTime", 
            "DISTANCE": "Distance", 
            "CARRIER_DELAY": "CarrierDelay", 
            "WEATHER_DELAY": "WeatherDelay", 
            "NAS_DELAY": "NASDelay",
            "SECURITY_DELAY": "SecurityDelay", 
            "LATE_AIRCRAFT_DELAY": "LateAircraftDelay"
        }
    )
    flight_table = flight_table.reset_index().rename(columns = {"index": "FlightID"})
    flight_table["CarrierCode"] = flight_table["CarrierCode"].str.replace("\'", '')
    flight_table["FlightID"] = flight_table["FlightID"] + id_incrementer
    return flight_table


if __name__ == "__main__":
    # Authenticate Kaggle API
    api = KaggleApi()
    api.authenticate()

    FILES = [f"T_ONTIME_REPORTING_{year}.txt" for year in range(2010, 2021)]

    create_base_tables()

    flights = 0

    flight_table = pd.DataFrame(columns=[
        "FlightID", "FlightDate", "CarrierCode", 
        "DepartingAirportCode", "ArrivingAirportCode",
        "Cancelled", "Diverted", "AirTime", "Distance", 
        "CarrierDelay", "WeatherDelay", "NASDelay", 
        "SecurityDelay", "LateAircraftDelay"
        ])

    for file in FILES:
        download_dataset(api, file)
        print("Finished downloading")
        data = read_dataset(file)
        print("Finished reading data")
        new_flight_data = create_flight_table(data, flights)
        print("Made the table")
        flights += len(new_flight_data)
        flight_table = pd.concat([flight_table, new_flight_data])
        delete_dataset(file)
        print(f"Processed: {file}")

    flight_table.to_csv("processed_files/Flight.csv", index = False)
