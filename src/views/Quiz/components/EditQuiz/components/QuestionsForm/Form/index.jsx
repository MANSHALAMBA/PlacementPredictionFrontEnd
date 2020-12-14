import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	},
	splitFormSpacing: {
		marginTop: "16px",
		marginBottom: "8px"
	},
	alignSpacing: {
		marginTop: "8px"
	}
}));

const QuestionForm = props => {
	const classes = useStyles();

	return (
		<Dialog
			onClose={props.handleClose}
			open={props.open}
			fullWidth
			maxWidth="md"
			disableBackdropClick={true}>
			<DialogTitle>
				<Typography variant="h3"> {props.mode} QUESTION</Typography>

				<IconButton
					className={classes.closeButton}
					onClick={props.handleCloseForm}
					disabled={props.isLoading}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				{props.isLoading ? <LinearProgress /> : null}
				<Grid className={classes.splitFormSpacing} item xs={12}>
					<TextField
						value={props.data.questiontitle}
						label="Question"
						variant="outlined"
						fullWidth
						name="questiontitle"
						onChange={props.onChangeHandler}
						required={true}
						error={props.errors.questiontitle}
					/>
					<Typography color="error" variant="caption">
						{props.errors.questiontitle && props.errors.questiontitle[0]}
					</Typography>
				</Grid>

				<Grid className={classes.splitFormSpacing} item xs={12}>
					{" "}
					<Grid container spacing={12}>
						<Grid item xs={6}>
							<Typography color="primary" variant="h4">
								Options:
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								color="primary"
								onClick={props.onaddOption}
								style={{ float: "right" }}>
								ADD
							</Button>
						</Grid>
					</Grid>
					{props.data.options.map((option, index) => {
						return (
							<Grid container spacing={0}>
								<Grid
									item
									key={"option_checkbox" + index}
									xs={1}
									className={classes.alignSpacing}>
									<Checkbox
										onChange={e => props.OnCorrectOptionChange(e, index)}
										inputProps={{
											"aria-label": "primary checkbox"
										}}
										checked={option === props.data.correctOption}
									/>
								</Grid>
								<Grid item key={"option_textfield" + index} xs={9}>
									<TextField
										label="option"
										margin="normal"
										variant="outlined"
										fullWidth
										style={{ width: "100%" }}
										name="option"
										value={props.data.options[index]}
										onChange={e => props.onOptionChange(e, index)}
									/>
									<Typography color="error" variant="caption">
										{props.errors.options &&
											props.errors.options[index] &&
											props.errors.options[index].Option}
									</Typography>
								</Grid>

								<Grid
									item
									xs={1}
									key={"option_closebutton" + index}
									className={classes.alignSpacing}
									style={{
										justifyContent: "center",
										display: "flex",
										alignitems: "center"
									}}>
									<IconButton onClick={e => props.ondeleteOption(e, index)}>
										<DeleteIcon />
									</IconButton>
								</Grid>
							</Grid>
						);
					})}
					<Typography color="error" variant="caption">
						{props.errors.correctOption && props.errors.correctOption[0]}
					</Typography>
				</Grid>
				<Grid className={classes.splitFormSpacing} item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Difficulty level Of Question</InputLabel>
						<Select
							value={props.data.difficultyLevel}
							name="difficultyLevel"
							onChange={props.onChangeHandler}
							error={props.errors.type}
							input={<OutlinedInput name="difficultyLevel" labelWidth={160} />}
							error={props.errors.difficultyLevel}>
							<MenuItem key="easy" value="easy">
								Easy
							</MenuItem>
							<MenuItem key="medium" value="medium">
								Medium
							</MenuItem>
							<MenuItem key="hard" value="hard">
								Hard
							</MenuItem>
						</Select>
					</FormControl>
					<Typography color="error" variant="caption">
						{props.errors.difficultyLevel && props.errors.difficultyLevel[0]}
					</Typography>
				</Grid>
				<Grid className={classes.splitFormSpacing} item xs={12}>
					<Typography>Skills Being Tested:</Typography>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-between"
						}}>
						{props.skills.map((skill, index) => {
							return (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										margin: "5px"
									}}>
									<div>
										<Checkbox
											onChange={e => props.skillChange(e, skill)}
											checked={props.data.skills.indexOf(skill) != -1}
											inputProps={{
												"aria-label": "primary checkbox"
											}}
										/>
									</div>
									<div style={{ paddingLeft: "10px" }}>
										<Typography
											variant="body1"
											className={classes.alignSpacing}>
											{"  " + skill}
										</Typography>
									</div>
								</div>
							);
						})}
					</div>
					<Typography color="error" variant="caption">
						{props.errors.skills && props.errors.skills[0]}
					</Typography>
				</Grid>
				{props.isLoading ? <LinearProgress /> : null}
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					onClick={props.onSubmit}
					disabled={props.isLoading}>
					{props.mode} Question
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default QuestionForm;
