import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";

import Header from "./components/header/Header";
import Card from "./components/card/card";
import GameOver from "./components/card/GameOver";
import { APTITUDE } from "../../constants";
import "./styles/main.css";

import { Dashboard as DashboardLayout } from "layouts";

import styles from "./styles";
import style from "./style.module.css";

import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import swal from "sweetalert";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

class CardFlipGame extends PureComponent {
  state = {
    isFlipped: Array(16).fill(false),
    shuffledCard: CardFlipGame.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1
  };

  static duplicateCard = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].reduce(
      (preValue, current, index, array) => {
        return preValue.concat([current, current]);
      },
      []
    );
  };

  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
      prevSelectedCard: this.state.shuffledCard[cardId],
      prevCardId: cardId
    });

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      //update aptitude score
      this.props.add20();

      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }));
      }, 2000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 2000);
    }
  };

  restartGame = () => {
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: CardFlipGame.duplicateCard().sort(
        () => Math.random() - 0.5
      ),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1
    });
  };

  isGameOver = () => {
    return this.state.isFlipped.every(
      (element, index, array) => element !== false
    );
  };

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <DashboardLayout mode={APTITUDE} title="Card Flip Game">
        <div className={classes.root} style={{ textAlign: "center" }}>
          <Typography variant="h2">Card Flip Game</Typography>
          <br />
          <Typography variant="h4">
            Flip Card and it's Duplicate Consecutively to Score a point
          </Typography>
          <br />
          <br />
          <ExpansionPanel style={{ backgroundColor: "#bbeaa6" }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography style={{ textAlign: "center" }}>
                Rules/Instructions
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                A.Both occurences of the card number gets removed on flipping
                it's instances Consecutively .
              </Typography>{" "}
              <br />
              <Typography>
                {" "}
                B.Goal is to Empty the grid of cards.
              </Typography>{" "}
              <Typography>
                {" "}
                C.Lesser is the number of moves more is the score .
              </Typography>{" "}
              <Typography>
                D.Better is the memorization capability of the player more is
                his/her score.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <br />
          <br />

          {this.isGameOver() ? (
            <GameOver restartGame={this.restartGame} />
          ) : (
            <div className="grid-container">
              {this.state.shuffledCard.map((cardNumber, index) => (
                <Card
                  key={index}
                  id={index}
                  cardNumber={cardNumber}
                  isFlipped={this.state.isFlipped[index]}
                  handleClick={this.handleClick}
                />
              ))}
            </div>
          )}
          <Header restartGame={this.restartGame} />
        </div>
      </DashboardLayout>
    );
  }
}

const MapStatetoProps = state => {
  return {
    token: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add20: () => dispatch({ type: "ADD TWENTY" })
  };
};

export default connect(
  MapStatetoProps,
  mapDispatchToProps
)(withStyles(styles)(CardFlipGame));
