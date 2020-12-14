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
        <Typography variant="h3">Add Notice</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <TextField
          label="Notice Title"
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
          name="title"
          onChange={props.onChangeHandler}
          required="true"
        />
        <Typography color="secondary" variant="caption">
          {" "}
          {props.errors.title && props.errors.title[0]}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {" "}
        <TextField
          label="Notice Description"
          multiline
          rows="6"
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
          name="description"
          onChange={props.onChangeHandler}
          required="true"
        />
        <Typography color="secondary" variant="caption">
          {" "}
          {props.errors.description && props.errors.description[0]}
        </Typography>
      </Grid>
      <br />
      <Grid item xs={12}>
        {" "}
        <Button variant="contained" onClick={props.onSubmit}>
          Create Notice
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddNotice;
