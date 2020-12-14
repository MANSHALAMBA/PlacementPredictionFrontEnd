import React, { Component } from "react";
import Form from "./Form";
import validate from "validate.js";

import { connect } from "react-redux";
import swal from "sweetalert";
import { SubmissionReview } from "api/projects";

class GiveReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				review: "",
				isLoading: false
			},
			errors: {}
		};
	}
	onChangeHandler = e => {
		const { name, value } = e.target;

		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					[name]: value
				},
				errors: {
					...prevState.errors,
					[name]: []
				}
			};
		});
	};

	onSubmitHandler = () => {
		//validation
		let errors = validate(this.state.data, {
			review: { presence: { allowEmpty: false, message: "is required" } }
		});

		// check for errors
		if (errors) {
			this.setState({ errors });
		} else {
			this.setState({
				isLoading: true
			});
			let data = {
				remark: this.state.data.review,
				status: this.props.statusOfSubmission
			};
			SubmissionReview(this.props.token, data, this.props.submissionId)
				.then(data => {
					swal({
						title: "Success",
						text: "Review has been submitted successfully",

						button: "Ok"
					});
					this.props.handleClose();
					this.props.updatereview(this.props.submissionId, data.submission);
				})
				.catch(error =>
					swal({
						title: "Error",
						text: error.response.data.message,

						button: "Ok"
					})
				);
		}
	};

	render() {
		return (
			<Form
				open={this.props.open}
				handleClose={this.props.handleClose}
				onChangeHandler={this.onChangeHandler}
				onSubmit={this.onSubmitHandler}
				errors={this.state.errors}
				buttonName={this.props.statusOfSubmission}
				isLoading={this.state.isLoading}
			/>
		);
	}
}

const MapStatetoProps = state => {
	return {
		token: state.auth.token
	};
};

export default connect(MapStatetoProps)(GiveReview);
