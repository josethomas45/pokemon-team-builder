import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Base URL for the PokeAPI
const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches a list of Pokémon with basic information
 * @param {number} limit - Number of Pokémon to retrieve
 * @returns {Promise} - Promise containing Pokémon list data
 */
export const fetchPokemonList = async (limit = 50) => {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${limit}`);
  
  // For each Pokémon in the list, get detailed information
  const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
    return await fetchPokemonDetails(pokemon.url);
  });
  
  return await Promise.all(pokemonDetailsPromises);
};

/**
 * Fetches detailed information for a specific Pokémon
 * @param {string} url - URL to fetch Pokémon details
 * @returns {Object} - Formatted Pokémon data
 */
export const fetchPokemonDetails = async (url) => {
  const response = await axios.get(url);
  const pokemon = response.data;
  
  // Format the data for easier consumption
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
    types: pokemon.types.map(type => type.type.name),
    stats: {
      hp: pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat,
      attack: pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat,
      defense: pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat,
      specialAttack: pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
      specialDefense: pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
      speed: pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat
    },
    height: pokemon.height,
    weight: pokemon.weight
  };
};

/**
 * React hook for fetching Pokémon list using TanStack Query
 * @param {number} limit - Number of Pokémon to retrieve
 * @returns {Object} - Query result containing Pokémon data
 */
export const usePokemonList = (limit = 50) => {
  return useQuery({
    queryKey: ['pokemonList', limit],
    queryFn: () => fetchPokemonList(limit),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};

/**
 * React hook for fetching Pokémon types
 * @returns {Object} - Query result containing Pokémon types
 */
export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/type`);
      return response.data.results.map(type => type.name);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};