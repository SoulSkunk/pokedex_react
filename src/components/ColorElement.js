// src/components/TypeBadge.js
import React from "react";

const ColorElement = ({ type }) => {
  const typeColors = {
    poison: "bg-purple-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-cyan-500",
    dragon: "bg-indigo-500",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    normal: "bg-gray-400",
    fighting: "bg-orange-700",
    flying: "bg-blue-300",
    ground: "bg-yellow-700",
    rock: "bg-gray-700",
    bug: "bg-green-700",
    ghost: "bg-purple-700",
    steel: "bg-gray-500",
  };

  const colorClass = typeColors[type?.toLowerCase()] || "bg-gray-500";

  return (
    <span
      className={`inline-block text-white py-1 px-4 rounded-full text-lg font-semibold ${colorClass}`}
    >
      {type}
    </span>
  );
};

export default ColorElement;
