import React, { useState } from 'react';
import { usePokemonTypes } from '../api/pokemonApi';
import './SearchBar.css';

const SearchBar = ({ onSearch, onTypeSelect, activeType = 'all' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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

      <div className="filter-toggle-container">
        <button 
          className={`filter-toggle-btn ${isOpen ? 'panel-open' : ''} ${activeType !== 'all' ? 'active-filter' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            borderColor: activeType !== 'all' ? getTypeColor(activeType) : 'rgba(255, 255, 255, 0.08)',
            boxShadow: activeType !== 'all' ? `0 0 10px ${getTypeColor(activeType)}33` : 'none'
          }}
        >
          <svg className="filter-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <span>{activeType === 'all' ? 'Filter by Type' : `Type: ${activeType}`}</span>
          <svg className={`chevron-icon ${isOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <div className={`type-filters-drawer ${isOpen ? 'open' : ''}`}>
        <div className="type-filters-grid">
          <button
            className={`type-filter all-filter ${activeType === 'all' ? 'active' : ''}`}
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
                  backgroundColor: activeType === type ? getTypeColor(type) : 'rgba(255, 255, 255, 0.02)',
                  borderColor: activeType === type ? getTypeColor(type) : 'rgba(255, 255, 255, 0.08)',
                  color: activeType === type ? '#000' : '#f8fafc',
                  fontWeight: activeType === type ? '800' : '600',
                  boxShadow: activeType === type ? `0 0 15px ${getTypeColor(type)}aa` : 'none'
                }}
                onClick={() => handleTypeSelect(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
