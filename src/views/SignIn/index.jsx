import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import compose from "recompose/compose";
import validate from "validate.js";
import _ from "underscore";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import {
	Grid,
	Button,
	IconButton,
	CircularProgress,
	TextField,
	Typography
} from "@material-ui/core";

// Material icons
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

// Component styles
import styles from "./styles";

// Form validation schema
import schema from "./schema";

// logo
import lgLogo from "assets/images/logo.png";

// Redux
import { onLogIn } from "store/actions/auth";
import { connect } from "react-redux";

// api call
import axios from "axios";
import { API_URL } from "config";

class SignIn extends Component {
	state = {
		values: {
			username: "",
			password: ""
		},
		touched: {
			username: false,
			password: false
		},
		errors: {
			username: null,
			password: null
		},
		isValid: false,
		isLoading: false,
		submitError: null
	};

	handleBack = () => {
		const { history } = this.props;

		history.goBack();
	};

	validateForm = _.debounce(() => {
		const { values } = this.state;

		const newState = { ...this.state };
		const errors = validate(values, schema);

		newState.errors = errors || {};
		newState.isValid = errors ? false : true;

		this.setState(newState);
	}, 300);

	handleFieldChange = (field, value) => {
		const newState = { ...this.state };

		newState.submitError = null;
		newState.touched[field] = true;
		newState.values[field] = value;

		this.setState(newState, this.validateForm);
	};

	handleSignIn = () => {
		try {
			// const { history } = this.props;
			const { values } = this.state;

			this.setState({ isLoading: true });

				
			this.props.onLoginReduxHandler("Lamba", true);
				
				
		} catch (error) {
			this.setState({
				isLoading: false,
				submitError: error.message
			});
		}
	};

	render() {
		const { classes } = this.props;
		const {
			values,
			touched,
			errors,
			isValid,
			submitError,
			isLoading
		} = this.state;

		const showEmailError = touched.username && errors.username;
		const showPasswordError = touched.password && errors.password;

		return (
			<div className={classes.root}>
				<Grid className={classes.grid} container>
					<Grid className={classes.quoteWrapper} item lg={5}>
						<div className={classes.quote}>
							<div className={classes.quoteInner}>
								<Typography className={classes.quoteText} variant="h1">
									Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
									they sold out High Life.
								</Typography>
								<div className={classes.person}>
									<Typography className={classes.name} variant="body1">
										Takamaru Ayako
									</Typography>
									<Typography className={classes.bio} variant="body2">
										Manager at inVision
									</Typography>
								</div>
							</div>
						</div>
					</Grid>
					<Grid className={classes.content} item lg={7} xs={12}>
						<div className={classes.content}>
							<div className={classes.contentHeader}>
								<IconButton
									className={classes.backButton}
									onClick={this.handleBack}>
									<ArrowBackIcon />
								</IconButton>
							</div>

							<div className={classes.contentBody}>
								<form className={classes.form}>
									<div className={classes.logoWrapper}>
										<img
											className={classes.logoImage}
											src={lgLogo}
											alt="Learnogether Logo"
										/>
									</div>

									<Typography className={classes.title} variant="h2">
										Sign in
									</Typography>
									<div className={classes.fields}>
										<TextField
											className={classes.textField}
											label="Email address"
											name="username"
											onChange={event =>
												this.handleFieldChange("username", event.target.value)
											}
											type="text"
											value={values.username}
											variant="outlined"
										/>
										{showEmailError && (
											<Typography
												className={classes.fieldError}
												variant="body2">
												{errors.username[0]}
											</Typography>
										)}
										<TextField
											className={classes.textField}
											label="Password"
											name="password"
											onChange={event =>
												this.handleFieldChange("password", event.target.value)
											}
											type="password"
											value={values.password}
											variant="outlined"
										/>
										{showPasswordError && (
											<Typography
												className={classes.fieldError}
												variant="body2">
												{errors.password[0]}
											</Typography>
										)}
									</div>
									{submitError && (
										<Typography className={classes.submitError} variant="body2">
											{submitError}
										</Typography>
									)}
									{isLoading ? (
										<CircularProgress className={classes.progress} />
									) : (
										<Button
											className={classes.signInButton}
											color="primary"
											disabled={!isValid}
											onClick={this.handleSignIn}
											size="large"
											variant="contained">
											Sign in now
										</Button>
									)}
								</form>
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

SignIn.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

const mapDispatchToProps = {
	onLoginReduxHandler: onLogIn
};

export default compose(
	connect(
		null,
		mapDispatchToProps
	),
	withRouter,
	withStyles(styles)
)(SignIn);
