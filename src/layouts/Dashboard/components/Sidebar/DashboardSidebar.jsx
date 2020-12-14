import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
// Externals
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";

// Material icons
// PeopleOutlined as PeopleIcon,
import {
  DashboardOutlined as DashboardIcon,
  AssignmentOutlined as AssignmentIcon,
  ClassOutlined as ClassIcon,
  HelpOutline as QuizIcon,
  LibraryBooksOutlined as ContentIcon
} from "@material-ui/icons";

import lgLogo from "assets/images/logo.png";

// Component styles
import styles from "./styles";

class DashboardSidebar extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link className={classes.logoLink} to="/">
            {/* <img
              alt="Learnogether logo"
              className={classes.logoImage}
              src={lgLogo}
            /> */}
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/account">
            <Avatar
              alt="Roman Kutepov"
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />
          </Link>
          <Typography className={classes.nameText} variant="h6">
            {`${this.props.me.title}. ${this.props.me.firstName} ${this.props.me.lastName}`}
          </Typography>
          <Typography className={classes.bioText} variant="caption">
            {`${this.props.me.designation}`}
          </Typography>
        </div>
        <Divider className={classes.profileDivider} />
        <List component="div" disablePadding>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            />
          </ListItem>
          {/*<ListItem
						activeClassName={classes.activeListItem}
						className={classes.listItem}
						component={NavLink}
						to="/students">
						<ListItemIcon className={classes.listItemIcon}>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Students"
						/>
					</ListItem>*/}
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/puzzlegame"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Puzzle Game"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/cardflipgame"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Card Flip Game"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/sudoku"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Sudoku"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/conwaysgame"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ContentIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Conways Game Of Life"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/coresubjects"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ContentIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Core Subjects"
            />
          </ListItem>
        </List>
      </nav>
    );
  }
}

DashboardSidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardSidebar);
