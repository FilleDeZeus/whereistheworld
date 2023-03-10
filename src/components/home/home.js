import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//importations du style
import './public/css/home.css'

//Exportation et creation du composant Home
export const Home = () => {
  //etat pour les pays
  const [lesPays, setLesPays] = useState([]);
  //etat pour la barre de recherche
  const [recherche, setRecherche] = useState('');
  //etat pour le choix de continent
  const [choix, setChoix] = useState('all');

  //permet de recupere la liste des pays 
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setLesPays(response.data);
      })
  }, []);

  //filtre les pays en fct de la barre de recherceh
  const filtreLesPays = lesPays.filter(pays => {
    //met en minuscule le nom de chaque pays
    const nom = pays.name.common.toLowerCase();
    //met en minuscule la recherche
    const laRecherche = recherche.toLowerCase();
    //verification si le nom est egale à la recherche
    return nom.includes(laRecherche);
  });

  //L'ensemble des pays filtré
  let trie;
  //si le choix est all
  if (choix === 'all') {
    //represente l'ensemble
    trie = filtreLesPays;
  } else {
    //represente les pays qui ont la meme region que le choix
    trie = filtreLesPays.filter(pays => pays.region === choix);
  }
  //creation du varable qui va stocker les continents des pays en excluant les vide
  const continent = [...new Set(lesPays.map(pays => pays.region))].filter(region => region !== "");

  return (
    <div className="where">
      <div className="filters">
        <input type="text" placeholder="Search for a country ..." value={recherche} onChange={e => setRecherche(e.target.value)} />
        <select value={choix} onChange={e => setChoix(e.target.value)}>
          <option value="all">All</option>
          {continent.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
      <ul>
        {trie.map(pays => (
          <li key={pays.cca3}>
            <Link to={`/countries/${pays.cca3}`}>
              <img src={pays.flags.png} alt={`${pays.name.common} flag`} />
              <p>{pays.name.common}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};