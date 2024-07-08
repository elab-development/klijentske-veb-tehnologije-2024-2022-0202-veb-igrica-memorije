import { userProps } from "../models/userProps";
import React from "react";
import { User } from "../models/user";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { dailyWin } from "../models/dailyWin";
ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend

)
const ChartComponent: React.FC<userProps> =({userProp})=>{
  

return(<>


</>);
    
};

export default ChartComponent;