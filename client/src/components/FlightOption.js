import { TrendLineChart } from "./TrendLineChart";
import { getMonth } from "../utils/helpers";

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
        ylabel={"Average Total Delay"}
      />
    </div>
  );
};
