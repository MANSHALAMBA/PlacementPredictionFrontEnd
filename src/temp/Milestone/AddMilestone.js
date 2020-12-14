import React, { Component } from "react";
import Form from "./Form/AddMilestone";
import validate from "validate.js";
import moment from "moment";

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

class AddMilestone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        description: "",
        deadline: ""
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
      title: { presence: { allowEmpty: false, message: "is required" } },
      description: { presence: { allowEmpty: false, message: "is required" } },
      deadline: {
        presence: { allowEmpty: false, message: "is required" },
        datetime: {
          earliest: moment.utc().add(1, "day"),
          message: "should be greater than today's date"
        }
      }
    });

    // check for errors
    if (errors) {
      this.setState({ errors });
    }
    console.log(errors);
  };

  render() {
    return (
      <Form
        onChangeHandler={this.onChangeHandler}
        onSubmit={this.onSubmitHandler}
        errors={this.state.errors}
      />
    );
  }
}

export default AddMilestone;
