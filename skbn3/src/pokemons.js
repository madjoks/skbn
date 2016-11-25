
const pokemonFields = ['id', 'name', 'height', 'weight', 'name'];

export default async function getPokemons(url, i = 0) {
  console.log('getPokemons');
  const response = await fetch(url);
  const page = await response.json();
  const pokemons = page.results;
  const nextPageUrl = page.next;


  if (nextPageUrl) {
    const pokemons2 = await getPokemons(nextPageUrl, i + 1);
    return [
      ...pokemons,
      ...pokemons2
    ]
  }
  return pokemons;
}

async function getPokemon(url) {
  console.log('getPokemon ', url);
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
}
