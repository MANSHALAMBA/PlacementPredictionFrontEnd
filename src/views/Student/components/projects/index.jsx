import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import {
	Portlet,
	PortletHeader,
	PortletContent,
	PortletFooter
} from "components";

class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				projects: [
					{
						Id: 1,
						title: "Smart Water Supply",
						skills: ["Machine Learing", "Reactjs"],
						team: "ASSAS",
						facultylead: "MR. Jai Prakash"
					},
					{
						Id: 2,
						title: "E learning Management",
						skills: ["Nodejs", "Angular"],
						team: "REREF",
						facultylead: "Mr. Deepak"
					},
					{
						Id: 3,
						title: "Content Management",
						skills: ["Firebase", "HTML", "CSS"],
						team: "FEFE",
						facultylead: "Ms. Mansha "
					},
					{
						Id: 4,
						title: "Sadda College",
						skills: ["Bootstrap", "Photoshop", "Material Design"],
						team: "FRE",
						facultylead: "Mr. Shubham"
					}
				]
			}
		};
	}

	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.root}>
				<Grid container spacing={2}>
					{this.state.data.projects.map(project => {
						return (
							<Grid item md={6} xs={12} className={classes.splitFormSpacing}>
								<Portlet className={classes.portlet}>
									<PortletHeader>
										<Typography
											variant="h5"
											className={classes.title}
											color="textPrimary"
											gutterBottom>
											{project.title}
										</Typography>
									</PortletHeader>
									<PortletContent>
										<Typography
											variant="caption"
											className={classes.subtitle}
											gutterBottom>
											FACULTY LEAD
										</Typography>
										<Typography variant="h5" color="textPrimary" gutterBottom>
											{project.facultylead}
										</Typography>
										<Typography
											variant="caption"
											className={classes.subtitle}
											gutterBottom>
											TEAM NAME
										</Typography>
										<Typography variant="h5" color="textPrimary" gutterBottom>
											{project.team}
										</Typography>
										<Typography
											variant="caption"
											className={classes.subtitle}
											gutterBottom>
											SKILLS
										</Typography>
										<Typography variant="h5" color="textPrimary" gutterBottom>
											{project.skills.map(skill => {
												return <li>{skill}</li>;
											})}
										</Typography>
									</PortletContent>
									<PortletFooter>
										<Link to={"/project/" + project.Id}>
											<Button
												size="small"
												variant="outlined"
												disabled={!(project.facultylead === "Mr. Deepak")}>
												Go To Project
											</Button>
										</Link>
									</PortletFooter>
								</Portlet>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}
export default withStyles(styles)(Projects);
