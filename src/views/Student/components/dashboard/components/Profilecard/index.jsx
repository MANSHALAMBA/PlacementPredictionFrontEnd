import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

import Image from "../../../../../../assets/images/studentPhoto.jpeg";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";

class ProfileCard extends Component {
	render() {
		const classes = this.props.classes;

		return (
			<Card className={classes.card}>
				<CardMedia
					className={classes.cover}
					image={Image}
					title="Sumit Malik"
				/>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography component="h5" variant="h5">
							Live From Space
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							Mac Miller
						</Typography>
					</CardContent>
				</div>
			</Card>
		);
	}
}

export default withStyles(styles)(ProfileCard);
