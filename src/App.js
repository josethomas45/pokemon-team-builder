import React, { useState, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import PokemonGrid from './components/PokemonGrid';
import TeamBuilder from './components/TeamBuilder/TeamBuilder';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { fetchPokemonList } from './api/pokemonApi';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [team, setTeam] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const { data: pokemonList = [], isLoading, error } = useQuery({
    queryKey: ['pokemonList', 50],
    queryFn: () => fetchPokemonList(50),
  });

  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    let results = pokemonList;

    if (searchTerm) {
      results = results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType && selectedType !== 'all') {
      results = results.filter(pokemon =>
        Array.isArray(pokemon.types) &&
        pokemon.types.some(type => type.toLowerCase() === selectedType.toLowerCase())
      );
    }

    setFilteredPokemon(results);
  }, [searchTerm, selectedType, pokemonList]);

  const addToTeam = (pokemon) => {
    if (team.length < 6 && !team.some(p => p.id === pokemon.id)) {
      setTeam([...team, pokemon]);
    }
  };

  const removeFromTeam = (pokemonId) => {
    setTeam(team.filter(p => p.id !== pokemonId));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  const updateTeamOrder = (newTeamOrder) => {
    setTeam(newTeamOrder);
  };

  const getTeamTypeAnalysis = (team) => {
    const typeCount = {};

    team.forEach(pokemon => {
      if (Array.isArray(pokemon.types)) {
        pokemon.types.forEach(type => {
          const lowerType = type.toLowerCase();
          typeCount[lowerType] = (typeCount[lowerType] || 0) + 1;
        });
      }
    });

    return typeCount;
  };

  const teamTypeAnalysis = useMemo(() => getTeamTypeAnalysis(team), [team]);

  const pokemonTypes = useMemo(() => {
    const typesSet = new Set();
    pokemonList.forEach(pokemon => {
      if (Array.isArray(pokemon.types)) {
        pokemon.types.forEach(type => typesSet.add(type));
      }
    });
    return Array.from(typesSet);
  }, [pokemonList]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <h1>POKEMON TEAM BUILDER</h1>
          <SearchBar
            onSearch={handleSearch}
            onTypeSelect={handleTypeFilter}
            activeType={selectedType}
            types={pokemonTypes}
          />
        </header>

        <main className="app-content">
          <section className="team-section">
            <h2>Your Team</h2>
            <TeamBuilder
              team={team}
              removeFromTeam={removeFromTeam}
              updateTeamOrder={updateTeamOrder}
              addToTeam={addToTeam}
            />

            <section className="team-type-analysis">
              <h3>Current Members Type Analysis</h3>
              {team.length === 0 ? (
                <p>Add some Pokémon to your team to see type analysis.</p>
              ) : (
                <ul>
                  {Object.entries(teamTypeAnalysis).map(([type, count]) => (
                    <li key={type}>
                      <strong>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>: {count}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </section>

          <section className="pokemon-grid-section">
            <h2>Available Pokémon</h2>
            {isLoading ? (
              <div className="loading-spinner">
                <div className="pokeball-loader"></div>
              </div>
            ) : error ? (
              <div>Error loading Pokémon.</div>
            ) : (
              <PokemonGrid
                pokemonList={filteredPokemon}
                addToTeam={addToTeam}
                isInTeam={(id) => team.some(p => p.id === id)}
              />
            )}
          </section>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
    
  );
}

export default App;
