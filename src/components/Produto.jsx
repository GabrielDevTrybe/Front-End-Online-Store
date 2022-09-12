import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import FormsAvaliação from './FormsAvaliação';

export default class Produto extends Component {
  state = {
    produto: {},
    carrinho: [],
  };

  async componentDidMount() {
    await this.getProduct();
    // const getLocalItem = localStorage.getItem('produtos');
    // const carrinho = JSON.parse(getLocalItem);
    // this.setState({ carrinho });
  }

  addCart = (produto) => {
    const { carrinho } = this.state;
    carrinho.push(produto);
    const stringify = JSON.stringify(carrinho);
    localStorage.setItem('produtos', stringify);
    this.setState({ carrinho });
  };

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const produto = await getProductById(id);
    this.setState({ produto });
  };

  render() {
    const { produto } = this.state;
    return (
      <div data-testid="product">
        <img
          src={ produto.thumbnail }
          alt={ produto.title }
          data-testid="product-detail-image"
        />
        <h1 data-testid="product-detail-name">{ produto.title }</h1>
        <p data-testid="product-detail-price">{ produto.price }</p>
        <Link data-testid="shopping-cart-button" to="/carrinho">Carrinho</Link>
        <button
          type="button"
          onClick={ () => this.addCart(produto) }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <FormsAvaliação />
      </div>
    );
  }
}

Produto.propTypes = {
  match: PropTypes.isRequired,
  id: PropTypes.shape({}).isRequired,
};
