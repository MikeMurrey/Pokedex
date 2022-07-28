/*jshint esversion: 6*/

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

// loop will iterate over the pokemonList array and write each pokemons' name and height
// if/else used to write special text for pokemon with a height greater than/equal to 2 or less than/equal to 0.5
pokemonList.forEach(function(pokemon) {
  if (pokemon.height >= 2){
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ' m) That\'s a tall one!');
  } else if (pokemon.height <= 0.5){
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ' m) This one is quite small!');
  } else {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ' m)</p>');
  }
});
