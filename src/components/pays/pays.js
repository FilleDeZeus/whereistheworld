import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

//importation du style 
import './public/css/pays.css'

//exportation et creation du composant Pays
export const Pays = () => {
  //recupere le param de l'url du pays qui correpondra au code du pays
  const { code } = useParams();
  //l'etat du pays 
  const [pays, setPays] = useState(null);
  //l'etat des pays frontalier
  const [borderCountries, setBorderCountries] = useState([]);


  //appeler quand la l'etat code change
  useEffect(() => {
    //fait appelle à l'Api pour recup donnée
    axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
      //quand rep recu
      .then(response => {
        //met à jour  l'etat avec un tab des infos du pays en questions 
        setPays(response.data[0]);
        // Récupérer les pays frontaliers du pays
        const borderCodes = response.data[0].borders;
        if (borderCodes && borderCodes.length) {
          const promises = borderCodes.map(borderCode =>
            axios.get(`https://restcountries.com/v3.1/alpha/${borderCode}`)
              .then(response => response.data[0])
          );
          Promise.all(promises)
            .then(borderCountries => {
              setBorderCountries(borderCountries);
            })
        }
      })
  }, [code]);
    

  //si pays a une valeur alors
  return pays ? (
    <div>
      <Link to="/" className='back'>Retour</Link>
      <div className="details">
        <img src={pays.flags.svg} alt={`${pays.name.common} flag`} />
        <div className='detailsText'>
          <h2>{pays.name.common}</h2>
          <div className='colonnes'>
            <div className='colonne'>
              <p><strong>Native name:</strong>{pays.nativeName}</p>
              <p><strong>Population:</strong> {pays.population}</p>
              <p><strong>Region:</strong> {pays.region}</p>
              <p><strong>Sub Region:</strong> {pays.subregion}</p>
              <p><strong>Capital:</strong> {pays.capital}</p>
            </div>
            <div>
              <p><strong>Top level Domain:</strong> {pays.tld.join(', ')}</p>
              <p><strong>Currencies:</strong> {Object.values(pays.currencies).map(currency => `${currency.name}`)}</p>
              <p><strong>languages:</strong> {Object.values(pays.languages).join(', ')}</p>
            </div>
          </div>
          <div className='border'>
            {borderCountries.map(country => (
              <Link to={`/countries/${country.cca3}`} key={country.cca3}>
                <button>{country.name.common}</button>
              </Link>
              ))}
          </div>
        </div>
      </div>
    </div>


  ) : 
  //si le pays n'a pas de valeur un message 
  (
    <div>Nous sommes actuellement entrain de chercher le pays...</div>
  );
};
