import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { TrendLineChart } from "../components/TrendLineChart";
import { useEffect } from "react";
import { Query5TrendLine } from "../components/Q5TrendLine";
import {Query4TrendLine} from "../components/Q4TrendLine";
import {Query3TrendLine} from "../components/Q3TrendLine";
import {Query6TrendLine} from "../components/Q6TrendLine";


export const TimeSeriesAnalysis = () => {


  const [tab, setTab] = useState(0);
  const tabNames = [
    "Flight Delays By Airline",
    "Flight Delay Duration",
    "Flight Delay by Delay Cause",
    "Departing : Arriving Delays",
  ];

  const analysis = ['This trend aims to answer the question: How many domestic flight delays did each airline have from 2010 until 2020? We wanted to develop an understanding of which airlines are the most reliable and have proven over time to have on-time flights. The interesting trends to note here are that regional carriers such as Alaskan Airlines and Envoy Air tend to have fewer delays than more trans-American carriers such as Southwest and American. In addition, the outlier, Southwest Airlines, has had a history of technical issues and nationwide outages in its backend systems which has led to a much higher number of delays versus its peers. ',
    'This trend aims to provide a holistic answer to whether flight delays have increased or decreased over the past decade. Looking at the data, it is clear that nearly every data metric has progressively increased, highlighting that increased air travel has not been effectively combatted by advances in airline and airport technologies. However, it is interesting to note the slight dip in delay times in 2020, which corresponds to diminished air travel in the US due to COVID-19.',
    'This trend aims to find the total number of flight delay minutes that can be attributed to each flight delay cause for each year from 2010 to 2020. The keys points are the outliers in the data for 2015 and 2020, along with the large gap between NAS (Preventable) and Late Aircraft Delays versus Security and Weather-Related Delays. The outliers in 2015 were due to an FAA software update glitch and 2020 was due to reduced traffic from COVD-19. The difference between the various delays shows us that the vast majority of the delays are preventable.',
    'This additional trend aims to find which airports are most efficient in mitigating arriving versus departing delays. We see some airports, such as Charlotte Douglas, have consistently more departing delays than arriving delays, highlighting airstrip crowding and boarding issues along with its use as a connecting airport. Other airports, such as San Francisco, have much more arriving delays because they serve mostly as the final destination for visitors, not as hubs for connecting flights. ']
  
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
          {tabNames[tab] == 'Flight Delays By Airline' && <Query3TrendLine strokeWidth={4}/>}
          {tabNames[tab] == 'Flight Delay Duration' && <Query4TrendLine strokeWidth={4}/>}
          {tabNames[tab] == 'Flight Delay by Delay Cause' && <Query5TrendLine strokeWidth={4}/>}
          {tabNames[tab] == 'Departing : Arriving Delays' && <Query6TrendLine strokeWidth={4}/>}
          
        </div>
        <div className="border-solid border-[0.1px] border-gray-300 rounded-md flex flex-col p-2">
          <h1 className="font-bold text-lg">Analysis</h1>
          <p className="text-gray-500">
            {analysis[tab]}
          </p>
        </div>
      </div>
    </>
  );
};
