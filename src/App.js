import React, { Component } from 'react';
import PokemonTeamContainer from './PokemonTeamContainer';  
import PokemonPoolContainer from './PokemonPoolContainer';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      pokemonTeam: []
    }
  }
  
  handleAddPoke = (pokeObj) => {
    this.setState({
      pokemonTeam: [...this.state.pokemonTeam, pokeObj]
    })
  }


  
  render() {
    // console.log(this.state.pokemonTeam)
    return (
      <div>
        <PokemonTeamContainer pokemons={this.state.pokemonTeam}/>
        <PokemonPoolContainer handleAddPoke={this.handleAddPoke}/>
      </div>
    );
  }
}

export default App;
