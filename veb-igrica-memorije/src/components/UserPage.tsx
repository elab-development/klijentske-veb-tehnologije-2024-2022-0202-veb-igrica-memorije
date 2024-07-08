import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { User } from "../models/user";
/*import Image1 from "images/podlogaMala.png";
import Image2 from "images/podlogaVelika.png";*/
const UserPage: React.FC =()=> {
 let didISetCat:boolean=false;
    const {username} = useParams( );
    const [matchesPlayed,setMatchesPlayed] = useState<number>(0); 
    const [users, setUsers] = useState<User[]>(() => { let temp= localStorage.getItem("userStorage"); if(temp===null||temp===undefined) return []; else{
      
      
       return JSON.parse(temp);}
    });
    const [currentUser,setCurrentUser] = useState<User|null>(null);
    useEffect(()=>{ if(currentUser==null){ updateCurrentUser();} },[]);
    
    function updateMatchesPlayed(currentUser:User){
  if(currentUser==null)return;
  setMatchesPlayed(currentUser.matchesPlayed);

  }


    

    function updateCurrentUser(){
    for(let i=0; i<users.length;i++)
{if(users[i].username===username){ setCurrentUser(users[i]); updateMatchesPlayed(users[i]); return users[i];}}
     setCurrentUser(null); return null;

    }

    async function fetchCatImage() {
      const apiKey = 'live_oOnehMQbsguvK3n3LLxcD728Thz6kFJ6bRNWNjfoZtGALDw4pzcvn3ZogQNXmxSt'; 
      const url = 'https://api.thecatapi.com/v1/images/search';
    
      try {
        const response = await fetch(url, {
          headers: {
            'x-api-key': apiKey
          }
        });
        const data = await response.json();
        if (data && data.length > 0) {
          return data[0].url;
        } else {
          throw new Error('No images found');
        }
      } catch (error) {
        console.error('Error fetching cat image:', error);
        return null;
      }
    }
    
    
    const [catUrl,setCatUrl]=useState<string>('https://cdn.dribbble.com/users/160117/screenshots/3197970/media/51a6e132b11664f7f2085bb6a35fc628.gif'
    );

function updateCatImage(){if(catUrl!='https://cdn.dribbble.com/users/160117/screenshots/3197970/media/51a6e132b11664f7f2085bb6a35fc628.gif'){return;}
fetchCatImage().then(imageUrl => {
if (imageUrl) {console.log("CATURL:",imageUrl)
  updateCatUrl(imageUrl);
  return imageUrl;
} else {console.log("CATURL?:",imageUrl)
  updateCatUrl(imageUrl);
  return '';}}
)};
function updateCatUrl(imageUrl:string){
if(didISetCat==false){
  didISetCat=true;
  setCatUrl(imageUrl);
}

}
    useEffect(()=>{ updateCatImage();
      
    },[]);



return(<>

<Navbar></Navbar>
<div className="default-bg"></div>
<div className="user-layout">
  <div className="user-layout-left">
    <div className="component">
    <div className="stack-layout">
  <div className="top"><img src={catUrl} width={200} ></img></div>
  <div className="middle">{username}</div>
  <div className="bottom"><img src='../../images/podlogaVelika.png' width={250} ></img></div>
</div>
    </div>
    <div className="component"><div className="stack-layout-2"><div className="top"><div className="matches-played">UKUPAN BROJ PARTIJA</div></div>
      <div className="middle">{matchesPlayed}</div> <div className="bottom"><img className="tiny-field-image" src= '../../images/podlogaMala.png'></img></div>
      </div></div>
  </div>
  <div className="user-layout-right">
    <div className="component">Component 3</div>
  </div></div>



</>);

/*
<div className="user-layout">
  <div className="user-layout-left">
    <div className="component">
    <div className="stack-layout">
  <div className="top">Top Component</div>
  <div className="middle">Middle Component</div>
  <div className="bottom"><img src='../images/podlogaVelika.png' width={100} ></img></div>
</div>
    </div>
    <div className="component">Component 2</div>
  </div>
  <div className="user-layout-right">
    <div className="component">Component 3</div>
  </div></div>*/


};
export default UserPage;