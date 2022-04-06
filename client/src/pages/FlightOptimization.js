import React, { useState } from "react";
import { states } from "../utils/constants";
import { Navbar } from "../components/Navbar";
import { arrayMove } from "react-sortable-hoc";
import { formatData, getCities } from "../utils/helpers";
import { ReactComponent as Drag } from "../icons/drag.svg";
import { ReactComponent as Info } from "../icons/info.svg";
import { FlightOption } from "../components/FlightOption";
import { ReactComponent as Search } from "../icons/search.svg";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }) => (
  <div className="bg-gray-50 p-2 mb-1 text-gray-600 flex flex-row items-center gap-3 cursor-pointer hover:bg-gray-100">
    <Drag className="w-4 h-4" />
    {value.name}
  </div>
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

export const FlightOptimization = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [placeholder, setPlaceholder] = useState("Select a state to find data");

  const [sortingParams, setSortingParams] = useState([
    { name: "Carrier Delay", id: 3 },
    { name: "Weather Delay", id: 4 },
    { name: "NAS Delay", id: 5 },
    { name: "Security Delay", id: 6 },
    { name: "Late Aircraft Delay", id: 7 },
  ]);

  const getData = async (state) => {
    setData({});
    setCity("");
    setState("");
    setCities([]);
    setPlaceholder("Loading...");

    const month = new Date().getUTCMonth() + 1;

    const resp = await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        queryType: 2,
        state: state,
        month: month,
        sort1: sortingParams[0].id,
        sort2: sortingParams[1].id,
        sort3: sortingParams[2].id,
        sort4: sortingParams[3].id,
        sort5: sortingParams[4].id,
      }),
    });

    const json = await resp.json();
    const data = formatData(json, month);
    const cities = getCities(data);

    setData(data);
    setState(state);
    setCities(cities);
  };

  const filterData = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value.City === city || city == ""
      )
    );
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSortingParams((sortingParams) =>
      arrayMove(sortingParams, oldIndex, newIndex)
    );
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
                className="border-b border-1 text-gray-500 flex-grow focus:outline-none focus:border-gray-500 focus:border-b-2 p-1 mr-4 mb-2"
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
                Choose which delay types you would like to minimize by
                reordering the list.
              </p>
            </div>
            <h1 className="text-xl text-gray-800 font-bold mt-4 mb-2">
              Sorting by lowest
            </h1>
            <SortableList items={sortingParams} onSortEnd={onSortEnd} />
            <div className="w-full flex flex-row items-center justify-center pt-4">
              <button
                className="mx-auto p-2 text-white text-lg bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-semibold"
                onClick={() => {
                  if (state !== "") getData(state);
                }}
              >
                Update Priority
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
