import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Grid, Typography } from "@material-ui/core";

// Component styles
import styles from "./styles";

class Toolbar extends Component {
	render() {
		const classes = this.props.classes;
		const className = this.props.className;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<Grid container justify="flex-end">
					<Typography className={classes.TypographyToolbar}>
						Course Name : {this.props.coursename}
					</Typography>
					<Typography className={classes.TypographyToolbar}>
						Average Score : {this.props.avgscore}
					</Typography>
				</Grid>
			</div>
		);
	}
}

Toolbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	selectedUsers: PropTypes.array
};

Toolbar.defaultProps = {
	selectedUsers: []
};

export default withStyles(styles)(Toolbar);
