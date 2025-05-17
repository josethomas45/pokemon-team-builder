import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, isSelected, onClick, draggable = false, onDragStart, onDragOver, onDrop, onDragEnd, onDragEnter, onDragLeave, index }) => {
  // Type color mapping for Pokemon types
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

  // Get the primary color based on the first type
  const primaryColor = pokemon?.types?.length > 0 
    ? typeColors[pokemon.types[0]] || '#777777'
    : '#777777';
  
  // Determine the background gradient
  const secondaryColor = pokemon?.types?.length > 1
    ? typeColors[pokemon.types[1]] || primaryColor
    : primaryColor;

  // Event handlers for drag and drop
  const handleDragStart = (e) => {
    if (onDragStart) onDragStart(e, index);
  };

  const handleDragOver = (e) => {
    if (onDragOver) onDragOver(e, index);
  };

  const handleDrop = (e) => {
    if (onDrop) onDrop(e, index);
  };

  // Format Pokemon name with proper capitalization
  const formatName = (name) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div 
      className={`pokemon-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick && onClick(pokemon)}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter ? (e) => onDragEnter(e, index) : undefined}
      onDragLeave={onDragLeave}
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
      }}
    >
      <div className="pokemon-card-inner">
        <div className="pokemon-image-container">
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className="pokemon-image"
            loading="lazy"
          />
          <div className="pokemon-id">#{pokemon.id}</div>
        </div>
        <div className="pokemon-info">
          <h3 className="pokemon-name">{formatName(pokemon.name)}</h3>
          <div className="pokemon-types">
            {pokemon.types.map(type => (
              <span 
                key={type} 
                className="type-badge"
                style={{ backgroundColor: typeColors[type] || '#777777' }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
          <div className="pokemon-stats">
            <div className="stat">
              <span>HP</span>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ width: `${Math.min(100, (pokemon.stats.hp / 255) * 100)}%`, backgroundColor: '#FF5959' }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.hp}</span>
            </div>
            <div className="stat">  
              <span>ATK</span>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ width: `${Math.min(100, (pokemon.stats.attack / 190) * 100)}%`, backgroundColor: '#F5AC78' }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.attack}</span>
            </div>
            <div className="stat">
              <span>DEF</span>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ width: `${Math.min(100, (pokemon.stats.defense / 230) * 100)}%`, backgroundColor: '#FAE078' }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.defense}</span>
            </div>
            <div className="stat">
              <span>SPD</span>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ width: `${Math.min(100, (pokemon.stats.speed / 180) * 100)}%`, backgroundColor: '#FA92B2' }}
                ></div>
              </div>
              <span className="stat-value">{pokemon.stats.speed}</span>
            </div>
          </div>
        </div>
        {isSelected && (
          <div className="selected-indicator">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        )}
      </div>
      {draggable && (
        <div className="drag-handle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 19h10v-2H7v2zm0-4h10v-2H7v2zm0-4h10V9H7v2zm0-4h10V5H7v2z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;