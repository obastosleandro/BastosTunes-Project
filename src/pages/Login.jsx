import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      disabledButton: true,
      load: false,
      requisition: false,
    };
    this.saveUserName = this.saveUserName.bind(this);
    this.funcDisabledBttn = this.funcDisabledBttn.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onInputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      this.funcDisabledBttn();
    });
  }

  onClickButton(event) {
    event.preventDefault();
    this.saveUserName();
  }

  funcDisabledBttn() {
    const THREE = 3;
    const { userName } = this.state;
    if (userName.length < THREE) {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
  }

  async saveUserName() {
    const { userName } = this.state;
    this.setState({ load: true });
    await createUser({ name: userName });
    this.setState({ load: false });
    this.setState({ requisition: true });
  }

  render() {
    const {
      state: {
        userName,
        disabledButton,
        load,
        requisition,
      },
      onInputChange,
      onClickButton,
    } = this;

    return (
      <div data-testid="page-login">

        <form>
          <label htmlFor="name">
            Name:
            <input
              data-testid="login-name-input"
              name="userName"
              type="text"
              value={ userName }
              onChange={ onInputChange }
            />
          </label>
          <button
            onClick={ onClickButton }
            data-testid="login-submit-button"
            type="submit"
            disabled={ disabledButton }
          >
            Entrar
          </button>
        </form>

        {load && <Loading />}
        {requisition && <Redirect to="/search" />}

      </div>
    );
  }
}
