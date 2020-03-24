import React from 'react';
import {Card, PokeButton} from './Styles';

const Pokemon = (props) => {

    const handleClick = (e) => {
        props.handleAddPoke(props)
    }
    return (
        <Card>
            <h2>{props.name}</h2>
            <img src={props.sprite}></img>
            <PokeButton onClick={handleClick}>{props.buttonAction}</PokeButton>
        </Card>
    );
}

export default Pokemon;
