import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//importation du style 
import './public/css/pays.css'

//exportation et creation du composant Pays
export const Pays = () => {
  //recupere le param de l'url du pays qui correpondra au code du pays
  const { code } = useParams();
  //l'etat du pays 
  const [pays, setPays] = useState(null);

  //appeler quand la l'etat code change
  useEffect(() => {
    //fait appelle à l'Api pour recup donnée
    axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
      //quand rep recu
      .then(response => {
        //met à jour  l'etat avec un tab des infos du pays en questions 
        setPays(response.data[0]);
      })
  }, [code]);

  //si pays a une valeur alors
  return pays ? (
    <div className="details">
      <h2>{pays.name.common}</h2>
      <img src={pays.flags.svg} alt={`${pays.name.common} flag`} />
      <p><strong>Capital:</strong> {pays.capital}</p>
      <p><strong>Region:</strong> {pays.region}</p>
      <p><strong>Population:</strong> {pays.population}</p>
      <p><strong>Languages:</strong> {Object.values(pays.languages).join(', ')}</p>
    </div>
  ) : 
  //si le pays n'a pas de valeur un message 
  (
    <div>Nous sommes actuellement entrain de chercher le pays...</div>
  );
};
