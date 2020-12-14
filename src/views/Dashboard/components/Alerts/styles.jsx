export default theme => ({
	root: {},
	portletContent: {
		paddingTop: "0"
	},
	portletFooter: {
		display: "flex",
		justifyContent: "flex-end"
	},
	product: {
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
		display: "flex",
		alignItems: "center"
	},
	productImageWrapper: {
		borderRadius: "5px",
		overflow: "hidden",
		height: "64px",
		width: "64px"
	},
	productImage: {
		width: "100%",
		height: "auto"
	},
	productDetails: {
		marginLeft: theme.spacing(0),
		flexGrow: 1
	},
	productTitle: {},
	productTimestamp: {
		marginTop: theme.spacing(1),
		color: theme.palette.text.secondary
	},
	chip: {
		margin: theme.spacing(1),
		marginLeft: 0
	}
});
