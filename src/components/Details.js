import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import ColorElement from "./ColorElement";

import { LanguageContext } from "./LanguageContext";

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const [selectedPokemon, setSelectedPokemon] = useState(
    location.state?.pokemon || null
  );

  // Fonction de fetch pour récupérer les données en cas de besoin
  const fetchPokemonDataById = async () => {
    try {
      const response = await fetch(
        "https://pokedex-jgabriele.vercel.app/pokemons.json"
      );
      const data = await response.json();
      const pokemon = data.find((item) => item.id === parseInt(id));
      setSelectedPokemon(pokemon);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  //Déclenchement du fetch
  useEffect(() => {
    // Si `selectedPokemon` est `null`, effectuer un fetch
    if (!selectedPokemon) {
      fetchPokemonDataById();
    }
  }, [selectedPokemon, id]);

  //Loading
  if (!selectedPokemon) {
    return <div>Chargement des données du Pokémon...</div>;
  }

  // Fonction pour générer l'URL de l'image locale
  const getImageUrl = (id) => {
    return `/pokemon_img/${id}.png`;
  };

  return (
    <div className="Details">
      <Header />
      <h1 className="text-5xl font-bold mb-4 text-center mt-6 text-white">
        {selectedPokemon.names?.[language] || selectedPokemon.names?.en}
      </h1>
      <br />
      <h2 className="text-3xl font-bold mb-2 text-center text-white">
        <div className="flex justify-center gap-2">
          {selectedPokemon.types?.map((type) => (
            <ColorElement key={type} type={type} />
          ))}
        </div>
      </h2>
      <div className=" md:flex-row  ">
        <div className="flex justify-center">
          <img
            src={getImageUrl(selectedPokemon.id)} // Utiliser l'URL générée pour l'image
            alt={selectedPokemon.names?.[language] || selectedPokemon.names?.en}
            className="w-96 h-auto rounded-lg"
          />
        </div>
        <div className="md:flex-row text-center">
          <h3 className="text-3xl font-bold mb-2 text-white ">Attacks </h3>
          <div className="space-y-4 space-x-2">
            {selectedPokemon.moves ? (
              selectedPokemon.moves.map((attack, index) => (
                <span
                  key={index}
                  className="inline-block bg-green-500 text-white py-1 px-4 rounded-full text-center w-auto"
                >
                  {attack}
                </span>
              ))
            ) : (
              <span>Aucune attaque disponible</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
