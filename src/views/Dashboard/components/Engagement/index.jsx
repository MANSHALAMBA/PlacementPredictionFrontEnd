import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Typography } from "@material-ui/core";

// Material icons
import { AttachMoney as AttachMoneyIcon } from "@material-ui/icons";

// Shared components
import { Paper } from "components";

// Component styles
import styles from "./styles";
import {
	ArrowDownward as ArrowDownwardIcon,
	ArrowUpward
} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

class Engagement extends Component {
	render() {
		const { classes, className, ...rest } = this.props;

		const rootClassName = classNames(classes.root, className);
		let colour = this.props.engagement.percentChange < 0 ? "red" : "green";

		return (
			<Paper {...rest} className={rootClassName}>
				<div className={classes.content}>
					<div className={classes.details}>
						<Typography className={classes.title} variant="body2">
							ENGAGEMENT
						</Typography>
						<Tooltip title="Engagement Score">
							<Typography className={classes.value} variant="h3">
								{this.props.engagement.totalEngagement}
							</Typography>
						</Tooltip>
					</div>
					<div className={classes.iconWrapper}>
						<AttachMoneyIcon className={classes.icon} />
					</div>
				</div>
				<div className={classes.footer}>
					<Typography
						className={classes.difference}
						variant="body2"
						style={{ color: colour }}>
						{this.props.engagement.percentChange < 0 ? (
							<ArrowDownwardIcon />
						) : (
							<ArrowUpward />
						)}
						{Math.abs(this.props.engagement.percentChange)}%
					</Typography>
					<Typography
						display="inline"
						variant="caption"
						style={{ fontSize: "13px", paddingLeft: "5px" }}>
						since last month
					</Typography>
				</div>
			</Paper>
		);
	}
}

Engagement.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Engagement);
