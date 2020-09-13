import React, { Component } from 'react';
import Snake from './Snake';
import Target from './Target';

// Sets random coordinates within the canvas for snake target

const getRandmonCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

// The state of our snake && target
// Direction and random coordinates of snake target

const initialState = {
  target: getRandmonCoordinates(),
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
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.outOfBounds();
    this.hitWall();
    this.checkTarget();
  }

  // When user clicks on a key this will store the direction of the snake on our state

  onKeyDown = (e) => {
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

  // Check if snake is out of bounds

  outOfBounds() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  }

  // Check if snake has hit the wall

  hitWall() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];

    // Removes the last array element i.e. the snake's head
    snake.pop();

    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    });
  }

  // Check if the snake hit its target

  checkTarget() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let target = this.state.target;
    if (head[0] === target[0] && head[1] === target[1]) {
      this.setState({
        target: getRandmonCoordinates(),
      });
      this.growSnake();
      this.accelerate();
    }
  }

  growSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  accelerate() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }

  // What happens on Game Over

  gameOver() {
    alert(`Game Over. You score is ${this.state.snakeDots.length}`);
    // Reset Game
    this.setState(initialState);
  }

  // Creates Game Area, Snake and target(target)
  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <Target dot={this.state.target} />
      </div>
    );
  }
}

export default App;
