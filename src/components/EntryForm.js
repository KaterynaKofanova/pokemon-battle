import React, { useState } from "react";
import axios from "axios";
import {PokemonNames} from '../data/PokemonNames'

const EntryForm = ({ setPokeOne, setPokeTwo, setTypesOne, setTypesTwo }) => {
  const [nameOne, setNameOne] = useState("");
  const [nameTwo, setNameTwo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const pokeOne = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nameOne.toLowerCase()}/`
      );
      const pokeTwo = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nameTwo.toLowerCase()}/`
      );
      let typesOne = [];
      let typesTwo = [];
      for (const type of pokeOne.data.types) {
        const typeInfo = await axios.get(type.type.url);
        typesOne = typesOne.concat(typeInfo.data.damage_relations);
      }
      for (const type of pokeTwo.data.types) {
        const typeInfo = await axios.get(type.type.url);
        typesTwo = typesTwo.concat(typeInfo.data.damage_relations);
      }
      setPokeOne(pokeOne.data);
      setPokeTwo(pokeTwo.data);
      setTypesOne(typesOne);
      setTypesTwo(typesTwo);
      setNameOne("");
      setNameTwo("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const randomPokeOne = PokemonNames[Math.round(Math.random()*897)]
  const randomPokeTwo = PokemonNames[Math.round(Math.random()*897)]

  return (
    <form onSubmit={handleSubmit}>
      <datalist id='pokemonNames'>
        {PokemonNames.map(p => <option value={p} />)}
      </datalist>
      <div>
        First pokemon:{" "}
        <input
          type="text"
          list='pokemonNames'
          value={nameOne}
          required
          onChange={(e) => setNameOne(e.target.value)}
        />
        <p>How about <span onClick={()=> setNameOne(randomPokeOne)} className='RandomPoke'>{randomPokeOne}</span>?</p>
      </div>
      <div>
        Second pokemon:{" "}
        <input
          type="text"
          list='pokemonNames'
          value={nameTwo}
          required
          onChange={(e) => setNameTwo(e.target.value)}
        />
        <p>How about <span onClick={()=> setNameTwo(randomPokeTwo)} className='RandomPoke'>{randomPokeTwo}</span>?</p>
      </div>
      <button type="submit">Compare</button>
    </form>
  );
};

export default EntryForm;
