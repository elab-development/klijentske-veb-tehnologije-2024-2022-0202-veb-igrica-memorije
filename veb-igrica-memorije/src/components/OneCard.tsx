import { useState } from "react";
import React from "react";
import { CardProps } from "../models/cardProps";

const OneCard: React.FC<CardProps> = ({id,isFlipped,isMatched,flipCard,uid}) =>{
    const [isFlippedLocal,setIsFlippedLocal] = useState<boolean>(false);
    const [isMatchedLocal, setIsMatchedLocal] = useState<boolean>(false);
    const [idLocal,setIdLocal] = useState<number>(id);
    const handleFlipLocal = () => {
        flipCard(uid,false);
      };

    

    return (
        <div className={`card-container ${isFlipped ? 'flipped' : ''} `} onClick={handleFlipLocal}>
            <div className="card">
                <img src="images/cards/zadnja.png" className={`card-front ${isMatched ? 'card-glow' : ''}`} >
                    
                </img>
                < img src={`images/cards/kartica${idLocal}.png`} className={`card-back ${isMatched ? 'card-glow' : ''}`}>
                </img>
                
            </div>
        </div>
    );

}

export default OneCard;
