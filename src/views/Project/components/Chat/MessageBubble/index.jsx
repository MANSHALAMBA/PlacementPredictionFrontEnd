import React from "react";

import classNames from "classnames";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import primaryColor from "theme/palette";

import useStyles from "./styles";

const MessageBubble = props => {
	const classes = useStyles();
	let color = props.isRight ? primaryColor.info.main : "";
	let textcolor = props.isRight ? primaryColor.common.white : "";

	return (
		<div
			className={classNames(classes.root, {
				[classes.sideRight]: props.isRight
			})}>
			<Card className={classes.card} style={{ backgroundColor: color }}>
				<CardContent
					className={classes.CardContent}
					style={{ backgroundColor: color }}>
					<Typography
						color="textSecondary"
						style={{ marginLeft: "auto", fontSize: 12, color: textcolor }}>
						{props.sender}
					</Typography>
					<Typography
						color="textPrimary"
						variant="body2"
						component="p"
						style={{
							fontSize: 16,
							marginTop: "5px",
							marginBottom: "5px",
							color: textcolor
						}}>
						{props.message}
					</Typography>
					<Typography
						color="textSecondary"
						style={{
							marginLeft: "auto",
							fontSize: 12,
							float: "right",
							color: textcolor
						}}>
						{props.sentAt}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default MessageBubble;
