import React from "react";
import { useEffect, useState } from "react";
import { Card } from "../models/card";
import Navbar from "./Navbar";
import OneCard from "./OneCard";
import { useUser } from './UserContext';
import Login from './Login';
import { User } from '../models/user';


const Game = () => {
    const [turn, setTurn] = useState<number>(1);
 function initGame(){
    let i:number=0;
    let newCards:Card[]=[];
    while(i<18){newCards[i]=new Card(1);i++;}
    
    i=0;
while(i<18){
let tempid= 1;
let timeout= 0;
console.log("FD",FoundTwice(tempid,newCards));
while(FoundTwice(tempid,newCards)&&timeout<2) {
   
tempid=Math.floor(Math.random()*9)+1;
    console.log("TID",tempid);
    timeout++;
    console.log("FD",FoundTwice(tempid,newCards));
}

newCards[i]=new Card(tempid);
i++;
}

//List of numbers that appear more than twice
let greaterList:number[] = [];
//List of numbers that appear less than twice
let lesserList:number[] = [];
for(let k=1;k<=9;k++){
let counter=0;
for(let g=0; g<18; g++){
    if (newCards[g].id===k)counter++;
}
if(counter>2){greaterList.push(k);}else if(counter<2){lesserList.push(k);}
}

while(greaterList.length!=0&&lesserList.length!=0){

    
let goodElement:number = lesserList[lesserList.length-1];
let badElement:number = greaterList[greaterList.length-1];

for(let b=0;b<18;b++){
if(newCards[b].id===badElement){newCards[b].id=goodElement; break;}

}

lesserList= [];
greaterList=[];
for(let k=1;k<=9;k++){
let counter=0;
for(let g=0; g<18; g++){
    if (newCards[g].id===k)counter++;
}
if(counter>2){greaterList.push(k);}else if(counter<2){lesserList.push(k);}
}

}



console.log("NEWCARDS",newCards , greaterList, lesserList);
return newCards;
 }
function FoundTwice(num:number,newCards:Card[]):boolean{
    console.log("tempnum",num);
    if(newCards==undefined||newCards==null||newCards.length==0){return false;}
    let counter=0;
    let j=0;
for(j=0;j<18;j++){
if(newCards[j].id===num){counter++;}
}
console.log(counter,"COUNTER");
if(counter>=2)return true; else return false;
}


 
const [cards,setCards] = useState<Card[]>(initGame());
    



    return(<>
    <Navbar></Navbar>
    <OneCard id={cards[0].id}></OneCard>
    

    
    
    </>);
}


export default Game;