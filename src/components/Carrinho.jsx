import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carrinho extends Component {
  state = {
    carrinho: [],
  };

  componentDidMount() {
    const getLocalItem = localStorage.getItem('produtos');
    const carrinho = JSON.parse(getLocalItem);
    this.setState({ carrinho });
  }

  contador = (produto) => {
    let contador = 0;
    const { carrinho } = this.state;
    carrinho.forEach((item) => {
      if (produto.id === item.id) {
        contador += 1;
      }
    });
    return contador;
  };

  render() {
    const { carrinho } = this.state;
    if (carrinho === null || carrinho.length === 0) {
      return (
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
      );
    }
    return (
      [carrinho.map((produto) => (
        <div key={ produto.id }>
          <h3 data-testid="shopping-cart-product-name">{ produto.title }</h3>
          <img src={ produto.thumbnail } alt={ produto.title } />
          <p>{ produto.price }</p>
          <p data-testid="shopping-cart-product-quantity">{ this.contador(produto) }</p>
        </div>
      ))]
    );
  }
}

Carrinho.propTypes = {
  alvo: PropTypes.string,
}.isRquired;
