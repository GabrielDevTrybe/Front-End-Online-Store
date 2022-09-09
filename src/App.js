import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pesquisa from './components/Pesquisa';
import Carrinho from './components/Carrinho';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" Component={ Pesquisa } />
          <Route path="/carrinho" Component={ Carrinho } />
        </Switch>
      </BrowserRouter>
    );
  }
}
