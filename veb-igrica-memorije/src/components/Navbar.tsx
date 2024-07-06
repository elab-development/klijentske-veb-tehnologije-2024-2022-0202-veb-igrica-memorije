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

    return (<>
      <nav className="navbar">
        <div className="navbar-left">
            <img className="navbar-profile-icons" src="images/ikonicaZaLeviProfil.png"></img>
          <button>{currentUsers[0].username}</button>
        </div>
        <div className="navbar-middle">
          <button onClick={goHome}><img src="images/HomeIcon.png" className='navbar-middle-icons'></img></button>
          <button><img src="images/cardIcon.png" className='navbar-middle-icons'></img></button>
        </div>
        <div className="navbar-right">
        <button>{currentUsers[1].username}</button>
        <img className="navbar-profile-icons" src="images/ikonicaZaDesniProfil.png" ></img>
          
        </div>
      </nav>
      
      </>
    );
  };

export default Navbar;
