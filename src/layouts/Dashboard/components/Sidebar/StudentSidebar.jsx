import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import NavLink from "./NavLink";
// Externals
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

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

class StudentSidebar extends Component {
	render() {
		const { classes, className } = this.props;
		const baseURL = `/student/${this.props.match.params.studentId}`;

		const rootClassName = classNames(classes.root, className);
		console.log(this.props.history);
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
						button={true}
						onClick={this.props.history.goBack}>
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
						replace={true}
						to={`/student/${this.props.match.params.studentId}/dashboard`}>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Student Profile Dashboard"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						replace={true}
						to={`/student/${this.props.match.params.studentId}/projects`}>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Projects"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						replace={true}
						to={`/student/${this.props.match.params.studentId}/quizzes`}>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Quizzes"
						/>
					</ListItem>
					<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						replace={true}
						to={`/student/${this.props.match.params.studentId}/studymaterial`}>
						<ListItemIcon className={classes.listItemIcon}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Study Material"
						/>
					</ListItem>
				</List>
			</nav>
		);
	}
}

StudentSidebar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default compose(
	withRouter,
	withStyles(styles)
)(StudentSidebar);
