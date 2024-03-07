const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-id');
const pokemonImg = document.querySelector('.pokemon-img');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let search = 1;

const fetchPokemon  = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiResponse.status == 200){
        const data = await apiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading ... ';
    pokemonImg.src = 'images/bubble-pixel-dots.png';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonId.innerHTML = data.id + '-';
        pokemonName.innerHTML = data.name;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputSearch.value = '';
        search = data.id;
    } else {
        pokemonId.innerHTML = '¬¬';
        pokemonName.innerHTML = ' Not Found';
        pokemonImg.src = 'images/bubble-pixel-sad.png';
        inputSearch.value = '';   
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
});

btnPrev.addEventListener('click', () =>{
    if (search > 1) {
        search -= 1;
        renderPokemon(search);
    }
});

btnNext.addEventListener('click', () =>{
    search += 1;
    renderPokemon(search);
});