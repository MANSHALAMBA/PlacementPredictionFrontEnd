import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Button, Grid } from "@material-ui/core";

// Component styles
import styles from "./styles";

class EditToolbar extends Component {
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
						onClick={() => this.props.handleOpenForm("ADD")}>
						Add Questions
					</Button>
				</Grid>
			</div>
		);
	}
}

EditToolbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	selectedUsers: PropTypes.array
};

EditToolbar.defaultProps = {
	selectedUsers: []
};

export default withStyles(styles)(EditToolbar);
