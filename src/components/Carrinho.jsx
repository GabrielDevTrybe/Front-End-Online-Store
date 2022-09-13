import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carrinho extends Component {
  state = {
    carrinho: [],
    carrinhoSemRepetições: [],
  };

  componentDidMount() {
    const getLocalItem = localStorage.getItem('produtos');
    const carrinho = JSON.parse(getLocalItem);
    this.setState({ carrinho });
    this.filterCarrinho(carrinho);
  }

  filterCarrinho = (carrinho) => {
    const carroFilt = [];
    const getObject = (obj) => JSON.stringify(obj);
    carrinho.forEach((item) => {
      const temp = carroFilt.some((i) => getObject(i.title) === getObject(item.title));
      if (!temp) {
        carroFilt.push(item);
      }
    });
    this.setState({ carrinhoSemRepetições: carroFilt });
  };

  contador = (produto) => {
    const { carrinho } = this.state;
    const counterFilter = carrinho.filter((item) => (item.id === produto.id));
    return counterFilter.length;
  };

  increaseQuantity = ({ target }) => {
    const { name } = target;
    const { carrinho } = this.state;
    const produtoIncrementado = carrinho.find((item) => item.id === name);
    carrinho.push(produtoIncrementado);
    const stringified = JSON.stringify(carrinho);
    localStorage.setItem('produtos', stringified);
    const storageItems = localStorage.getItem('produtos');
    const parsed = JSON.parse(storageItems);
    this.setState({ carrinho: parsed });
  };

  decreaseQuantity = ({ target }) => {
    const { carrinho } = this.state;
    const { name } = target;
    const produtoDecrementado = carrinho.filter((item) => item.id === name);
    const outrosProdutos = carrinho.filter((item) => item.id !== name);
    const produtoReduzido = produtoDecrementado.length > 1
      ? produtoDecrementado.slice(1) : produtoDecrementado;
    const todosProdutos = [...outrosProdutos, ...produtoReduzido];
    const stringified = JSON.stringify(todosProdutos);
    localStorage.setItem('produtos', stringified);
    const storageItems = localStorage.getItem('produtos');
    const parsed = JSON.parse(storageItems);
    this.setState({ carrinho: parsed });
  };

  removeItem = ({ target }) => {
    const { name } = target;
    const { carrinho } = this.state;
    const outrosItems = carrinho.filter((item) => name !== item.id);
    const stringified = JSON.stringify(outrosItems);
    localStorage.setItem('produtos', stringified);
    const storageItems = localStorage.getItem('produtos');
    const parsed = JSON.parse(storageItems);
    this.setState({ carrinho: parsed });
    this.filterCarrinho(parsed);
  };

  render() {
    const { carrinho, carrinhoSemRepetições } = this.state;
    if (carrinho === null || carrinho.length === 0) {
      return (
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
      );
    }
    return (
      [carrinhoSemRepetições.map((produto) => (
        <div key={ produto.id }>
          <h3 data-testid="shopping-cart-product-name">{ produto.title }</h3>
          <img src={ produto.thumbnail } alt={ produto.title } />
          <p>{ produto.price }</p>
          <input
            type="button"
            value="+"
            data-testid="product-increase-quantity"
            onClick={ this.increaseQuantity }
            name={ produto.id }
          />
          <p data-testid="shopping-cart-product-quantity">{ this.contador(produto) }</p>
          <input
            type="button"
            value="-"
            data-testid="product-decrease-quantity"
            onClick={ this.decreaseQuantity }
            name={ produto.id }
          />
          <input
            type="button"
            value="Remover Produto"
            data-testid="remove-product"
            name={ produto.id }
            onClick={ this.removeItem }
          />
        </div>
      ))]
    );
  }
}

Carrinho.propTypes = {
  alvo: PropTypes.string,
}.isRquired;
