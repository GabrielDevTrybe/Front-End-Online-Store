import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CriarProdutos extends Component {
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
          <div key={ e.id } data-testid="product">
            <img src={ e.thumbnail } alt={ e.title } />
            <h2>{e.title}</h2>
            <p>{e.price}</p>
          </div>
        ))}
      </div>
    );
  }
}

CriarProdutos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
