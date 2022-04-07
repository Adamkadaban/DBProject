export const formatData = (data, month) => {
  let currentAirline = "";
  let currentAirport = "";
  let key = "";
  const newData = {};

  data.map((d, i) => {
    if (d.AIRLINE !== currentAirline || d.AIRPORT !== currentAirport) {
      currentAirline = d.AIRLINE;
      currentAirport = d.AIRPORT;
      key = `${currentAirline}-${currentAirport}`;
      newData[key] = {
        Airline: d.AIRLINE,
        Airport: d.AIRPORT.split(":")[1],
        City: d.AIRPORT.split(":")[0],
        Delays: [],
        TotalDelayThisMonth: 0,
        LateAircraftDelayThisMonth: 0,
        NASDelayThisMonth: 0,
        SecurityDelayThisMonth: 0,
        WeatherDelayThisMonth: 0,
        CarrierDelayThisMonth: 0,
      };
    }

    newData[key].Delays.push({
      Month: d["FLIGHTMONTH"],
      TotalDelay: Math.round(d["AVGTOTALDELAY"]),
    });

    if (d["FLIGHTMONTH"] === month) {
      newData[key]["TotalDelayThisMonth"] = Math.round(d["AVGTOTALDELAY"]);
      newData[key]["LateAircraftDelayThisMonth"] = Math.round(
        d["LATEAIRCRAFTDELAY"]
      );
      newData[key]["NASDelayThisMonth"] = Math.round(d["NASDELAY"]);
      newData[key]["SecurityDelayThisMonth"] = Math.round(d["SECURITYDELAY"]);
      newData[key]["WeatherDelayThisMonth"] = Math.round(d["WEATHERDELAY"]);
      newData[key]["CarrierDelayThisMonth"] = Math.round(d["CARRIERDELAY"]);
    }
  });
  return newData;
};

export const getCities = (data) => {
  let cities = new Set();
  Object.keys(data).map((d) => {
    cities.add(data[d].City);
  });
  return Array.from(cities);
};

export const getMonth = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let name = month[d.getMonth()];
  return name;
};
