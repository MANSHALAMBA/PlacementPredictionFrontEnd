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
	ArrowUpward as ArrowUpwardIcon,
	ArrowDownward,
	PeopleOutlined as PeopleIcon
} from "@material-ui/icons";

// Shared components
import { Paper } from "components";

// Component styles
import styles from "./styles";
import Tooltip from "@material-ui/core/Tooltip";
import { HelpOutline as QuizIcon } from "@material-ui/icons";

class Quizzes extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { classes, className, ...rest } = this.props;

		const rootClassName = classNames(classes.root, className);
		let colour = this.props.quizzes.percentChange < 0 ? "red" : "green";

		return (
			<Paper {...rest} className={rootClassName}>
				<div className={classes.content}>
					<div className={classes.details}>
						<Typography className={classes.title} variant="body2">
							QUIZZES
						</Typography>
						<Tooltip title="Number of Quiz Created">
							<Typography className={classes.value} variant="h3">
								{this.props.quizzes.totalNumberOfQuiz}
							</Typography>
						</Tooltip>
					</div>
					<div className={classes.iconWrapper}>
						<QuizIcon className={classes.icon} />
					</div>
				</div>
				<div className={classes.footer}>
					<Typography
						className={classes.difference}
						variant="body2"
						style={{ color: colour }}>
						{this.props.quizzes.percentChange < 0 ? (
							<ArrowDownward />
						) : (
							<ArrowUpwardIcon />
						)}
						{Math.abs(this.props.quizzes.percentChange)}%
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

Quizzes.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Quizzes);
