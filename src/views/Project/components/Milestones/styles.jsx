export default theme => ({
	root: {
		width: "100%",
		padding: "20px"
	},
	heading: {
		paddingBottom: "10px"
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(2)
	},
	resetContainer: {
		padding: theme.spacing(3)
	},
	card: {
		minWidth: 275
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)"
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	splitFormSpacing: {
		marginTop: "16px",
		marginBottom: "8px"
	},
	subtitle: {
		color: theme.palette.text.secondary
	}
});
