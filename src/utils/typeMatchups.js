/**
 * Pokémon type effectiveness chart
 * Values: 0 (immune), 0.5 (not very effective), 1 (normal), 2 (super effective)
 */
export const TYPE_CHART = {
  normal: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 1,
    ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 0, dragon: 1, dark: 1, steel: 1, fairy: 1
  },
  fire: {
    normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 0.5, fighting: 1, poison: 1,
    ground: 2, flying: 1, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 0.5
  },
  water: {
    normal: 1, fire: 0.5, water: 0.5, electric: 2, grass: 2, ice: 0.5, fighting: 1, poison: 1,
    ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1
  },
  electric: {
    normal: 1, fire: 1, water: 1, electric: 0.5, grass: 1, ice: 1, fighting: 1, poison: 1,
    ground: 2, flying: 0.5, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1
  },
  grass: {
    normal: 1, fire: 2, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, fighting: 1, poison: 2,
    ground: 0.5, flying: 2, psychic: 1, bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1
  },
  ice: {
    normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 0.5, fighting: 2, poison: 1,
    ground: 1, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1
  },
  fighting: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1,
    ground: 1, flying: 2, psychic: 2, bug: 0.5, rock: 0.5, ghost: 1, dragon: 1, dark: 0.5, steel: 1, fairy: 2
  },
  poison: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 0.5, ice: 1, fighting: 0.5, poison: 0.5,
    ground: 2, flying: 1, psychic: 2, bug: 0.5, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 0.5
  },
  ground: {
    normal: 1, fire: 1, water: 2, electric: 0, grass: 2, ice: 2, fighting: 1, poison: 0.5,
    ground: 1, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1
  },
  flying: {
    normal: 1, fire: 1, water: 1, electric: 2, grass: 0.5, ice: 2, fighting: 0.5, poison: 1,
    ground: 0, flying: 1, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1
  },
  psychic: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 1,
    ground: 1, flying: 1, psychic: 0.5, bug: 2, rock: 1, ghost: 2, dragon: 1, dark: 2, steel: 1, fairy: 1
  },
  bug: {
    normal: 1, fire: 2, water: 1, electric: 1, grass: 0.5, ice: 1, fighting: 0.5, poison: 1,
    ground: 0.5, flying: 2, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1
  },
  rock: {
    normal: 0.5, fire: 0.5, water: 2, electric: 1, grass: 2, ice: 1, fighting: 2, poison: 0.5,
    ground: 2, flying: 0.5, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1
  },
  ghost: {
    normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0, poison: 0.5,
    ground: 1, flying: 1, psychic: 1, bug: 0.5, rock: 1, ghost: 2, dragon: 1, dark: 2, steel: 1, fairy: 1
  },
  dragon: {
    normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, fighting: 1, poison: 1,
    ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 1, fairy: 2
  },
  dark: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 1,
    ground: 1, flying: 1, psychic: 0, bug: 2, rock: 1, ghost: 0.5, dragon: 1, dark: 0.5, steel: 1, fairy: 2
  },
  steel: {
    normal: 0.5, fire: 2, water: 1, electric: 1, grass: 0.5, ice: 0.5, fighting: 2, poison: 0,
    ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 0.5
  },
  fairy: {
    normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 2,
    ground: 1, flying: 1, psychic: 1, bug: 0.5, rock: 1, ghost: 1, dragon: 0, dark: 0.5, steel: 2, fairy: 1
  }
};

/**
 * Calculate type effectiveness for a specific attack type against a Pokémon's types
 * @param {string} attackType - The attacking move's type
 * @param {Array<string>} defenderTypes - Array of the defender Pokémon's types
 * @returns {number} - Effectiveness multiplier (0, 0.25, 0.5, 1, 2, or 4)
 */
export const calculateTypeEffectiveness = (attackType, defenderTypes) => {
  // If type isn't recognized, return normal effectiveness
  if (!TYPE_CHART[attackType]) return 1;
  
  // Calculate combined effectiveness against all defender types
  return defenderTypes.reduce((effectiveness, defenderType) => {
    // If defender type isn't recognized, use normal effectiveness (1)
    const multiplier = TYPE_CHART[attackType][defenderType] || 1;
    return effectiveness * multiplier;
  }, 1);
};

/**
 * Calculate type weaknesses and resistances for a Pokémon team
 * @param {Array<Object>} team - Array of Pokémon objects with type information
 * @returns {Object} - Object containing team weaknesses and resistances
 */
export const calculateTeamWeaknesses = (team) => {
  const allTypes = Object.keys(TYPE_CHART);
  const weaknessCount = {};
  const resistanceCount = {};
  const immunityCount = {};
  
  // Initialize counts
  allTypes.forEach(type => {
    weaknessCount[type] = 0;
    resistanceCount[type] = 0;
    immunityCount[type] = 0;
  });
  
  // Count weaknesses, resistances, and immunities for each Pokémon
  team.forEach(pokemon => {
    allTypes.forEach(attackType => {
      const effectiveness = calculateTypeEffectiveness(attackType, pokemon.types);
      
      if (effectiveness > 1) {
        weaknessCount[attackType]++;
      } else if (effectiveness < 1 && effectiveness > 0) {
        resistanceCount[attackType]++;
      } else if (effectiveness === 0) {
        immunityCount[attackType]++;
      }
    });
  });
  
  return {
    weaknesses: weaknessCount,
    resistances: resistanceCount,
    immunities: immunityCount
  };
};