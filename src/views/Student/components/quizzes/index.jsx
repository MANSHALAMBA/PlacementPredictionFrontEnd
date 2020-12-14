import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./style";

class Quizzes extends Component {
	render() {
		const classes = this.props.classes;
		return <div className={classes.root}>Quizzes</div>;
	}
}
export default withStyles(styles)(Quizzes);
