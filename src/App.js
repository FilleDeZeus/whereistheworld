import React, {useState, useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import { Pays } from './components/pays/pays.js';
import './App.css'

//importation des composant
import {Home} from './components/home/home.js';

//composant App
export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  
  //l'ensemble des routes 
  let routes = useRoutes ([
    {
      path : "/",
      element :<Home/>
      
    }, 
    {
      path : "/countries/:code",
      element : <Pays/>
    }
    
  ])
  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='page'>
        <div className="header">
          <h1 className={` ${isDarkMode ? 'dark-mode' : ''}`}>Where in the World?</h1>
          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        
        {routes}
      </div>
      
    </div>
  );
};