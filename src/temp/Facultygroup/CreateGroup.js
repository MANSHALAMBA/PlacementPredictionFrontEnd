import React, { Component } from "react";

import validate from "validate.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MUIDataTable from "mui-datatables";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculties: [
        ["1", "Joe James", "Test Corp", "Yonkers"],
        ["2", "John Walsh", "Test Corp", "Hartford"],
        ["3", "Bob Herm", "Test Corp", "Tampa"],
        ["4", "James Houston", "Test Corp", "Dallas"]
      ],
      data: {
        groupname: "",
        selectedfaculties: []
      },
      errors: {}
    };
  }

  onChangeHandler = e => {
    const { name, value } = e.target;

    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [name]: value
        },
        errors: {
          ...prevState.errors,
          [name]: []
        }
      };
    });
  };

  onSubmitHandler = () => {
    console.log("submission handler");
    //validation
    let errors = validate(this.state.data, {
      groupname: { presence: { allowEmpty: false, message: "is required" } },
      selectedfaculties: {
        length: {
          minimum: 2,
          message: "are too less ( Atleast select two to of them) "
        }
      }
    });
    // check for errors
    if (errors) {
      this.setState({ errors });
    }
  };

  onRowSelectHandler = (rowSelected, allSelectedRows) => {
    console.log(rowSelected, allSelectedRows);
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          selectedfaculties: allSelectedRows.map(
            row => prevState.faculties[row.dataIndex][0]
          )
        },
        errors: {
          ...prevState.errors,
          selectedfaculties: []
        }
      };
    });
  };

  options = {
    filterType: "checkbox",
    onRowsSelect: this.onRowSelectHandler
  };

  columns = [
    {
      name: "Id",
      options: {
        display: "false"
      }
    },
    "Name",
    "Department",
    "Email"
  ];

  render() {
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
            onChange={this.onChangeHandler}
            required="true"
          />
          <Typography color="secondary" variant="caption">
            {" "}
            {this.state.errors.groupname && this.state.errors.groupname[0]}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <MUIDataTable
            title={"Faculty List"}
            data={this.state.faculties}
            columns={this.columns}
            options={this.options}
          />
          <Typography color="secondary" variant="caption">
            {" "}
            {this.state.errors.selectedfaculties &&
              this.state.errors.selectedfaculties[0]}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {" "}
          <Button variant="contained" onClick={this.onSubmitHandler}>
            Create Group
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default CreateGroup;
