const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.imagem_poke');

const form = document.querySelector('.form'); 
const input = document.querySelector('.input__search'); 
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let search_pokemon = 34;

const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']
    ['black-white']['animated']['front_default'];
    input.value = '';
    search_pokemon = data.id;
    } 
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'not found my bro :(';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase())
    input.value = ''
});

buttonPrev.addEventListener('click', () => {
    if (search_pokemon > 1) {
        search_pokemon -= 1;
    renderPokemon(search_pokemon);
    }
});
buttonNext.addEventListener('click', () => {
    search_pokemon += 1;
    renderPokemon(search_pokemon);
});

renderPokemon(search_pokemon); 