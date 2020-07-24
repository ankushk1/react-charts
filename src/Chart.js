import React from "react";
import { Bar } from "react-chartjs-2";
import './App.css'
const Chart = ({ data }) => {
  
 //console.log(data);
    return(
        <div className="chart"><Bar data={data} options={{ scales: { yAxes: [{ ticks: { min: 0,stepSize:10 } }] } }} />
    </div>);
};

export default Chart;