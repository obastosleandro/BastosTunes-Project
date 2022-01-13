import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      load: true,
    };
    this.user = this.user.bind(this);
  }

  componentDidMount() {
    this.user();
  }

  async user() {
    const { name } = await getUser();
    this.setState({ name, load: false });
  }

  render() {
    const {
      name,
      load,
    } = this.state;
    return (
      <header data-testid="header-component">
        { load ? <Loading /> : (
          <div data-testid="header-user-name">{ name }</div>
        ) }
      </header>
    );
  }
}
