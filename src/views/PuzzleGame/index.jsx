import React, { Component } from "react";

import { Dashboard as DashboardLayout } from "layouts";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { APTITUDE } from "../../constants";

// styles
import styles from "./styles";
import style from "./style.module.css";
import { withStyles } from "@material-ui/styles";

import swal from "sweetalert";
import { Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class Cell extends Component {
  render() {
    const cls = this.props.value;
    return (
      <div>
        {cls == 0 ? (
          <span
            className={style.squarezero}
            onClick={() => this.props.clickHandler()}
          >
            {this.props.value}
          </span>
        ) : (
          <span
            className={style.square}
            onClick={() => this.props.clickHandler()}
          >
            {this.props.value}
          </span>
        )}
      </div>
    );
  }
}

class Board extends Component {
  componentWillMount() {
    this.findClickables(this.props.board, this.props.size);
  }
  componentWillReceiveProps(nextProps) {
    this.findClickables(nextProps.board, nextProps.size);
  }
  shouldComponentUpdate(nextProps) {
    const curr = this.props.board.join("");
    const next = nextProps.board.join("");
    return curr !== next;
  }

  findClickables(board, size) {
    const zeroIndex = board.indexOf(0);
    const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
    const possibleTopIdx =
      zeroCoordinate.row > 0
        ? this.getIndexFromCoord(
            zeroCoordinate.row - 1,
            zeroCoordinate.column,
            size
          )
        : null;
    const possiblRightIdx =
      zeroCoordinate.column < size
        ? this.getIndexFromCoord(
            zeroCoordinate.row,
            zeroCoordinate.column + 1,
            size
          )
        : null;
    const possiblBottomIdx =
      zeroCoordinate.row < size
        ? this.getIndexFromCoord(
            zeroCoordinate.row + 1,
            zeroCoordinate.column,
            size
          )
        : null;
    const possibleLeftIdx =
      zeroCoordinate.column > 0
        ? this.getIndexFromCoord(
            zeroCoordinate.row,
            zeroCoordinate.column - 1,
            size
          )
        : null;

    this.setState({
      zero: zeroIndex,
      possibleTopIdx: possibleTopIdx,
      possiblRightIdx: possiblRightIdx,
      possiblBottomIdx: possiblBottomIdx,
      possibleLeftIdx: possibleLeftIdx
    });
  }
  getCoordFromIndex(idx, size) {
    return { row: Math.floor(idx / size) + 1, column: (idx % size) + 1 };
  }
  getIndexFromCoord(row, col, size) {
    return size * (row - 1) + col - 1;
  }
  cellClickHandler(index) {
    if (
      index === this.state.possibleTopIdx ||
      index === this.state.possiblRightIdx ||
      index === this.state.possiblBottomIdx ||
      index === this.state.possibleLeftIdx
    )
      this.nextBoard(index);
  }
  nextBoard(index, direction) {
    const board = this.props.board.slice();
    const temp = board[index];
    board[index] = board[this.state.zero];
    board[this.state.zero] = temp;
    this.props.updateBoard(board);
  }
  render() {
    const squares = this.props.board.map((val, index) => {
      if ((index + 1) % this.props.size === 0) {
        return (
          <span>
            {
              <div className={style.blocks}>
                <Cell
                  value={val}
                  clickHandler={this.cellClickHandler.bind(this, index)}
                />
              </div>
            }
            <br />
          </span>
        );
      }
      return (
        <div className={style.blocks}>
          <Cell
            value={val}
            clickHandler={this.cellClickHandler.bind(this, index)}
          />
        </div>
      );
    });
    return <div>{squares}</div>;
  }
}
class PuzzleGame extends Component {
  constructor(props) {
    super(props);
    this.state = { board: [1, 2, 3, 4, 5, 6, 7, 8, 0], size: 3 };
  }
  newGame(size) {
    let board = new Array(size * size);
    for (let i = 0; i < size * size; ++i) board[i] = i;
    board = this.shuffle(board);
    this.updateBoard(board, size);
    this.setState({ size: size });
  }
  updateBoard(board, size) {
    this.setState({ board: board });
  }
  shuffle(o) {
    const temp = o.slice();
    for (
      var j, x, i = temp.length;
      i;
      j = Math.floor(Math.random() * i),
        x = temp[--i],
        temp[i] = temp[j],
        temp[j] = x
    );
    return temp;
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout mode={APTITUDE} title="APTITUDE">
        <div className={classes.root} style={{ textAlign: "center" }}>
          <div className={style.puzzle}>
            <Typography variant="h2">Arrange In Sequence</Typography>
            <br />
            <Typography variant="h4">
              Click on the squares to move them (only those next to the 0
              square)
            </Typography>
            <br />
            <br />
            <ExpansionPanel style={{ backgroundColor: "#bbeaa6" }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography style={{ textAlign: "center" }}>Rules</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  A.Only the cells adjacent to zero can be moved .
                </Typography>{" "}
                <br />
                <Typography>
                  B.Goal is to arrange all the numbers in sequential order.
                </Typography>{" "}
                <Typography>
                  {" "}
                  C.Lesser is the number of moves more is the score .
                </Typography>{" "}
                <Typography>
                  D.Larger is the size of board , more is the score player
                  attains on achieving goal state.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <br />
            <br />
            {this.state && this.state.board ? (
              <div className={style.blocks}>
                <Board
                  size={this.state.size}
                  board={this.state.board}
                  updateBoard={this.updateBoard.bind(this)}
                />
              </div>
            ) : null}
            <br />
            <br />
            <Button
              variant="contained"
              type="submit"
              value="New 3x3 game"
              color="primary"
              style={{ marginRight: "2px" }}
              onClick={this.newGame.bind(this, 3)}
            >
              New 3x3 game
            </Button>

            <Button
              variant="contained"
              type="submit"
              color="primary"
              value="New 4x4 game"
              style={{ margin: "2px" }}
              onClick={this.newGame.bind(this, 4)}
            >
              New 4x4 game
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ marginLeft: "2px" }}
              value="New 5x5 game"
              onClick={this.newGame.bind(this, 5)}
            >
              New 5x5 game
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

const mapStatetoProps = state => {
  return {
    token: state.auth.token,
    projectlistTabledata: state.project.projectlistTabledata
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushProjectListdata: data =>
      dispatch({ type: "PUSH PROJECTLIST DATA", data: data })
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withStyles(styles)(PuzzleGame));
