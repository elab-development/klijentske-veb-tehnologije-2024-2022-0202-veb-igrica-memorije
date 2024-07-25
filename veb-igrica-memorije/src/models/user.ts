import { dailyWin } from "./dailyWin";
export class User{
username: string;
password: string;
matchesPlayed: number;
winHistory: dailyWin[];

constructor(username:string,password:string){this.username=username; this.password=password; this.matchesPlayed=0; 
let today= new Date();
today.setHours(0,0,0,0);
    let dayAgo: Date = new Date();
dayAgo.setDate(dayAgo.getDate()-1);
dayAgo.setHours(0,0,0,0);
let twoDaysAgo: Date = new Date();

twoDaysAgo.setDate(twoDaysAgo.getDate()-2);
twoDaysAgo.setHours(0,0,0,0);
let threeDaysAgo: Date = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate()-3);
threeDaysAgo.setHours(0,0,0,0);
let fourDaysAgo: Date = new Date();
fourDaysAgo.setDate(fourDaysAgo.getDate()-4);
fourDaysAgo.setHours(0,0,0,0);
let fiveDaysAgo: Date = new Date();
fiveDaysAgo.setDate(fiveDaysAgo.getDate()-5);
fiveDaysAgo.setHours(0,0,0,0);
let sixDaysAgo: Date = new Date();
sixDaysAgo.setDate(sixDaysAgo.getDate()-6);
sixDaysAgo.setHours(0,0,0,0);


    this.winHistory=[new dailyWin(dayAgo), new dailyWin(twoDaysAgo), new dailyWin(threeDaysAgo), new dailyWin(fourDaysAgo), new dailyWin(fiveDaysAgo), new dailyWin(sixDaysAgo)    ];}
}