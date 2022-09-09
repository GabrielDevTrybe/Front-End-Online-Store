import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pesquisa from './components/Pesquisa';
import Carrinho from './components/Carrinho';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Pesquisa } />
          <Route path="/carrinho" component={ Carrinho } />
        </Switch>
      </BrowserRouter>
    );
  }
}
