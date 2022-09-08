import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pesquisa extends Component {
  render() {
    const { alvo } = this.props;
    return (
      <div
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
        <input value={ alvo } type="text" />
      </div>
    );
  }
}

Pesquisa.propTypes = {
  alvo: PropTypes.string,
}.isRquired;
