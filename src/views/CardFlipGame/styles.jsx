export default theme => ({
	root: {
		padding: theme.spacing(3)
	},
	content: {
		marginTop: theme.spacing(2)
	},
	progressWrapper: {
		paddingTop: "48px",
		paddingBottom: "24px",
		display: "flex",
		justifyContent: "center"
	},
	pagination: {
		marginTop: "24px",
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end"
	},
	portlet: {
		minWidth: 275
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)"
	},
	title: {
		paddingBottom: "10px"
	},
	subtitle: {
		// paddingBottom: "10px"
	},
	pos: {
		marginBottom: 12
	},
	splitFormSpacing: {
		marginTop: "16px",
		marginBottom: "8px"
	}
});
