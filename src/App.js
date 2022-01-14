import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes';
import Links from './components/Links';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
        <Links />
      </BrowserRouter>
    );
  }
}

export default App;
