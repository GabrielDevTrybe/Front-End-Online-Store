import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class Produto extends Component {
  state = {
    produto: {},
  };

  async componentDidMount() {
    await this.getProduct();
  }

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
      </div>
    );
  }
}

Produto.propTypes = {
  match: PropTypes.isRequired,
  id: PropTypes.shape({}).isRequired,
};
