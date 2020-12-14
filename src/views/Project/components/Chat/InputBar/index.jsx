import React, { Component } from "react";
import InputBase from "@material-ui/core/InputBase";
import validate from "validate.js";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { connect } from "react-redux";
import { sendMessage } from "api/projects";
import swal from "sweetalert";

class InputBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			errors: {}
		};
	}

	onChangeHandler = e => {
		this.setState({
			text: e.target.value
		});
	};

	onSendHandler = () => {
		let error = validate(this.state, {
			text: { presence: { allowEmpty: false, text: "is required" } }
		});

		if (!error) {
			this.setState({
				text: ""
			});
			this.sendMessage();
		}
	};
	sendMessage = () => {
		let data = {
			text: this.state.text
		};
		sendMessage(this.props.token, data, this.props.projectid)
			.then(data => {
				this.props.addMessage(data.message);
			})
			.catch(error => {
				swal({
					title: "Error",
					text: error.response.data.message,

					button: "Ok"
				});
			});
	};

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<InputBase
					multiline
					rows={3}
					value={this.state.text}
					onChange={this.onChangeHandler}
					className={classes.input}
					placeholder="Type your message ..."
					inputProps={{ "aria-label": "Type your message" }}
				/>
				<IconButton
					color="primary"
					className={classes.iconButton}
					aria-label="Directions"
					onClick={this.onSendHandler}>
					<SendIcon />
				</IconButton>
			</Paper>
		);
	}
}

const mapStatetoProps = state => {
	return {
		token: state.auth.token
	};
};

export default connect(mapStatetoProps)(withStyles(styles)(InputBar));
