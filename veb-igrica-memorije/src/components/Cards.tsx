import React, { useState } from "react";
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

  async function fetchPlanetData(name:string):Promise<number|null> {
    /*IMPLEMENTIRAJ */
    return null;
  }
  
  function handleTemperature(){
  fetchPlanetData(APINames[currentCard-1]).then(avgTemp => {
setTemperature(avgTemp);
  });
}

return (<>
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
<div className="card-temperature">{temperature==null?("TEMPERATURA: "+temperature):""}</div>
</div>
</>);
};

export default Cards;