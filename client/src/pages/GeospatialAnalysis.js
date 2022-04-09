import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { MapChart } from "../components/MapChart";

export const GeospatialAnalysis = () => {
  const [year, setYear] = useState(2015);
  const [flightDirection, setflightDirection] = useState(true)
  const [dataFilter, setdataFilter] = useState(true)
  
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto max-w-6xl flex flex-col gap-4 pt-12 p-4">
        <div className="container mx-auto max-w-sm">
          <h1 className="text-center text-4xl text-gray-800 font-semibold pb-2">
            Geospatial Analysis
          </h1>
          <h2 className="text-center text-md text-gray-500 font-light">
            Analyze and discover how flight delays have changed spatially across
            the United States over time.
          </h2>
        </div>
        <div className="bg-gray-50 border-solid border-[0.1px] border-gray-300 rounded-md flex flex-col items-center pl-1 pr-1 pt-4 pb-4 mt-4">
          <div className="inline-flex items-center gap-1">
            <h1 className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Filter the Map
            </h1>
            <h1 className="text-2xl">🗺️</h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-between pt-4 min-w-full p-2 gap-4">
            <div className="flex flex-row items-center gap-1">
              <h1 className="text-gray-500 font-light">Avg. Delay Time</h1>
              <input
                type="checkbox"
                id="toggle-switch"
                className="cursor-pointer m-1 h-5 w-10 rounded-full appearance-none bg-indigo-100 border-2 border-indigo-500 checked:bg-indigo-300 transition duration-200 relative"
                onChange={(e) => setdataFilter(!dataFilter)}
              />
              <h1 className="text-gray-500 font-light">Number of Delays</h1>
            </div>
            <div className="flex flex-col flex-grow p-2">
              <input
                type="range"
                min={2010}
                max={2020}
                step={1}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-range cursor-pointer"
              />
              <ul class="flex justify-between w-full px-[10px]">
                {[2010, 2012, 2014, 2016, 2018, 2020].map((year, i) => {
                  return (
                    <li class="flex justify-center relative" key={i}>
                      <span class="absolute text-gray-500 font-light">
                        {year}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-row items-center gap-1">
            <h1 className="text-gray-500 font-light">Arriving</h1>
              <input
                type="checkbox"
                id="toggle-switch"
                className="cursor-pointer m-1 h-5 w-10 rounded-full appearance-none bg-indigo-100 border-2 border-indigo-500 checked:bg-indigo-300 transition duration-200 relative"
                onChange={(e) => setflightDirection(!flightDirection)}
              />
              <h1 className="text-gray-500 font-light">Departing</h1>
              
            </div>
          </div>
        </div>
        <div className="border-solid border-[0.1px] border-gray-300 rounded-md flex flex-col items-center p-1">
          <MapChart YEAR = {year} direction = {flightDirection} dataFilter = {dataFilter}/>
        </div>
      </div>
    </div>
  );
};
