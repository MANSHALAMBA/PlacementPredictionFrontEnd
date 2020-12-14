import React, { Component } from "react";

import { Dashboard as DashboardLayout } from "layouts";

import CreateGroupToolbar from "./components/CreateGroupToolbar";
import CreateGroup from "./components/CreateGroup";
import Loader from "./components/loader";
import MaterialTable from "material-table";
import { CREATEGROUP } from "../../constants";
import { fetchStudents, creategroup } from "api/students";
import { connect } from "react-redux";
import { Student } from "serializers/student";

// styles
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import swal from "sweetalert";

class Creategroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: { selectedStudents: [] },
			studentTableData: [],
			form: { open: false },
			isloading: true,
			isLoadingChildClass: false
		};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		fetchStudents(this.props.token).then(({ students }) => {
			let studentTableData = students.map(student => {
				return new Student(student);
			});

			this.setState({
				studentTableData: studentTableData,
				isloading: false
			});
		});
	};

	sendData = groupname => {
		this.setState({
			isLoadingChildClass: true
		});
		let studentList = this.state.data.selectedStudents.map(id => {
			return id;
		});
		let data = {
			name: groupname,
			studentList
		};

		creategroup(this.props.token, data)
			.then(response => {
				swal({
					title: "Success",
					text:
						"Group " + response.group.name + " has been created successfully",

					button: "Ok"
				});
				this.handleClose();
				this.setState({
					isLoadingChildClass: false
				});
			})
			.catch(error => {
				swal({
					title: "Error",
					text: error.response.data.message,

					button: "Ok"
				});
				this.setState({
					isLoadingChildClass: false
				});
			});
	};

	columns = [
		{
			field: "name",
			title: "Name",
			cellStyle: {
				"font-size": "15px"
			}
		},
		{
			field: "rollNumber",
			title: "Roll Number",
			type: "numeric",
			cellStyle: {
				"font-size": "15px"
			}
		},
		{
			field: "department",
			title: "Department",
			cellStyle: {
				"font-size": "15px"
			}
		},
		{
			field: "year",
			title: "Year",
			type: "numeric",
			cellStyle: {
				"font-size": "15px"
			}
		},
		{
			field: "section",
			title: "Section",
			cellStyle: {
				"font-size": "15px"
			}
		},
		{
			field: "Id",
			title: "Id",
			hidden: true
		}
	];

	handleSelection = rows => {
		console.log(rows);

		let selectedStudents = rows.map(row => {
			return row.Id;
		});
		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					selectedStudents: [...selectedStudents]
				}
			};
		});
	};
	handleOpenForm = () => {
		this.state.data.selectedStudents.length >= 2
			? this.setState(prevState => {
					return {
						form: {
							...prevState.form,
							open: true
						}
					};
			  })
			: swal({
					title: "Error",
					text: "Select Atleast Two Students",

					icon: "error",
					button: "Ok"
			  });
	};

	handleClose = () => {
		this.setState(prevState => {
			return {
				form: {
					...prevState.form,
					open: false
				}
			};
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<DashboardLayout title="Create Group" mode={CREATEGROUP}>
				<div className={classes.root}>
					<CreateGroupToolbar handleOpenForm={this.handleOpenForm} />
					<div className={classes.content}>
						{this.state.form.open && (
							<CreateGroup
								open={this.state.form.open}
								handleClose={this.handleClose}
								numberOfStudents={this.state.data.selectedStudents.length}
								sendData={this.sendData}
								isloading={this.state.isLoadingChildClass}
							/>
						)}
						{!this.state.isloading ? (
							<MaterialTable
								title={"Student  List"}
								data={this.state.studentTableData}
								columns={this.columns}
								onSelectionChange={this.handleSelection}
								options={{
									filtering: true,
									selection: true,
									headerStyle: {
										"font-size": "18px"
									}
								}}
							/>
						) : (
							<div className={classes.alignCenter}>
								<Loader />
							</div>
						)}
					</div>
				</div>
			</DashboardLayout>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};

export default connect(mapStateToProps)(withStyles(styles)(Creategroup));
