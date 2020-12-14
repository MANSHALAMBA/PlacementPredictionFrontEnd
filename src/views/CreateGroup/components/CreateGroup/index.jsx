import React, { Component } from "react";
import ContentForm from "./Form";
import validate from "validate.js";

class CreateGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: { name: "" },
			isLoading: false,
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
					[name]: null
				}
			};
		});
	};

	onSubmitHandler = () => {
		//validation
		let errors = validate(this.state.data, {
			name: { presence: { allowEmpty: false, message: "is required" } }
		});

		// check for errors
		if (errors) {
			this.setState({ errors });
		} else {
			this.setState({
				isLoading: true
			});
			this.props.sendData(this.state.data.name);
		}
	};

	render() {
		return (
			<ContentForm
				open={this.props.open}
				onChangeHandler={this.onChangeHandler}
				onSubmit={this.onSubmitHandler}
				errors={this.state.errors}
				data={this.state.data}
				handleClose={this.props.handleClose}
				numberOfStudents={this.props.numberOfStudents}
				isLoading={this.state.isloading}
			/>
		);
	}
}

export default CreateGroup;
