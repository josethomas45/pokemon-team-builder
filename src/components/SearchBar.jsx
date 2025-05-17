import React, { useState } from 'react';
import { usePokemonTypes } from '../api/pokemonApi';
import './SearchBar.css';

const SearchBar = ({ onSearch, onTypeSelect, activeType = 'all' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: pokemonTypes, isLoading: typesLoading } = usePokemonTypes();

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle type selection, call parent handler only
  const handleTypeSelect = (type) => {
    if (onTypeSelect) {
      onTypeSelect(type);
    }
  };

  // Filter out types that are not useful in UI
  const filteredTypes = pokemonTypes?.filter(type => 
    !['unknown', 'shadow'].includes(type)
  ) || [];

  // Get color for each Pokemon type
  const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    
    return typeColors[type] || '#777777';
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => {
              setSearchTerm('');
              if (onSearch) onSearch('');
            }}
          >
            &times;
          </button>
        )}
      </div>

      <div className="type-filters">
        <button
          className={`type-filter ${activeType === 'all' ? 'active' : ''}`}
          onClick={() => handleTypeSelect('all')}
        >
          All Types
        </button>

        {typesLoading ? (
          <span className="loading-types">Loading types...</span>
        ) : (
          filteredTypes.map((type) => (
            <button
              key={type}
              className={`type-filter ${activeType === type ? 'active' : ''}`}
              style={{
                backgroundColor: activeType === type ? getTypeColor(type) : 'transparent',
                borderColor: getTypeColor(type),
              }}
              onClick={() => handleTypeSelect(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;
