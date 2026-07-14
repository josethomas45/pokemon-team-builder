import React, { useState, useEffect } from 'react';
import { calculateTeamStats } from '../../utils/teamStats';
import { calculateTeamWeaknesses } from '../../utils/typeMatchups';
import './TeamBuilder.css';

const TeamBuilder = ({ team, removeFromTeam, updateTeamOrder, addToTeam }) => {
  const [teamStats, setTeamStats] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  });

  const [weaknesses, setWeaknesses] = useState({
    weaknesses: {},
    resistances: {},
    immunities: {}
  });
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
      setWeaknesses({
        weaknesses: {},
        resistances: {},
        immunities: {}
      });
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

      {team.length > 0 && (
        <div className="team-weaknesses-panel">
          <h3>Team Defense Matchups</h3>
          <div className="weaknesses-grid">
            {[
              'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
              'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
            ].map((type) => {
              const weakCount = weaknesses.weaknesses?.[type] || 0;
              const resistCount = weaknesses.resistances?.[type] || 0;
              const immuneCount = weaknesses.immunities?.[type] || 0;

              let status = 'neutral';
              if (weakCount > resistCount + immuneCount) {
                status = weakCount >= 2 ? 'very-weak' : 'weak';
              } else if (resistCount + immuneCount > weakCount) {
                status = (immuneCount > 0 || resistCount >= 2) ? 'very-resistant' : 'resistant';
              }

              return (
                <div key={type} className={`weakness-item ${status}`}>
                  <span className={`type-badge ${type}`}>{type}</span>
                  <div className="matchup-badges">
                    {weakCount > 0 && <span className="badge weak-badge">+{weakCount}</span>}
                    {resistCount > 0 && <span className="badge resist-badge">-{resistCount}</span>}
                    {immuneCount > 0 && <span className="badge immune-badge">Ø{immuneCount}</span>}
                    {weakCount === 0 && resistCount === 0 && immuneCount === 0 && (
                      <span className="badge neutral-badge">1×</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


    </div>
  );
};

export default TeamBuilder;
