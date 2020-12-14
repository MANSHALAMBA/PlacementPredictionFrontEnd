import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Button, IconButton, Grid } from "@material-ui/core";

// Material icons
import {
	ArrowDownward as ArrowDownwardIcon,
	ArrowUpward as ArrowUpwardIcon,
	Delete as DeleteIcon
} from "@material-ui/icons";

// Shared components
import { SearchInput } from "components";

// Component styles
import styles from "./styles";

class UsersToolbar extends Component {
	render() {
		const { classes, className, selectedUsers } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<div className={rootClassName}>
				<div className={classes.row}>
					<span className={classes.spacer} />
					{selectedUsers.length > 0 && (
						<IconButton
							className={classes.deleteButton}
							onClick={this.handleDeleteUsers}>
							<DeleteIcon />
						</IconButton>
					)}
				</div>
				<div className={classes.row}>
					<Grid container md={6}>
						<SearchInput
							className={classes.searchInput}
							placeholder="Search user"
						/>
					</Grid>

					{/*
          <span className={classes.spacer} />
          <DisplayMode mode="list" />
          */}
					<Grid container md={6} justify="flex-end">
						<Button
							className={classes.importButton}
							size="small"
							variant="outlined">
							<ArrowDownwardIcon className={classes.importIcon} /> Import
						</Button>
						<Button
							className={classes.exportButton}
							size="small"
							variant="outlined">
							<ArrowUpwardIcon className={classes.exportIcon} />
							Export
						</Button>
						<Button color="primary" size="small" variant="outlined">
							Add
						</Button>
					</Grid>
				</div>
			</div>
		);
	}
}

UsersToolbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	selectedUsers: PropTypes.array
};

UsersToolbar.defaultProps = {
	selectedUsers: []
};

export default withStyles(styles)(UsersToolbar);
