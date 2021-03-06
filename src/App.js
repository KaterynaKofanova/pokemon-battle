import "./App.css";
import React, { useState } from "react";
import EntryForm from "./components/EntryForm";
import PokemonCard from "./components/PokemonCard";

const App = () => {
  const [pokeOne, setPokeOne] = useState(null);
  const [pokeTwo, setPokeTwo] = useState(null);
  const [typesOne, setTypesOne] = useState(null);
  const [typesTwo, setTypesTwo] = useState(null);
  return (
    <div className="App">
      <h3>Compare Pokemons by Type</h3>
      <div>
        <EntryForm
          setPokeOne={setPokeOne}
          setPokeTwo={setPokeTwo}
          setTypesOne={setTypesOne}
          setTypesTwo={setTypesTwo}
        />
      </div>
      <div className="Cards">
        <div>
          <PokemonCard poke={pokeOne} types={typesOne} opponent={pokeTwo} />
        </div>
        {!pokeOne && !pokeTwo ? null : <h1>VS</h1>}
        <div>
          <PokemonCard poke={pokeTwo} types={typesTwo} opponent={pokeOne} />
        </div>
      </div>
    </div>
  );
};

export default App;
