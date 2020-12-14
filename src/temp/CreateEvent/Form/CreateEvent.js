import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const CreateEvent = props => {
  return (
    <Grid container style={{ paddingLeft: "17px", paddingRight: "17px" }}>
      <Grid item xs={12}>
        <Typography variant="h3">Create Event</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <TextField
          label="Event Name"
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
          name="eventname"
          onChange={props.onChangeHandler}
          required="true"
        />
        <Typography color="secondary" variant="caption">
          {props.errors.eventname && props.errors.eventname[0]}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <TextField
              label="Start Date"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              margin="normal"
              style={{ width: "100%" }}
              name="startdate"
              onChange={props.onChangeHandler}
              required="true"
            />
            <Typography color="secondary" variant="caption">
              {props.errors.startdate && props.errors.startdate[0]}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <TextField
              label="End Date"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              margin="normal"
              style={{ width: "100%" }}
              name="enddate"
              onChange={props.onChangeHandler}
              required="true"
            />
            <Typography color="secondary" variant="caption">
              {props.errors.enddate && props.errors.enddate[0]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Select
              value={props.facultygroup}
              name="facultygroup"
              style={{ width: "100%" }}
              onChange={props.onChangeHandler}
            >
              {props.facultygroupslist.map(value => {
                return (
                  <MenuItem value={value} key={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
            <Typography color="secondary" variant="caption">
              {props.errors.facultygroup && props.errors.facultygroup[0]}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Select
              value={props.projectgroup}
              name="projectgroup"
              style={{ width: "100%" }}
              onChange={props.onChangeHandler}
            >
              {props.projectgroupslist.map(value => {
                return (
                  <MenuItem value={value} key={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
            <Typography color="secondary" variant="caption">
              {props.errors.projectgroup && props.errors.projectgroup[0]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            Parameter
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={props.addParam}>
              ADD
            </Button>
          </Grid>
        </Grid>

        {props.parameters.map((param, index) => {
          return (
            <Grid container spacing={2}>
              <Grid item key={"param_" + index} xs={4}>
                <TextField
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  style={{ width: "100%" }}
                  name="Name"
                  onChange={e => props.handleChangeParam(e, index)}
                  required="true"
                />
                <Typography color="secondary" variant="caption">
                  {props.errors.parameters &&
                    props.errors.parameters[index] &&
                    props.errors.parameters[index].Name}
                </Typography>
              </Grid>
              <Grid item key={"param_" + index} xs={4}>
                <TextField
                  label="Maximum Marks"
                  type="number"
                  margin="normal"
                  variant="outlined"
                  style={{ width: "100%" }}
                  name="MaximumMarks"
                  onChange={e => props.handleChangeParam(e, index)}
                  required="true"
                />
                <Typography color="secondary" variant="caption">
                  {props.errors.parameters &&
                    props.errors.parameters[index] &&
                    props.errors.parameters[index].MaximumMarks}
                </Typography>
              </Grid>
              <Grid item md={4}>
                <IconButton onClick={e => props.removeParam(e, index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Grid item xs={12}>
        {" "}
        <Button variant="contained" onClick={props.onSubmit}>
          Create Event
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateEvent;
