import React, { Component } from 'react';
import FormsCheckout from './FormsCheckout';

export default class Checkout extends Component {
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
    if (carrinho !== null) {
      carrinho.forEach((item) => {
        const temp = carroFilt.some((i) => getObject(i.title) === getObject(item.title));
        if (!temp) {
          carroFilt.push(item);
        }
      });
    }
    this.setState({ carrinhoSemRepetições: carroFilt });
  };

  contador = (produto) => {
    const { carrinho } = this.state;
    const counterFilter = carrinho.filter((item) => (item.id === produto.id));
    return counterFilter.length;
  };

  render() {
    const { carrinhoSemRepetições } = this.state;
    return (
      <>
        <h1>Checkout</h1>
        {carrinhoSemRepetições.map((produto) => (
          <div key={ produto.id }>
            <h3 data-testid="shopping-cart-product-name">{ produto.title }</h3>
            <img src={ produto.thumbnail } alt={ produto.title } />
            <p>{ produto.price }</p>
            <p>{ this.contador(produto) }</p>
          </div>
        ))}
        <FormsCheckout />
      </>
    );
  }
}
