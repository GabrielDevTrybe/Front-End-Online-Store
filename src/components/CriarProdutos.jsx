import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CriarProdutos extends Component {
  state = {
    carrinho: [],
  };

  componentDidMount() {
    const getLocalItem = localStorage.getItem('produtos');
    const carrinho = JSON.parse(getLocalItem);
    if (carrinho !== null) {
      this.setState({ carrinho });
    }
  }

  addCart = (produto) => {
    const { carrinho } = this.state;
    const { countCart } = this.props;
    carrinho.push(produto);
    const stringify = JSON.stringify(carrinho);
    localStorage.setItem('produtos', stringify);
    this.setState({ carrinho });
    countCart();
  };

  render() {
    const { produtos } = this.props;
    if (produtos.length === 0) {
      return (
        <h1>Nenhum produto foi encontrado</h1>
      );
    }
    return (
      <div>
        {produtos.map((e) => (
          <>
            {/* {this.checkShippingFree(e)} */}
            <Link
              to={ `/produtos/${e.id}` }
              key={ e.id }
              data-testid="product-detail-link"
            >
              <div data-testid="product">
                <img src={ e.thumbnail } alt={ e.title } />
                <h2>{e.title}</h2>
                <p>{e.price}</p>
                {e.shipping.free_shipping
                  ? <p data-testid="free-shipping">Frete Grátis</p>
                  : null}
              </div>
            </Link>
            <button
              type="button"
              onClick={ () => this.addCart(e) }
              data-testid="product-add-to-cart"
            >
              Adicionar ao carrinho
            </button>
          </>
        ))}
      </div>
    );
  }
}

CriarProdutos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  countCart: PropTypes.func.isRequired,
};
