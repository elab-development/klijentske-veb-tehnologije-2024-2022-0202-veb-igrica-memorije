import React from 'react';
import Login from './Login';
import { User } from '../models/user';
import { useUser } from './UserContext';
const Navbar: React.FC= ({ }) => {
    const  currentUsers = useUser().currentUserContext;


    return (
      <nav className="navbar">
        <div className="navbar-left">
          <button>{currentUsers[0].username}</button>
        </div>
        <div className="navbar-middle">
          <button>Middle Button 1</button>
          <button>Middle Button 2</button>
        </div>
        <div className="navbar-right">
          <button>{currentUsers[1].username}</button>
        </div>
      </nav>
    );
  };

export default Navbar;
