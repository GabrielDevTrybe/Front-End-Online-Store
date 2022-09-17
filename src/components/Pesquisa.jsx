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
    carrinhoLength: 0,
  };

  async componentDidMount() {
    await this.getCategoriesFromApi();
    const getLocalItem = localStorage.getItem('produtos');
    const carrinho = JSON.parse(getLocalItem);
    if (carrinho !== null) {
      this.setState({ carrinhoLength: carrinho.length });
    }
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

  countCart = () => {
    const getLocalItem = localStorage.getItem('produtos');
    const carrinho = JSON.parse(getLocalItem);
    if (carrinho === null) {
      this.setState({ carrinhoLength: 0 });
    } else {
      this.setState({ carrinhoLength: carrinho.length });
    }
  };

  render() {
    const { categories, alvo, products, carrinhoLength } = this.state;
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
        <h3 data-testid="shopping-cart-size">{ carrinhoLength }</h3>
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
        <CriarProdutos produtos={ products } countCart={ this.countCart } />
      </div>
    );
  }
}

Pesquisa.propTypes = {
  alvo: PropTypes.string,
}.isRquired;
