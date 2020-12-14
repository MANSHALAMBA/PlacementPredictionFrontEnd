export default theme => ({
  root: {
    padding: theme.spacing(3),
    alignItems: "center"
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
  toolBarSelect: {
    padding: "20px"
  },

  puzzle: {},

  board: {
    square: {
      display: "inline-block",
      boxsizing: "border-box",
      width: "60px",
      height: "60px",
      background: "lightgreen",
      border: "1px solid darkgreen",
      lineheight: "60px",
      textalign: "center",
      zero: {
        background: "beige"
      }
    }
  }
});
