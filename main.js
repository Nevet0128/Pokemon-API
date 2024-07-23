let randomNumber = Math.floor(Math.random() * 150) + 1,
  URL = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
  pokemonList = '',
  pokemonStack = new Object(),
  pokemonName = '',
  pokemonID

const $searchBar = document.getElementById('pokemonSearchBar'),
  $searchButton = document.getElementById('buttonSearch'),
  $pokemonContainer = document.getElementById('pokemon__container'),
  $pokemonTableContainer = document.getElementById('pokemon__table__container')

document.addEventListener('click', (e) => {
  if (e.target == $searchButton) {
    let lowCaseName = $searchBar.value.toLowerCase()
    let param = lowCaseName
    //console.log(param, typeof param)
    URL = `https://pokeapi.co/api/v2/pokemon/${param}`
    getPokemon(URL)
  }

  /*
  if (e.target == document.querySelector('.add_pokemon')) {
    if (pokemonStack[pokemonName]) {
      alert('Ya está en la tabla el pokémon')
      return
    }
    
    pokemonStack[pokemonName] = pokemonID
    
    URL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    
    addPokemonTable(URL)
  }
  
  if (e.target == document.querySelector('.info_pokemon')) {
    console.log('info')
  }
   */
})

async function getPokemon(URL) {
  try {
    pokemonList = ''
    const res = await fetch(URL)
    const data = await res.json()
    //console.log(data)

    if (data.id > 150 || data.id <= 0) {
      alert('El pokémon está fuera del rango especificado')
      return
    }

    pokemonName = data.name
    pokemonID = data.id

    pokemonList += `
      <div class="pokemon__container__basic-info">
        <h3 class="pokemon__name">${data.name}</h3>
        <span class="pokemon__id">Nº${data.id}</span>
      </div>

      <div class="pokemon__container__image">
        <img
          src="${data.sprites.front_default}"
          alt="image of ${data.name}"
          class="pokemon__img"
        />
      </div>

      <div class="pokemon__container__options">
        <button class="add_pokemon">Agregar</button>
        <button class="info_pokemon">Info</button>
      </div>

  `
    $pokemonContainer.dataset.id = data.id
    $pokemonContainer.innerHTML = pokemonList
  } catch (error) {
    console.log(error)
  }
}

async function addPokemonTable(URL) {
  try {
    pokemonList = ''
    let response = await fetch(URL)
    let data = await response.json()

    pokemonList += `
    <div class="pokemon__table__card">
      <div class="pokemon__container__basic-info">
        <h3 class="pokemon__name">${data.name}</h3>
        <span class="pokemon__id">Nº${data.id}</span>
      </div>

      <div class="pokemon__container__image">
        <img
          src="${data.sprites.front_default}"
          alt="image of ${data.name}"
          class="pokemon__img"
        />
      </div>

      <div class="pokemon__container__options">
        <button class="info_pokemon">Info</button>
      </div>
    </div>
  `
    $pokemonTableContainer.dataset.id = data.id
    $pokemonTableContainer.appendChild = pokemonList
  } catch (error) {}
}

getPokemon(URL)

/*
<div id="ventanaModal" class="modal">
    <div class="contenido-modal">
        <span class="cerrar">&times;</span>
        <h2>Ventana modal</h2>
        <p>Esto es el texto de la ventana</p>
    </div>
  </div>
*/
