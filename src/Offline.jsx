import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Grid, Typography } from "@material-ui/core";
// import theme from "theme";

// Component styles
const styles = theme => ({
	root: {
		padding: "15px"
	},
	content: {
		marginTop: "150px",
		textAlign: "center"
	},
	image: {
		display: "inline-block",
		marginTop: "50px",
		maxWidth: "100%",
		width: "554px"
	}
});

class OfflinePage extends Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Grid container justify="center" spacing={4}>
					<Grid item lg={6} xs={12}>
						<div className={classes.content}>
							<Typography variant="h1">You Are Offline !!</Typography>
							<Typography variant="subtitle2">
								Please Connect to Internet for proceeding further
							</Typography>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

OfflinePage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OfflinePage);
