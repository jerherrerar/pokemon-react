import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const login = async (userData) => {
  // if (userData.username === "admin" && userData.password === "admin") {
  if (userData.username && userData.password) {
    return {
      auth_token: "some_jwt_token"
    };
  }
  return {
    error_description: "Invalid username or password."
  };
  //   try {
  //     const response = await apiClient.post("/login", userData);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     throw error;
  //   }
};

export const getPokemons = async () => {
  try {
    // Step 1: Get a list of 9 Pokemon
    const listResponse = await apiClient.get("/pokemon?limit=9");
    const pokemonList = listResponse.data.results;

    // Step 2: Fetch full details for each Pokémon
    const detailedPokemonPromises = pokemonList.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url);
      return detailResponse.data;
    });

    const detailedPokemonData = await Promise.all(detailedPokemonPromises);
    return detailedPokemonData;
  } catch (error) {
    console.error("Error fetching Pokemons data:", error);
    return [];
  }
};

export const getPokemonById = async (id) => {
  try {
    const response = await apiClient.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    throw error;
  }
};

export const getPokemonSpeciesById = async (id) => {
  try {
    const response = await apiClient.get(`/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching PokemonSpecies data:", error);
    throw error;
  }
};

// export const createUser = async (userData) => {
//   try {
//     const response = await apiClient.post("/users", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };
