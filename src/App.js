import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LanguageProvider } from "./components/LanguageContext";

import Home from "./components/Home";
import Details from "./components/Details";
import MyPokemons from "./components/MyPokemons";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/details/:id", element: <Details /> },
    { path: "/my-pokemons", element: <MyPokemons /> },
  ]);

  return (
    <LanguageProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </LanguageProvider>
  );
}

export default App;
