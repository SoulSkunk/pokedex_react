import "../App.css";

// Importation des hooks
import { useState } from "react";
import { Link } from "react-router-dom";

// Importation des données
import pokemonData_tmpry from "../data/pokemonData_tmpry.json";

// Importation des composants
import SearchBar from "./SearchBar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrage des Pokémon en fonction de la recherche de l'utilisateur
  const filteredPokemons = pokemonData_tmpry.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Home">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
              to={`/details/${pokemon.id}`}
              className="group relative block bg-black p-2 rounded-md overflow-hidden"
            >
              <img
                alt={pokemon.name}
                src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
              />
              <div className="relative p-2 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                  {pokemon.type} {/* Type du Pokémon */}
                </p>
                <p className="text-xl font-bold text-white sm:text-2xl">
                  {pokemon.name} {/* Nom du Pokémon */}
                </p>
                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white">{pokemon.description}</p>
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
