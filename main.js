let randomNumber = Math.floor(Math.random() * 150) + 1,
  URL = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
  pokemonList = ''

const $searchBar = document.getElementById('pokemonSearchBar'),
  $searchButton = document.getElementById('buttonSearch'),
  $pokemonContainer = document.getElementById('pokemon__container')

document.addEventListener('click', (e) => {
  if (e.target == $searchButton) {
    let param = $searchBar.value
    console.log(param, typeof param)
    URL = `https://pokeapi.co/api/v2/pokemon/${param}`
    getPokemon(URL)
  }
})

async function getPokemon(URL) {
  try {
    pokemonList = ''
    const res = await fetch(URL)
    const data = await res.json()
    console.log(data)

    if (data.id > 150 || data.id < 1) {
      alert('El pokémon está fuera del rango especificado')
      return
    }

    pokemonList += `
      <div id="pokemon__container__basic-info">
        <h3 class="pokemon__name">${data.name}</h3>
        <span class="pokemon__id">Nº${data.id}</span>
      </div>
    <div id="pokemon__container__image">
      <img
      src="${data.sprites.front_default}"
      alt="image of ${data.name}"
      class="pokemon__img"
    />
    </div>
    <div id="pokemon__container__options">
      <button>Agregar</button>
      <button>Info</button>
    </div>

  `
    $pokemonContainer.dataset.id = data.id
    $pokemonContainer.innerHTML = pokemonList
  } catch (error) {
    console.log(error)
  }
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
