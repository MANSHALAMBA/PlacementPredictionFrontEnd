import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		position: "absolute",
		width: "100%",
		height: "calc(-74px + 100%)",
		bottom: "74px",
		padding: "5px",
		overflow: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end"
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	iconButton: {
		padding: 10
	}
}));

export default useStyles;
