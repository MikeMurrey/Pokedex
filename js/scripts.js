/*jshint esversion: 6*/

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// used to add new pokemon to the list
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
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
    pokemonRepository.loadDetails(pokemon).then(function() {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');
    let listpokemon = document.createElement('li');
    pokemonList.classList.add('group-list-item');
    pokemonList.classList.add('col-sm-4', 'col-md-6', 'col-lg-9');
    let button = document.createElement('button');
    button.classList.add('pokemonButton');
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemon-modal');
    $(button).addClass('button-class btn-block btn m1');
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

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // specify what details I want assigned to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types.map((type) => type.type.name).join(', ');
      pokemon.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
    }).catch(function (e) {
      console.error(e);
    });
  }

  // this will create a modal to show off the various pokemon details and image
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + '<h1>');

    let imageElement = $('<img class="pokemon-image">');
    imageElement.attr('src', pokemon.imageUrl);

    let heightElement = $('<p>' + 'Height: ' + pokemon.height/10 + ' m' + '<p>');

    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight/10 + ' kg' + '<p>');

    let typeElement = $('<p>' + 'Types: ' + pokemon.types + '<p>');

    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '<p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// first, load the data from pokeapi
// then loop will iterate over the pokemonList array and write each pokemons' name and height
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
