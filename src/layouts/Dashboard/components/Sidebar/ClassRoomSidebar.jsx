import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import NavLink from "./NavLink";
// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

import compose from "recompose/compose";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@material-ui/core";

// Material icons
// PeopleOutlined as PeopleIcon,
import {
	DashboardOutlined as DashboardIcon,
	AssignmentOutlined as AssignmentIcon,
	ClassOutlined as ClassIcon,
	HelpOutline as QuizIcon,
	LibraryBooksOutlined as ContentIcon,
	ArrowLeft as BackIcon
} from "@material-ui/icons";

import lgLogo from "assets/images/logo.png";

// Component styles
import styles from "./styles";

class ClassRoomSidebar extends Component {
	render() {
		const { classes, className } = this.props;
		const baseURL = `/class-room/${this.props.match.params.classRoomId}`;

		const rootClassName = classNames(classes.root, className);

		return (
			<nav className={rootClassName}>
				<div className={classes.logoWrapper}>
					<Link className={classes.logoLink} to="/">
						<img
							alt="Learnogether logo"
							className={classes.logoImage}
							src={lgLogo}
						/>
					</Link>
				</div>
				<Divider className={classes.logoDivider} />

				<List component="div" disablePadding>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						to="/class-rooms">
						<ListItemIcon className={classes.listItemIcon}>
							<BackIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Back"
						/>
					</ListItem>

					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						to={`/class-room/${this.props.match.params.classRoomId}/details`}>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Class Room Details"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						to={`/class-room/${this.props.match.params.classRoomId}/students`}>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Students"
						/>
					</ListItem>
				</List>
			</nav>
		);
	}
}

ClassRoomSidebar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default compose(
	withRouter,
	withStyles(styles)
)(ClassRoomSidebar);
