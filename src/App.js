import React, { Component } from 'react';
import './App.css'
import PokeTeamContainer from './PokemonTeamContainer';
import PokePoolContainer from './PokemonPoolContainer';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      pokemonTeam: []
    }
  }

  handleAddPokemon = (pokeObj) => {
    if (!this.teamIsFull()){
      this.setState({
        pokemonTeam: [...this.state.pokemonTeam, pokeObj]
      })
    }
  }

  handleRemovePokemon = (pId) => {
    const newTeam = this.state.pokemonTeam.filter(p => p.id !== pId)
    this.setState({
      pokemonTeam: newTeam
    })
  }

  teamIsFull = () => {
    return this.state.pokemonTeam.length >= 6
  }
  
  render() {
    return (
      <div className="App">
        <PokeTeamContainer pokemons={this.state.pokemonTeam} handleRemovePokemon={this.handleRemovePokemon}/>
        <PokePoolContainer handleAddPokemon={this.handleAddPokemon}/>
      </div>
    );
  }
}

export default App;
