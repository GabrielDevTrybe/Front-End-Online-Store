import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery, getProductsFromCategory,
} from '../services/api';
import CriarProdutos from './CriarProdutos';

export default class Pesquisa extends Component {
  state = {
    categories: [],
    alvo: '',
    products: [],
  };

  async componentDidMount() {
    await this.getCategoriesFromApi();
  }

  handleChange = ({ target }) => {
    this.setState({ alvo: target.value });
  };

  getCategoriesFromApi = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  getProducts = async () => {
    const { alvo } = this.state;
    const resultados = await getProductsFromCategoryAndQuery(alvo);
    const products = resultados.results;
    this.setState({ products });
  };

  getCategorieProduct = async (e) => {
    const resultados = await getProductsFromCategory(e.target.id);
    const products = resultados.results;
    this.setState({ products });
  };

  render() {
    const { categories, alvo, products } = this.state;
    return (
      <div
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
        <input
          value={ alvo }
          type="text"
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.getProducts }
        >
          Pesquisar
        </button>
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho</Link>
        { categories.map((categorie) => (
          <div key={ categorie.id }>
            <label htmlFor={ categorie.id } data-testid="category">
              {categorie.name}
              <input
                type="radio"
                id={ categorie.id }
                name="categories"
                onClick={ this.getCategorieProduct }
              />
            </label>
          </div>
        ))}
        <CriarProdutos produtos={ products } />
      </div>
    );
  }
}

Pesquisa.propTypes = {
  alvo: PropTypes.string,
}.isRquired;
