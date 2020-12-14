import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./style";

class StudyMaterial extends Component {
	render() {
		const classes = this.props.classes;
		return <div className={classes.root}>Study Material</div>;
	}
}
export default withStyles(styles)(StudyMaterial);
