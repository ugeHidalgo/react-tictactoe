'use strict';

import React from 'react';

export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
            <h1>A game component should go here...</h1>          
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
