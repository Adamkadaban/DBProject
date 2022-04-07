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
 
 
 
 export const Query3TrendLine = ({strokeWidth}) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({"queryType": 3})
      })
        .then(response =>
          response.json().then(data => setData(data))
        );
        }, []);
      
      console.log(data)
      
      var Airline = []
      
      let Alaska = data.filter(it => it.CARRIERCODE.includes('AS'));
      let American = data.filter(it => it.CARRIERCODE.includes('AA'));
      let MQ = data.filter(it => it.CARRIERCODE.includes('MQ'));
      let EV = data.filter(it => it.CARRIERCODE.includes('EV'));
      let B6 = data.filter(it => it.CARRIERCODE.includes('B6'));
      let OO = data.filter(it => it.CARRIERCODE.includes('OO'));
      let UA = data.filter(it => it.CARRIERCODE.includes('UA'));
      let DL = data.filter(it => it.CARRIERCODE.includes('DL'));
      let WN = data.filter(it => it.CARRIERCODE.includes('WN'));
      let US = data.filter(it => it.CARRIERCODE.includes('US'));

      Airline.push(Alaska)
      Airline.push(American)
      Airline.push(DL)
      Airline.push(MQ)
      Airline.push(EV)
      Airline.push(B6)
      Airline.push(OO)
      Airline.push(UA)
      Airline.push(WN)
      Airline.push(US)


    
      //console.log(Airline[2][0].NAME)
    
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
         
         {Airline.map((s) => (
            <Line dataKey="NUMBER_DELAYED_FLIGHTS" data={s} //name={s[0].NAME} key={s[0].CARRIERCODE} 
            strokeWidth = {4}/>
          ))}
         
       </LineChart>
     </ResponsiveContainer>
   );
 };
 