import { useState, useEffect } from "react";

import Header from "./Header";

function MyPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture du modal
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonHeight, setPokemonHeight] = useState("");
  const [pokemonWeight, setPokemonWeight] = useState("");

  // Récupérer les Pokémon stockés dans le localStorage au chargement de la page
  useEffect(() => {
    const savedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
    setPokemons(savedPokemons);
  }, []);

  // Fonction pour fermer le modal
  const closeModal = () => setIsModalOpen(false);

  // Fonction pour ouvrir le modal
  const openModal = () => setIsModalOpen(true);

  // Fonction pour gérer l'ajout d'un Pokémon dans le localStorage
  const handleCreatePokemon = (e) => {
    e.preventDefault();

    const newPokemon = {
      id: Date.now(), // Utilisation du timestamp pour générer un ID unique
      name: pokemonName,
      type: pokemonType,
      height: pokemonHeight,
      weight: pokemonWeight,
    };

    // Récupérer les Pokémon existants dans le localStorage
    const savedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
    savedPokemons.push(newPokemon);

    // Sauvegarder les nouveaux Pokémon dans le localStorage
    localStorage.setItem("pokemons", JSON.stringify(savedPokemons));

    // Mettre à jour l'état avec les nouveaux Pokémon
    setPokemons(savedPokemons);

    // Réinitialiser les champs du formulaire
    setPokemonName("");
    setPokemonType("");
    setPokemonHeight("");
    setPokemonWeight("");

    // Fermer le modal après l'ajout
    closeModal();
  };

  return (
    <div>
      <Header />
      <h1 className="text-white text-3xl text-center mt-4">My Pokémons</h1>

      <button
        onClick={openModal}
        className="p-2 bg-red-500 text-white text-xl rounded-md hover:bg-red-700"
      >
        Create Pokémon +
      </button>

      <div>
        {pokemons.length === 0 ? (
          <p>No Pokémon created yet.</p>
        ) : (
          <ul>
            {pokemons.map((pokemon) => (
              <li key={pokemon.id}>
                {pokemon.name} - {pokemon.type} - {pokemon.height}m -{" "}
                {pokemon.weight}kg
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-2xl mb-4">Create Your Pokémon</h2>
            <form onSubmit={handleCreatePokemon}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={pokemonName}
                  onChange={(e) => setPokemonName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="block text-sm">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  value={pokemonType}
                  onChange={(e) => setPokemonType(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="height" className="block text-sm">
                  Height (in meters)
                </label>
                <input
                  type="number"
                  id="height"
                  value={pokemonHeight}
                  onChange={(e) => setPokemonHeight(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="weight" className="block text-sm">
                  Weight (in kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={pokemonWeight}
                  onChange={(e) => setPokemonWeight(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 mr-2 bg-gray-500 text-white rounded-md"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-md"
                >
                  Create Pokémon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPokemons;
