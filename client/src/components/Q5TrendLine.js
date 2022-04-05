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
 
 
 
 export const Query5TrendLine = ({strokeWidth}) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({"queryType": 5})
      })
        .then(response =>
          response.json().then(data => setData(data))
        );
        }, []);
      
      console.log(data)  
 
   return (
     
     <ResponsiveContainer>
       <LineChart
         width={800}
         height={300}
         data = {data}
       >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="FLIGHTYEAR" />
         <YAxis />
         <Tooltip />
         <Legend />
         <Line
           type="monotone"
           dataKey="LATEAIRCRAFTDELAY"
           stroke="#06b6d4"
           activeDot={{ r: 8 }}
           strokeWidth={strokeWidth}
         />
         <Line
           type="monotone"
           dataKey="NASDELAY"
           stroke="#3b82f6"
           strokeWidth={strokeWidth}
         />
         <Line
           type="monotone"
           dataKey="SECURITYDELAY"
           stroke="#f5a742"
           strokeWidth={strokeWidth}
         />
         <Line
           type="monotone"
           dataKey="WEATHERDELAYCOUNT"
           stroke="#f54e42"
           strokeWidth={strokeWidth}
         />
       </LineChart>
     </ResponsiveContainer>
   );
 };
 