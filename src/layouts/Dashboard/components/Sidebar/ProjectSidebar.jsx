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

class ProjectSidebar extends Component {
	render() {
		const { classes, className } = this.props;
		const baseURL = `/project/${this.props.match.params.projectId}`;

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
						to="/projects">
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
						to={`${baseURL}/overview`}>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Overview"
						/>
					</ListItem>

					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						to={`${baseURL}/chat`}>
						<ListItemIcon className={classes.listItemIcon}>
							<AssignmentIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Chat"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						to={`${baseURL}/milestones`}>
						<ListItemIcon className={classes.listItemIcon}>
							<ClassIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Milestones"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						to={`${baseURL}/team`}>
						<ListItemIcon className={classes.listItemIcon}>
							<QuizIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Team"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						to={`${baseURL}/reviews`}>
						<ListItemIcon className={classes.listItemIcon}>
							<ContentIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Reviews"
						/>
					</ListItem>
				</List>
			</nav>
		);
	}
}

ProjectSidebar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default compose(
	withRouter,
	withStyles(styles)
)(ProjectSidebar);
