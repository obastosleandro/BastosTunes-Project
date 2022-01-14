import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Links extends Component {
  render() {
    return (
      <>
        <Link to="/serach">Search</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/favorites">Favorites</Link>
      </>
    );
  }
}
