import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const Header = props => {
	return (
		<div>
			<Grid container spacing={4}>
				<Grid item xs={6}>
					<Paper>
						<Typography align="center" variant="h5">
							Number Of Questions
						</Typography>
						<Typography align="center" style={{ paddingTop: "3px" }}>
							{props.numberOfQuestions}
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper>
						<Typography align="center" variant="h5">
							Estimated Time
						</Typography>
						<Typography align="center" style={{ paddingTop: "3px" }}>
							{(props.estimatedTime / 60).toFixed(2)} minutes
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default Header;
