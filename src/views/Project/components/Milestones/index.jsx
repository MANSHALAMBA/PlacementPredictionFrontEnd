import React, { Component } from "react";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import Styles from "./styles";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import IconButton from "@material-ui/core/IconButton";
import { Visibility } from "@material-ui/icons";
import { CloudDownload } from "@material-ui/icons";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import GiveReview from "./components/GiveReview";

class Milestones extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 0,
			open: false,
			statusOfSubmission: "",
			submissionId: ""
		};
	}

	remark = (statusOfSubmission, submissionId) => {
		this.setState({
			open: true,
			statusOfSubmission,
			submissionId
		});
	};

	handleclose = () => {
		this.setState({
			open: false
		});
	};

	openSubmission = url => {
		if (url) {
			var win = window.open(url, "_blank");
			win.focus();
		}
	};

	handleNext = () => {
		this.setState(prevState => {
			return {
				activeStep: prevState.activeStep + 1
			};
		});
	};

	handleBack = () => {
		this.setState(prevState => {
			return {
				activeStep: prevState.activeStep - 1
			};
		});
	};
	colorDescision = statusOfSubmission => {
		let color =
			statusOfSubmission === "rejected"
				? "red"
				: statusOfSubmission === "approved"
				? "green"
				: "";

		return color;
	};

	render() {
		return (
			<div className={this.props.classes.root}>
				<div className={this.props.classes.heading}>
					<Typography variant="h4">Milestones</Typography>
				</div>
				<Stepper activeStep={this.state.activeStep} orientation="vertical">
					{this.props.milestones.map((milestone, index) => (
						<Step key={milestone.id}>
							<StepLabel>{milestone.title}</StepLabel>
							<StepContent>
								<Typography
									display="inline"
									className={this.props.classes.subtitle}>
									Description :
								</Typography>{" "}
								<Typography display="inline">
									{milestone.description}
								</Typography>
								<br />
								<Typography
									display="inline"
									className={this.props.classes.subtitle}>
									Deadline :
								</Typography>{" "}
								<Typography display="inline">{milestone.deadline}</Typography>
								{!(milestone.submissions.length === 0) ? (
									<Grid container spacing={2}>
										{milestone.submissions.map(submission => {
											return (
												<Grid
													item
													md={6}
													className={this.props.classes.splitFormSpacing}>
													<Card className={this.props.classes.card}>
														<CardContent>
															<div style={{ float: "right" }}>
																<Tooltip title="Download Submitted File">
																	<IconButton
																		className={this.props.classes.button}
																		aria-label="Download Submitted File"
																		onClick={() =>
																			this.openSubmission(submission.file)
																		}>
																		<CloudDownload />
																	</IconButton>
																</Tooltip>
																<Tooltip title="View Submitted Work ">
																	<IconButton
																		className={this.props.classes.button}
																		aria-label="View Submitted Work"
																		onClick={() =>
																			this.openSubmission(submission.url)
																		}>
																		<Visibility />
																	</IconButton>
																</Tooltip>
															</div>
															<div>
																<Typography
																	className={this.props.classes.subtitle}>
																	Summary :
																</Typography>
																<Typography
																	variant="body1"
																	style={{ color: "black" }}
																	component="p">
																	{submission.summary}
																</Typography>
																<br />
																<br />

																<Typography
																	className={this.props.classes.subtitle}>
																	Status :
																</Typography>
																{/* {
																	(color =
																		submission.status === "rejected"
																			? "red"
																			: submission.status === "approved"
																			? "green"
																			: "")
																} */}
																<Typography
																	style={{
																		color: this.colorDescision(
																			submission.status
																		)
																	}}
																	variant="h5"
																	component="h2">
																	{submission.status.charAt(0).toUpperCase() +
																		submission.status.slice(1)}
																</Typography>
																<br />
																<br />
																{submission.status === "pending" ? (
																	<div>
																		<div>
																			<Button
																				size="small"
																				style={{
																					color: "white",
																					backgroundColor: "green"
																				}}
																				variant="contained"
																				onClick={() =>
																					this.remark("approved", submission.id)
																				}
																				className={this.props.classes.button}>
																				Approve
																			</Button>
																			<Button
																				size="small"
																				color="primary"
																				variant="contained"
																				style={{
																					color: "white",
																					backgroundColor: "red"
																				}}
																				onClick={() =>
																					this.remark("rejected", submission.id)
																				}
																				className={this.props.classes.button}>
																				Reject
																			</Button>{" "}
																		</div>
																		{this.state.open && (
																			<GiveReview
																				open={this.state.open}
																				handleClose={this.handleclose}
																				statusOfSubmission={
																					this.state.statusOfSubmission
																				}
																				submissionId={this.state.submissionId}
																				updatereview={(
																					submissionId,
																					updatedReview
																				) =>
																					this.props.updatereview(
																						this.props.match.params.projectId,
																						milestone.id,
																						submissionId,
																						updatedReview
																					)
																				}
																			/>
																		)}
																	</div>
																) : (
																	<div>
																		<Typography
																			className={this.props.classes.subtitle}>
																			Remark:
																		</Typography>
																		<Typography
																			variant="body1"
																			style={{ color: "black" }}
																			component="p">
																			{submission.remark}
																		</Typography>
																	</div>
																)}
															</div>
														</CardContent>
													</Card>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<div>
										<br />
										<Typography
											variant="caption"
											className={this.props.classes.subtitle}>
											No Submissions Yet
										</Typography>
									</div>
								)}
								<div className={this.props.classes.actionsContainer}>
									<div>
										<Button
											disabled={this.state.activeStep === 0}
											onClick={this.handleBack}
											className={this.props.classes.button}>
											Back
										</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={this.handleNext}
											updatereview
											className={this.props.classes.button}>
											{this.state.activeStep ===
											this.props.milestones.length - 1
												? "Finish"
												: "Next"}
										</Button>
									</div>
								</div>
							</StepContent>
						</Step>
					))}
				</Stepper>
				{this.state.activeStep === this.props.milestones.length && (
					<Paper
						square
						elevation={0}
						className={this.props.classes.resetContainer}>
						<Typography>
							All milestones completed - you&apos;re finished
						</Typography>
					</Paper>
				)}
			</div>
		);
	}
}
const mapStatetoProps = (state, props) => {
	let Milestones = [];
	state.project.projectlistTabledata.map(project => {
		if (project.id === props.match.params.projectId) {
			Milestones = project.milestones;
		}
	});

	return {
		token: state.auth.token,
		milestones: Milestones
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updatereview: (projectId, milestoneId, submissionId, updatedReview) =>
			dispatch({
				type: "UPDATE REVIEW",
				projectId: projectId,
				milestoneId: milestoneId,
				submissionId: submissionId,
				updatedReview: updatedReview
			})
	};
};
export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(withStyles(Styles)(Milestones));
