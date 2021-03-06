import React, { useState } from "react";
import axios from "axios";

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        First pokemon:{" "}
        <input
          type="text"
          value={nameOne}
          required
          onChange={(e) => setNameOne(e.target.value)}
        />
      </div>
      <div>
        Second pokemon:{" "}
        <input
          type="text"
          value={nameTwo}
          required
          onChange={(e) => setNameTwo(e.target.value)}
        />
      </div>
      <button type="submit">Compare</button>
    </form>
  );
};

export default EntryForm;
