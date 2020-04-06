import React, { Component } from 'react';
import Form from './Form';
import Pokemon from './Pokemon';

class SearchPokemon extends Component {
    
    state = {
        pokemon: null
    }

    handleSubmit = async ([search]) => {
        this.setState({ pokemon: null })
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
            if(!res.ok){throw res}
            const data = await res.json()
            if(!data){throw 'Not found'}
            this.setState({ pokemon: data })
        } catch(err) {
            console.error(err)
        }
    }

    handleAdd = () => {
        this.props.handleAddPokemon(this.state.pokemon)
    }

    renderPokemon = () => {
        if (this.state.pokemon) {
            return <Pokemon
                id={this.state.pokemon.id}
                name={this.state.pokemon.name}
                spriteURL={this.state.pokemon.sprites.front_default}
                buttonAction={'Choose'}
                buttonFunction={this.handleAdd}
            />
        }
    }
    
    render() {
        return (
            <div>
                <Form 
                    inputs={['Search Pokemon']}
                    submitCallback={this.handleSubmit}
                    submitValue={'Search'}
                />
                {this.renderPokemon()}
            </div>
        );
    }
}

export default SearchPokemon;
