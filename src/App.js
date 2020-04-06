import React, { Component } from 'react';
import PokemonTeamContainer from './PokemonTeamContainer';  
import PokemonPoolContainer from './PokemonPoolContainer';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      pokemonTeam: []
    }
  }
  
  handleAddPoke = (pokeObj) => {
    if (!this.teamIsFull()) {
      this.setState({
        pokemonTeam: [...this.state.pokemonTeam, pokeObj]
      })
    }
  }

  handleRemovePoke = (pId) => {
    const newTeam = this.state.pokemonTeam.filter(p => p.id !== pId)
    this.setState({
      pokemonTeam: newTeam
    })
  }

  teamIsFull = () => {
    return this.state.pokemonTeam.length >= 6
  }
  
  render() {
    // console.log(this.state.pokemonTeam)
    return (
      <div>
        <PokemonTeamContainer pokemons={this.state.pokemonTeam} handleRemovePokemon={this.handleRemovePoke}/>
        <PokemonPoolContainer handleAddPoke={this.handleAddPoke}/>
      </div>
    );
  }
}

export default App;
