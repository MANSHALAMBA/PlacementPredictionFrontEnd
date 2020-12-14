import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ProjectSidebar from "./ProjectSidebar";
import QuizSidebar from "./QuizSidebar";
import DashboardSidebar from "./DashboardSidebar";
import ClassRoomSidebar from "./ClassRoomSidebar";
import StudentSidebar from "./StudentSidebar";
import CreateGroupSidebar from "./CreateGroupSidebar";
import AptitudeSidebar from "./AptitudeSidebar";
import {
  QUIZ,
  PROJECT,
  CLASSROOM,
  STUDENT,
  CREATEGROUP,
  APTITUDE
} from "../../../../constants";

const SideBar = props => {
  switch (props.mode) {
    case PROJECT:
      return <ProjectSidebar me={props.me} className={props.className} />;
      break;
    case QUIZ:
      return <QuizSidebar me={props.me} className={props.className} />;
      break;
    case CLASSROOM:
      return <ClassRoomSidebar me={props.me} className={props.className} />;
      break;
    case STUDENT:
      return <StudentSidebar me={props.me} className={props.className} />;
      break;
    case CREATEGROUP:
      return <CreateGroupSidebar me={props.me} className={props.className} />;
      break;
    case APTITUDE:
      return <AptitudeSidebar me={props.me} className={props.className} />;
      break;
    default:
      return <DashboardSidebar me={props.me} className={props.className} />;
  }
};

export default SideBar;
