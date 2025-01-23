const pokemonName = document.querySelector(".pokemon-name");
const pokemonId = document.querySelector(".pokemon-id");
const pokemonImg = document.querySelector(".pokemon-img");
const form = document.querySelector(".form");
const inputSearch = document.querySelector(".input-search");
const pokemonDescription = document.querySelector(".description");
const pokemonTypes = document.querySelector(".types");
const pokemonSkills = document.querySelector(".skills");
const pokemonHeight = document.querySelector(".height");
const pokemonWeight = document.querySelector(".weight");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let search = 1;

const fetchPokemon = async (pokemon) => {
  try {
    const apiResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (apiResponse.status === 200) {
      const data = await apiResponse.json();
      return data;
    }
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
  }
};

const fetchPokemonDescription = async (pokemonId) => {
  try {
    const apiResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );
    if (apiResponse.status === 200) {
      const data = await apiResponse.json();
      const englishEntry = data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      return englishEntry
        ? englishEntry.flavor_text.replace(/\n|\f/g, " ")
        : "No description available.";
    }
  } catch (error) {
    console.error("Erro ao buscar descrição do Pokémon:", error);
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading ... ";
  pokemonImg.src = "images/bubble-pixel-dots.png";

  const data = await fetchPokemon(pokemon);

  if (data) {
    const description = await fetchPokemonDescription(data.id);

    pokemonId.innerHTML = "#" + data.id;
    pokemonName.innerHTML = data.name;
    pokemonImg.src = data["sprites"]["front_default"];
    pokemonDescription.innerHTML = description;
    pokemonTypes.innerHTML = data.types
      .map((typeInfo) => typeInfo.type.name)
      .join(", ");
    pokemonSkills.innerHTML = data.abilities
      .map((abilityInfo) => abilityInfo.ability.name)
      .join(", ");
    pokemonHeight.innerHTML = data.height / 10;
    pokemonWeight.innerHTML = data.weight / 10;
    inputSearch.value = "";
    search = data.id;
  } else {
    pokemonId.innerHTML = "¬¬";
    pokemonName.innerHTML = " Not Found";
    pokemonImg.src = "images/bubble-pixel-sad.png";
    pokemonDescription.innerHTML = "---";
    pokemonTypes.innerHTML = "---";
    pokemonSkills.innerHTML = "---";
    pokemonHeight.innerHTML = "0.00";
    pokemonWeight.innerHTML = "0.00";
    inputSearch.value = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (search > 1) {
    search -= 1;
    renderPokemon(search);
  }
});

btnNext.addEventListener("click", () => {
  search += 1;
  renderPokemon(search);
});
