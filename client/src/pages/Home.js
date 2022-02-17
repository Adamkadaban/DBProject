import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { ReactComponent as Airplane } from "../icons/plane.svg";
import { ReactComponent as Globe } from "../icons/globe.svg";
import { ReactComponent as Trend } from "../icons/trend.svg";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-6xl flex flex-col gap-4 pt-12 p-4">
        <h1 className="text-4xl text-gray-600 text-center font-semibold">
          Welcome to our Project
        </h1>
        <div className="pt-4">
          <h1 className="text-2xl text-gray-500 pb-2">What we analyzed?</h1>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
            <Link
              className="border-2 border-gray-200 flex flex-col rounded p-4 cursor-pointer ease-out duration-300 hover:shadow-lg"
              to="/"
            >
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-left text-xl text-blue-500">
                  Geospatial Analysis
                </h1>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-1">
                  <Globe className="w-4 stroke-white" />
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-tight pt-2">
                We analyzed how the number of domestic flight delays has changed
                over time across the various airports, cities, and states in the
                U.S.A
              </p>
            </Link>
            <Link
              className="border-2 border-gray-200 flex flex-col rounded p-4 cursor-pointer ease-out duration-300 hover:shadow-lg"
              to="/"
            >
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-left text-xl text-blue-500">
                  Flight Optimization
                </h1>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-1">
                  <Airplane className="w-4 stroke-white" />
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-tight pt-2">
                We developed a comprehensive utility to allow users to discover
                the most optimal airlines in nearby airports in order to make
                educated booking decisions.
              </p>
            </Link>
            <Link
              className="border-2 border-gray-200 flex flex-col rounded p-4 cursor-pointer ease-out duration-300 hover:shadow-lg"
              to="/"
            >
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-left text-xl text-blue-500">
                  Trend Analysis
                </h1>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-1">
                  <Trend className="w-4 stroke-white" />
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-tight pt-2">
                We performed time-series analysis on the relationship between a
                variety of predictors and flight delays/flight delay times.
              </p>
            </Link>
          </div>
        </div>
        <div className="pt-4">
          <h1 className="text-2xl text-gray-500">Where we got the data?</h1>
          <p className="flex-inline pt-2 text-gray-400 text-lg">
            The data for this project was collected from the{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              United States Department of Transportation
            </span>{" "}
            which collects data on "Reporting Carrier On-Time Performance". The
            data spans from 1987-present, but due to the sheer volume of
            records, we leveraged data from only the past decade. <br />
            An official description from the BTS is as follows: "This database
            contains scheduled and actual departure and arrival times reported
            by certified U.S. air carriers that account for at least one percent
            of domestic scheduled passenger revenues. The data is collected by
            the Office of Airline Information, Bureau of Transportation
            Statistics (BTS)."
          </p>
        </div>
        <div className="pt-4">
          <h1 className="text-2xl text-gray-500">Who built this?</h1>
          <p className="flex-inline pt-2 text-gray-400 text-lg">
            This project was built by group 10 for CIS4301 at UF. The team
            members included Ali Hussain, Adam Hassan, David DeVore, and Murari
            Bhimavarapu. If you're interested in peeking at the code, feel free
            to check out our{" "}
            <a
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"
              href="https://github.com/Adamkadaban/DBProject"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};
