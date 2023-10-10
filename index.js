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
    pokemons.forEach((pokemon) => {
        const li = document.createElement("li");
        li.innerHTML = pokemon.name;
        li.addEventListener("click", ()=>{
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
        const tipoPokemon = [];
        pokemon.types.forEach((pokemontype) => {
            tipoPokemon.push(pokemontype.type.name);
        });
        
        pokemonShow.innerHTML = ""; //vaciamos section

        //NOMBRE
        
        const nameElem = document.createElement('h3'); //creamos <h3></h3>
        nameElem.innerText = pokemon.name; //creamos el contenido
        pokemonShow.appendChild(nameElem); //ubicamos todo el elemento en section

        //IMAGEN
        const imgElem = document.createElement('img');
        imgElem.src = pokemon.sprites.front_default;
        pokemonShow.appendChild(imgElem);

        //TIPOS
        const tipoPokemonStr = tipoPokemon.join(" - ");

        /*
        pokemonShow.innerHTML = `<h3 class="nombrePokemon">${pokemon.name}</h3>
        <img class="imgPokemon" src="${pokemon.sprites.front_default}" alt="${pokemon.name} picture 1st gen.">
        <p class="numPokemon">${pokemon.order}</p>
        <p class="tipoPokemon">${tipoPokemonStr}</p>
        <p class="altura">${pokemon.height}</p>
        <p class="peso">${pokemon.weight}</p>
        `; */
        return pokemon;
    }
    catch(error){
        console.log(error);
        alert("Ha habido un error");
        return null;
    }
}

async function createPokemonBox(){
    const pokemon = await getSinglePokemonFromApi();
}

createPokemonsList();