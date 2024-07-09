import React, { useState } from "react";
import OneCard from "./OneCard";
import Navbar from "./Navbar";
import { Card } from "../models/card";
import { CardProps } from "../models/cardProps";


const Cards = ()=>{

   const [currentCard, setCurrentCard]=useState<number>(1);
   const [isFlipped,setIsFlipped]=useState<boolean>(false);
    const HandleFlipCard = (uid:number, forceflip:boolean)=>{
        setIsFlipped(!isFlipped);

    } ;
  const cardNames:string[]=["SUNČEV SISTEM", "MERKUR", "VENERA", "ZEMLJA","MARS","JUPITER", "SATURN", "URAN", "NEPTUN"];

return (<>
<div className="default-bg"></div>
<Navbar></Navbar>
<OneCard

          uid={1}
          id={currentCard}
          isFlipped={isFlipped}
          isMatched={false}
          flipCard={HandleFlipCard}
></OneCard>
</>);
};

export default Cards;