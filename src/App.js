import React, { Component } from 'react';
import './App.css'
import PokeTeamContainer from './PokemonTeamContainer';
import PokePoolContainer from './PokemonPoolContainer';
import SearchPokemon from './SearchPokemon';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

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
      <Router>
        <div className="App">
          <PokeTeamContainer pokemons={this.state.pokemonTeam} handleRemovePokemon={this.handleRemovePokemon}/>

          <Link to='/search'>Search</Link>
          <br/>
          <Link to='/'>Browse</Link>

          <Switch>
            <Route path='/search'>
              <SearchPokemon handleAddPokemon={this.handleAddPokemon}/>
            </Route>
            <Route path='/'>
              <PokePoolContainer handleAddPokemon={this.handleAddPokemon}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
