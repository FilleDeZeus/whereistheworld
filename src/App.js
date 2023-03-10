import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useRoutes } from 'react-router-dom';

//importation des composant
import {Donnee} from './components/donnee/donnee.js'
import { DonneeInfo } from './components/donneeInfo/donneInfo.js';

//composant App
export const App = () => {

  //les etats de ce composant
  const [data, setData] = useState([]); //etat qui va stocké les données de l'api
  const [selectData, setSelectData] = useState(null);//etat qui va stocké les info du donnée selectionné

  //le resultat de la recherche est stocké dans data 
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data);
      })
  }, []);
  
  //l'ensemble des routes 
  let routes = useRoutes ([
    {
      path : "/",
      element : <Donnee data={data} setSelectData={setSelectData}/>
    }, 
    {
      path : "/donnee/:id",
      element : <DonneeInfo data={selectData}  />
    }
    
  ])
    
  return (
    <div className="container">
      {/* affichage des routes */}
      {routes}
</div>
  );
};