import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import compose from "recompose/compose";

import { Dashboard as DashboardLayout } from "layouts";
import StudentDashboard from "./components/dashboard";
import StudentProjects from "./components/projects";
import StudentQuizzes from "./components/quizzes";
import StudentStudyMaterial from "./components/studymaterial";

import styles from "./style";
import { withStyles } from "@material-ui/styles";
import { STUDENT } from "../../constants";

class Student extends Component {
	render() {
		return (
			<DashboardLayout mode={STUDENT} title="Student Profile">
				{
					<Switch>
						<Route
							exact
							path="/student/:studentId/dashboard"
							component={StudentDashboard}
						/>
						<Route
							exact
							path="/student/:studentId/projects"
							component={StudentProjects}
						/>
						<Route
							exact
							path="/student/:studentId/quizzes"
							component={StudentQuizzes}
						/>
						<Route
							exact
							path="/student/:studentId/studymaterial"
							component={StudentStudyMaterial}
						/>
					</Switch>
				}
			</DashboardLayout>
		);
	}
}

export default compose(withStyles(styles))(Student);
