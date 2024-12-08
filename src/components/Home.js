import "../App.css";

// Importation des hooks
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "./LanguageContext";

// Importation des composants
import SearchBar from "./SearchBar";
import Header from "./Header";
import ColorElement from "./ColorElement";

function Home() {
  const { language } = useContext(LanguageContext);

  //Use States
  const [pokemonData, setPokemonData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] = useState("");

  const [availableTypes, setAvailableTypes] = useState([]);

  // Fonction pour récupérer les données des Pokémon en ligne
  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(
          "https://pokedex-jgabriele.vercel.app/pokemons.json"
        );
        const data = await response.json();
        setPokemonData(data);

        // Extraire dynamiquement les types uniques
        const types = new Set();
        data.forEach((pokemon) =>
          pokemon.types.forEach((type) => types.add(type))
        );
        setAvailableTypes(Array.from(types));
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données Pokémon :",
          error
        );
      }
    }
    fetchPokemonData();
  }, []);

  // Filtrage des Pokémon selon la recherche et le type sélectionné
  const filteredPokemons = pokemonData.filter((pokemon) => {
    const matchesSearch = pokemon.names?.[language]
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "" || pokemon.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  // Fonction pour générer l'URL de l'image locale
  const getImageUrl = (id) => {
    // Générer l'URL pour les images locales dans le dossier pokemon_img
    return `/pokemon_img/${id}.png`; // Assurez-vous que l'extension est correcte (png, jpg, etc.)
  };

  // Fonction pour formater un nombre avec une virgule (locale française) et convertir en kg/m avec décimale
  const formatNumberWithComma = (number) => {
    // Diviser par 10 pour obtenir le bon format (ex: 1500 -> 150.0)
    const formattedNumber = (number / 10).toFixed(1); // Limiter à 1 décimale
    return formattedNumber.replace(".", ","); // Remplacer le point par une virgule
  };

  return (
    <div className="Home">
      <Header />
      <div className="flex justify-center items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {/* Sélecteur pour filtrer par type */}
        <div className="w-full  ">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block  p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-lg"
          >
            <option value="">All Types</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                {/* Capitalize */}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Vérifie si le tableau filteredPokemons est vide */}
        {filteredPokemons.length === 0 ? (
          <div className="flex items-center justify-center h-48 col-span-full">
            <p className="text-center text-lg text-red-500 mt-10">
              Aucun Pokémon ne correspond à votre recherche.
            </p>
          </div>
        ) : (
          filteredPokemons.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={{
                pathname: `/details/${pokemon.id}`,
                state: { pokemon },
              }}
              className="group relative block bg-black p-2 rounded-md overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center mt-20">
                <img
                  alt={pokemon.names?.[language]}
                  src={getImageUrl(pokemon.id)} // Utilisation de l'image locale
                  className="max-w-xs h-auto object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />
              </div>
              <div className="relative p-2 sm:p-6 lg:p-8">
                <p className="text-xl font-bold text-white sm:text-3xl">
                  {pokemon.names?.[language]} {/* Nom du Pokémon */}
                </p>
                <br />
                <div className="flex flex-wrap gap-1">
                  {pokemon.types.map((type) => (
                    <ColorElement key={type} type={type} />
                  ))}
                </div>
                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xl text-pink-500">
                      <span className="text-xl text-white">Height</span>{" "}
                      {formatNumberWithComma(pokemon.height)} m
                    </p>
                    <p className="text-xl text-pink-500">
                      <span className="text-xl text-white">Weight </span>
                      {formatNumberWithComma(pokemon.weight)} kg
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
