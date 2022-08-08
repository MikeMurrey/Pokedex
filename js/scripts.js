/*jshint esversion: 6*/

const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  const modalContainer = document.querySelector('#modal-container');

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

  // showDetails function used to get pokemon info that will be returned in console and brings modal into view
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
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

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // specify what details I want assigned to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

// this will create a modal to show off the various pokemon details and image
  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

// close button that will hide the modal upon click
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height/10 + 'm';

    let imgElement = document.createElement('img');
    imgElement.classList.add('img-element');
    imgElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imgElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

// function to hide the modal from view
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

// if the user hits the escape key, the modal will be removed from view
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

// if the user clicks the modal container space, the modal will be removed from view
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
