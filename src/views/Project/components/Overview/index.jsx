import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import styles from "./styles.jsx";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";

class Overview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h2" style={{ textAlign: "center" }}>
							{this.props.title}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<div>
							<Typography variant="subtitle1" color="textSecondary">
								Skills:
							</Typography>
							<Typography variant="subtitle2">
								{this.props.skills.map(skill => {
									return <li>{skill.skill}</li>;
								})}
							</Typography>
						</div>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1" color="textSecondary">
							Decription:
						</Typography>
						<Typography variant="body1">{this.props.description}</Typography>
					</Grid>
				</Grid>
			</div>
		);
	}
}
const mapStatetoProps = (state, props) => {
	let title = "";
	let description = "";
	let skills = [];
	state.project.projectlistTabledata.map(project => {
		if (project.id === props.match.params.projectId) {
			title = project.title;
			description = project.description;
			skills = project.skills;
		}
	});

	return {
		title: title,
		description: description,
		skills: skills
	};
};
export default connect(mapStatetoProps)(withStyles(styles)(Overview));
