import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import compose from "recompose/compose";

import { Dashboard as DashboardLayout } from "layouts";
import { PROJECT } from "../../constants";
import { connect } from "react-redux";
import { Loader } from "components";
import { fetchProjectdata } from "api/projects";
import { Project } from "serializers/projects";

import {
	OverviewTab,
	ChatTab,
	TeamTab,
	MilestonesTab,
	ReviewsTab
} from "./components";

// styles
import styles from "./styles";
import { withStyles } from "@material-ui/styles";

class project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		};
	}

	componentDidMount() {
		// check for project in redux
		let outcome = "FAILURE";
		this.props.projectlist.forEach(element => {
			if ((element.id = this.props.match.params.projectId)) {
				outcome = "SUCCESS";
			}
		});

		if (outcome === "SUCCESS") {
			this.setState({
				isLoading: false
			});
		} else if (outcome === "FAILURE") {
			fetchProjectdata(this.props.token, this.props.match.params.projectId)
				.then(data => {
					this.props.pushProjecttoProjectList(new Project(data.project));
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
		// const { classes } = this.props;

		return (
			<DashboardLayout mode={PROJECT} title="Project">
				<Switch>
					{this.state.isLoading && <Route component={Loader} />}
					<Route
						exact
						path="/project/:projectId/overview"
						component={OverviewTab}
					/>
					<Route exact path="/project/:projectId/chat" component={ChatTab} />
					<Route
						exact
						path="/project/:projectId/milestones"
						component={MilestonesTab}
					/>
					<Route exact path="/project/:projectId/team" component={TeamTab} />
					<Route
						exact
						path="/project/:projectId/reviews"
						component={ReviewsTab}
					/>
					<Redirect to="/project/:projectId/overview" />
				</Switch>
			</DashboardLayout>
		);
	}
}
const mapDispatchToProps = dispatch => {
	return {
		pushProjecttoProjectList: project =>
			dispatch({
				type: "PUSH PROJECT TO PROJECT LIST",
				project: project
			})
	};
};
const mapStatetoProps = state => {
	return {
		token: state.auth.token,
		projectlist: state.project.projectlistTabledata
	};
};

export default compose(
	connect(
		mapStatetoProps,
		mapDispatchToProps
	),
	withStyles(styles)
)(project);

// isloading true
// check for project in redux
// if found isloading false
// if not found fetch project and push to redux project list , set isloading false
