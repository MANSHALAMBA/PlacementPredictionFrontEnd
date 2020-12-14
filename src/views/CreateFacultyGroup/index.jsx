import React, { Component } from "react";

import { Dashboard as DashboardLayout } from "layouts";

import CreateGroupToolbar from "./components/CreateGroupToolbar";
import CreateGroup from "./components/CreateGroup";
import Loader from "./components/loader";
import MaterialTable from "material-table";
import { CREATEGROUP } from "../../constants";
import { fetchFaculties, creategroup } from "api/faculties";
import { connect } from "react-redux";
import { Faculty } from "serializers/faculty";
import { Typography } from "@material-ui/core";

// styles
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import swal from "sweetalert";

class Creategroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: { selectedFaculties: [] },
			facultyTableData: [],
			form: { open: false },
			isloading: true,
			isLoadingChildClass: false
		};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		fetchFaculties(this.props.token).then(({ faculties }) => {
			let facultyTableData = faculties.map(faculty => {
				return new Faculty(faculty);
			});

			this.setState({
				facultyTableData: facultyTableData,
				isloading: false
			});
		});
	};

	sendData = groupname => {
		this.setState({
			isLoadingChildClass: true
		});
		let facultyList = this.state.data.selectedFaculties.map(id => {
			return id;
		});
		let data = {
			name: groupname,
			facultyList
		};

		creategroup(this.props.token, data)
			.then(response => {
				swal({
					title: "Success",
					text:
						"Faculty Group " +
						response.group.name +
						" has been created successfully",

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
			field: "department",
			title: "Department",
			cellStyle: {
				"font-size": "15px"
			}
		},

		{
			field: "Id",
			title: "Id",
			hidden: true,
			cellStyle: {
				"font-size": "15px"
			}
		}
	];

	handleSelection = rows => {
		let selectedFaculties = rows.map(row => {
			return row.Id;
		});
		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					selectedFaculties: [...selectedFaculties]
				}
			};
		});
	};
	handleOpenForm = () => {
		this.state.data.selectedFaculties.length < 1
			? swal({
					title: "Error",
					text: "Select Atleast One faculty Member",

					icon: "error",
					button: "Ok"
			  })
			: this.setState(prevState => {
					return {
						form: {
							...prevState.form,
							open: true
						}
					};
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
			<DashboardLayout title="Create Faculty Group" mode={CREATEGROUP}>
				<div className={classes.root}>
					<CreateGroupToolbar handleOpenForm={this.handleOpenForm} />
					<div className={classes.content}>
						{this.state.form.open && (
							<CreateGroup
								open={this.state.form.open}
								handleClose={this.handleClose}
								numberOfFaculties={this.state.data.selectedFaculties.length}
								sendData={this.sendData}
								isloading={this.state.isLoadingChildClass}
							/>
						)}
						{!this.state.isloading ? (
							<MaterialTable
								title={
									<Typography
										style={{ "font-size": "18px", fontWeight: "bolder" }}>
										Faculty List
									</Typography>
								}
								data={this.state.facultyTableData}
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
