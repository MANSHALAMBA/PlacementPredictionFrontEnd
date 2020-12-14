import React, { Component, PureComponent } from "react";

import { Dashboard as DashboardLayout } from "layouts";

import { connect } from "react-redux";
import { APTITUDE } from "../../constants";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// styles
import styles from "./styles";
import style from "./style.module.css";
import { withStyles } from "@material-ui/styles";
import sampleSize from "lodash.samplesize";
import { Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const randomNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class Number extends PureComponent {
  handleClick = () => {
    if (this.props.clickable) {
      this.props.onClick(this.props.id);
    }
  };

  render() {
    return (
      <div
        className={style.number}
        style={{ opacity: this.props.clickable ? 1 : 0.3 }}
        onClick={this.handleClick}
      >
        {this.props.value}
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: "new",
      remainingSeconds: this.props.initialSeconds,
      selectedIds: []
    };
  }

  static bgColors = {
    playing: "#ccc",
    won: "green",
    lost: "red"
  };

  challengeNumbers = Array.from({ length: this.props.challengeSize }).map(() =>
    randomNumberBetween(...this.props.challengeRange)
  );

  target = sampleSize(
    this.challengeNumbers,
    this.props.challengeSize - 2
  ).reduce((acc, curr) => acc + curr, 0);

  componentDidMount() {
    if (this.props.autoPlay) {
      this.startGame();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startGame = () => {
    this.setState({ gameStatus: "playing" }, () => {
      this.intervalId = setInterval(() => {
        this.setState(prevState => {
          const newRemainingSeconds = prevState.remainingSeconds - 1;
          if (newRemainingSeconds === 0) {
            clearInterval(this.intervalId);
            return { gameStatus: "lost", remainingSeconds: 0 };
          }
          return { remainingSeconds: newRemainingSeconds };
        });
      }, 1000);
    });
  };

  isNumberAvailable = numberIndex =>
    this.state.selectedIds.indexOf(numberIndex) === -1;

  selectNumber = numberIndex => {
    if (this.state.gameStatus !== "playing") {
      return;
    }
    this.setState(
      prevState => ({
        selectedIds: [...prevState.selectedIds, numberIndex],
        gameStatus: this.calcGameStatus([...prevState.selectedIds, numberIndex])
      }),
      () => {
        if (this.state.gameStatus !== "playing") {
          clearInterval(this.intervalId);
        }
      }
    );
  };

  calcGameStatus = selectedIds => {
    const sumSelected = selectedIds.reduce(
      (acc, curr) => acc + this.challengeNumbers[curr],
      0
    );
    if (sumSelected < this.target) {
      return "playing";
    }
    // update aptitude in redux
    if (sumSelected === this.target) {
      this.props.add50();
    }
    return sumSelected === this.target ? "won" : "lost";
  };

  render() {
    const { gameStatus, remainingSeconds } = this.state;
    return (
      <div className="game">
        <div
          className={style.target}
          style={{ backgroundColor: Game.bgColors[gameStatus] }}
        >
          {gameStatus === "new" ? "?" : this.target}
        </div>
        <br />
        <div className="challenge-numbers">
          <Grid container spacing={2}>
            {this.challengeNumbers.map((value, index) => (
              <Grid item xs={6}>
                <Number
                  key={index}
                  id={index}
                  value={gameStatus === "new" ? "?" : value}
                  clickable={this.isNumberAvailable(index)}
                  onClick={this.selectNumber}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <br />

        <div className="footer">
          {gameStatus === "new" ? (
            <Button
              onClick={this.startGame}
              variant="contained"
              color="primary"
            >
              Start
            </Button>
          ) : (
            <div>
              <Typography>Timer :</Typography>
              <div className="timer-value">{remainingSeconds}</div>
            </div>
          )}
          {["won", "lost"].includes(gameStatus) && (
            <Button
              onClick={this.props.onPlayAgain}
              variant="contained"
              color="primary"
            >
              Play Again
            </Button>
          )}
        </div>
      </div>
    );
  }
}

class Sudoku extends Component {
  constructor(props) {
    super(props);
    this.state = { gameId: 1 };
  }

  resetGame = () =>
    this.setState(prevState => ({
      gameId: prevState.gameId + 1
    }));

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout mode={APTITUDE} title="Quizzes">
        <div className={classes.root} style={{ textAlign: "center" }}>
          <Typography variant="h2">The Target Sum</Typography>
          <br />
          <Typography variant="h4">
            Select numbers from palette given below whose sum is equal to the
            number being flashed .
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
                A.Lesser is the time player takes to acheive target sum more is
                his/her score .
              </Typography>{" "}
              <br />
              <Typography>
                B.Once the time limit exceeds final result will be evaluated.
              </Typography>{" "}
              <Typography>
                {" "}
                C.Once a number is selected it can't be deselected .
              </Typography>{" "}
              <Typography>
                D.Quantitative abilities of the player is being judged here.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <br />
          <Game
            key={this.state.gameId}
            autoPlay={this.state.gameId > 1}
            challengeSize={6}
            challengeRange={[2, 9]}
            initialSeconds={10}
            onPlayAgain={this.resetGame}
            add50={this.props.add50}
          />
        </div>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    aptitudescore: state.dashboard.aptitudescore
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add50: () => dispatch({ type: "ADD FIFTY" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Sudoku));
