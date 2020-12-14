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
import { Link } from "react-router-dom";

class StudymaterialToolbar extends Component {
	render() {
		const { classes, className } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<Grid container justify="flex-end">
					<Link to="/create-group">
						<Button
							className={classes.btnToolbar}
							size="small"
							variant="outlined">
							Create Group
						</Button>
					</Link>
					<Button
						className={classes.btnToolbar}
						size="small"
						variant="outlined"
						onClick={() => this.props.handleClickOpen("Send")}>
						Send Content
					</Button>
				</Grid>
			</div>
		);
	}
}

StudymaterialToolbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	selectedUsers: PropTypes.array
};

StudymaterialToolbar.defaultProps = {
	selectedUsers: []
};

export default withStyles(styles)(StudymaterialToolbar);
