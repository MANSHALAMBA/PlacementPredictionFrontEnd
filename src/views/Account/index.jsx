import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";

import compose from "recompose/compose";

// redux
import { connect } from "react-redux";

// Material components
import { Grid } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "layouts";

// Custom components
import { AccountProfile, AccountDetails } from "./components";

// Component styles
const styles = theme => ({
	root: {
		padding: theme.spacing(4)
	}
});

class Account extends Component {
	state = { tabIndex: 0 };

	render() {
		const { classes } = this.props;

		return (
			<DashboardLayout title="Account">
				<div className={classes.root}>
					<Grid container spacing={4}>
						<Grid item lg={4} md={6} xl={4} xs={12}>
							<AccountProfile me={this.props.me} />
						</Grid>
						<Grid item lg={8} md={6} xl={8} xs={12}>
							<AccountDetails me={this.props.me} />
						</Grid>
					</Grid>
				</div>
			</DashboardLayout>
		);
	}
}

Account.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		me: state.auth.user
	};
};

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(Account);

// export default withStyles(styles)(Account);
