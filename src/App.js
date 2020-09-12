import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

// Sets random coordinates within the canvas for snake food

const getRandmonCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

// The state of our snake && food
// Direction and random coordinates of snake food

const initialState = {
  food: getRandmonCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.snakeMovement, this.state.speed);
    document.onkeypress = this.onKeyPress;
  }

  // When user clicks on a key this will store the direction of the snake on our state

  onKeyPress = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: 'UP' });
        break;
      case 40:
        this.setState({ direction: 'DOWN' });
        break;
      case 37:
        this.setState({ direction: 'LEFT' });
        break;
      case 39:
        this.setState({ direction: 'RIGHT' });
        break;
    }
  };

  snakeMovement = () => {
    let dots = [...this.state.snakeDots];
    // The head of the snake is the last element of the array

    let head = dots[dots.length - 1];
    // The cod below creates a new head for each possible direction
    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }

    // Adding the head to the snake's body array
    dots.push(head);

    // This line removes the first element of the body array
    // Snake Movement is created by adding an element to the body and removing
    // another one at the opposite and
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };

  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;
