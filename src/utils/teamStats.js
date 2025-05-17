/**
 * Calculate total stats for a Pokémon team
 * @param {Array<Object>} team - Array of Pokémon objects with stats
 * @returns {Object} - Aggregated team stats
 */
export const calculateTeamStats = (team) => {
  if (!team || team.length === 0) {
    return {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      total: 0
    };
  }

  // Initialize stats object
  const teamStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    total: 0
  };

  // Sum up stats for all Pokémon in the team
  team.forEach(pokemon => {
    if (pokemon && pokemon.stats) {
      teamStats.hp += pokemon.stats.hp || 0;
      teamStats.attack += pokemon.stats.attack || 0;
      teamStats.defense += pokemon.stats.defense || 0;
      teamStats.specialAttack += pokemon.stats.specialAttack || 0;
      teamStats.specialDefense += pokemon.stats.specialDefense || 0;
      teamStats.speed += pokemon.stats.speed || 0;
    }
  });

  // Calculate total stats
  teamStats.total = teamStats.hp + teamStats.attack + teamStats.defense + 
                   teamStats.specialAttack + teamStats.specialDefense + teamStats.speed;

  return teamStats;
};

/**
 * Calculate average stats for a Pokémon team
 * @param {Array<Object>} team - Array of Pokémon objects with stats
 * @returns {Object} - Average team stats
 */
export const calculateAverageStats = (team) => {
  if (!team || team.length === 0) {
    return {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      total: 0
    };
  }

  const teamStats = calculateTeamStats(team);
  const activeCount = team.filter(pokemon => pokemon && pokemon.stats).length;
  
  if (activeCount === 0) return teamStats;

  // Calculate averages
  return {
    hp: Math.round(teamStats.hp / activeCount),
    attack: Math.round(teamStats.attack / activeCount),
    defense: Math.round(teamStats.defense / activeCount),
    specialAttack: Math.round(teamStats.specialAttack / activeCount),
    specialDefense: Math.round(teamStats.specialDefense / activeCount),
    speed: Math.round(teamStats.speed / activeCount),
    total: Math.round(teamStats.total / activeCount)
  };
};

/**
 * Normalize stats to 0-100 scale for visual representation
 * @param {Object} stats - Pokemon stats object
 * @returns {Object} - Normalized stats (0-100)
 */
export const normalizeStats = (stats) => {
  // Approximate max values for each stat based on Pokémon data
  const maxValues = {
    hp: 255,
    attack: 190,
    defense: 230,
    specialAttack: 194,
    specialDefense: 230,
    speed: 180
  };

  return {
    hp: Math.min(100, Math.round((stats.hp / maxValues.hp) * 100)),
    attack: Math.min(100, Math.round((stats.attack / maxValues.attack) * 100)),
    defense: Math.min(100, Math.round((stats.defense / maxValues.defense) * 100)),
    specialAttack: Math.min(100, Math.round((stats.specialAttack / maxValues.specialAttack) * 100)),
    specialDefense: Math.min(100, Math.round((stats.specialDefense / maxValues.specialDefense) * 100)),
    speed: Math.min(100, Math.round((stats.speed / maxValues.speed) * 100))
  };
};