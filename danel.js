const pokemonList = document.getElementById("pokemon-list");
const pokemonShow = document.getElementById("pokemon-show");

async function getPokemonsFromApi(){
    try{
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
        if(!response.ok){
            throw new Error("Fallo en la llamada");
        }
        const pokemons = await response.json();
        return pokemons.results;
    }
    catch(error){
        console.log(error);
        alert("Ha habido un error");
        return [];
    }
}

async function createPokemonsList(){
    const pokemons = await getPokemonsFromApi();
    console.log(pokemons);
    pokemons.forEach((pokemon)=>{
        const li = document.createElement("li");
        li.innerHTML= pokemon.name;
        li.addEventListener("click",()=>{
            getSinglePokemonFromApi(pokemon.url)
        })
        pokemonList.appendChild(li);
    })
}

async function getSinglePokemonFromApi(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Fallo en la llamada");
        }
        const pokemon = await response.json();
        console.log(pokemon);
        return pokemon;
    }
    catch(error){
        console.log(error);
        alert("Ha habido un error");
        return null;
    }
}

createPokemonsList();