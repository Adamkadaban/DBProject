import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="w-screen h-fit shadow-sm">
      <div className="flex flex-row justify-between pr-4 pl-4">
        <div className="p-4">
          <h1 className="text-2xl text-blue-600 font-semibold">
            <Link to="/"> Flight Delays Web App</Link>
          </h1>
        </div>
        <div className="flex flex-row gap-4 pr-4">
          <div className="text-gray-500 text-lg pt-4 pl-2 pr-2 hover:bg-gray-100">
            <Link to="/GeospatialAnalysis">Geospatial Analysis</Link>
          </div>
          <div className="text-gray-500 text-lg pt-4 pl-2 pr-2 hover:bg-gray-100">
            <Link to="/FlightOptimization">Flight Optimization</Link>
          </div>
          <div className="text-gray-500 text-lg pt-4 pl-2 pr-2 hover:bg-gray-100">
            <Link to="/TimeSeriesAnalysis">Time Series Analysis</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
