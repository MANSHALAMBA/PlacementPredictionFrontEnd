import React from "react";
import Button from "@material-ui/core/Button";

const Header = ({ restartGame }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ textAlign: "center" }}></div>
    <div style={{ textAlign: "center" }}></div>
    <div style={{ textAlign: "center" }}>
      <Button onClick={restartGame} variant="contained" color="primary">
        Restart Game
      </Button>
    </div>
  </div>
);

export default Header;
