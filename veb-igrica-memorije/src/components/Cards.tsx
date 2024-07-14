import React, { useEffect, useState } from "react";
import OneCard from "./OneCard";
import Navbar from "./Navbar";
import { Card } from "../models/card";
import { CardProps } from "../models/cardProps";


const Cards = ()=>{

   const [currentCard, setCurrentCard]=useState<number>(1);
   const [isFlipped,setIsFlipped]=useState<boolean>(false);
   const [temperature, setTemperature]=useState<number|null>(null);
    const HandleFlipCard = (uid:number, forceflip:boolean)=>{
        setIsFlipped(!isFlipped);

    } ;
  const cardNames:string[]=["SUNČEV SISTEM", "MERKUR", "VENERA", "ZEMLJA","MARS","JUPITER", "SATURN", "URAN", "NEPTUN"];
  const APINames:string[]=["sun", "mercury", "venus", "earth","mars","jupiter", "saturn", "uranus", "neptune"];
  useEffect(()=>{handleTemperature();},[currentCard]);



  async function fetchPlanetData(name:string):Promise<number|null> {
    if(name==="sun"){return 10000};
    const url = 'https://api.le-systeme-solaire.net/rest.php/bodies?data=avgTemp&filter%5B%5D=englishName%2Ceq%2C'+name+'&filter%5B%5D';
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error( String(response.status));
      }
  
      const temp = await response.json();
      console.log("BODIES",temp.bodies);
      return temp.bodies[0].avgTemp; 
    } catch (error) {
      console.error('Error fetching Planet data:' + error);
      return null;
    }
  }
  




  function handleTemperature(){
  fetchPlanetData(APINames[currentCard-1]).then((avgTemp) => {
    console.log("AVG.temp",avgTemp);
setTemperature(avgTemp);
  });
}

const changeCardLeft=()=>{
if(currentCard==1)return;

setCurrentCard(currentCard-1);

}

const changeCardRight=()=>{
    if(currentCard==9)return;

setCurrentCard(currentCard+1);
}

return (<div className="cards-screen">
<div className="default-bg"></div>
<Navbar></Navbar>
<div className="big-transparent-block">
<div className="big-card-title">{cardNames[currentCard-1]}</div>
<div className="big-card">
    
<OneCard

          uid={1}
          id={currentCard}
          isFlipped={isFlipped}
          isMatched={false}
          flipCard={HandleFlipCard}
></OneCard>
</div>
<div className="card-temperature">{temperature!=null?("TEMPERATURA: "+temperature+" °F"):""}</div>

</div>
<div className="button-container">
    <button disabled={currentCard==1} className="left-button" onClick={changeCardLeft}><img src={"../images/ArrowIcon.png"} width={50}></img></button>
    <button disabled={currentCard==9} className="right-button" onClick={changeCardRight}><img src={"../images/ArrowIcon.png"} width={50}></img></button>
  </div>
</div>);
};

export default Cards;