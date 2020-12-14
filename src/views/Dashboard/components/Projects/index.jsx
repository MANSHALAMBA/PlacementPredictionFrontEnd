import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Typography, LinearProgress } from "@material-ui/core";

// Material icons
import { InsertChartOutlined as InsertChartIcon } from "@material-ui/icons";

// Shared components
import { Paper } from "components";

// Component styles
import styles from "./styles";
import Tooltip from "@material-ui/core/Tooltip";
import { AssignmentOutlined as AssignmentIcon } from "@material-ui/icons";

class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { classes, className, ...rest } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<Paper {...rest} className={rootClassName}>
				<div className={classes.content}>
					<div className={classes.details}>
						<Typography className={classes.title} variant="body2">
							PROJECTS
						</Typography>
						<Tooltip title="Number of Ongoing Projects ">
							<Typography className={classes.value} variant="h3">
								{this.props.projects}
							</Typography>
						</Tooltip>
					</div>
					<div className={classes.iconWrapper}>
						<AssignmentIcon className={classes.icon} />
					</div>
				</div>
			</Paper>
		);
	}
}

Projects.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Projects);
