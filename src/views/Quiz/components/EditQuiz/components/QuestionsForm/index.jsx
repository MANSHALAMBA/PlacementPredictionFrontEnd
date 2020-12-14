import React, { Component } from "react";
import ContentForm from "./Form";
import validate from "validate.js";
import { addQuestion } from "api/quizzes";
import { connect } from "react-redux";
import swal from "sweetalert";

class QuestionsForm extends Component {
	constructor(props) {
		super(props);

		this.state = this.getInitialState(props);
	}

	static defaultProps = {
		mode: "ADD"
	};

	getInitialState = props => {
		if (props.mode === "EDIT") {
			return {
				data: {
					questiontitle: "",
					options: ["", ""],
					correctOption: null,
					difficultyLevel: "",
					skills: [],
					...props.data
				},
				errors: {},
				isLoading: false
			};
		} else {
			// default mode is assumed to be ADD
			return {
				data: {
					questiontitle: "",
					options: ["", ""],
					correctOption: null,
					difficultyLevel: "",
					skills: []
				},
				errors: {},
				isLoading: false
			};
		}
	};

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

	onaddOption = () => {
		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					options: [...prevState.data.options, ""]
				}
			};
		});
	};
	ondeleteOption = (e, index) => {
		if (this.state.data.options.length > 2) {
			let options = this.state.data.options;
			options.splice(index, 1);
			this.setState(prevState => {
				return {
					data: {
						...prevState.data,

						options: [...options]
					}
				};
			});
		}
	};
	onOptionChange = (e, index) => {
		let options = this.state.data.options;
		options[index] = e.target.value;

		if (this.state.errors.options) {
			let optionsErr = this.state.errors.options;
			optionsErr[index] = null;
			this.setState(prevState => {
				return {
					errors: {
						...prevState.errors,
						options: [...optionsErr]
					}
				};
			});
		}
		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					options: [...options]
				}
			};
		});
	};

	skillChange = (e, skill) => {
		this.setState(prevState => {
			return {
				errors: {
					...prevState.errors,
					skills: null
				}
			};
		});

		if (!this.state.data.skills.includes(skill)) {
			let skills = this.state.data.skills;
			skills.push(skill);
			this.setState(prevState => {
				return {
					data: {
						...prevState.data,
						skills: [...skills]
					}
				};
			});
		} else {
			let skills = this.state.data.skills;

			let index = skills.indexOf(skill);

			skills.splice(index, 1);

			this.setState(prevState => {
				return {
					data: {
						...prevState.data,
						skills: [...skills]
					}
				};
			});
		}
	};

	OnCorrectOptionChange = (e, index) => {
		this.setState(prevState => {
			return {
				errors: {
					...prevState.errors,
					correctOption: null
				}
			};
		});
		let correctoption = this.state.data.options[index];
		if (this.state.data.options[index] != this.state.data.correctOption) {
			this.setState(prevState => {
				return {
					data: { ...prevState.data, correctOption: correctoption }
				};
			});
		} else {
			this.setState(prevState => {
				return {
					data: { ...prevState.data, correctOption: "" }
				};
			});
		}
	};

	onSubmitHandler = () => {
		//validation
		let errors = validate(this.state.data, {
			questiontitle: {
				presence: { allowEmpty: false, message: "is required" }
			},
			difficultyLevel: {
				presence: { allowEmpty: false, message: "is required" }
			},
			skills: {
				presence: { allowEmpty: false, message: "is required" }
			},
			correctOption: {
				presence: { allowEmpty: false, message: "is required" }
			}
		});

		let optionsErr = this.state.data.options.map(option => {
			let error = {};

			if (option === "") {
				error.Option = "*required";
			}

			return Object.keys(error).length > 0 ? error : null;
		});

		// check for errors
		if (optionsErr.some(val => val !== null) && errors) {
			this.setState(prevState => {
				return {
					data: {
						...prevState.data
					},

					errors: {
						...prevState.errors,
						...errors,
						options: optionsErr
					}
				};
			});
		} else if (errors) {
			this.setState({ errors });
		} else if (optionsErr.some(val => val !== null)) {
			this.setState(prevState => {
				return {
					data: {
						...prevState.data
					},

					errors: {
						...prevState.errors,

						options: optionsErr
					}
				};
			});
		} else {
			this.addQuestion();
		}
	};

	addQuestion = () => {
		this.setState({
			isLoading: true
		});
		let data = {
			question: this.state.data.questiontitle,
			skills: this.state.data.skills,
			level: this.state.data.difficultyLevel,
			options: this.state.data.options.map(option => {
				return {
					value: option,
					isCorrect: option == this.state.data.correctOption
				};
			})
		};

		addQuestion(this.props.token, data, this.props.quizId)
			.then(data => {
				swal({
					title: "Success",
					text: "Question has been added successfully",

					button: "Ok"
				});
				this.props.handleCloseForm();
				this.props.AddQuestionToTable(data.question);
				this.props.updateNumberOfQuestions(this.props.quizId);
			})
			.catch(error => {
				swal({
					title: "Error",
					text: error.response.data.message,

					button: "Ok"
				});
				this.setState({
					isLoading: false
				});
			});
	};

	render() {
		return (
			<ContentForm
				open={this.props.open}
				onChangeHandler={this.onChangeHandler}
				onSubmit={this.onSubmitHandler}
				errors={this.state.errors}
				data={this.state.data}
				years={this.years}
				types={this.types}
				handleCloseForm={this.props.handleCloseForm}
				mode={this.props.mode}
				skills={this.props.skills}
				onaddOption={this.onaddOption}
				ondeleteOption={this.ondeleteOption}
				onSkillChange={this.skillChange}
				skillChange={this.skillChange}
				onOptionChange={this.onOptionChange}
				OnCorrectOptionChange={this.OnCorrectOptionChange}
				isLoading={this.state.isLoading}
			/>
		);
	}
}
const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateNumberOfQuestions: quizId =>
			dispatch({
				type: "UPDATE NUMBER OF QUESTIONS",
				quizId: quizId
			})
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuestionsForm);
