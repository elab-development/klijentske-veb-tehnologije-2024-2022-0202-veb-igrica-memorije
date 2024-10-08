import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { User } from './models/user'
import UserPage from './components/UserPage'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { UserProvider } from './components/UserContext'
import OneCard from './components/OneCard'
import Game from './components/Game'
import { Card } from './models/card'
import Leaderboard from './components/Leaderboard'
import Cards from './components/Cards'

function App() {
  return (
    <UserProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Game />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
          <Route path="users/:username" element={<UserPage  />}/>
          <Route path= "/cards" element ={<Cards/>}/>
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );

  
}

export default App
