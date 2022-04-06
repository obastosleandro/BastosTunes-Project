import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      bandName: '',
      disabledButton: true,
      listAlbuns: [],
      isLoading: false,
      renderBandName: '',
      renderList: false,
    };
    this.funcDisabledButton = this.funcDisabledButton.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.funcListAlbum = this.funcListAlbum.bind(this);
    // this.fetchListAlbunsByBand = this.fetchListAlbunsByBand.bind(this); Não precisou pq usei ARROWfunction.
  }

  onClickButton(event) { // 6/1.1 "Ao clicar no botão de Pesquisar, limpe o valor do input e faça uma requisição utilizando a função do arquivo searchAlbumsAPIs.js"
    event.preventDefault();
    this.fetchListAlbunsByBand();
  }

  onInputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      this.funcDisabledButton();
    });
  }

  fetchListAlbunsByBand = async () => {
    const { bandName } = this.state;
    this.setState({ isLoading: true }); // 6/2 "Enquanto aguarda a resposta da API, esconda o input e o botão de pesquisa e exiba a mensagem Carregando... na tela."
    const newAlbuns = await searchAlbumsAPI(bandName); // 6/1.2 "Lembre-se que essa função espera receber uma string com o nome da banda ou artista."

    this.setState({
      isLoading: false,
      renderBandName: bandName,
      bandName: '',
      listAlbuns: newAlbuns,
      renderList: true,
    });
  }

  funcListAlbum() {
    const { listAlbuns, renderBandName } = this.state;
    if (listAlbuns.length === 0) { // "Se nenhum álbum for encontrado para o nome pesquisado, a API irá retornar um array vazio. Nesse caso, a mensagem Nenhum álbum foi encontrado deverá ser exibida."
      return (<p>Nenhum álbum foi encontrado</p>);
    } return ( // "Após receber a resposta da requisição exibir na tela o texto Resultado de álbuns de: <artista>, onde <artista> é o nome que foi digitado no input."
      <div>
        <h1>{`Resultado de álbuns de: ${renderBandName}`}</h1>
        {/* Ao listar os álbuns, crie um link em cada card para redirecionar para a página do álbum. Este link deve ter o atributo data-testid={`link-to-album-${collectionId}`}.
        Onde collectionId é o valor da propriedade de cada Álbum. Este link deve redirecionar para a rota /album/:id, onde :id é o valor da propriedade collectionId de cada Álb
        um da lista recebida pela API. */}
        {listAlbuns.map(({
          artistId,
          artistName,
          collectionId,
          collectionName,
          collectionPrice,
          artworkUrl100,
          // releaseDate,
          // trackCount,
        }) => (
          <div key={ artistId }>
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              <img src={ artworkUrl100 } alt={ collectionName } />
              <p>{artistName}</p>
              <p>{collectionName}</p>
              <p>{collectionPrice}</p>
              Album
            </Link>
          </div>
        ))}
      </div>
    );
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
      isLoading,
      renderList,
    },
    onInputChange,
    onClickButton,
    funcListAlbum,
    } = this;

    if (isLoading) {
      return (
        <Loading />
      );
    }

    return (
      <div data-testid="page-search">
        <Header />

        {isLoading ? <Loading /> : (
          <form>
            <label htmlFor="search-artist-input">
              Artist/band:
              <input
                data-testid="search-artist-input"
                type="text"
                name="bandName"
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
        )}

        {renderList && funcListAlbum()}

      </div>
    );
  }
}
