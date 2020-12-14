import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const Header = props => {
	return (
		<div>
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<Paper>
						<Typography align="center" variant="h4">
							Top Skills
						</Typography>
						<Typography align="center" style={{ paddingTop: "3px" }}>
							{props.topSkills.map(skill => {
								return <li>{skill}</li>;
							})}
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper>
						<Typography align="center" variant="h4">
							Bottom Skills
						</Typography>
						<Typography align="center" style={{ paddingTop: "3px" }}>
							{props.bottomskills.map(skill => {
								return <li>{skill}</li>;
							})}
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default Header;
