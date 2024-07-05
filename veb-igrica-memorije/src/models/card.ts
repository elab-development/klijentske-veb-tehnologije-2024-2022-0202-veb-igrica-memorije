export class Card{
id:number;
uid:number; //unique id
isFlipped:boolean;
isMatched:boolean;

constructor(id:number,uid:number){
 this.uid=uid;
    this.id=id;
    this.isFlipped=false;
    this.isMatched=false;
}
}