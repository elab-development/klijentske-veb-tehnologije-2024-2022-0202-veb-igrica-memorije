import React from 'react';
import Login from './Login';
import { User } from '../models/user';
import { useUser } from './UserContext';
const Navbar: React.FC= ({ }) => {
    const  currentUsers = useUser().currentUserContext;


    return (
      <nav className="navbar">
        <div className="navbar-left">
            <img className="navbar-profile-icons" src="images/ikonicaZaLeviProfil.png"></img>
          <button>{currentUsers[0].username}</button>
        </div>
        <div className="navbar-middle">
          <button><img src="images/HomeIcon.png" className='navbar-middle-icons'></img></button>
          <button><img src="images/cardIcon.png" className='navbar-middle-icons'></img></button>
        </div>
        <div className="navbar-right">
        <button>{currentUsers[1].username}</button>
        <img className="navbar-profile-icons" src="images/ikonicaZaDesniProfil.png" ></img>
          
        </div>
      </nav>
    );
  };

export default Navbar;
