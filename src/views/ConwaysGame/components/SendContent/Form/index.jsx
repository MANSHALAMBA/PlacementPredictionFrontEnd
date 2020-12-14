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
import { makeStyles } from "@material-ui/styles";

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
	chips: {
		display: "flex",
		flexWrap: "wrap"
	},
	chip: {
		margin: 0.5
	}
}));

const SendContent = props => {
	const classes = useStyles();

	return (
		<Dialog
			onClose={props.handleClose}
			open={props.open}
			fullWidth
			maxWidth="md"
			disableBackdropClick={true}>
			<DialogTitle>
				<Typography variant="h3">{props.openMode} Content</Typography>

				<IconButton
					className={classes.closeButton}
					onClick={props.handleClose}
					disabled={props.isLoading}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				{props.isLoading ? <LinearProgress /> : null}
				<Grid className={classes.splitFormSpacing} item xs={12}>
					<TextField
						value={props.data.title}
						label="Content Title"
						variant="outlined"
						fullWidth
						name="title"
						onChange={props.onChangeHandler}
						required={true}
						error={props.errors.title}
					/>
					<Typography color="error" variant="caption">
						{props.errors.title && props.errors.title[0]}
					</Typography>
				</Grid>

				<Grid className={classes.splitFormSpacing} item xs={12}>
					{" "}
					<TextField
						value={props.data.description}
						label="Content Description"
						multiline
						rows="6"
						variant="outlined"
						fullWidth
						name="description"
						onChange={props.onChangeHandler}
						required={true}
						error={props.errors.description}
					/>
					<Typography color="error" variant="caption">
						{props.errors.description && props.errors.description[0]}
					</Typography>
				</Grid>
				<Grid className={classes.splitFormSpacing} item xs={12}>
					<TextField
						value={props.data.url}
						label="Content Url like https://www.example.com/article1"
						variant="outlined"
						fullWidth
						name="url"
						onChange={props.onChangeHandler}
						required={true}
						error={props.errors.url}
					/>
					<Typography color="error" variant="caption">
						{props.errors.url && props.errors.url[0]}
					</Typography>
				</Grid>
				<Grid className={classes.splitFormSpacing} item xs={12}>
					<TextField
						label=""
						variant="outlined"
						fullWidth
						name="file"
						onChange={props.onfileChangeHandler}
						required={true}
						type="file"
						error={props.errors.file}
					/>
					<Typography color="error" variant="caption">
						{props.errors.file && props.errors.file[0]}
						{props.errors.filesizeError && props.errors.filesizeError}
					</Typography>
				</Grid>

				<Grid className={classes.splitFormSpacing} item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Content Type</InputLabel>
						<Select
							value={props.data.type}
							name="type"
							onChange={props.onChangeHandler}
							error={props.errors.type}
							input={<OutlinedInput name="type" labelWidth={120} />}>
							{props.types.map(type => {
								return (
									<MenuItem key={type} value={type}>
										{type}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<Typography color="error" variant="caption">
						{props.errors.type && props.errors.type[0]}
					</Typography>
				</Grid>
				{props.openMode === "Send" ? (
					<Grid className={classes.splitFormSpacing} item xs={12}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>Whom To Send</InputLabel>
							<Select
								multiple
								value={props.data.receipents}
								name="receipents"
								error={props.errors.receipents}
								onChange={props.onSelectChangeHandler}
								input={<OutlinedInput name="receipents" labelWidth={120} />}
								renderValue={selected => "Sending to " + selected.length}>
								{props.receipents.map(receipent => {
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
						<Typography color="error" variant="caption">
							{props.errors.receipents && props.errors.receipents[0]}
						</Typography>
					</Grid>
				) : null}
				{props.isLoading ? <LinearProgress /> : null}
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					onClick={props.onSubmit}
					disabled={props.isLoading}>
					{props.openMode} Content
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SendContent;
