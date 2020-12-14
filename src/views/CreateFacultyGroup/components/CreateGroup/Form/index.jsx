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
	}
}));

const CreateGroup = props => {
	const classes = useStyles();

	return (
		<Dialog
			onClose={props.handleClose}
			open={props.open}
			fullWidth
			maxWidth="sm"
			disableBackdropClick={true}>
			{" "}
			<div>
				<DialogTitle>
					<Typography variant="h3">Create Group</Typography>

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
							value={props.data.name}
							label="Group Name"
							variant="outlined"
							fullWidth
							name="name"
							onChange={props.onChangeHandler}
							required={true}
							error={props.errors.name}
						/>
						<Typography color="error" variant="caption">
							{props.errors.name && props.errors.name[0]}
						</Typography>
					</Grid>

					<Grid className={classes.splitFormSpacing} item xs={12}>
						{" "}
						<Typography
							variant="subtitle2"
							display="inline"
							color="textSecondary">
							Number Of Faculty Members in the group :
						</Typography>
						<Typography
							variant="subtitle2"
							color="textPrimary"
							display="inline"
							style={{ paddingLeft: "3px" }}>
							{props.numberOfFaculties}
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
						Create Group
					</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default CreateGroup;
