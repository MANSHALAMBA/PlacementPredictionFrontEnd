import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
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
const GiveReview = props => {
	const classes = useStyles();
	return (
		<Dialog
			onClose={props.handleClose}
			open={props.open}
			fullWidth
			maxWidth="md"
			disableBackdropClick={true}>
			<DialogTitle>
				<Typography variant="h3">Give Review</Typography>

				<IconButton className={classes.closeButton} onClick={props.handleClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				{props.isLoading ? <LinearProgress /> : null}
				<Grid container style={{ paddingLeft: "17px", paddingRight: "17px" }}>
					<Grid item xs={12}>
						{" "}
						<TextField
							label="Remark"
							multiline
							rows="6"
							margin="normal"
							variant="outlined"
							style={{ width: "100%" }}
							name="review"
							onChange={props.onChangeHandler}
							required="true"
						/>
						<Typography color="error" variant="caption">
							{props.errors.review && props.errors.review[0]}
						</Typography>
					</Grid>
				</Grid>
				{props.isLoading ? <LinearProgress /> : null}
			</DialogContent>

			<DialogActions>
				{props.buttonName === "approved" ? (
					<Button
						variant="contained"
						style={{ backgroundColor: "green", color: "white" }}
						onClick={props.onSubmit}>
						Approve
					</Button>
				) : (
					<Button
						variant="contained"
						color="primary"
						style={{ backgroundColor: "red", color: "white" }}
						onClick={props.onSubmit}>
						Reject
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default GiveReview;
