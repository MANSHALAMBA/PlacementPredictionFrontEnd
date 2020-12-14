import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const AddMilestone = props => {
  return (
    <Grid container style={{ paddingLeft: "17px", paddingRight: "17px" }}>
      <Grid item xs={12}>
        <Typography variant="h3">Add Milestone</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <TextField
          label="Milestone Title"
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
          name="title"
          onChange={props.onChangeHandler}
          required="true"
        />
        <Typography color="secondary" variant="caption">
          {props.errors.title && props.errors.title[0]}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {" "}
        <TextField
          label="Milestone Description"
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
          {props.errors.description && props.errors.description[0]}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {" "}
        <TextField
          label="Milestone Deadline"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          margin="normal"
          style={{ width: "100%" }}
          name="deadline"
          onChange={props.onChangeHandler}
          required="true"
        />
        <Typography color="secondary" variant="caption">
          {props.errors.deadline && props.errors.deadline[0]}
          {/* {props.errors.deadline && props.errors.deadline[1]} */}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {" "}
        <Button variant="contained" onClick={props.onSubmit}>
          Create Milestone
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddMilestone;
