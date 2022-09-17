import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class FormsAvaliação extends Component {
  state = {
    email: '',
    textArea: '',
    nota: '',
    errado: false,
    lista: [],
  };

  componentDidMount() {
    const result = localStorage.getItem(localStorage.key(0));
    const est = JSON.parse(result);
    // console.log(produto);
    if (result !== null) {
      this.setState({ lista: est });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
    });
  };

  enviarFormulario = () => {
    const { email, textArea, nota, lista } = this.state;
    const { produto } = this.props;
    console.log(email, nota);
    if (email.length > 0 && email.includes('@') && nota.length > 0) {
      this.setState({ errado: false });
      const salvar = { email, textArea, nota };
      this.setState({ lista: [...lista, salvar] }, () => {
        localStorage.setItem((produto.id), JSON.stringify([...lista, salvar]));
        this.setState({
          email: '',
          textArea: '',
          nota: '',
        });
      });
    } else {
      this.setState({ errado: true });
    }
  };

  render() {
    const { email, textArea, errado, lista } = this.state;
    return (
      <>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="product-detail-email"
            onChange={ this.handleChange }
          />
          <div>
            <input
              type="radio"
              id="css"
              data-testid="1-rating"
              name="nota"
              value="1"
              onChange={ this.handleChange }
            />
            1
            <input
              type="radio"
              id="css"
              data-testid="2-rating"
              name="nota"
              value="2"
              onChange={ this.handleChange }
            />
            2
            <input
              type="radio"
              id="css"
              data-testid="3-rating"
              name="nota"
              value="3"
              onChange={ this.handleChange }
            />
            3
            <input
              type="radio"
              id="css"
              data-testid="4-rating"
              name="nota"
              value="4"
              onChange={ this.handleChange }
            />
            4
            <input
              type="radio"
              id="css"
              data-testid="5-rating"
              name="nota"
              value="5"
              onChange={ this.handleChange }
            />
            5
          </div>
          <textarea
            name="textArea"
            value={ textArea }
            cols="30"
            rows="10"
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
            required
          />
          <input
            type="button"
            value="enviar"
            data-testid="submit-review-btn"
            onClick={ this.enviarFormulario }
          />
          {errado && (
            <h1 data-testid="error-msg">Campos inválidos</h1>
          )}
        </form>
        <div>
          {lista.map((produto) => (
            <div key={ produto.id }>
              <p data-testid="review-card-email">{ produto.email }</p>
              <p data-testid="review-card-evaluation">{ produto.textArea }</p>
              <p data-testid="review-card-rating">{ produto.nota }</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}
FormsAvaliação.propTypes = {
  produto: propTypes,
}.isRequired;
