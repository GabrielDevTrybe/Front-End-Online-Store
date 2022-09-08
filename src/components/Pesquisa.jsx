import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Pesquisa extends Component {
  constructor() {
    super();
    this.getCategoriesFromApi = this.getCategoriesFromApi.bind(this);
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    await this.getCategoriesFromApi();
  }

  async getCategoriesFromApi() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { alvo } = this.props;
    const { categories } = this.state;
    return (
      <div
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
        <input value={ alvo } type="text" />
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho</Link>
        { categories.map((categorie) => (
          <div key={ categorie.id }>
            <label htmlFor="categorie" data-testid="category">
              {categorie.name}
              <input type="radio" id="categorie" />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

Pesquisa.propTypes = {
  alvo: PropTypes.string,
}.isRquired;
