import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import compose from "recompose/compose";

import { Dashboard as DashboardLayout } from "layouts";
import ScheduleQuiz from "./components/ScheduleQuiz/index";
import EditQuiz from "./components/EditQuiz/index";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { QUIZ } from "../../constants";
import { connect } from "react-redux";
import { Loader } from "components";
import { fetchQuizdata } from "api/quizzes";
import { Quiz } from "serializers/quiz";

class quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		};
	}

	componentDidMount() {
		// check for project in redux
		let outcome = "FAILURE";
		this.props.quizlist.forEach(element => {
			if ((element.id = this.props.match.params.quizId)) {
				outcome = "SUCCESS";
			}
		});

		if (outcome === "SUCCESS") {
			this.setState({
				isLoading: false
			});
		} else if (outcome === "FAILURE") {
			fetchQuizdata(this.props.token, this.props.match.params.quizId)
				.then(data => {
					console.log(data);
					this.props.pushQuiztoQuizList(new Quiz(data.quiz));
					this.setState({
						isLoading: false
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	render() {
		return (
			<DashboardLayout mode={QUIZ} title="Quiz">
				{
					<Switch>
						{this.state.isLoading && <Route component={Loader} />}
						<Route
							exact
							path="/quiz/:quizId/schedule-quiz"
							component={ScheduleQuiz}
						/>
						<Route exact path="/quiz/:quizId/edit-quiz" component={EditQuiz} />
					</Switch>
				}
			</DashboardLayout>
		);
	}
}
const mapDispatchToProps = dispatch => {
	return {
		pushQuiztoQuizList: quiz =>
			dispatch({
				type: "PUSH QUIZ TO QUIZ LIST",
				quiz: quiz
			})
	};
};
const mapStatetoProps = state => {
	return {
		token: state.auth.token,
		quizlist: state.quiz.quizlistTabledata
	};
};

export default compose(
	connect(
		mapStatetoProps,
		mapDispatchToProps
	),
	withStyles(styles)
)(quiz);

// isloading true
// check for project in redux
// if found isloading false
// if not found fetch project and push to redux project list , set isloading false
