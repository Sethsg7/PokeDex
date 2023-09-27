import React from "react";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  filterByWeakness,
  filterByType,
  filterBySearch,
} from "./helpers/dex.helpers";

const allTypes = [
  "Normal",
  "Ghost",
  "Ice",
  "Grass",
  "Flying",
  "Fire",
  "Water",
  "Ground",
  "Fighting",
  "Psychic",
  "Poison",
  "Bug",
  "Electric",
  "Rock",
  "Dragon",
];

const allWeaks = [
  "Ghost",
  "Ice",
  "Grass",
  "Flying",
  "Fire",
  "Water",
  "Ground",
  "Fighting",
  "Psychic",
  "Poison",
  "Bug",
  "Electric",
  "Rock",
  "Dragon",
];

function App() {
  const [list, setList] = useState([]);
  let [searchType, setSearchType] = useState("");
  let [searchWeak, setSearchWeak] = useState("");
  let [searchBar, setSearchBar] = useState("");

  console.log(searchType);

  function getPokemon() {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((response) => response.json())
      .then((pokeInfo) => setList(pokeInfo.pokemon))
      .catch((error) => console.error(error));
  }

  useEffect(() => getPokemon, []);

  // let byType = filterByType(list, searchType); //Returns an array.
  // let byWeakness = filterByWeakness(list, searchWeak);
  let filteredPokemon = filterByType(list, searchType);
  filteredPokemon = filterByWeakness(filteredPokemon, searchWeak); //The filtered type list is placed into the weak list.
  filteredPokemon = filterBySearch(filteredPokemon, searchBar);

  //let pokemon = getListOf(list, "type"); //No longer used.

  //Create a box search list to go through names.
  return (
    <div className="page">
      <h1>Generation 1 Pokedex</h1>

      <form>
        <input
          type="text"
          name="text"
          id="text"
          value={searchBar}
          onChange={(event) => setSearchBar(event.target.value)}
        />
      </form>

      <form>
        <label htmlFor="searchType">Filter by Type</label>
        <select //Makes drop down list.
          name="searchType"
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          {/* //Add a none option? */}
          <option value="">All</option>
          {allTypes.map((type, idx) => {
            //Creates poke options in the drop down list.
            return (
              <option key={type + idx} value={type}>
                {type}
              </option>
            );
          })}
        </select>
      </form>

      <form>
        <label htmlFor="searchWeak">Filter by Weakness</label>
        <select //Makes drop down list.
          name="searchWeak"
          id="searchWeak"
          value={searchWeak}
          onChange={(e) => setSearchWeak(e.target.value)}
        >
          <option value="">All</option>
          {allWeaks.map((weak, idx) => {
            return (
              <option key={weak + idx} value={weak}>
                {weak}
              </option>
            );
          })}
        </select>
      </form>

      <ul>
        {filteredPokemon.map((poke) => {
          //List errors if it's not an array anymore.
          return (
            <li key={poke.id}>
              {poke.name} - {poke.num} -{" "}
              <span style={{ color: "blue" }}>Type: </span> {poke.type} -{" "}
              <span style={{ color: "red" }}>Weak: </span>
              {poke.weaknesses}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
