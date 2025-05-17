import React, { useState, useEffect } from 'react';
import { calculateTeamStats } from '../../utils/teamStats';
import './TeamBuilder.css';

// Fixed calculateTeamWeaknesses utility inside the file for clarity
const calculateTeamWeaknesses = (team) => {
  const typeChart = {
    fire: { water: 2, grass: 0.5, electric: 1 },
    water: { electric: 2, grass: 2, fire: 0.5 },
    grass: { fire: 2, water: 0.5, electric: 1 },
    electric: { ground: 2, water: 0.5, grass: 1 },
    ground: { water: 2, grass: 1, electric: 0 },
  };

  const weaknesses = {};

  team.forEach(pokemon => {
    (pokemon.types || []).forEach(type => {
      const lowerType = type.toLowerCase();
      const multipliers = typeChart[lowerType] || {};
      Object.entries(multipliers).forEach(([attackType, multiplier]) => {
        const current = Number(weaknesses[attackType]) || 1;
        weaknesses[attackType] = current * multiplier;
      });
    });
  });

  return weaknesses;
};

const TeamBuilder = ({ team, removeFromTeam, updateTeamOrder, addToTeam }) => {
  const [teamStats, setTeamStats] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  });

  const [weaknesses, setWeaknesses] = useState({});
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  useEffect(() => {
    if (Array.isArray(team) && team.length > 0) {
      setTeamStats(calculateTeamStats(team));
      setWeaknesses(calculateTeamWeaknesses(team));
    } else {
      setTeamStats({
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      });
      setWeaknesses({});
    }
  }, [team]);

  const formatStatValue = (value) => {
    return team.length ? Math.round(value / team.length) : 0;
  };

  const handleDragStart = (e, id) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropId = null) => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData('text/plain');
    const jsonData = e.dataTransfer.getData('application/json');

    if (draggedId && dropId) {
      if (draggedId === dropId) return;

      const draggedIndex = team.findIndex(p => String(p.id) === String(draggedId));
      const dropIndex = team.findIndex(p => String(p.id) === String(dropId));

      if (draggedIndex === -1 || dropIndex === -1) return;

      const updatedTeam = [...team];
      const [draggedItem] = updatedTeam.splice(draggedIndex, 1);
      updatedTeam.splice(dropIndex, 0, draggedItem);

      updateTeamOrder(updatedTeam);
    } else if (jsonData) {
      try {
        const newPokemon = JSON.parse(jsonData);

        if (team.find(p => p.id === newPokemon.id)) {
          return;
        }

        if (team.length < 6) {
          addToTeam(newPokemon);
        } else {
          alert('Team can only have 6 Pokémon.');
        }
      } catch (error) {
        console.error('Failed to parse dropped Pokémon data:', error);
      }
    }

    setDraggedItemId(null);
    setDragOverId(null);
  };

  const handleDragEnter = (e, id) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverId(null);
  };

  return (
    <div
      className="team-builder"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => e.preventDefault()}
      style={{ minHeight: '250px' }}
    >
      <div className={`team-container ${team.length === 0 ? 'empty-team' : ''}`}>
        {team.length === 0 ? (
          <div className="empty-team-message">
            <p>Select up to 6 Pokémon to build your team</p>
            <div className="pokeball-icon"></div>
          </div>
        ) : (
          team.map(pokemon => (
            <div
              key={pokemon.id}
              className={`team-pokemon ${dragOverId === pokemon.id ? 'drag-over' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, pokemon.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, pokemon.id)}
              onDragEnter={(e) => handleDragEnter(e, pokemon.id)}
              onDragLeave={handleDragLeave}
            >
              <div className="team-pokemon-image">
                <img
                  src={pokemon.image || pokemon.sprites?.front_default || ''}
                  alt={pokemon.name}
                />
              </div>
              <div className="team-pokemon-info">
                <h3>{pokemon.name}</h3>
                <div className="team-pokemon-types">
                  {(pokemon.types || []).map((type) => (
                    <span
                      key={`${pokemon.id}-${type}`}
                      className={`type-badge ${type.toLowerCase()}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="remove-pokemon-btn"
                onClick={() => removeFromTeam(pokemon.id)}
                aria-label={`Remove ${pokemon.name} from team`}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {team.length > 0 && (
        <div className="team-stats-panel">
          <h3>Team Average Stats</h3>
          <div className="stats-grid">
            {['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'].map((stat) => (
              <div key={stat} className="stat-item">
                <div className="stat-label">{stat.toUpperCase().replace('SPECIAL', 'SP.')}</div>
                <div className="stat-bar-container">
                  <div
                    className={`stat-bar ${stat}-bar`}
                    style={{ width: `${(formatStatValue(teamStats[stat]) / 255) * 100}%` }}
                  />
                </div>
                <div className="stat-value">{formatStatValue(teamStats[stat])}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SOMETHING NOT WORKING PROPER IN THIS SECTION . MAKW IT PROPER LATER */}

      {/* 
{team.length > 0 && (
  <div className="team-weaknesses">
    <h3>Team Type Analysis</h3>
    <div className="weaknesses-grid">
      {Object.entries(weaknesses)
        .sort(([, a], [, b]) => b - a)
        .map(([type, multiplier]) => {
          let numericValue = Number(multiplier);
          if (isNaN(numericValue)) numericValue = 1;

          let status = 'neutral';
          if (numericValue >= 2) status = 'very-weak';
          else if (numericValue > 1) status = 'weak';
          else if (numericValue < 0.5) status = 'very-resistant';
          else if (numericValue < 1) status = 'resistant';

          return (
            <div key={type} className={`weakness-item ${status}`}>
              <span className={`type-badge ${type.toLowerCase()}`}>{type}</span>
              <span className="multiplier">{numericValue.toFixed(2)}×</span>
            </div>
          );
        })}
    </div>
  </div>
)}
*/}


    </div>
  );
};

export default TeamBuilder;
