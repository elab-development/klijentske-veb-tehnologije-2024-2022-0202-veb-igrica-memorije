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
    const cleanArray = (): dailyWin[] => {
        let newArray: dailyWin[] = [];
        let today: Date = new Date();
        today.setHours(0, 0, 0, 0);
        let tempDay: Date = new Date(today);
    
        for (let i = -6; i <= 0; i++) {
          tempDay.setDate(today.getDate() + i);
          let newEntry: dailyWin = { date: new Date(tempDay), winCount: 0 };
    
          for (let j = 0; j < userProp.winHistory.length; j++) {
            if (new Date(userProp.winHistory[j].date).getTime() === new Date(tempDay).getTime()) {
              newEntry.winCount += userProp.winHistory[j].winCount;
            }
          }
          newArray.push(newEntry);
        }
    
        return newArray;
      };
    
      const cleanedArray: dailyWin[] = cleanArray();





    const data ={

    labels: [String(cleanedArray[0].date).substring(0,3),
    String(cleanedArray[1].date).substring(0,3),
    String(cleanedArray[2].date).substring(0,3),
    String(cleanedArray[3].date).substring(0,3),
    String(cleanedArray[4].date).substring(0,3),
    String(cleanedArray[5].date).substring(0,3),
    String(cleanedArray[6].date).substring(0,3)],
    datasets: [{
 label: 'Broj Pobeda',
 data: [cleanedArray[0].winCount,
 cleanedArray[1].winCount,
 cleanedArray[2].winCount,
 cleanedArray[3].winCount,
 cleanedArray[4].winCount,
 cleanedArray[5].winCount,
 cleanedArray[6].winCount],
 backgroundColor: '#6E2D95',
 borderColor: 'black',

    }]
}

const options = {

    
}

return(<>
<Bar data ={data}
 options = {options}></Bar>
</>);
    
};

export default ChartComponent;