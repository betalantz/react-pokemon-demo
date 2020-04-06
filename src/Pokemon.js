import React, { Component } from 'react';
import { Card, PokeButton } from './Styles';

class Pokemon extends Component {
    
    handleClick = (e) => {
        this.props.buttonFunction(this.props.id)
    }

    render() {
        return (
            <Card>
                <h2>{this.props.name}</h2>
                <img src={this.props.spriteURL} alt={this.props.name} />
                <PokeButton onClick={this.handleClick}>{this.props.buttonAction}</PokeButton>
            </Card>
        );
    }
}

export default Pokemon;
