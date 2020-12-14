import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const AddNotice = props => {
  return (
    <Grid container style={{ paddingLeft: "17px", paddingRight: "17px" }}>
      <Grid item xs={12}>
        <Typography variant="h3">Create Group</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <TextField
          label="Group Name"
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
          name="groupname"
          onChange={props.onChangeHandler}
          required="true"
        />
        <Typography color="secondary" variant="caption">
          {" "}
          {props.errors.groupname && props.errors.groupname[0]}
        </Typography>
      </Grid>

      <br />
      <Grid item xs={12}>
        {" "}
        <Button variant="contained" onClick={props.onSubmit}>
          Create Group
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddNotice;
