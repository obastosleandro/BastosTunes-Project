import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Links extends Component {
  render() {
    return (
      <div>
        <Link to="/">Login</Link>
        <Link to="/search">Search</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites">Favorite Pages</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/profile/edit">Settings</Link>
        <Link to="*">No Found</Link>
      </div>
    );
  }
}
