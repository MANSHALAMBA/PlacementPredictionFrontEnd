import React from "react";

import useStyles from "./styles";

const MessageContainer = props => {
	const classes = useStyles();

	return <div className={classes.root}>{props.children}</div>;
};

export default MessageContainer;
