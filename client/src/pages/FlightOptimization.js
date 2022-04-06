import React, { useState } from "react";
import { states } from "../utils/constants";
import { Navbar } from "../components/Navbar";
import { arrayMove } from "react-sortable-hoc";
import { ReactComponent as Info } from "../icons/info.svg";
import { ReactComponent as Search } from "../icons/search.svg";
import { TrendLineChart } from "../components/TrendLineChart";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { formatData, getCities, getMonth } from "../utils/helpers";

const SortableItem = SortableElement(({ value }) => (
  <li className="bg-gray-50 p-2 mb-1 text-gray-600">{value}</li>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export const FlightOption = ({
  rank,
  airline,
  airport,
  city,
  lateAircraftDelay,
  weatherDelay,
  securityDelay,
  nasDelay,
  carrierDelay,
  totalDelay,
  delays,
}) => {
  const month = getMonth();
  return (
    <div className="border-solid border-[0.1px] border-gray-300 rounded-md p-2 flex flex-row justify-between items-center hover:shadow-md w-full h-fit">
      <div className="flex flex-col w-1/2 pl-4 p-1">
        <div className="text-gray-800 text-lg font-semibold pb-2">
          {rank}. {airline}
        </div>
        <div className="text-gray-800 text-sm">
          {airport} - {city}
        </div>
        <div className="pt-2 underline">Average Stats for {month}</div>
        <ul className="text-gray-500">
          <li>- Late Aircraft Delay: {lateAircraftDelay} min.</li>
          <li>- Weather Delay: {weatherDelay} min.</li>
          <li>- Security Delay: {securityDelay} min.</li>
          <li>- NAS Delay: {nasDelay} min.</li>
          <li>- Carrier Delay: {carrierDelay} min.</li>
          <li>- Total Delay: {totalDelay} min.</li>
        </ul>
      </div>
      <TrendLineChart
        strokeWidth={2}
        data={delays}
        xkey={"Month"}
        ykeys={["TotalDelay"]}
      />
    </div>
  );
};

export const FlightOptimization = () => {
  const [data, setData] = useState({});
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [placeholder, setPlaceholder] = useState("Select a state to find data");

  const [sortingParams, setSortingParams] = useState([
    "Late Aircraft Delay",
    "Weather Delay",
    "NAS Delay Delay",
    "Security Delay",
    "Carrier Delay",
  ]);

  const getData = async (state) => {
    setData({});
    setCity("");
    setCities([]);
    setPlaceholder("Loading...");

    const month = new Date().getUTCMonth() + 1;

    const resp = await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ queryType: 2, state: state, month: month }),
    });

    const json = await resp.json();
    const data = formatData(json, month);
    const cities = getCities(data);

    setCities(cities);
    setData(data);
  };

  const filterData = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value.City === city || city == ""
      )
    );
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSortingParams(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="container mx-auto max-w-6xl flex flex-col gap-4 pt-12 p-4">
        <div className="container mx-auto max-w-sm">
          <h1 className="text-center text-4xl text-gray-800 font-semibold pb-2">
            Flight Optimization
          </h1>
          <h2 className="text-center text-md text-gray-500 font-light">
            Discover and plan your next flight by viewing historical flight
            delays for each airline.
          </h2>
        </div>
        <div className="grid grid-cols-3 pt-4">
          <div className="col-span-2 pr-8 pl-2">
            <div className="bg-indigo-500 rounded-md p-2 inline-flex">
              <Info className="w-7 h-7 stroke-gray-50" />
              <p className="text-gray-100 pl-2">
                We used official US flight data from the Bureau of
                Transportation Statistics to show you the best average airports
                and airlines based on your preferences.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row pt-4 justify-between">
                <h1 className="font-bold text-2xl text-gray-800">Rankings</h1>
                <h1 className="font-bold text-2xl text-gray-800">
                  Average Delay Graph
                </h1>
              </div>
              {Object.keys(data).length === 0 ? (
                <div className="bg-gray-50 h-60 flex flex-col items-center justify-center rounded-md">
                  <h1 className="text-2xl text-gray-600">{placeholder}</h1>
                </div>
              ) : (
                <>
                  {Object.keys(filterData(data))
                    .slice(0, 10)
                    .map((d, i) => (
                      <FlightOption
                        key={i}
                        rank={i + 1}
                        airline={data[d].Airline}
                        airport={data[d].Airport}
                        city={data[d].City}
                        lateAircraftDelay={data[d].LateAircraftDelayThisMonth}
                        weatherDelay={data[d].WeatherDelayThisMonth}
                        securityDelay={data[d].SecurityDelayThisMonth}
                        nasDelay={data[d].NASDelayThisMonth}
                        carrierDelay={data[d].CarrierDelayThisMonth}
                        totalDelay={data[d].TotalDelayThisMonth}
                        delays={data[d].Delays}
                      />
                    ))}
                </>
              )}
            </div>
          </div>
          <div className="col-span-1 border-l border-1 pr-2 pl-3">
            <div className="inline-flex min-w-full items-center">
              <select
                className="border-b border-1 text-gray-500 flex-grow focus:outline-none focus:border-gray-500 focus:border-b-2 p-1 mr-4"
                onChange={(e) =>
                  e.target.value !== "" ? getData(e.target.value) : null
                }
              >
                <option value="">Select a state</option>
                {states.map((s, i) => (
                  <option value={s} key={i}>
                    {s}
                  </option>
                ))}
              </select>
              <Search className="w-4 h-4 stroke-gray-500" />
            </div>
            {cities.length === 0 ? (
              <select
                className="min-w-full border-b border-1 text-gray-500 flex-grow focus:outline-none focus:border-gray-500 focus:border-b-2 p-1 mr-4"
                disabled
              >
                <option value="">Select a city</option>
              </select>
            ) : (
              <select
                className="min-w-full border-b border-1 text-gray-500 flex-grow focus:outline-none focus:border-gray-500 focus:border-b-2 p-1 mr-4"
                onChange={(e) =>
                  e.target.value !== "" ? setCity(e.target.value) : null
                }
              >
                <option value="">Select a city</option>
                {cities.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </select>
            )}
            <div className="bg-indigo-600 rounded-md p-2 inline-flex mt-4">
              <Info className="w-7 h-7 stroke-gray-50" />
              <p className="text-gray-100 pl-2">
                Select the delay types you want to filter by and sort them by
                priority.
              </p>
            </div>
            <h1 className="text-xl text-gray-800 font-bold mt-4">
              Sorting by lowest
            </h1>
            <SortableList items={sortingParams} onSortEnd={onSortEnd} />
          </div>
        </div>
      </div>
    </div>
  );
};
