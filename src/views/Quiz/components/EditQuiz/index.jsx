import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import EditToolbar from "./components/EditToolbar";
import Header from "./components/header";
import { Typography } from "@material-ui/core";
import Visualization from "./components/Visualization";
import MaterialTable from "material-table";
import QuestionForm from "./components/QuestionsForm";
import { Loader } from "components";
import { connect } from "react-redux";
import { fetchquizdetails, removeQuestion } from "api/quizzes";
import { Quizdetail, Question } from "serializers/quiz";
import swal from "sweetalert";
class EditQuiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				title: "Python",
				skills: ["ds", "algo"],
				numberOfQuestions: 5,
				Questions: [
					{
						questiontitle: "what is python",
						options: ["a", "b"],
						correctOption: "a",
						difficultyLevel: "easy",
						skills: ["ds"],
						id: "1"
					},
					{
						questiontitle: "what is python",
						options: ["a", "b"],
						correctOption: "b",
						difficultyLevel: "hard",
						skills: ["algo"],
						id: "2"
					},
					{
						questiontitle: "what is python",
						options: ["a", "b"],
						correctOption: "a",
						difficultyLevel: "medium",
						skills: ["ds"],
						id: "3"
					}
				],
				estimatedTime: 160
			},
			form: {
				open: false,
				mode: "ADD",
				data: null
			},
			isLoading: true
		};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		fetchquizdetails(this.props.token, this.props.match.params.quizId)
			.then(data => {
				this.setState({
					isLoading: false,
					data: new Quizdetail(data.quiz)
				});
			})
			.catch(error => {
				swal({
					title: "Internal Server Error",
					text: "Please Try Refreshing Page",

					button: "Ok"
				});
			});
	};

	AddQuestionToTable = newquestion => {
		let Questions = [...this.state.data.Questions];
		Questions.push(new Question(newquestion));
		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					numberOfQuestions: this.state.data.numberOfQuestions + 1,
					Questions
				}
			};
		});
	};

	Deletequestion = questionId => {
		let Questions = [...this.state.data.Questions];

		let indexofquestion = 0;
		const myFunction = (question, index) => {
			if (question.id === questionId) {
				indexofquestion = index;
			}
		};
		Questions.forEach(myFunction);

		Questions.splice(indexofquestion, 1);
		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					numberOfQuestions: this.state.data.numberOfQuestions - 1,
					Questions
				}
			};
		});
	};

	columns = [
		{
			title: "Question",
			field: "questiontitle",
			cellStyle: {
				"font-size": "15px"
			}
		},
		{
			title: "Options",
			field: "options",
			cellStyle: {
				"font-size": "15px"
			},
			render: rowData =>
				rowData.options.map(option => {
					if (option.isCorrect) {
						return <li style={{ color: "green" }}>{option.value}</li>;
					} else return <li style={{ color: "red" }}>{option.value}</li>;
				})
		},
		{
			title: "Difficulty Level",
			cellStyle: {
				"font-size": "15px"
			},
			field: "difficultyLevel"
		},
		{
			title: "Skills",
			cellStyle: {
				"font-size": "15px"
			},
			field: "skills",
			render: rowData =>
				rowData.skills.map(skill => {
					return <li>{skill}</li>;
				})
		},
		{
			title: "Id",
			field: "id",
			hidden: true
		}
	];

	actions = [
		// {
		// 	icon: "edit",
		// 	tooltip: "Edit Question",
		// 	onClick: (event, rowData) => {
		//
		// 		return this.handleOpenForm("EDIT", rowData);
		// 	}
		// },

		{
			icon: "delete_outline",
			tooltip: "Delete Question",
			onClick: (event, rowData) => {
				removeQuestion(
					this.props.token,
					this.props.match.params.quizId,
					rowData.id
				)
					.then(data => {
						this.Deletequestion(data.questionId);
						this.props.DecrementNumberOfQuestions(
							this.props.match.params.quizId
						);
					})
					.catch(error =>
						swal({
							title: "Error",
							text: error.response.data.message,

							button: "Ok"
						})
					);
			}
		}
	];

	handleOpenForm = (mode = "ADD", data = null) => {
		this.setState({
			form: { open: true, mode, data }
		});
	};
	handleCloseForm = () => {
		this.setState({ form: { open: false, mode: "ADD", data: null } });
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				{!this.state.isLoading ? (
					<div>
						<div className={classes.heading}>
							<Typography align="center" variant="h3">
								{this.state.data.title}
							</Typography>
						</div>
						<EditToolbar handleOpenForm={this.handleOpenForm} />
						{this.state.form.open && (
							<QuestionForm
								open={this.state.form.open}
								mode={this.state.form.mode}
								data={this.state.form.data}
								handleCloseForm={this.handleCloseForm}
								skills={this.state.data.skills}
								AddQuestionToTable={this.AddQuestionToTable}
								quizId={this.props.match.params.quizId}
							/>
						)}
						<div className={classes.content}>
							<Header
								numberOfQuestions={this.state.data.numberOfQuestions}
								estimatedTime={this.state.data.estimatedTime}
							/>

							<Visualization
								questions={this.state.data.Questions}
								skills={this.state.data.skills}
							/>

							<div>
								<MaterialTable
									columns={this.columns}
									data={this.state.data.Questions}
									options={{
										filtering: true,
										actionsColumnIndex: -1,
										headerStyle: {
											"font-size": "18px"
										}
									}}
									actions={this.actions}
									title={
										<Typography
											style={{ "font-size": "18px", fontWeight: "bolder" }}>
											Question List
										</Typography>
									}
								/>
							</div>
						</div>
					</div>
				) : (
					<Loader />
				)}
			</div>
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
		DecrementNumberOfQuestions: quizId =>
			dispatch({
				type: "DECREMENT NUMBER OF QUESTIONS",
				quizId: quizId
			})
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(EditQuiz));
