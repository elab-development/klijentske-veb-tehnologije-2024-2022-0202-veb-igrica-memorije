import React, { useEffect, useState } from 'react';
import LeaderboardEntry from './LeaderboardEntry';
import { LeaderboardEntryProps } from '../models/leaderboardEntryProps';
import { User } from '../models/user';
import { dailyWin } from '../models/dailyWin';
import { Rank } from '../models/rank';
import Navbar from './Navbar';
const Leaderboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entriesPerPage,setEntriesPerPage] = useState<number>(5);
  const [ranking, setRanking] =useState<Rank[]>(calculateRanking(true,''));
  const [searchQuery,setSearchQuery]=useState<string>('');
  const [isDescending,setIsDescending]= useState<boolean>(true);
  function totalWins(wins:dailyWin[]):number{
 let sum=0;
    for (let i=0;i<wins.length;i++){
sum+=wins[i].winCount;
}
return sum;
  }
  function calculateRanking(descending:boolean,search:string):Rank[] {
    let temp= localStorage.getItem("userStorage"); 
    let users:User[]=[];
    let ranking:Rank[]=[];
    if(temp===null||temp===undefined) return [];
     else users= JSON.parse(temp);
let k:number=0;
for(k=0;k<users.length;k++){
if(ranking.length<1){
    ranking.splice(0,0,new Rank(users[k].username,totalWins(users[k].winHistory)));
    console.log("SPLICED IN", users[k].username);
    k++
    break;
}}
for(k;k<users.length;k++){
    let flag:boolean =false;
if(descending){
 for(let r=0;r<ranking.length;r++){
    if(totalWins(users[k].winHistory)>ranking[r].winCount){
        console.log("SPLICED IN", users[k].username);
        ranking.splice(r,0,new Rank(users[k].username,totalWins(users[k].winHistory)));
        flag=true;break;
    }}
   } 
 else{
    for(let r=0;r<ranking.length;r++){
        if(totalWins(users[k].winHistory)<ranking[r].winCount){
            console.log("SPLICED IN", users[k].username);
            ranking.splice(r,0,new Rank(users[k].username,totalWins(users[k].winHistory)));
            flag=true;break;
        }}

      

 }
 if(flag===false){ranking.push(new Rank(users[k].username,totalWins(users[k].winHistory)));}


}
for(let r=0;r<ranking.length;r++){
    if(descending){
    ranking[r].rank=r+1}else{ranking[r].rank=ranking.length-r};

}

for(let r=0;r<ranking.length;r++){
    if(!ranking[r].username.includes(search)){
        ranking.splice(r,1);
        r=0;
    }
}

return ranking;
  }


  const lastIndex = entriesPerPage*currentPage;
  const firstIndex = lastIndex - entriesPerPage;
  const currentEntries = ranking.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(ranking.length / entriesPerPage);

  function handlePageChange(pageNumber: number){
    setCurrentPage(pageNumber);
  };

  function handleSearch(event: any){
    if(event!=undefined&&event!=null){
    setSearchQuery(event.target.value);
    setCurrentPage(1); }
  };

  function handleOrder(isDescendingNew:boolean){
setIsDescending(isDescendingNew);
setCurrentPage(1);
  }

  function handleEntriesPerPage(event:any){
    if(event!=undefined&&event!=null){
    let num= Number(event.target.value);
    setEntriesPerPage(num);}
  }

  useEffect(()=>{setRanking(calculateRanking(isDescending,searchQuery)); console.log(ranking,"RANKING")},[searchQuery,isDescending])

  return (<>
    <div className="default-bg"></div><Navbar></Navbar>
    <div className="leaderboard">
    <div className='filters'>
      <form onSubmit={e => e.preventDefault()}>
        <input className="search"
          type="text"
          placeholder="Pretraži po imenu..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </form>

      <div className="sort-options">
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="ascending"
            checked={isDescending === false}
            onChange={() => handleOrder(false)}
          />
          Rastuće
        </label>
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="descending"
            checked={isDescending === true}
            onChange={() => handleOrder(true)}
          />
          Opadajuće
        </label>
        <div>
      <label >Rangovi po stranici:</label>
      <select className='dropdown-select' value={entriesPerPage} onChange={handleEntriesPerPage}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      </div>
      </div>
      </div>  
      <LeaderboardEntry rank="RANG" username="NAME" winCount="POBEDE"></LeaderboardEntry>
      
      {currentEntries.map((entry) => (
        <LeaderboardEntry rank={entry.rank} username={entry.username} winCount={entry.winCount} />
      ))}

      
      <div className="pagination">
  {(() => {
    const buttons = [];
    for (let index = 0; index < totalPages; index++) {
      const pageNumber = index + 1;
      buttons.push(
        <button
          key={index}
          onClick={() => handlePageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      );
    }
    return buttons;
  })()}
</div>
    </div>
    </>
  );
};


export default Leaderboard;
