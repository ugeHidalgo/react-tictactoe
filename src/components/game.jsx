'use strict';

import React from 'react';
import Board from './board.jsx';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)        
      }],
      xIsNext: true,
      stepNumber: 0,
      winner: false,
      draw: false
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {        
        return squares[a];
      }
    }
    return null;
  }

  allSquaresFilled(squares) {    
    for (let i = 0; i<squares.length; i++){
      if (!squares[i]) {
        return false;
      }
    }
    return true;
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1),
          current = history[history.length-1],
          squares = current.squares.slice();

    if (this.state.winner || squares[i]) {   
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });

    if (this.calculateWinner(squares)) {
      this.setState({winner: true});      
    }

    if (this.allSquaresFilled(squares)) {
      this.setState({draw: true});
    }
  }

  jumpTo(index) {
    let history, current, squares;

    this.setState({
      stepNumber: index,
      xIsNext: (index % 2) === 0,
      winner: false     
    });

    history = this.state.history.slice(0,index+1);
    current = history[index];
    squares = current.squares.slice();
    
    if (this.calculateWinner(squares)) {
      this.setState({winner: true});      
    } 
  }

  render() {
    const history = this.state.history,
          winner = this.state.winner,
          draw = this.state.draw,
          current = history[this.state.stepNumber],
          moves = history.map((value,index) => {
            const buttonTitle = index ?
              'Go to move ' + index :
              'Restart';

            return (
              <li key={index}>
                <button onClick={()=>this.jumpTo(index)}>{buttonTitle}</button>
              </li>
            );
          });
    let status;

    if (winner) {                        
      status = 'Winner: ' + winner;
    } else {
      if (draw) {
        status = 'This is a draw!';
      }
      else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }
    return (
      <div className="game">
        <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i)=>{this.handleClick(i, winner);}}
            />          
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
