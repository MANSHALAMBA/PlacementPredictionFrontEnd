import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
class Visualization extends Component {
	render() {
		const classes = this.props.classes;

		return <div className={classes.root}>Visualization</div>;
	}
}

export default withStyles(styles)(Visualization);
