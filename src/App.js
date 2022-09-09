import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pesquisa from './components/Pesquisa';
import Carrinho from './components/Carrinho';
import Produto from './components/Produto';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Pesquisa } />
          <Route path="/carrinho" component={ Carrinho } />
          <Route path="/produtos/:id" component={ Produto } />
        </Switch>
      </BrowserRouter>
    );
  }
}
