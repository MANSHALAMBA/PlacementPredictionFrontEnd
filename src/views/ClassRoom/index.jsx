import React, { Component } from "react";

import details from "./components/Details";
import StudentsList from "./components/StudentsList";
import { CLASSROOM } from "../../constants";
import { Route, Switch } from "react-router-dom";
import { Dashboard as DashboardLayout } from "layouts";
class ClassRoom extends Component {
	render() {
		return (
			<DashboardLayout mode={CLASSROOM} title="Class Room">
				{
					<Switch>
						<Route
							exact
							path="/class-room/:classroomId/details"
							component={details}
						/>
						<Route
							exact
							path="/class-room/:classroomId/students"
							component={StudentsList}
						/>
					</Switch>
				}
			</DashboardLayout>
		);
	}
}

export default ClassRoom;
