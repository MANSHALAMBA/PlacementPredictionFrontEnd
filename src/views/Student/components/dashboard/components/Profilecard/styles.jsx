export default theme => ({
	root: {
		padding: theme.spacing(3)
	},
	card: {
		display: "flex",
		height: "200px"
	},
	details: {
		display: "flex",
		flexDirection: "column"
	},
	content: {
		flex: "1 0 auto"
	},
	cover: {
		width: 250,
		margin: theme.spacing(1)
	},
	controls: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	playIcon: {
		height: 38,
		width: 38
	}
});
