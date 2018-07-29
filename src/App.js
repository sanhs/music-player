import React, { Component } from 'react';

import Player from './components/player';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Music</h1>
        </header>
        <Player />        
      </div>
    );
  }
}

export default App;
