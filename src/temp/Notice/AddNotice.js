import React, { Component } from "react";
import Form from "./Form/AddNotice";
import validate from "validate.js";

class AddNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        description: ""
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
      description: { presence: { allowEmpty: false, message: "is required" } }
    });
    // check for errors
    if (errors) {
      this.setState({ errors });
    }
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

export default AddNotice;
