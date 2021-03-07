import "./App.css";
import React, { useState } from "react";
import EntryForm from "./components/EntryForm";
import PokemonCard from "./components/PokemonCard";


const App = () => {
  const [pokeOne, setPokeOne] = useState(null);
  const [pokeTwo, setPokeTwo] = useState(null);
  const [typesOne, setTypesOne] = useState(null);
  const [typesTwo, setTypesTwo] = useState(null);

  const handleReset = () => {
    setPokeOne(null)
    setPokeTwo(null)
  }
  return (
    <div className="App">
      {!pokeOne&&!pokeTwo ? 
      <div>
      <h3>Compare Pokemons by Type and Base Stats</h3>
      <div>
        <EntryForm
          setPokeOne={setPokeOne}
          setPokeTwo={setPokeTwo}
          setTypesOne={setTypesOne}
          setTypesTwo={setTypesTwo}
        />
      </div>
      </div>
      : <button onClick={handleReset}>Back</button>
}
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
