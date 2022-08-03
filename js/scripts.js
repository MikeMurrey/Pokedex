/*jshint esversion: 6*/

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// used to add new pokemon to the list
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
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

  // showDetails function used to get pokemon info that will be returned in console
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    // event listener below will return pokemon in console when its button is clicked
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// first, load the data from pokeapi
// then loop will iterate over the pokemonList array and write each pokemons' name and height
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
