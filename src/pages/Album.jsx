import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      artistName: '',
      artistAlbum: '',
    };
    this.getMusicApi = this.getMusicApi.bind(this);
  }

  componentDidMount() {
    this.getMusicApi();
  }

  async getMusicApi() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musicList: musics,
      artistName: musics[0].artistName,
      artistAlbum: musics[0].collectionName,
    });
    console.log(musics);
  }

  render() {
    const {
      state: {
        musicList,
        artistName,
        artistAlbum,
      },
    } = this;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h3 data-testid="album-name">{ artistAlbum }</h3>
        </div>
        {musicList.slice([1]).map((music) => (
          <div key={ music.trackNumber }>
            <MusicCard music={ music } />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
