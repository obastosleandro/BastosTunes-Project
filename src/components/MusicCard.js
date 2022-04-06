import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
      load: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.favoritesSong = this.favoritesSong.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    this.favoritesSong();
  }

  async onInputChange() {
    const { music: { trackId } } = this.props;
    this.setState({ load: true, check: true });
    await addSong(trackId);
    this.setState({ load: false });
  }

  async favoritesSong() {
    const { music: { trackId } } = this.props;
    const favoriteMusic = await getFavoriteSongs();
    favoriteMusic.some((song) => song.trackId === trackId
      && this.setState({ check: true }));
  }

  async removeFavorite() {
    const { music: { trackId } } = this.props;
    this.setState({
      load: true,
      check: false,
    });
    await removeSong(trackId);
    this.setState({ load: false });
  }

  render() {
    const {
      state: {
        check,
        load,
      },
      onInputChange,
      removeFavorite,
    } = this;
    const { music: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div>
        <span>{ trackName }</span>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {load ? <Loading /> : (
          <label htmlFor="favoriteMusic">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackId }
              type="checkbox"
              checked={ check }
              onChange={ !check ? onInputChange : removeFavorite }
            />
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};
