import React from "react";
import { useParams } from "react-router-dom"; // Importez useParams
import pokemonData_tmpry from "../data/pokemonData_tmpry.json";
import "../App.css";

function Details() {
  // Récupération de l'id du Pokémon depuis les paramètres
  const { id } = useParams();
  const packageId = parseInt(id); // Convertir l'id en entier

  // Cherche l'objet correspondant à l'ID
  const selectedPokemon = pokemonData_tmpry.find(
    (item) => item.id === packageId
  );

  return (
    <div className="Details">
      {/* Affiche le titre du Pokémon */}
      <h1 className="text-3xl font-bold mb-4">
        Détails de {selectedPokemon ? selectedPokemon.name : "non trouvés"}
      </h1>
      {/* Affiche les détails du Pokémon si trouvé */}
      {selectedPokemon && (
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80" // Vous pouvez remplacer cela par une image du Pokémon si vous en avez une
              alt={selectedPokemon.name}
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">
              Type : {selectedPokemon.type}
            </h2>
            <p className="text-lg mb-4">{selectedPokemon.description}</p>
            <h3 className="text-lg font-bold mb-2">Attaques :</h3>
            <ul className="list-disc pl-5">
              {selectedPokemon.attacks &&
                selectedPokemon.attacks.map((attack, index) => (
                  <li key={index}>{attack}</li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
