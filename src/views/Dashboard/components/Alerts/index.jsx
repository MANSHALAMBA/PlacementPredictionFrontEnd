import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";

// Material components
import { Typography } from "@material-ui/core";

// Material icons
import { ArrowRight as ArrowRightIcon } from "@material-ui/icons";

// Shared components
import {
	Portlet,
	PortletHeader,
	PortletLabel,
	PortletContent
} from "components";

// Component styles
import styles from "./styles";
import Tooltip from "@material-ui/core/Tooltip";

class Alerts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// redirect: null
		};
	}

	// onClickHandler = projectId => {
	// 	// this.props.history.push("/project/" + projectId + "/milestones");
	// 	let redirect = <Redirect to={"/project/" + projectId + "/milestones"} />;
	// 	this.setState({
	// 		redirect: redirect
	// 	});
	// };

	render() {
		const { classes, className, ...rest } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<Portlet {...rest} className={rootClassName}>
				<PortletHeader noDivider>
					<PortletLabel title="Alerts" />
				</PortletHeader>
				<PortletContent className={classes.portletContent}>
					<Typography>Weaknesses</Typography>
					<div className={classes.product}>
						<div className={classes.productDetails}>
							{this.props.weaknesses.map(weakness => {
								return <Chip label={weakness} className={classes.chip} />;
							})}
						</div>
					</div>
					<Typography>Over Due Milestones</Typography>
					<div className={classes.product}>
						<div className={classes.productDetails}>
							{this.props.overdueMilestones.map(overdueMilestone => {
								return (
									<Tooltip
										title={"in Project: " + overdueMilestone.projectTitle}>
										<Link
											to={`/project/${overdueMilestone.projectId}/milestones`}>
											<Chip
												label={overdueMilestone.milestoneTitle}
												className={classes.chip}
												icon={<ArrowRightIcon />}
											/>
										</Link>
									</Tooltip>
								);
							})}
						</div>
						{/* {this.state.redirect} */}
					</div>
				</PortletContent>
			</Portlet>
		);
	}
}

Alerts.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Alerts);
