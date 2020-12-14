import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Avatar, Typography, Button } from "@material-ui/core";

// Shared components
import { Portlet, PortletContent, PortletFooter } from "components";

// Component styles
import styles from "./styles";

class AccountProfile extends Component {
	render() {
		const { classes, className, ...rest } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<Portlet {...rest} className={rootClassName}>
				<PortletContent>
					<div className={classes.details}>
						<div className={classes.info}>
							<Typography variant="h4">{`${this.props.me.title}. ${
								this.props.me.firstName
							}`}</Typography>
							<Typography className={classes.locationText} variant="body1">
								{this.props.me.designation}
							</Typography>
						</div>
						<Avatar
							className={classes.avatar}
							src="/images/avatars/avatar_1.png"
						/>
					</div>
				</PortletContent>
				<PortletFooter>
					<Button
						className={classes.uploadButton}
						color="primary"
						variant="text">
						Upload picture
					</Button>
					<Button variant="text">Remove picture</Button>
				</PortletFooter>
			</Portlet>
		);
	}
}

AccountProfile.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
