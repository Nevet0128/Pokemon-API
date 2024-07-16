let numeroAleatorio = Math.floor(Math.random() * 150) + 1,
  URL = `https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`,
  pokemonList = '';

const $searchBar = document.getElementById("pokemonSearchBar"),
  $searchButton = document.getElementById("buttonSearch"),
  $pokemonContainer = document.getElementById("pokemon__container");
  
document.addEventListener("click", e => {
    
  if (e.target == $searchButton) {
    let param = $searchBar.value;
    console.log(param, typeof(param))
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

   pokemonList += `
    <div class="pokemon__container">
      <h3 class="pokemon__name">${data.name}</h3>
      <img src="${data.sprites.front_default}" alt="image of ${data.name}" class="pokemon__img">
      <div class="pokemon__id">${data.id}</div>
    </div>
  `
   
   $pokemonContainer.innerHTML = pokemonList;

 } catch (error) {
  console.log(error)
 }
}

getPokemon(URL)