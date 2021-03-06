import React, { Component } from "react";

import { Dashboard as DashboardLayout } from "layouts";

import Loader from "./components/loader";

import { connect } from "react-redux";
import { Content } from "serializers/content";
import swal from "sweetalert";

import { APTITUDE } from "../../constants";
import style from "./style.module.css";
// styles
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

class TopPanel extends Component {
  pauseGame() {
    this.props.pauseGame();
  }

  runGame() {
    if (this.props.aliveCount > 0) {
      this.props.runGame();
    }
  }

  clearBoard() {
    // update aptitude score
    this.props.generations > 500 ? this.props.add50() : this.props.add20();
    // true for clearSquares
    this.props.clearGame(true);
  }

  render() {
    let panelWidth = {
      width: this.props.width
    };
    return (
      <div style={panelWidth}>
        <Button
          onClick={this.runGame.bind(this)}
          variant="outlined"
          color="primary"
          style={{ marginRight: "2px" }}
        >
          Run
        </Button>
        <Button
          onClick={this.pauseGame.bind(this)}
          variant="outlined"
          color="primary"
          style={{ margin: "2px" }}
        >
          Pause
        </Button>
        <Button
          onClick={this.clearBoard.bind(this)}
          variant="outlined"
          color="primary"
          style={{ marginLeft: "2px" }}
        >
          Clear
        </Button>
        <Typography>Generations: {this.props.generations}</Typography>
      </div>
    );
  }
}

class Person extends React.Component {
  clickSquare() {
    this.props.clickSquare(this.props.id);
  }

  render() {
    let aliveColor = this.props.newPerson
      ? "rgba(0,220,200,1)"
      : "rgba(0,100,100, 1)";
    let backgroundColor = this.props.isAlive ? aliveColor : "none";
    let squareStyle = {
      height: this.props.squareSize,
      width: this.props.squareSize,
      background: backgroundColor
    };
    return (
      <span
        onClick={this.clickSquare.bind(this)}
        className={style.person}
        style={squareStyle}
      ></span>
    );
  }
}

class ConwaysGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      squareSize: 14,
      numCols: 50,
      numRows: 30,
      generations: 1,
      aliveStates: null,
      paused: false,
      aliveCount: 0,
      newPeople: []
    };
  }

  componentWillMount() {
    // stores keys of coordinates with alive or dead boolean.
    // example: aliveStates['0,0'] = 1 (true);
    this.resetBoard();
  }

  resetBoard(clearSquares = false) {
    let aliveStates = {};
    let aliveCount = 0;
    let people = [];
    if (clearSquares) {
      this.setState({
        paused: true
      });
    }

    let alive;
    for (let row = 0; row < this.state.numRows; row++) {
      // Make columns
      for (let col = 0; col < this.state.numCols; col++) {
        if (clearSquares) {
          alive = 0;
        } else {
          alive = Math.floor(Math.random() * 10) > 6 ? 1 : 0;
          people.push([row, col]);
        }
        if (alive === 1) {
          aliveCount++;
        }
        aliveStates[`${row},${col}`] = alive;
      }
    }

    if (clearSquares) {
      this.setState({
        aliveStates: aliveStates,
        generations: 0,
        aliveCount: 0
      });
    } else {
      let squareSize = this.state.squareSize;
      let amount = this.state.numRows * this.state.numCols;
      this.setState({
        people: people,
        aliveStates: aliveStates,
        totalSquares: amount,
        aliveCount: aliveCount
      });
    }
  }

  getNeighbors(currentRow, currentCol) {
    let numCols = this.state.numCols;
    let numRows = this.state.numRows;
    let moveDirections = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];

    let currentPair = [];
    let neighbors = moveDirections.map(pair => {
      currentPair = [currentRow + pair[0], currentCol + pair[1]];
      if (currentPair[0] < 0) {
        currentPair = [numRows - 1, currentPair[1]];
      } else if (currentPair[0] >= numRows) {
        currentPair = [0, currentPair[1]];
      }

      if (currentPair[1] >= numCols) {
        currentPair = [currentPair[0], 0];
      } else if (currentPair[1] < 0) {
        currentPair = [currentPair[0], numCols - 1];
      }
      return currentPair;
    });
    return neighbors;
  }

  checkAlive(isAlive, currentRow, currentCol) {
    // returns 2 dimensional array of neighbors
    let neighbors = this.getNeighbors(currentRow, currentCol);

    let livingNeighbors = 0;

    for (var i = 0; i < neighbors.length; i++) {
      if (
        this.state.aliveStates[`${neighbors[i][0]},${neighbors[i][1]}`] === 1
      ) {
        livingNeighbors += 1;
      }
    }

    if (isAlive === 1) {
      if (livingNeighbors < 2 || livingNeighbors > 3) {
        return 0;
      }
      return 1;
    } else {
      // wasn't alive
      if (livingNeighbors === 3) {
        return 1;
      }
      return 0;
    }
  }

  updatePopulation() {
    let people = this.state.people;
    let newPeople = [];
    let aliveCount = 0;
    let aliveStates = JSON.parse(JSON.stringify(this.state.aliveStates));

    for (let i = 0; i < this.state.totalSquares; i++) {
      let currentRow = people[i][0];
      let currentCol = people[i][1];
      let location = `${currentRow},${currentCol}`;
      let wasAlive = aliveStates[location];
      let isAlive = this.checkAlive(wasAlive, currentRow, currentCol);

      if (wasAlive) {
        aliveCount++;
      }

      if (!wasAlive && isAlive) {
        newPeople.push(location);
      }

      aliveStates[location] = isAlive;
    }

    setTimeout(() => {
      if (this.state.paused) {
        return;
      }
      if (aliveCount === 0) {
        this.setState({
          aliveStates: aliveStates,
          generations: 0,
          aliveCount: 0,
          paused: true,
          newPeople: []
        });
        return;
      }

      this.setState({
        aliveStates: aliveStates,
        generations: this.state.generations + 1,
        aliveCount: aliveCount,
        newPeople: newPeople,
        updateQueue: []
      });
    }, 60);
  }

  renderSquares() {
    if (!this.state.paused && this.state.aliveCount > 0) {
      this.updatePopulation();
    }
    if (
      !this.state.people ||
      this.state.people.length < 1 ||
      !this.state.aliveStates
    ) {
      return null;
      const { classes } = this.props;
    }
    let aliveStates = this.state.aliveStates;
    let newPeople = this.state.newPeople;
    let alive;
    let coords;
    let result = this.state.people.map(location => {
      coords = `${location[0]},${location[1]}`;
      alive = aliveStates[coords];
      let newPerson = newPeople.indexOf(coords) !== -1 ? true : false;
      return (
        <Person
          key={coords}
          id={coords}
          squareSize={this.state.squareSize}
          clickSquare={this.clickSquare.bind(this)}
          newPerson={newPerson}
          isAlive={alive}
        />
      );
    });
    return result;
  }
  // Controls
  pauseGame() {
    this.setState({
      paused: true
    });
  }

  runGame() {
    if (this.state.aliveCount > 0) {
      this.setState({
        paused: false
      });
    }
  }

  // Handles updating squares
  clickSquare(location) {
    let aliveStates = JSON.parse(JSON.stringify(this.state.aliveStates));
    let aliveCount = this.state.aliveCount;
    let newPeople = JSON.parse(JSON.stringify(this.state.newPeople));
    let alive = aliveStates[location] === 0 ? 1 : 0;
    aliveStates[location] = alive;
    if (this.state.paused) {
      if (alive) {
        aliveCount++;
        if (newPeople.indexOf(location) === -1) {
          newPeople.push(location);
        }
      } else {
        aliveCount--;
      }
      this.setState({
        aliveStates: aliveStates,
        aliveCount: aliveCount,
        newPeople: newPeople
      });
    }
  }

  render() {
    let gameStyles = {
      height: this.state.numRows * this.state.squareSize + 1.5 + "px",
      width: this.state.numCols * this.state.squareSize + 1.5 + "px"
    };
    const { classes } = this.props;
    return (
      <DashboardLayout mode={APTITUDE} title="APTITUDE">
        <div className={classes.root} style={{ textAlign: "center" }}>
          <Typography variant="h2">Conway's Game Of Life</Typography>
          <br />
          <Typography variant="h4">
            A cellular automaton Game devised by the British mathematician John
            Horton Conway
          </Typography>
          <br />
          <br />
          <ExpansionPanel style={{ backgroundColor: "#32dbc6" }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography style={{ textAlign: "center" }}>Rules</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                A.Any live cell with fewer than two live neighbours dies, as if
                by underpopulation..
              </Typography>{" "}
              <br />
              <Typography>
                B.Any live cell with two or three live neighbours lives on to
                the next generation.
              </Typography>{" "}
              <Typography>
                {" "}
                C.Any live cell with more than three live neighbours dies, as if
                by overpopulation.
              </Typography>{" "}
              <Typography>
                D.Any dead cell with exactly three live neighbours becomes a
                live cell, as if by reproduction.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <br />

          <div className={style.game}>
            <div id="game" style={gameStyles}>
              <div style={{ marginLeft: "220px" }}>
                <TopPanel
                  width={(this.state.numCols * this.state.squareSize * 4) / 6}
                  generations={this.state.generations}
                  add20={this.props.add20}
                  add50={this.props.add50}
                  pauseGame={this.pauseGame.bind(this)}
                  runGame={this.runGame.bind(this)}
                  aliveCount={this.state.aliveCount}
                  clearGame={this.resetBoard.bind(this)}
                />
              </div>
              <br />
              <br />
              {this.renderSquares()}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add20: () => dispatch({ type: "ADD TWENTY" }),
    add50: () => dispatch({ type: "ADD FIFTY" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ConwaysGame));
