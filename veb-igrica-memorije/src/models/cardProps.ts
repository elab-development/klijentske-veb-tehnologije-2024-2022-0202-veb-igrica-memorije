export interface CardProps{
    uid:number; //unique id
    id: number;
    isFlipped: boolean;
    isMatched:boolean;
    flipCard: (id: number,forceflip:boolean) => void;
}