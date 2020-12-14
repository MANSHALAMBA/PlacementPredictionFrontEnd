import React, { Component } from "react";
import Form from "./Form/CreateEvent";
import validate from "validate.js";
import moment from "moment";
import { isEmpty } from "../helpers/helpers";

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        eventname: "",
        startdate: "",
        enddate: "",
        facultygroup: "",
        projectgroup: "",
        facultygroupslist: ["a", "b"],
        projectgroupslist: ["c", "d"],
        parameters: [{ Name: "", MaximumMarks: null }]
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
    //validation
    let errors = validate(this.state.data, {
      eventname: { presence: { allowEmpty: false, message: "is required" } },
      startdate: {
        presence: { allowEmpty: false, message: "is required" },
        datetime: {
          earliest: moment.utc(),
          message: "cannot be in past"
        }
      },
      enddate: {
        presence: { allowEmpty: false, message: "is required" },
        datetime: {
          earliest: this.state.data.startdate,
          message: "cannot be before start date"
        }
      },
      facultygroup: { presence: { allowEmpty: false, message: "is required" } },
      projectgroup: { presence: { allowEmpty: false, message: "is required" } }
    });

    // validation for parameters array
    let paramErr = this.state.data.parameters.map(param => {
      let error = {};

      if (isEmpty(param.Name)) {
        error.Name = "*required";
      }
      if (isEmpty(param.MaximumMarks)) {
        error.MaximumMarks = "*required";
      }

      return Object.keys(error).length > 0 ? error : null;
    });

    // check for errors
    if (paramErr.some(val => val !== null) && errors) {
      this.setState(prevState => {
        return {
          data: {
            ...prevState.data
          },

          errors: {
            ...prevState.errors,
            ...errors,
            parameters: paramErr
          }
        };
      });
    } else if (errors) {
      this.setState({ errors });
    } else {
      this.setState(prevState => {
        return {
          data: {
            ...prevState.data
          },

          errors: {
            ...prevState.errors,

            parameters: paramErr
          }
        };
      });
    }
  };

  addParam = e => {
    e.preventDefault();

    let parameters = [...this.state.data.parameters];

    if (parameters.length < 10) {
      parameters.push({ Name: "", MaximumMarks: null });
      this.setState({ data: { ...this.state.data, parameters } });
    }
  };

  handleChangeParam = (e, idx) => {
    e.preventDefault();

    let parameters = [...this.state.data.parameters];
    parameters[idx][e.target.name] = e.target.value;

    let error = { ...this.state.errors };

    if (error.parameters && error.parameters.length > idx) {
      delete error.parameters[idx];
    }

    this.setState({ data: { ...this.state.data, parameters }, error });
  };

  removeParam = (e, index) => {
    e.preventDefault();

    let parameters = [...this.state.data.parameters];
    if (parameters.length > 1) {
      parameters.splice(index, 1);
      this.setState({ data: { ...this.state.data, parameters } });
    }
  };

  render() {
    return (
      <Form
        onChangeHandler={this.onChangeHandler}
        onSubmit={this.onSubmitHandler}
        errors={this.state.errors}
        facultygroupslist={this.state.data.facultygroupslist}
        facultygroup={this.state.data.facultygroup}
        projectgroupslist={this.state.data.projectgroupslist}
        projectgroup={this.state.data.projectgroup}
        addParam={this.addParam}
        parameters={this.state.data.parameters}
        handleChangeParam={this.handleChangeParam}
        removeParam={this.removeParam}
      />
    );
  }
}

export default CreateEvent;
