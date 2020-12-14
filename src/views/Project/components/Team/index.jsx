import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Portlet, PortletContent } from "components";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				<Typography variant="h4">Team Members :</Typography>
				<br />
				<Grid container spacing={2}>
					{this.props.teamMembers.map(teamMember => {
						return (
							<Grid item md={6}>
								<Portlet className={this.props.classes.portlet}>
									<PortletContent className={this.props.classes.portletContent}>
										<Grid container spacing={3}>
											<Grid item xs={3}>
												<Avatar
													alt={teamMember.firstName + " " + teamMember.lastName}
													src={teamMember.profilePicURL}
													className={this.props.classes.bigAvatar}
												/>
											</Grid>
											<Grid item xs={9}>
												<Typography
													variant="h4"
													className={this.props.classes.subtitle}
													color="textPrimary"
													gutterBottom>
													{teamMember.firstName + " " + teamMember.lastName}
												</Typography>
											</Grid>
										</Grid>
									</PortletContent>
								</Portlet>
							</Grid>
						);
					})}
				</Grid>
				<br />
				<Typography variant="h4">Mentors :</Typography>
				<br />
				<Grid container spacing={2}>
					{this.props.faculties.map(faculty => {
						return (
							<Grid item md={6}>
								<Portlet className={this.props.classes.portlet}>
									<PortletContent>
										<Grid container spacing={3}>
											<Grid item xs={3}>
												<Avatar
													alt={
														faculty.title +
														" " +
														faculty.firstName +
														" " +
														faculty.lastName
													}
													src={faculty.profilePicURL}
													className={this.props.classes.bigAvatar}
												/>
											</Grid>
											<Grid item xs={9}>
												<Typography
													variant="h4"
													className={this.props.classes.subtitle}
													color="textPrimary"
													gutterBottom>
													{faculty.title +
														" " +
														faculty.firstName +
														" " +
														faculty.lastName}
												</Typography>
											</Grid>
										</Grid>
									</PortletContent>
								</Portlet>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}
const mapStatetoProps = (state, props) => {
	let faculties = [];

	let teamMembers = [];
	state.project.projectlistTabledata.map(project => {
		if (project.id === props.match.params.projectId) {
			faculties = project.faculties;
			teamMembers = project.teamMembers;
		}
	});

	return {
		faculties: faculties,
		teamMembers: teamMembers
	};
};

export default connect(mapStatetoProps)(withStyles(styles)(Team));
