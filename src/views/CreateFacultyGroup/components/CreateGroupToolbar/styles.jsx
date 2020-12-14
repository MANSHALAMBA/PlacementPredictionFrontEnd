export default theme => ({
	root: {},
	row: {
		height: "42px",
		display: "flex",
		alignItems: "center",
		marginTop: theme.spacing(1)
	},
	spacer: {
		flexGrow: 1
	},
	deleteButton: {
		color: theme.palette.danger.main,
		marginRight: theme.spacing(1)
	},
	btnToolbar: {
		margin: "5px"
	},
	btnDanger: {
		backgroundColor: theme.palette.info.main,
		color: theme.palette.common.white,
		"&:hover": {
			backgroundColor: theme.palette.info.dark
		}
	},
	importIcon: {
		marginRight: theme.spacing(1)
	},
	exportButton: {
		marginRight: theme.spacing(1)
	},
	exportIcon: {
		marginRight: theme.spacing(1)
	},
	searchInput: {
		marginRight: theme.spacing(1)
	}
});
