import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      bandName: '',
      disabledButton: true,
    };
    this.funcDisabledButton = this.funcDisabledButton.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton(event) {
    event.preventDefault();
    this.searchBand();
  }

  onInputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      this.funcDisabledButton();
    });
  }

  funcDisabledButton() {
    const { bandName } = this.state;
    const TWO = 2;
    if (bandName.length < TWO) {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
  }

  render() {
    const { state: {
      bandName,
      disabledButton,
    },
    onInputChange,
    onClickButton,
    } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            Artist/band:
            <input
              data-testid="search-artist-input"
              name="bandName"
              type="text"
              value={ bandName }
              onChange={ onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabledButton }
            onClick={ onClickButton }
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
