import { useState } from "react";
import React from "react";
import { Card } from "../models/card";

const OneCard: React.FC<{id:number}> = ({id}) =>{
    const [isFlipped,setIsFlipped] = useState<boolean>(false);
    const [isMatched, setIsMatched] = useState<boolean>(false);
    const [idLocal,setId] = useState<number>(id);
    const handleFlip = () => {
        if(isMatched==false){
        setIsFlipped(!isFlipped);}
    };

    

    return (
        <div className={`card-container ${isFlipped ? 'flipped' : ''} `} onClick={handleFlip}>
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
