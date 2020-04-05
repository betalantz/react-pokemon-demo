import React, { Component } from 'react';
import { PokemonTeamLounge } from './Styles';
import Pokemon from './Pokemon';

class PokemonTeamContainer extends Component {
    
    renderPokeCards = () => {
        return this.props.pokemons.map(p => {
            return <Pokemon
                sprite={p.sprites.front_default}
                key={p.id} 
                name={p.name}
                buttonAction={"Remove"}
                buttonFunction={this.props.handleRemovePokemon}
                id={p.id}
                />
        })
    }
    
    render() {
        return (
            <PokemonTeamLounge>
                {this.renderPokeCards()}
            </PokemonTeamLounge>
        );
    }
}

export default PokemonTeamContainer;
