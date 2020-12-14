export default theme => ({
	root: {
		// backgroundColor: theme.palette.primary.main,
		// borderColor: theme.palette.primary.main,
		padding: theme.spacing(3)
	},
	content: {
		display: "flex",
		alignItems: "center"
	},
	details: {},
	title: {
		fontWeight: 700,
		color: theme.palette.text.secondary
	},
	value: {
		marginTop: theme.spacing(1)
	},
	iconWrapper: {
		alignItems: "center",
		backgroundColor: theme.palette.warning.main,
		borderRadius: "50%",
		display: "inline-flex",
		height: "4rem",
		justifyContent: "center",
		marginLeft: "auto",
		width: "4rem"
	},
	icon: {
		color: theme.palette.common.white,
		width: "2rem",
		height: "2rem",
		fontSize: "2rem"
	},
	footer: {
		marginTop: theme.spacing(2),
		display: "flex",
		alignItems: "center"
	},
	difference: {
		alignItems: "center",
		color: theme.palette.danger.dark,
		display: "inline-flex",
		fontWeight: 700
	}
});
