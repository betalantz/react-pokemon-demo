import styled from 'styled-components';

const PokemonTeamLounge = styled.div`
    border: 3px solid red;
    border-radius: 10px;
    background: #fffff0;
    margin: 10px;
    padding: 10px;  
`

const Card = styled.div`
    background: #fffff0;    
    border: 2px solid blue;
    border-radius: 10px;
    margin: 10px;
    display: inline-block;
    padding: 10px;
`

const PokeButton = styled.button`
    color: yellow;
    background-color: red;
    font-size: 1em;
`

export { PokemonTeamLounge, Card, PokeButton }