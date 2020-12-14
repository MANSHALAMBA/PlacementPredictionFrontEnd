import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ProfileCard from "./components/Profilecard";
import Visualization from "./components/Visualization";
import styles from "./style";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: { name: "Sumit Malik" }
		};
	}

	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.root}>
				{" "}
				<ProfileCard />
				<Visualization />
			</div>
		);
	}
}
export default withStyles(styles)(Dashboard);
