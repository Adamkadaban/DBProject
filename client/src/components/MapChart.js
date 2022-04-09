/**
 * Example map from:
 * https://www.react-simple-maps.io/examples/usa-counties-choropleth-quantile/
 */

 import React, { useState, useEffect } from "react";
 import { ComposableMap, Geographies, Geography } from "react-simple-maps";
 import { scaleQuantile } from "d3-scale";
 import { csv } from "d3-fetch";
 
 const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
 
 export const MapChart = (props) => {
   const [query1Data, setQuery1Data] = useState([]);
   const [filter, setFilter] = useState("ARRIVING_FLIGHTS_AVERAGE_DELAY_TIME")
  

   useEffect(() => {
    if (!props.direction && props.dataFilter){
     setFilter("DEPARTING_FLIGHTS_AVERAGE_DELAY_TIME")
   } else if (props.direction && !props.dataFilter){
     setFilter("ARRIVING_FLIGHTS_DELAYS_COUNT")
   } else if (!props.direction && !props.dataFilter){
     setFilter("DEPARTING_FLIGHTS_DELAYS_COUNT")
   } else {
    setFilter("ARRIVING_FLIGHTS_AVERAGE_DELAY_TIME")
   }
  }, [props.direction, props.dataFilter]);
   
  
  const stateMap = new Map();

  stateMap.set('AL', '01');
  stateMap.set('AK', '02');
  stateMap.set('AZ', '04');
  stateMap.set('AR', '05');
  stateMap.set('CA', '06');
  stateMap.set('CO', '08');
  stateMap.set('CT', '09');
  stateMap.set('DE', '10');
  stateMap.set('FL', '12');
  stateMap.set('GA', '13');
  stateMap.set('HI', '15');
  stateMap.set('ID', '16');
  stateMap.set('IL', '17');
  stateMap.set('IN', '18');
  stateMap.set('IA', '19');
  stateMap.set('KS', '20');
  stateMap.set('KY', '21');
  stateMap.set('LA', '22');
  stateMap.set('ME', '23');
  stateMap.set('MD', '24');
  stateMap.set('MA', '25');
  stateMap.set('MI', '01');
  stateMap.set('MN', '27');
  stateMap.set('MS', '28');
  stateMap.set('MO', '29');
  stateMap.set('MT', '30');
  stateMap.set('NE', '31');
  stateMap.set('NV', '32');
  stateMap.set('NH', '33');
  stateMap.set('NJ', '34');
  stateMap.set('NM', '35');
  stateMap.set('NY', '36');
  stateMap.set('NC', '37');
  stateMap.set('ND', '38');
  stateMap.set('OH', '39');
  stateMap.set('OK', '40');
  stateMap.set('OR', '41');
  stateMap.set('PA', '42');
  stateMap.set('RI', '44');
  stateMap.set('SC', '45');
  stateMap.set('SD', '46');
  stateMap.set('TN', '47');
  stateMap.set('TX', '48');
  stateMap.set('UT', '49');
  stateMap.set('VT', '50');
  stateMap.set('VA', '51');
  stateMap.set('WA', '53');
  stateMap.set('WV', '54');
  stateMap.set('WI', '55');
  stateMap.set('WY', '56');
  stateMap.set('AS', '60');
  stateMap.set('GU', '66');
  stateMap.set('MP', '69');
  stateMap.set('PR', '72');
  stateMap.set('VI', '78');

   useEffect(() => {
    fetch('/api', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({"queryType": 1})
  })
    .then(response =>
      response.json().then(query1Data => setQuery1Data(query1Data.filter(it => it.FLIGHTYEAR == (props.YEAR))))
    );
    }, [props.YEAR]);
  
  console.log(filter)
  console.log(query1Data.map((d) => d[filter]))


   const colorScale = scaleQuantile()
     .domain(query1Data.map((d) => d[filter]))
     .range([
       "#ecfeff",
       "#cffafe",
       "#a5f3fc",
       "#67e8f9",
       "#22d3ee",
       "#06b6d4",
       "#0891b2",
       "#0e7490",
       "#155e75",
     ]);
 
   return (
     <ComposableMap projection="geoAlbersUsa">
       <Geographies geography={geoUrl}>
         {({ geographies }) =>
           geographies.map((geo) => {
             const cur = query1Data.find((s) => stateMap.get(s.STATECODE) === geo.id);
             return (
               <Geography
                 key={geo.rsmKey}
                 geography={geo}
                 fill={cur ? colorScale(cur[filter]) : "#EEE"}
                
               />
             );
           })
         }
       </Geographies>
     </ComposableMap>
   );
 };