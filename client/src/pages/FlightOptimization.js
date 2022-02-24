import React from "react";
import { Navbar } from "../components/Navbar";
import { ReactComponent as Info } from "../icons/info.svg";
import { ReactComponent as Search } from "../icons/search.svg";
import { TrendLineChart } from "../components/TrendLineChart";

export const FlightOption = ({
  rank,
  airline,
  lateAircraftDelay,
  weatherDelay,
  securityDelay,
  totalDelay,
}) => {
  return (
    <div className="border-solid border-[0.1px] border-gray-300 rounded-md p-2 flex flex-row justify-between hover:shadow-md w-full h-56">
      <div className="flex flex-col w-1/2 p-2">
        <h1 className="text-gray-800 text-lg font-semibold">
          {rank}. {airline}
        </h1>
        <ul className="text-gray-500">
          <li>- Late Aircraft Delay: {lateAircraftDelay} min.</li>
          <li>- Weather Delay: {weatherDelay} min.</li>
          <li>- Security Delay: {securityDelay} min.</li>
          <li>- Total Delay: {totalDelay} hr.</li>
        </ul>
      </div>
      <TrendLineChart strokeWidth={1} />
    </div>
  );
};

export const FlightOptimization = () => {
  const sortingParams = [
    "Late Aircraft Delay",
    "Weather Delay",
    "NAS Delay Delay",
    "Security Delay",
    "Carrier Delay",
  ];

  return (
    <>
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
              <FlightOption
                rank={1}
                airline={"Jet Blue Airline"}
                lateAircraftDelay={"26"}
                weatherDelay={"14"}
                securityDelay={"20"}
                totalDelay={"1"}
              />
              <FlightOption
                rank={2}
                airline={"Southwest Airlines"}
                lateAircraftDelay={"26"}
                weatherDelay={"14"}
                securityDelay={"20"}
                totalDelay={"1"}
              />
            </div>
          </div>
          <div className="col-span-1 border-l border-1 pr-2 pl-3">
            <div className="inline-flex min-w-full items-center">
              <input
                className="border-b border-1 text-gray-500 flex-grow focus:outline-none focus:border-gray-500 focus:border-b-2 p-1"
                placeholder="Your city"
              />
              <Search className="w-4 h-4 stroke-gray-500" />
            </div>
            <input
              className="border-b border-1 min-w-full text-gray-500 text-right pt-2 focus:outline-none focus:border-gray-500 focus:border-b-2 p-1"
              placeholder="Radius mi."
            />
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
            {sortingParams.map((param, i) => {
              return (
                <div className="flex flex-row gap-2 items-center mt-2" key={i}>
                  <input type="checkbox" className="w-4 h-4" />
                  <h1 className="text-lg">{param}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
