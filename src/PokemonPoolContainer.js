import React, { Component } from 'react';
import Pokemon from './Pokemon.js';
import { NextButton } from './Styles';

class PokemonPoolContainer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            pokemons: [],
            nextURL: "",
            prevURL: "",
            isLoading: false
        }
    }

    handlePrevPage = () => {
        this.fetchPokemon(this.state.prevURL)
    }

    handleNextPage = () => {
        this.fetchPokemon(this.state.nextURL)
    }

    async fetchPokemon(url = 'https://pokeapi.co/api/v2/pokemon') {
        this.setState({ isLoading: true})
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw res
            }
            const data = await res.json()
            this.setState({
                nextURL: data.next,
                prevURL: data.previous
            })
            const initPokeList = data.results
            const pokeFullData = await this.mapPokemonListToData(initPokeList)
            // for (let p of initPokeList) {
            //     const pokeRes = await fetch(p.url)
            //     if (!pokeRes.ok) {
            //         throw pokeRes
            //     }
            //     const pokeData = await pokeRes.json()
            //     pokeFullData.push(pokeData)
            // }
            // console.log(pokeFullData)
            this.setState({ pokemons: pokeFullData })
            this.setState({ isLoading: false })
        } catch (err) {
            this.setState({ isLoading: false })
            console.error(err)
        }
    }

    async mapPokemonListToData(initArr) {
        return Promise.all(
            initArr.map(p => {
                return fetch(p.url).then(res => {
                    if (!res.ok) {
                        throw res
                    }
                    return res.json()
                })
            })
        )
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

    renderLoaderOrButtons = () => {
        if (this.state.isLoading) {
            console.log("...loading")
            return <div className={"loader"}></div>
        } else {
            return (<div>
                <NextButton onClick={ this.handlePrevPage }>Prev</NextButton>
                <NextButton onClick={ this.handleNextPage }>Next</NextButton>
            </div>
            )
        }
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
                {this.renderLoaderOrButtons()}
            </div>
        );
    }
}

export default PokemonPoolContainer;
