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

  if (e.target == document.getElementById('add__pokemon__btn')) {
    let pokemonLenght = Object.keys(pokemonStack).length

    //console.log(pokemonLenght)

    if (pokemonStack[pokemonName]) {
      alert('Ya está en la tabla el pokémon')
      return
    }

    if (pokemonLenght > 5) {
      alert('El límite es de 6 pokémon')
      return
    }

    pokemonStack[pokemonName] = pokemonID
    URL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    addPokemonTable(URL)
  }

  if (e.target == document.querySelector('.info_pokemon')) {
    console.log('info')
  }
})

$searchBar.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    let lowCaseName = $searchBar.value.toLowerCase()
    let param = lowCaseName
    //console.log(param, typeof param)
    URL = `https://pokeapi.co/api/v2/pokemon/${param}`
    getPokemon(URL)
  }
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
      <div>
        <h3 class="pokemon__name">${data.name}</h3>
        <span class="pokemon__id">Nº${data.id}</span>
      </div>

      <div>
        <img
          class="pokemon__img"
          src="${data.sprites.front_default}"
          alt="image of ${data.name}"
        />
      </div>

      <div class="pokemon__container__options">
        <button id="add__pokemon__btn" >Agregar</button>
        <button class="info__pokemon__btn" >Info</button>
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

    let pokemonCard = document.createElement('div'),
      pokemonName = document.createElement('h3'),
      pokemonImg = document.createElement('img'),
      pokemonId = document.createElement('span')

    pokemonCard.className = 'pokemon__card'

    pokemonName.className = 'pokemon__name'
    pokemonName.textContent = data.name

    pokemonImg.className = 'pokemon__img'
    pokemonImg.src = `${data.sprites.front_default}`
    pokemonImg.alt = `image of ${data.name}`

    pokemonId.className = 'pokemon__id'
    pokemonId.textContent = `Nº${data.id}`

    pokemonCard.appendChild(pokemonName)
    pokemonCard.appendChild(pokemonImg)
    pokemonCard.appendChild(pokemonId)

    pokemonCard.dataset.id = data.id
    $pokemonTableContainer.appendChild(pokemonCard)
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
