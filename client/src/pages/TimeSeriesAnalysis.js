import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { TrendLineChart } from "../components/TrendLineChart";
import { useEffect } from "react";
import { Query5TrendLine } from "../components/Q5TrendLine";
import {Query4TrendLine} from "../components/Q4TrendLine";


export const TimeSeriesAnalysis = () => {


  const [tab, setTab] = useState(0);
  const tabNames = [
    "Flight Delays By Airline",
    "Flight Delay Duration",
    "Flight Delay by Delay Cause",
    "Departing : Arriving Delays",
  ];
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-6xl flex flex-col gap-4 pt-12 p-4">
        <div className="container mx-auto max-w-sm">
          <h1 className="text-center text-4xl text-gray-800 font-semibold pb-2">
            Time Series Analysis
          </h1>
          <h2 className="text-center text-md text-gray-500 font-light">
            Investigating the relationship between various covariates and flight
            delays.
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-0.5 mt-4">
          {tabNames.map((name, i) => {
            return (
              <div
                key={i}
                className={
                  tab === i
                    ? "bg-gray-800 p-2 rounded-sm cursor-pointer"
                    : "bg-gray-600 p-2 rounded-sm cursor-pointer"
                }
                onClick={() => setTab(i)}
              >
                <h1 className="text-white text-center font-semibold">{name}</h1>
              </div>
            );
          })}
        </div>
        <div className="mx-auto border-solid border-[0.1px] border-gray-300 rounded-md p-2 flex flex-col items-center h-96 w-full">
          <h1 className="pb-2 font-semibold text-lg">Trend: {tabNames[tab]}</h1>
          <Query4TrendLine strokeWidth={4}/>
        </div>
        <div className="border-solid border-[0.1px] border-gray-300 rounded-md flex flex-col p-2">
          <h1 className="font-bold text-lg">Analysis</h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            vehicula, magna mollis tincidunt pharetra, ipsum elit finibus
            tortor, et tempor dolor augue eu sapien. Donec id nisl ac purus
            luctus iaculis. Nam ut libero lorem. Aenean augue neque, mattis sed
            est sit amet, sagittis mollis lacus. Etiam vel dictum ex. Etiam
            dictum augue at tellus placerat, sit amet tincidunt magna gravida.
            Ut ornare, arcu in rhoncus tincidunt, lorem sapien lobortis neque,
            et egestas nisl quam a erat. Quisque ante felis, porta nec dui
            blandit, consectetur porta mi. Mauris fermentum laoreet dolor, id
            volutpat tellus luctus a.
          </p>
        </div>
      </div>
    </>
  );
};
