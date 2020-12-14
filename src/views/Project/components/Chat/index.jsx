import React, { Component } from "react";
// import { GiftedChat } from "react-web-gifted-chat";

// styles
import styles from "./styles";
import { withStyles } from "@material-ui/styles";

// components
import InputBar from "./InputBar";
import MessageContainer from "./MessageContainer";
import MessageBubble from "./MessageBubble";
import { Loader } from "components";
import { fetchMessages } from "api/projects";
import { Message } from "serializers/projects";
import swal from "sweetalert";

import compose from "recompose/compose";

import { connect } from "react-redux";

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			isLoading: true
		};
	}

	componentDidMount() {
		this.loadMessages();
	}

	loadMessages = () => {
		fetchMessages(this.props.token, this.props.match.params.projectId)
			.then(data => {
				let messages = data.messages.map(message => {
					return new Message(message);
				});

				this.setState({
					messages,
					isLoading: false
				});
			})
			.catch(error =>
				swal({
					title: "Error",
					text: error.response.data.message,

					button: "Ok"
				})
			);
	};

	checkUser = senderId => {
		if (senderId === this.props.loggedInId) {
			return true;
		} else {
			return false;
		}
	};

	addMessage = newMessage => {
		let newmessage = new Message(newMessage);
		let messages = [...this.state.messages];
		messages.push(newmessage);
		this.setState({
			messages
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				{this.state.isLoading ? (
					<Loader />
				) : (
					<div>
						<MessageContainer>
							<div style={{ "overflow-y": "scroll" }}>
								{this.state.messages.map(message => {
									let isRight = this.checkUser(message.senderId);
									return (
										<MessageBubble
											message={message.text}
											sender={message.sender}
											sentAt={message.createdAt}
											isRight={isRight}
										/>
									);
								})}
							</div>
						</MessageContainer>
						<InputBar
							projectid={this.props.match.params.projectId}
							addMessage={this.addMessage}
						/>
					</div>
				)}
			</div>
		);
	}
}
const mapStatetoProps = state => {
	return {
		token: state.auth.token,
		loggedInId: state.auth.user.id
	};
};

export default compose(
	connect(mapStatetoProps),
	withStyles(styles)
)(Chat);
