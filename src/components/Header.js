import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: true,
    };
    this.user = this.user.bind(this);
  }

  componentDidMount() {
    this.user();
  }

  async user() {
    const { name } = await getUser();
    this.setState({ name, isLoading: false });
  }

  render() {
    const {
      name,
      isLoading,
    } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <Loading /> : (
          <div data-testid="header-user-name">{name}</div>
        )}
        <section>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </section>
      </header>
    );
  }
}
