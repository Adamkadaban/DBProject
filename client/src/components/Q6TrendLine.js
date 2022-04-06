/**
 * Example line chart from:
 * https://recharts.org/en-US/examples
 */

 import React from "react";
 import { useState } from "react";
 import { useEffect } from "react";
 import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
 } from "recharts";
 
 
 
 export const Query6TrendLine = ({strokeWidth}) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({"queryType": 6})
      })
        .then(response =>
          response.json().then(data => setData(data))
        );
        }, []);
      
      console.log(data)
      
      var Airport = []
      
      let Alaska = data.filter(it => it.AIRPORTCODE=== 10397);
      let American = data.filter(it => it.AIRPORTCODE=== 11057);
      let MQ = data.filter(it => it.AIRPORTCODE=== 11292);
      let EV = data.filter(it => it.AIRPORTCODE ===11298);
      let B6 = data.filter(it => it.AIRPORTCODE=== 12266);
      let OO = data.filter(it => it.AIRPORTCODE=== 12889);
      let UA = data.filter(it => it.AIRPORTCODE=== 12892);
      let DL = data.filter(it => it.AIRPORTCODE=== 13930);
      let WN = data.filter(it => it.AIRPORTCODE=== 14107);
      let US = data.filter(it => it.AIRPORTCODE=== 14771);

      Airport.push(Alaska)
      Airport.push(American)
      Airport.push(DL)
      Airport.push(MQ)
      Airport.push(EV)
      Airport.push(B6)
      Airport.push(OO)
      Airport.push(UA)
      Airport.push(WN)
      Airport.push(US)


    
      console.log(Airport[0])
    
   return (
     
     <ResponsiveContainer>
       <LineChart
         width={800}
         height={300}
       >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="FLIGHTYEAR" allowDuplicatedCategory={false}/>
         <YAxis />
         <Tooltip />
         <Legend />
         
         {Airport.map((s) => (
            <Line dataKey="DEPARTING_DELAYS_TO_ARRIVING_DELAYS" data={s} //name={s[0].NAME} key={s[0].CARRIERCODE} 
            strokeWidth = {4}/>
            
          ))}
         
       </LineChart>
     </ResponsiveContainer>
   );
 };
 