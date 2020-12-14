import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import moment from "moment";

import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import validate from "validate.js";
import { sendScheduledata, disableQuiz } from "api/quizzes";
import { connect } from "react-redux";
import { loadStudentGroups, loadLectures } from "api/quizzes";
import { StudentGroup, Lecture } from "serializers/quiz";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import swal from "sweetalert";
validate.extend(validate.validators.datetime, {
	// The value is guaranteed not to be null or undefined but otherwise it
	// could be anything.
	parse: function(value, options) {
		return +moment.utc(value);
	},
	// Input is a unix timestamp
	format: function(value, options) {
		var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
		return moment.utc(value).format(format);
	}
});

class schedulequiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				startdate: "",
				enddate: "",
				timelimit: "",
				receipents: []
			},
			receipents: [],
			errors: {}
		};
	}

	componentDidMount() {
		this.loadreceipents();
	}

	loadreceipents = () => {
		loadStudentGroups(this.props.token)
			.then(data => {
				let studentgroups = data.groups.map(group => {
					return new StudentGroup(group);
				});

				this.setState(prevState => {
					return {
						receipents: [...prevState.receipents, ...studentgroups]
					};
				});
			})
			.catch();

		loadLectures(this.props.token)
			.then(data => {
				let lectures = data.lectures.map(lecture => {
					return new Lecture(lecture);
				});

				this.setState(prevState => {
					return {
						receipents: [...prevState.receipents, ...lectures]
					};
				});
			})
			.catch();
	};

	startdateHandler = e => {
		let value = e.target.value;
		this.setState(prevState => {
			return {
				data: { ...prevState.data, startdate: value },
				errors: { ...prevState.errors, startdate: "" }
			};
		});
	};

	enddateHandler = e => {
		let value = e.target.value;
		this.setState(prevState => {
			return {
				data: { ...prevState.data, enddate: value },
				errors: { ...prevState.errors, enddate: "" }
			};
		});
	};

	timelimitHandler = e => {
		let value = e.target.value;
		this.setState(prevState => {
			return {
				data: { ...prevState.data, timelimit: value },
				errors: { ...prevState.errors, timelimit: "" }
			};
		});
	};

	onSelectChangeHandler = e => {
		let receipents = [...e.target.value];

		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					receipents: receipents
				},
				errors: {
					...prevState.errors,
					receipents: null
				}
			};
		});
	};

	schedulequizHandler = () => {
		// validation of user input
		let errors = validate(this.state.data, {
			startdate: {
				presence: { allowEmpty: false, message: "is required" },
				datetime: {
					earliest: moment.utc(),
					message: "Cannot be before Today's date"
				}
			},
			enddate: {
				presence: { allowEmpty: false, message: "is required" },
				datetime: {
					earliest: this.state.data.startdate,
					message: "Cannot be before Start date"
				}
			},
			timelimit: {
				presence: { allowEmpty: false, message: "is required" }
			},
			receipents: {
				presence: { allowEmpty: false, message: "are required" }
			}
		});

		if (errors) {
			this.setState({
				errors
			});
		} else {
			this.sendScheduledata();
		}
	};

	sendScheduledata = () => {
		let sendTO = this.state.data.receipents.map(receipent => {
			let obj = JSON.parse(receipent);

			return {
				type: obj.type,
				id: obj.id
			};
		});

		let data = {
			schedule: this.state.data.startdate,
			expiry: this.state.data.enddate,
			timeToComplete: this.state.data.timelimit,
			sendTo: JSON.stringify(sendTO)
		};

		sendScheduledata(this.props.token, data, this.props.match.params.quizId)
			.then(data => {
				this.props.updateSchedulingStatus(
					this.props.match.params.quizId,
					1,
					moment(this.state.data.startdate).format("D/M/YYYY"),
					moment(this.state.data.enddate).format("D/M/YYYY")
				);
				swal({
					title: "Success",
					text: "Quiz" + " has been scheduled successfully",

					button: "Ok"
				});
			})
			.catch(error => {
				swal({
					title: "Error",
					text: error.response.data.message,

					button: "Ok"
				});
			});
	};
	disable = () => {
		disableQuiz(this.props.token, this.props.match.params.quizId)
			.then(data => {
				this.props.updateSchedulingStatus(this.props.match.params.quizId, 2);
				swal({
					title: "Success",
					text: "Quiz" + " has been disabled",

					button: "Ok"
				});
			})
			.catch(error => {
				swal({
					title: "Error",
					text: error.response.data.message,

					button: "Ok"
				});
			});
	};
	render() {
		return (
			<div className={this.props.classes.root}>
				{this.props.numberOfQuestions >= 5 ? (
					<div>
						<Typography style={{ textAlign: "center" }} variant="h3">
							{this.props.quiztitle}
						</Typography>
						<div style={{ textAlign: "center", marginTop: "9px" }}>
							<Typography
								variant="subtitle1"
								display="inline"
								color="textSecondary">
								Scheduling Status:
							</Typography>
							<Typography variant="subtitle1" display="inline">
								{this.props.schedulingStatus}
							</Typography>
							<br />
							{this.props.schedulingStatus === "Scheduled" ? (
								<div>
									<Typography
										variant="subtitle1"
										display="inline"
										color="textSecondary">
										Start Date:
									</Typography>
									<Typography variant="subtitle1" display="inline">
										{this.props.startdate}
									</Typography>
									<br />
									<Typography
										variant="subtitle1"
										display="inline"
										color="textSecondary">
										End Date:
									</Typography>
									<Typography variant="subtitle1" display="inline">
										{this.props.enddate}
									</Typography>
								</div>
							) : null}
						</div>
						<br />
						<Grid container spacing={1}>
							<Grid className={this.props.classes.splitFormSpacing} item xs={6}>
								<Typography variant="subtitle1" color="textSecondary">
									Start Date:
								</Typography>
								<TextField
									type="datetime-local"
									onChange={this.startdateHandler}
									value={this.state.data.startdate}
									variant="outlined"
									fullWidth
									name="Start Date"
									error={
										this.state.errors.startdate &&
										this.state.errors.startdate[0]
									}
								/>

								<br />
								<Typography variant="caption" color="error">
									{this.state.errors.startdate &&
										this.state.errors.startdate[0]}
								</Typography>
							</Grid>
							<Grid className={this.props.classes.splitFormSpacing} item xs={6}>
								<Typography variant="subtitle1" color="textSecondary">
									End Date:
								</Typography>
								<TextField
									type="datetime-local"
									onChange={this.enddateHandler}
									value={this.state.data.enddate}
									variant="outlined"
									fullWidth
									name="End Date"
									error={
										this.state.errors.enddate && this.state.errors.enddate[0]
									}
								/>

								<br />
								<Typography variant="caption" color="error">
									{this.state.errors.enddate && this.state.errors.enddate[0]}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid className={this.props.classes.splitFormSpacing} item xs={6}>
								<TextField
									label="Time limit (in seconds)"
									type="number"
									onChange={this.timelimitHandler}
									value={this.state.data.timelimit}
									variant="outlined"
									fullWidth
									name="Timelimit in seconds "
									error={
										this.state.errors.timelimit &&
										this.state.errors.timelimit[0]
									}
								/>

								<br />
								<Typography variant="caption" color="error">
									{this.state.errors.timelimit &&
										this.state.errors.timelimit[0]}
								</Typography>
							</Grid>
							<Grid className={this.props.classes.splitFormSpacing} item xs={6}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel>Participants of Quiz</InputLabel>
									<Select
										multiple
										value={this.state.data.receipents}
										variant="outlined"
										fullWidth
										name="receipents"
										error={this.state.errors.receipents}
										onChange={this.onSelectChangeHandler}
										input={
											<OutlinedInput
												name="Participants of Quiz"
												labelWidth={120}
											/>
										}
										renderValue={selected => selected.length + " Participants"}>
										{this.state.receipents.map(receipent => {
											return (
												<MenuItem
													key={receipent.id}
													value={JSON.stringify(receipent)}>
													{receipent.name}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
								<br />
								<Typography variant="caption" color="error">
									{this.state.errors.receipents &&
										this.state.errors.receipents[0]}
								</Typography>
							</Grid>
						</Grid>

						<Grid container spacing={1}>
							<Grid item xs={2}>
								<Button
									variant="contained"
									color="primary"
									onClick={this.schedulequizHandler}>
									Schedule Quiz
								</Button>
							</Grid>

							<Grid item xs={2}>
								<Button
									variant="contained"
									color="primary"
									onClick={this.disable}>
									Disable Quiz
								</Button>
							</Grid>
						</Grid>
					</div>
				) : (
					<Typography align="center" variant="h3">
						Atleast 5 questions should be there in quiz to schedule it.
					</Typography>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	let title = "";
	let numberOfQuestions = 0;
	let startdate;
	let enddate;

	state.quiz.quizlistTabledata.map(quiz => {
		if (quiz.id == props.match.params.quizId) {
			title = quiz.title;
			numberOfQuestions = quiz.numberOfQuestions;
			startdate = quiz.schedule;
			enddate = quiz.expiry;
		}
	});

	let schedulingStatus = "";
	state.quiz.quizlistTabledata.map(quiz => {
		if (quiz.id == props.match.params.quizId) {
			switch (quiz.schedulingStatus) {
				case 0:
					schedulingStatus = "Not Scheduled";
					break;
				case 1:
					schedulingStatus = "Scheduled";
					break;

				case 2:
					schedulingStatus = "Disabled";
					break;

				case 3:
					schedulingStatus = "Expired";
					break;
				default:
					schedulingStatus = "Default case";
			}
		}
	});

	return {
		token: state.auth.token,
		quiztitle: title,
		schedulingStatus: schedulingStatus,
		numberOfQuestions: numberOfQuestions,
		startdate: startdate,
		enddate: enddate
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateSchedulingStatus: (quizId, updatedStatus, startdate, enddate) =>
			dispatch({
				type: "UPDATE SCHEDULE STATUS",
				quizId: quizId,
				updatedStatus: updatedStatus,
				startdate: startdate,
				enddate: enddate
			})
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(schedulequiz));
