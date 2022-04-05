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
 
 
 
 export const Query4TrendLine = ({strokeWidth}) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({"queryType": 4})
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
         <YAxis yAxisId="right-axis" orientation="right" />
         <YAxis domain={[0, 200]}/>
         <Tooltip />
         <Legend />
         <Line
           yAxisId="right-axis"
           type="monotone"
           dataKey="MAXTOTALDELAY"
           stroke="#06b6d4"
           activeDot={{ r: 8 }}
           strokeWidth={strokeWidth}
         />
         <Line
           type="monotone"
           dataKey="MEANTOTALDELAY"
           stroke="#3b82f6"
           strokeWidth={strokeWidth}
         />
         <Line
           type="monotone"
           dataKey="MEDIANTOTALDELAY"
           stroke="#f5a742"
           strokeWidth={strokeWidth}
         />
         <Line
           type="monotone"
           dataKey="MINTOTALDELAY"
           stroke="#f54e42"
           strokeWidth={strokeWidth}
         />
         <Line
           type="monotone"
           dataKey="SEVENTYFIFTHPERCTOTALDELAY"
           stroke="#37eb34"
           strokeWidth={strokeWidth}
         />
         <Line
           type="monotone"
           dataKey="TWENTYFIFTHPERCTOTALDELAY"
           stroke="#eb34e8"
           strokeWidth={strokeWidth}
         />
       </LineChart>
     </ResponsiveContainer>
   );
 };
 