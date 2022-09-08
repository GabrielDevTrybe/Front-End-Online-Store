import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Pesquisa extends Component {
  render() {
    const { alvo } = this.props;
    return (
      <div
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
        <input value={ alvo } type="text" />
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho</Link>
      </div>
    );
  }
}

Pesquisa.propTypes = {
  alvo: PropTypes.string,
}.isRquired;
