import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Typography } from "@material-ui/core";

// Material icons
import {
	ArrowDownward as ArrowDownwardIcon,
	ArrowUpward,
	Money as MoneyIcon
} from "@material-ui/icons";

// Shared components
import { Paper } from "components";

// Component styles
import styles from "./styles";
import Tooltip from "@material-ui/core/Tooltip";
import { LibraryBooksOutlined as ContentIcon } from "@material-ui/icons";

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let colour = this.props.content.percentChange < 0 ? "red" : "green";
		const { classes, className, ...rest } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<Paper {...rest} className={rootClassName}>
				<div className={classes.content}>
					<div className={classes.details}>
						<Typography className={classes.title} variant="body2">
							CONTENT
						</Typography>
						<Tooltip title="Number of Contents Posted">
							<Typography className={classes.value} variant="h3">
								{this.props.content.totalNumberOfContent}
							</Typography>
						</Tooltip>
					</div>
					<div className={classes.iconWrapper}>
						<ContentIcon className={classes.icon} />
					</div>
				</div>
				<div className={classes.footer}>
					<Typography
						className={classes.difference}
						style={{ color: colour }}
						variant="body2">
						{this.props.content.percentChange < 0 ? (
							<ArrowDownwardIcon />
						) : (
							<ArrowUpward />
						)}
						{Math.abs(this.props.content.percentChange)}%
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

Content.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
