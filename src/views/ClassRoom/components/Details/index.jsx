import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import DetailsToolbar from "./components/Toolbar";
import { Typography } from "@material-ui/core";
import Header from "./components/header";
import Visualization from "./components/Visualization";

class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				Id: 1,
				name: "CSE 6A",
				cousrename: "Applied Mathematics",
				avgScore: 70,
				topSkills: ["loops", "Patterns"],
				bottomskills: ["Pointers", "AO* Graph"]
			}
		};
	}

	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.root}>
				<div className={classes.heading}>
					<Typography align="center" variant="h4">
						{this.state.data.name}
					</Typography>
				</div>
				<DetailsToolbar
					cousrename={this.state.data.cousrename}
					avgScore={this.state.data.avgScore}
				/>

				<div className={classes.content}>
					<Header
						topSkills={this.state.data.topSkills}
						bottomskills={this.state.data.bottomskills}
					/>

					<Visualization />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Details);
