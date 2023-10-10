const pokemonList = document.getElementById("pokemon-list");
const pokemonShow = document.getElementById("pokemon-show");

async function getPokemonsFromApi() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
        if (!response.ok) {
            throw new Error("Fallo en la llamada");
        }
        const pokemons = await response.json();
        return pokemons.results;
    }
    catch (error) {
        console.log(error);
        alert("Ha habido un error");
        return [];
    }
}

async function createPokemonsList() {
    const pokemons = await getPokemonsFromApi();
    console.log(pokemons);
    pokemons.forEach((pokemon) => {
        const li = document.createElement("li");
        li.innerHTML = pokemon.name.toUpperCase();
        li.addEventListener("click", () => {
            getSinglePokemonFromApi(pokemon.url)
        })
        pokemonList.appendChild(li);
    })
}

async function getSinglePokemonFromApi(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Fallo en la llamada");
        }
        const pokemon = await response.json();
        console.log(pokemon);
        createPokemonBox(pokemon)
        return pokemon;
    }
    catch (error) {
        console.log(error);
        alert("Ha habido un error");
        return null;
    }
}

async function createPokemonBox(pokemon) {
    //const pokemon = await getSinglePokemonFromApi(url);

    pokemonShow.innerHTML = ""; //vaciamos section
    pokemonShow.style.background = '';

    //NOMBRE
    const nameElem = document.createElement('h3'); //creamos <h3></h3>
    nameElem.innerText = pokemon.name.toUpperCase(); //creamos el contenido
    pokemonShow.appendChild(nameElem); //ubicamos todo el elemento en section

    //NÚMERO
    const numeroElem = document.createElement('h3');
    numeroElem.innerText = `#${pokemon.order}`;
    pokemonShow.appendChild(numeroElem);

    //IMAGEN
    const imgElem = document.createElement('img');
    imgElem.src = pokemon.sprites.front_default;
    pokemonShow.appendChild(imgElem);
    //IMAGEN BACK
    const imgElemBack = document.createElement('img');
    imgElemBack.src = pokemon.sprites.back_default;
    pokemonShow.appendChild(imgElemBack);

    //TIPOS
    const tipoPokemon = [];
    pokemon.types.forEach((pokemontype) => {
        tipoPokemon.push(pokemontype.type.name);
    });
    const tipoPokemonStr = tipoPokemon.join(" - ");
    const tipoElem = document.createElement('p');
    tipoElem.innerHTML = tipoPokemonStr;
    pokemonShow.appendChild(tipoElem);
    //color tarjeta por tipo
    const coloresYTipos = {
        normal: '#E5E5E5',
        grass: '#9CFF18',
        fire: '#FF4330',
        electric: '#FFF830',
        water: '#30E1FF',
        ice: '#91FFF7',
        flying: '#FFC8C8',
        psiquic: '#FF8585',
        poison: '#C585FF',
        earth: '#FF9901',
        rock: '#BCBCBC',
        fight: '#DAA000',
        bug: '#4E9104',
        dragon: '#187AFF'
    }
    if (tipoPokemon.length === 1) {
        // Si solo hay un tipo, establece un color sólido
        pokemonShow.style.backgroundColor = coloresYTipos[tipoPokemon[0]];
      } else if (tipoPokemon.length === 2) {
        // Si hay dos tipos, crea un degradado entre los colores de ambos tipos
        const color1 = coloresYTipos[tipoPokemon[0]];
        const color2 = coloresYTipos[tipoPokemon[1]];
        pokemonShow.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
      }

    //ALTURA Y PESO
    const alturaElem = document.createElement('p');
    alturaElem.innerText = (pokemon.height * 0.10).toFixed(2) + ' mts.';
    pokemonShow.appendChild(alturaElem);
    const pesoElem = document.createElement('p');
    pesoElem.innerText = (pokemon.weight * 0.1).toFixed(2) + ' kgs.';
    pokemonShow.appendChild(pesoElem);

    //flechas navegación, flipada máxima
    /* const backBtn = document.createElement('button');
    backBtn.innerText = 'BACK';
    backBtn.addEventListener('click', ()=> {
        getSinglePokemonFromApi(pokemon.url)
    })
    pokemonShow.appendChild(backBtn);
    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'NEXT';
    pokemonShow.appendChild(nextBtn); */
}

createPokemonsList();