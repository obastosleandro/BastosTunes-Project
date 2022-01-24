import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      userName: 'User Test',
      userEmail: 'email@test.com',
      userImage: 'url-to-image',
      userDescription: 'Lorem ipsum',
      load: false,
    };

    this.user = this.user.bind(this);
  }

  componentDidMount() {
    this.user();
  }

  user() {
    this.setState({ load: true }, () => {
      getUser()
        .then(({ name }) => this.setState({
          userName: name,
          load: false,
        }));
    });
  }

  render() {
    const {
      load,
      userName,
      userEmail,
      userImage,
      userDescription,
    } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {load ? <Loading /> : (
          <section>
            <div>
              <image
                data-testid="profile-image"
                src={ userImage }
                alt="profile-image"
              />
              <Link to="profile/edit">Editar perfil</Link>
            </div>
            <div>
              <h2>{ userName }</h2>
              <h2>{ userEmail }</h2>
              <h2>{ userDescription }</h2>
            </div>
          </section>
        )}
      </div>
    );
  }
}
