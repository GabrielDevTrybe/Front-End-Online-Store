import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pesquisa from './components/Pesquisa';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Pesquisa /></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
