import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		padding: "5px",
		display: "flex"
	},
	sideRight: {
		justifyContent: "flex-end"
	},
	card: {
		padding: 0,
		width: 260,
		borderRadius: 20
	},
	CardContent: {
		margin: 0,
		paddingBottom: 0
	}
}));

export default useStyles;
