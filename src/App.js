import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Chart from './Chart'


const App = () => {
  const [chart, setChart] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async (req) => {
    try {
      // const res = await axios.get(
      //   `https://corona.lmao.ninja/v2/historical/pakistan`
      // );
      const res = await axios.get(
        `http://localhost:5000/reports`, {
        headers: {
          'token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFua3VzaCIsInVzZXJfaWQiOjIxLCJpYXQiOjE1OTU1NzQ3NjksImV4cCI6MTU5NTU4OTE2OX0.xS_xjAwSI4HKB5kRHRaKZlXB4TzoS19_65kcbfmE_gI`
        }
      });

      

      console.log(res.data.StateInfo);
      var output = {}
      var failed = {}
      var passed = {}
      var totalS={}
      for (let i = 0; i < res.data.StateInfo.length; i++) {
        var state = res.data.StateInfo[i].States_count[0].state
        var fail = res.data.StateInfo[i].States_count[0].fail
        var pass = res.data.StateInfo[i].States_count[0].pass
        var count = res.data.StateInfo[i].States_count[0].count
        
        output[i] = state
        failed[i] = fail
        passed[i] = pass
        totalS[i]=count
        //  console.log(JSON.stringify(passed))
      }
      
      console.log(output)
      
      
        setChart({
          // labels: Object.keys(res.data.timeline.recovered),
          labels: Object.values(output),
          datasets: [
            {
              label: "Failed",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#FF4848",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,            
              data: Object.values(failed)
            },
            {
              label: "Passed",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#487EB0",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: Object.values(passed)
            },

            {
              label: "Total state count",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "#BB2CD9",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10, 
              data: Object.values(totalS)
            },
          ]
        
        })
      
      
      } catch (error) {
        console.log(error.response);
      }
      
    
  };

  
  

  return (
    <div>
      <Chart data={chart} />
    </div>
  );

};

export default App;