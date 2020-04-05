import React, { Component } from 'react';
import Pokemon from './Pokemon.js';

class PokemonPoolContainer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            pokemons: []
        }
    }

    async fetchPokemon(url = 'https://pokeapi.co/api/v2/pokemon') {
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw res
            }
            const data = await res.json()
            const initPokeList = data.results
            const pokeFullData = []
            for (let p of initPokeList) {
                const pokeRes = await fetch(p.url)
                if (!pokeRes.ok) {
                    throw pokeRes
                }
                const pokeData = await pokeRes.json()
                pokeFullData.push(pokeData)
            }
            console.log(pokeFullData)
            this.setState({ pokemons: pokeFullData })

        } catch (err) {
            console.error(err)
        }
    }

    renderPokeCards = () => {
        return this.state.pokemons.map(p => {
            return <Pokemon
                sprite={p.sprites.front_default}
                key={p.id} 
                name={p.name}
                buttonAction={"Choose"}
                buttonFunction={this.choosePokemon}
                id={p.id}
                />
        })
    }

    choosePokemon = (id) => {
        const chosenPokemon = this.state.pokemons.find(p => p.id == id)
        this.props.handleAddPoke(chosenPokemon)
    }


    componentDidMount() {
        this.fetchPokemon()
    }
    
    render() {
        return (
            <div>
                {this.renderPokeCards()}
            </div>
        );
    }
}

export default PokemonPoolContainer;
