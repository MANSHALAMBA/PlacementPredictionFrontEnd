import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Protected, Guest } from "components/Route";

// Views
import Dashboard from "./views/Dashboard";
// import ProductList from "./views/ProductList";
import UserList from "./views/UserList";
// import Typography from "./views/Typography";
// import Icons from "./views/Icons";
import Account from "./views/Account";
// import Settings from "./views/Settings";
// import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
// import UnderDevelopment from "./views/UnderDevelopment";
import NotFound from "./views/NotFound";
import Sudoku from "./views/Sudoku";
import CardFlipGame from "./views/CardFlipGame";
import ClassRoom from "./views/ClassRoom";
import Student from "./views/Student";
import ProjectDashboard from "./views/Project";
import QuizDashboard from "./views/Quiz";
import PuzzleGame from "./views/PuzzleGame";
import ConwaysGame from "./views/ConwaysGame";
import CreateGroup from "./views/CreateGroup";
import CreateFacultyGroup from "./views/CreateFacultyGroup";
import Coresubjects from "./views/Coresubjects";

import { connect } from "react-redux";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={Dashboard}
          exact
          path="/dashboard"
        />
        {/*<Protected
					isLoggedIn={this.props.isLoggedIn}
					component={UserList}
					exact
					path="/students"
				/>*/}
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={PuzzleGame}
          exact
          path="/puzzlegame"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={ProjectDashboard}
          path="/project/:projectId"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={Sudoku}
          path="/sudoku"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={QuizDashboard}
          path="/quiz/:quizId"
        />

        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={ConwaysGame}
          path="/conwaysgame"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={Account}
          exact
          path="/account"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={CardFlipGame}
          path="/cardflipgame"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={ClassRoom}
          path="/class-room/:classRoomId"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={Student}
          path="/student/:studentId"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={CreateGroup}
          path="/create-group"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={CreateFacultyGroup}
          path="/create-faculty-group"
        />
        <Protected
          isLoggedIn={this.props.isLoggedIn}
          component={Coresubjects}
          path="/coresubjects"
        />

        <Guest
          isLoggedIn={this.props.isLoggedIn}
          component={SignIn}
          exact
          path="/sign-in"
        />
        <Route component={UserList} path="/demo" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.auth.token
  };
};

export default connect(mapStateToProps)(Routes);
