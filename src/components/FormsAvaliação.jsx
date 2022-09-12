import React, { Component } from 'react';

export default class FormsAvaliação extends Component {
  state = {
    email: '',
    textArea: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  enviarFormulario = () => {
    this.setState({
      email: '',
      textArea: '',
    });
  };

  render() {
    const { email, textArea } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="product-detail-email"
          required
          value={ email }
          onChange={ this.handleChange }
          name="email"
        />
        <label htmlFor="1-rating">
          <input
            type="radio"
            name="notaDoProduto"
            value="1"
            data-testid="1-rating"
            id="1-rating"
          />
          1
        </label>
        <label htmlFor="2-rating">
          <input
            type="radio"
            name="notaDoProduto"
            value="2"
            data-testid="2-rating"
            id="2-rating"
          />
          2
        </label>
        <label htmlFor="3-rating">
          <input
            type="radio"
            name="notaDoProduto"
            value="3"
            data-testid="3-rating"
            id="3-rating"
          />
          3
        </label>
        <label htmlFor="4-rating">
          <input
            type="radio"
            name="notaDoProduto"
            value="4"
            data-testid="4-rating"
            id="4-rating"
          />
          4
        </label>
        <label htmlFor="5-rating">
          <input
            type="radio"
            name="notaDoProduto"
            value="5"
            data-testid="5-rating"
            id="5-rating"
          />
          5
        </label>
        <textarea
          type="text"
          data-testid="product-detail-evaluation"
          value={ textArea }
          onChange={ this.handleChange }
          name="textArea"
        />
        <input
          type="button"
          value="Enviar"
          data-testid="submit-review-btn"
          onClick={ this.enviarFormulario }
        />
      </form>
    );
  }
}
