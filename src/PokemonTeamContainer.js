import React, { Component } from 'react';
import { PokemonTeamLounge } from './Styles';
import Pokemon from './Pokemon';

class PokemonTeamContainer extends Component {
    
    renderPokeCards = () => {
        return this.props.pokemons.map(p => {
            return <Pokemon
                sprite={p.sprite}
                key={p.id} 
                name={p.name}
                buttonAction={"Remove"}
                
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
