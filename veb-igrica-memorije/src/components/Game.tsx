import React from "react";
import { useEffect, useState } from "react";
import { Card } from "../models/card";
import Navbar from "./Navbar";
import OneCard from "./OneCard";
import { useUser } from './UserContext';
import Login from './Login';
import { User } from '../models/user';
import { CardProps } from "../models/cardProps";


const Game = () => {
    const  currentUsers = useUser().currentUserContext;
    const [waitingFlag, setWaitingFlag]= useState<boolean>(false);
    const [firstCardUID,setFirstCardUID]= useState<number>(-1);
    const [secondCardUID,setSecondCardUID]= useState<number>(-1);
    const [turn, setTurn] = useState<number>(0);
    const [player1Points, setPlayer1Points] = useState<number>(0);
    const [player2Points, setPlayer2Points] = useState<number>(0);
    
 function initGame(){
    let i:number=0;
    let newCards:Card[]=[];
    while(i<18){newCards[i]=new Card(1,i);i++;}
    
    i=0;
while(i<18){
let tempid= 1;
let timeout= 0;
console.log("FD",FoundTwice(tempid,newCards));
while(FoundTwice(tempid,newCards)&&timeout<10) {
   
tempid=Math.floor(Math.random()*9)+1;
    console.log("TID",tempid);
    timeout++;
    console.log("FD",FoundTwice(tempid,newCards));
}

newCards[i]=new Card(tempid,i);
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


 const flipCard = (uid: number, forceflip: boolean) => {
    if (forceflip) {
      setCards(cards =>
        cards.map(card =>
          card.uid === uid
            ? { id: card.id, uid: card.uid, isMatched: card.isMatched, isFlipped: !card.isFlipped }
            : card
        )
      );
      return;
    }
  
    if (secondCardUID < 0 && !forceflip) {
      setCards(cards =>
        cards.map(card =>
          card.uid === uid && !card.isMatched && !card.isFlipped && !isSelected(card.uid, card.id)
            ? { id: card.id, uid: card.uid, isMatched: card.isMatched, isFlipped: !card.isFlipped }
            : card
        )
      );
    }
  };
  
  function isSelected(uid: number, id: number): boolean {
    if (firstCardUID < 0) {
      setFirstCardUID(uid);
      return false;
    } else if (secondCardUID < 0) {
      setSecondCardUID(uid);
      return false;
    }
    return true;
  }
  
  function nextTurn() {
    setTurn((turn + 1) % 2);
  }
  function setCardMatching(uid:number){
    setCards(cards =>
        cards.map(card =>
          card.uid === uid
            ? { id: card.id, uid: card.uid, isMatched: true, isFlipped: card.isFlipped }
            : card
        ));

  }
  function addPoint(){
console.log("turn",turn);
    if(turn==0){setPlayer1Points(player1Points+1)}else
if(turn==1) {setPlayer2Points(player2Points+1)}   
console.log(player1Points,"!TO!",player2Points);
  }
  
  useEffect(() => {
    if (firstCardUID < 0 || secondCardUID < 0) return;
  
    if (cards[firstCardUID].id === cards[secondCardUID].id) {
        console.log("MATCH!");
      setCardMatching(firstCardUID);
      setCardMatching(secondCardUID);
      setFirstCardUID(-1);
      setSecondCardUID(-1);
      addPoint();
    
    } else {
        setWaitingFlag(true);
      setTimeout(() => {
        setWaitingFlag(false);
        flipCard(firstCardUID, true);
        flipCard(secondCardUID, true);
        setFirstCardUID(-1);
        setSecondCardUID(-1);
      }, 1000); 
      
      nextTurn();
    }
  
  }, [secondCardUID]);

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
    



    return(<div className="game-body">
    <div className="default-bg"></div>
    <Navbar></Navbar>
    <div className="navbar-overlay">
        
    <div className="points-left">POENI: {player1Points}</div>
    <div>{`${waitingFlag?'...':(turn==0 ? currentUsers[0].username : currentUsers[1].username)} `}</div>
        
        <div className="points-right">POENI: {player2Points}</div></div>
    <div className="card-set">
        
    {cards.map((card) => (
        
        <OneCard
          key={card.id}
          uid={card.uid}
          id={card.id}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          flipCard={flipCard}
        />
        
        
      ))}
    </div>

    
    
    </div>);
}


export default Game;