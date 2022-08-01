/*jshint esversion: 6*/

let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison']},
    {name: 'Ivysaur', height: 1, type: ['Grass', 'Poison']},
    {name: 'Venusaur', height: 2, type: ['Grass', 'Poison']},
    {name: 'Charmander', height: 0.6, type: ['Fire']},
    {name: 'Charmeleon', height: 1.1, type: ['Fire']},
    {name: 'Charizard', height: 1.7, type: ['Fire', 'Flying']},
    {name: 'Squirtle', height: 0.5, type: ['Water']},
    {name: 'Wartortle', height: 1, type: ['Water']},
    {name: 'Blastoise', height: 1.6, type: ['Water']}
  ];

// used to add new pokemon to the list
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon does not fit criteria');
    }
  }

// used to return a list of pokemon and their characteristics
  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();


// loop will iterate over the pokemonList array and write each pokemons' name and height
// if/else used to write special text for pokemon with a height greater than/equal to 2 or less than/equal to 0.5
pokemonRepository.getAll().forEach(function(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listpokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
});
