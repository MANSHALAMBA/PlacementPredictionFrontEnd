import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Button, Grid } from "@material-ui/core";

// Material icons
// import {
// 	ArrowDownward as ArrowDownwardIcon,
// 	ArrowUpward as ArrowUpwardIcon,
// 	Delete as DeleteIcon
// } from "@material-ui/icons";

// Component styles
import styles from "./styles";

class CreateGroupToolbar extends Component {
	render() {
		const { classes, className } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<Grid container justify="flex-end">
					<Button
						className={classes.btnToolbar}
						size="small"
						variant="outlined"
						onClick={this.props.handleOpenForm}>
						Create Group
					</Button>
				</Grid>
			</div>
		);
	}
}

CreateGroupToolbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	selectedUsers: PropTypes.array
};

CreateGroupToolbar.defaultProps = {
	selectedUsers: []
};

export default withStyles(styles)(CreateGroupToolbar);
