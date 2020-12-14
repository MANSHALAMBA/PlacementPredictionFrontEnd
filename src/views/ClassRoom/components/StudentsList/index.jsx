import React, { Component } from "react";
import MaterialTable from "material-table";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { loadStudentList } from "api/classroom";
import { Student } from "serializers/classroom";
import { Loader } from "components";
import swal from "sweetalert";
import { Typography } from "@material-ui/core";

class StudentsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			isLoading: true
		};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		loadStudentList(this.props.token, this.props.match.params.classroomId)
			.then(data => {
				let students = data.students.map(student => {
					return new Student(student);
				});

				this.setState(prevState => {
					return {
						data: {
							students
						},
						isLoading: false
					};
				});
			})
			.catch(error => {
				swal({
					title: "Error",
					text: "Internal Server Error",
					button: "Ok"
				});
			});
	};

	columns = [
		{
			title: "Name",
			field: "name",
			cellStyle: {
				"font-size": "15px"
			}
		},
		{
			title: "Roll Number",
			field: "rollnumber",
			cellStyle: {
				"font-size": "15px"
			}
		},

		{
			title: "Id",
			field: "id",
			hidden: true
		}
	];
	actions = [
		{
			icon: "visibility",
			tooltip: "View Student Report ",
			onClick: (event, rowData) => {
				this.props.history.push("/student/" + rowData.id + "/dashboard");
			}
		}
	];

	render() {
		return (
			<div className={this.props.classes.root}>
				{!this.state.isLoading ? (
					<MaterialTable
						columns={this.columns}
						data={this.state.data.students}
						options={{
							filtering: true,
							actionsColumnIndex: -1,
							headerStyle: {
								"font-size": "18px"
							}
						}}
						actions={this.actions}
						title={
							<Typography style={{ "font-size": "18px", fontWeight: "bolder" }}>
								Project List
							</Typography>
						}
					/>
				) : (
					<Loader />
				)}
			</div>
		);
	}
}

const MapStatetoProps = state => {
	return {
		token: state.auth.token
	};
};

export default connect(MapStatetoProps)(withStyles(styles)(StudentsList));
