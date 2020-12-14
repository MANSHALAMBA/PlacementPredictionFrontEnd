import React, { Component } from "react";
import Form from "./Form/SendContent";
import validate from "validate.js";
import moment from "moment";

class SendContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        description: "",
        url: "",
        type: "",
        year: "",
        file: ""
      },
      errors: {}
    };
  }
  years = ["All Years", "1st Year", "2nd Year", "3rd Year", "4th Year"];
  types = ["Article", "Video", "Research Paper"];

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
      url: { url: true },
      type: { presence: { allowEmpty: false, message: "is required" } },
      year: { presence: { allowEmpty: false, message: "is required" } },
      file: { presence: { allowEmpty: false, message: "is required" } }
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
        year={this.state.data.year}
        type={this.state.data.type}
        years={this.years}
        types={this.types}
      />
    );
  }
}

export default SendContent;
