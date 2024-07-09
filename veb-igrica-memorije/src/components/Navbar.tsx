import React, { useEffect } from 'react';
import Login from './Login';
import { User } from '../models/user';
import { useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import OneCard from './OneCard';
const Navbar: React.FC= ({ }) => {

    function saveCurrentUsers(tempCurrentUsers:User[]){
        sessionStorage.setItem(
            "currentUserStorage",
            JSON.stringify(tempCurrentUsers)
        );
    
    }
    let tempCurrentUsers:User[]=  useUser().currentUserContext;
    const [currentUsers,setCurrentUsers ]=useState<User[]>( ():User[] =>{
        
      
    if(tempCurrentUsers[0].username!=''&&tempCurrentUsers[1].username!=''){
    saveCurrentUsers(tempCurrentUsers);
    return tempCurrentUsers;

    }else { let temp:any= sessionStorage.getItem("currentUserStorage"); if(temp!=undefined&&temp!=null){return JSON.parse(temp); }else {  return [new User("",""), new User("","")];}}



    

    });

    useEffect(()=>{if(currentUsers[0].username==""||currentUsers[1].username=="")goLogin();},[currentUsers])
    const goTo =  useNavigate();
    function goHome(){goTo("/home"); goTo(0); }
    function goLogin(){goTo("/"); }
    function goLeftUser(){goTo(`/users/${currentUsers[0].username}`); goTo(0);};
    function goRightUser(){goTo(`/users/${currentUsers[1].username}`); goTo(0);};
    function goLeaderboard(){goTo('/leaderboard');}
    return (<>
      <nav className="navbar">
        <div className="navbar-left">
            <img className="navbar-profile-icons" src="../images/ikonicaZaLeviProfil.png"></img>
          <button onClick={goLeftUser}>{currentUsers[0].username}</button>
        </div>
        <div className="navbar-middle">
          <button onClick={goHome}><img src="../images/cardIcon.png" className='navbar-middle-icons'></img></button>
          <button onClick={goLeaderboard}><img src="../images/podiumIcon.png" className='navbar-middle-icons'></img></button>
        </div>
        <div className="navbar-right">
        <button onClick={goRightUser}>{currentUsers[1].username}</button>
        <img className="navbar-profile-icons" src="../images/ikonicaZaDesniProfil.png" ></img>
          
        </div>
      </nav>
      
      </>
    );
  };

export default Navbar;
