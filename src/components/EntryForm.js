import React, { useState } from "react";
import axios from "axios";
import {PokemonNames} from '../data/PokemonNames'
import { findAllByDisplayValue } from "@testing-library/dom";

const EntryForm = ({ setPokeOne, setPokeTwo, setTypesOne, setTypesTwo }) => {
  const [nameOne, setNameOne] = useState("");
  const [nameTwo, setNameTwo] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!PokemonNames.includes(nameOne)){
      setMessage(`${nameOne} is not a valid pokemon name! Try a different name.`)
      setLoading(false)
    }else if(!PokemonNames.includes(nameTwo)){
      setMessage(`${nameTwo} is not a valid pokemon name! Try a different name.`)
      setLoading(false)
    }else{
      setMessage(null)
      setLoading(true)
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
      setMessage('One of the pokemon names in incorrect!');
      setLoading(false)
    }
    }
  };

  const randomPokeOne = PokemonNames[Math.round(Math.random()*896)]
  const randomPokeTwo = PokemonNames[Math.round(Math.random()*896)]

  return (
    <div>
      {message ? <div className='Message'>{message}</div> : null}
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
      {!loading ? <div style={{textAlign:'center'}}><button type="submit">Compare</button></div> : <div style={{textAlign:'center'}}><span className='loader'></span> Loading...</div>}
    </form>
    </div>
  );
};

export default EntryForm;
