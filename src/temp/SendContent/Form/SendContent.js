import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const SendContent = props => {
  return (
    <Grid container style={{ paddingLeft: "17px", paddingRight: "17px" }}>
      <Grid item xs={12}>
        <Typography variant="h3">Send Content</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <TextField
          label="Content Title"
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
          label="Content Description"
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
        <TextField
          label="Content Url like https://www.example.com/article1"
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
          name="url"
          onChange={props.onChangeHandler}
          required="true"
        />
        <Typography color="secondary" variant="caption">
          {props.errors.url && props.errors.url[0]}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label=""
          margin="normal"
          variant="outlined"
          style={{ width: "100%" }}
          name="file"
          onChange={props.onChangeHandler}
          required="true"
          type="file"
        />
        <Typography color="secondary" variant="caption">
          {props.errors.file && props.errors.file[0]}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel>Content Type</InputLabel>
              <Select
                value={props.type}
                onChange={props.onChangeHandler}
                input={<OutlinedInput name="type" labelWidth={120} />}
              >
                {props.types.map(type => {
                  return <MenuItem value={type}>{type}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <Typography color="secondary" variant="caption">
              {props.errors.type && props.errors.type[0]}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel>Whom To Send</InputLabel>
              <Select
                value={props.year}
                onChange={props.onChangeHandler}
                input={<OutlinedInput name="year" labelWidth={120} />}
              >
                {props.years.map(year => {
                  return <MenuItem value={year}>{year}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <Typography color="secondary" variant="caption">
              {props.errors.year && props.errors.year[0]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />

      <Grid item xs={12}>
        {" "}
        <Button variant="contained" onClick={props.onSubmit}>
          Send Content
        </Button>
      </Grid>
    </Grid>
  );
};

export default SendContent;
