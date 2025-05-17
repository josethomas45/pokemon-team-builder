import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './PokemonGrid.css';

const PokemonGrid = ({
  pokemonList,
  selectedPokemon = [],
  onSelectPokemon,
  loading,
  error,
  activeType,
}) => {
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // Update filtered list when activeType or pokemonList changes
  useEffect(() => {
    if (!Array.isArray(pokemonList)) return;

    if (!activeType || activeType === 'all') {
      setFilteredPokemon(pokemonList);
    } else {
      const filtered = pokemonList.filter(
        (pokemon) =>
          Array.isArray(pokemon.types) &&
          pokemon.types.some((type) => type.toLowerCase() === activeType.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [pokemonList, activeType]);

  // Check if Pokémon is already selected
  const isPokemonSelected = (pokemon) => {
    if (!Array.isArray(selectedPokemon)) return false;
    return selectedPokemon.some((selected) => selected?.id === pokemon.id);
  };

  const handleSelectPokemon = (pokemon) => {
    if (onSelectPokemon) {
      onSelectPokemon(pokemon);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="pokemon-grid-loading">
        <div className="pokeball-loading">
          <div className="pokeball">
            <div className="pokeball-button"></div>
          </div>
          <p>Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="pokemon-grid-error">
        <h3>Error loading Pokémon</h3>
        <p>{error.message || 'Please try again later'}</p>
      </div>
    );
  }

  // Handle empty state
  if (filteredPokemon.length === 0) {
    return (
      <div className="pokemon-grid-empty">
        <h3>No Pokémon Found</h3>
        <p>No Pokémon match the selected type: {activeType}</p>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {filteredPokemon.map((pokemon) => (
        <div
          key={pokemon.id}
          className="pokemon-grid-item"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/json', JSON.stringify(pokemon));
          }}
        >
          <PokemonCard
            pokemon={pokemon}
            isSelected={isPokemonSelected(pokemon)}
            onClick={() => handleSelectPokemon(pokemon)}
          />
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;

/* 

// PokemonGrid.jsx - simpler alternative version you provided

function PokemonGrid({ pokemonList, addToTeam, isInTeam }) {
  return (
    <div className="pokemon-grid">
      {pokemonList.map(pokemon => (
        <div
          key={pokemon.id}
          className={`pokemon-card ${isInTeam(pokemon.id) ? 'in-team' : ''}`}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/json', JSON.stringify(pokemon));
          }}
        >
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}

export default PokemonGrid;

*/
