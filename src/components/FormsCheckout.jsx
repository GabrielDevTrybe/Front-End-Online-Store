import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class FormsCheckout extends Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      paymentMethod: '',
      validationForm: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.endShopping = this.endShopping.bind(this);
    this.validationInputs = this.validationInputs.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  radioChange({ target }) {
    this.setState({
      paymentMethod: target.id,
    });
  }

  validationInputs() {
    const { fullName, email, cpf, phone, cep, address } = this.state;
    let textInputs = false;
    let radioInputs = false;
    if (fullName.length !== 0
      && email.length !== 0
      && cpf.length !== 0
      && phone.length !== 0
      && cep.length !== 0
      && address.length !== 0) {
      textInputs = true;
    }
    const radios = document.getElementsByName('paymentMethod');
    radios.forEach((radio) => {
      if (radio.checked) {
        radioInputs = true;
      }
    });
    if (textInputs === true && radioInputs === true) {
      return true;
    }
  }

  endShopping() {
    const validation = this.validationInputs();
    if (validation) {
      localStorage.clear();
      this.setState({ redirect: true });
    } else {
      this.setState({ validationForm: true });
    }
  }

  render() {
    const { fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      paymentMethod,
      validationForm,
      redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <form>
        {validationForm ? <h1 data-testid="error-msg">Campos inválidos</h1> : null}
        <label htmlFor="fullName">
          Full Name:
          <input
            type="text"
            value={ fullName }
            onChange={ this.handleChange }
            id="fullName"
            data-testid="checkout-fullname"
            name="fullName"
            required
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={ email }
            onChange={ this.handleChange }
            id="email"
            data-testid="checkout-email"
            name="email"
            required
          />
        </label>
        <label htmlFor="cpf">
          Cpf:
          <input
            type="text"
            value={ cpf }
            onChange={ this.handleChange }
            id="cpf"
            data-testid="checkout-cpf"
            name="cpf"
            required
          />
        </label>
        <label htmlFor="phone">
          Phone:
          <input
            type="text"
            value={ phone }
            onChange={ this.handleChange }
            id="phone"
            data-testid="checkout-phone"
            name="phone"
            required
          />
        </label>
        <label htmlFor="cep">
          Cep:
          <input
            type="text"
            value={ cep }
            onChange={ this.handleChange }
            id="cep"
            data-testid="checkout-cep"
            name="cep"
            required
          />
        </label>
        <label htmlFor="address">
          Address:
          <input
            type="text"
            value={ address }
            onChange={ this.handleChange }
            id="address"
            data-testid="checkout-address"
            name="address"
            required
          />
        </label>
        <label htmlFor="boleto">
          Boleto
          <input
            type="radio"
            value={ paymentMethod }
            onClick={ this.radioChange }
            id="boleto"
            name="paymentMethod"
            data-testid="ticket-payment"
          />
        </label>
        <label htmlFor="visa">
          Visa
          <input
            type="radio"
            value={ paymentMethod }
            onClick={ this.radioChange }
            id="visa"
            name="paymentMethod"
            data-testid="visa-payment"
          />
        </label>
        <label htmlFor="master">
          MasterCard
          <input
            type="radio"
            value={ paymentMethod }
            onClick={ this.radioChange }
            id="master"
            name="paymentMethod"
            data-testid="master-payment"
          />
        </label>
        <label htmlFor="elo">
          Elo
          <input
            type="radio"
            value={ paymentMethod }
            onClick={ this.radioChange }
            id="elo"
            name="paymentMethod"
            data-testid="elo-payment"
          />
        </label>
        <button
          type="button"
          onClick={ this.endShopping }
          data-testid="checkout-btn"
        >
          Finalizar Compra
        </button>
      </form>
    );
  }
}
