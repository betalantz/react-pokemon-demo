import React, { Component } from 'react';
import Pokemon from './Pokemon';
import { NextButton } from './Styles';

class PokePoolContainer extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            pokemons: [],
            nextURL: "",
            prevURL: "",
            isLoading: false
        }
    }

    handleNextPage = () => {
        this.fetchPokemon(this.state.nextURL)
    }
    handlePrevPage = () => {
        this.fetchPokemon(this.state.prevURL)
    }

    choosePokemon = (id) => {
        const chosenPokemon = this.state.pokemons.find(p => p.id == id)
        this.props.handleAddPokemon(chosenPokemon)
    }


    renderPokeCards = () => {
        return this.state.pokemons.map(p => (
            <Pokemon 
                id={p.id}
                key={p.id} 
                name={p.name}
                spriteURL={p.sprites.front_default}
                buttonAction={"Choose"}
                buttonFunction={this.choosePokemon}
            />))
    }

    renderLoaderOrButtons = () => {
        if (this.state.isLoading) {
            return <div className={"loader"}></div>
        } else {
            return (
                <div>
                    <NextButton onClick={this.handlePrevPage}>Prev</NextButton>
                    <NextButton onClick={this.handleNextPage}>Next</NextButton>
                </div>
            )
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

    async fetchPokemon(url = 'https://pokeapi.co/api/v2/pokemon') {
        this.setState({ isLoading: true })
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
            // const pokeFullData = []
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
        // fetch('https://pokeapi.co/api/v2/pokemon')
        //     .then(res => res.json())
        //     .then(initRes => {
        //         const pokeList = initRes.results
        //         const pokeFullData = []
        //         for (let p of pokeList) {
        //             fetch(p.url)
        //             .then(r => r.json())
        //             .then(data => pokeFullData.push(data))
        //             // .catch(err => console.err(err))
    
        //         }
        //         // console.log(pokeFullData)
        //         return pokeFullData
        //     })
        //     .then(fullData => this.setState({
        //         ...this.state,
        //         pokemons: fullData
        //     }))
        //     .then(() => console.log(this.state.pokemons))
        //     // .catch(err => console.err(err))
        
    }
    
    componentDidMount() {
        this.fetchPokemon()
    }
    
    
    render() {
        // console.log(this.renderPokeCards());
        return (
            <div>
                {this.renderPokeCards()}
                {this.renderLoaderOrButtons()}
            </div>
        );
    }
}

export default PokePoolContainer;
