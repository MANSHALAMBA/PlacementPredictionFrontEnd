export default theme => ({
	topbar: {
		position: "fixed",
		width: "100%",
		top: 0,
		left: 0,
		right: "auto",
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	topbarShift: {
		marginLeft: "271px",
		width: "calc(-271px + 100vw)"
	},
	drawerPaper: {
		zIndex: 1200,
		width: "271px"
	},
	sidebar: {
		width: "270px"
	},
	content: {
		top: "64px",
		position: "absolute",
		width: "100%",
		height: "calc(-64px + 100vh)",
		overflow: "auto",
		backgroundColor: theme.palette.background.default,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	contentShift: {
		left: "270px",
		width: "calc(-271px + 100vw)"
	}
});
