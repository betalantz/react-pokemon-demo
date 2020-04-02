import React, { Component } from 'react';

class Form extends Component {

    state = {
        inputs: this.props.inputs.map(input => "")
    }
    
    handleTextChange = (e, i) => {
        const nextInputs = [...this.state.inputs]
        nextInputs[i] = e.target.value
        this.setState({inputs: nextInputs})
      }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({inputs: this.props.inputs.map(i => "")})
        this.props.submitCallback(this.state.inputs)
    }

    renderInputs = () => {
        return this.props.inputs.map((inputName, index) => (
          <input
            type="text"
            onChange={e => this.handleTextChange(e, index)}
            value={this.state.inputs[index]}
            placeholder={inputName}
            key={inputName}
          />
        ))
    }
    
    render() {
        return (
            <form>
                {this.renderInputs()}
                <button type="submit" onClick={this.handleSubmit}>
                {this.props.submitValue}
                </button>
            </form>
        );
    }
}

export default Form;
