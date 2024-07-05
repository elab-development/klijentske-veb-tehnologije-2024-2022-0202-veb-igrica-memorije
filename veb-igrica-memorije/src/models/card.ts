export class Card{
id:number;
isFlipped:boolean;
isMatched:boolean;

constructor(id:number){

    this.id=id;
    this.isFlipped=false;
    this.isMatched=false;
}
}