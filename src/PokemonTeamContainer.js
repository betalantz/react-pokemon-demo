import React, { Component } from 'react';
import { PokeTeamLounge } from './Styles';
import Pokemon from './Pokemon';

class PokeTeamContainer extends Component {
    
    
    renderPokemons = () => {

        return this.props.pokemons.map(p => (
            <Pokemon
                id={p.id} 
                key={p.id} 
                name={p.name}
                spriteURL={p.sprites.front_default}
                buttonAction={"Remove"}
                buttonFunction={this.props.handleRemovePokemon}
            />))
    }
    
    render() {
        return (
            <PokeTeamLounge >
                <h1>Team Lounge</h1>
                {this.renderPokemons()}
            </PokeTeamLounge>
        );
    }
}

export default PokeTeamContainer; // could be called anything because its default exp
