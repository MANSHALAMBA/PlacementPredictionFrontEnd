import React, { Component } from "react";
import ContentForm from "./Form";
import validate from "validate.js";
import {
	sendContent,
	loadStudentGroups,
	loadLectures,
	editContent
} from "api/contents";
import { StudentGroup, Lecture } from "serializers/content";
import { connect } from "react-redux";
import swal from "sweetalert";

class SendContent extends Component {
	constructor(props) {
		super(props);

		this.state = this.getInitialState(props);
	}

	types = ["article", "video", "research_paper", "assignment"];

	static defaultProps = {
		openMode: "Send"
	};

	getInitialState = props => {
		if (props.openMode === "Edit") {
			return {
				data: {
					title: "",
					description: "",
					url: "",
					type: "",
					receipents: [],
					file: null,
					...props.data
				},
				receipents: [],
				isLoading: false,
				errors: {}
			};
		} else {
			// default mode is assumed to be Send
			return {
				data: {
					title: "",
					description: "",
					url: "",
					type: "",
					receipents: [],
					file: null
				},
				receipents: [],
				errors: {}
			};
		}
	};

	componentDidMount() {
		this.loadreceipents();
	}

	loadreceipents = () => {
		loadStudentGroups(this.props.token)
			.then(data => {
				let studentgroups = data.groups.map(group => {
					return new StudentGroup(group);
				});

				this.setState(prevState => {
					return {
						receipents: [...prevState.receipents, ...studentgroups]
					};
				});
			})
			.catch(error => {
				swal({
					title: "Internal Server Error",
					text: "Please Try Refreshing Page",

					button: "Ok"
				});
			});

		loadLectures(this.props.token)
			.then(data => {
				let lectures = data.lectures.map(lecture => {
					return new Lecture(lecture);
				});

				this.setState(prevState => {
					return {
						receipents: [...prevState.receipents, ...lectures]
					};
				});
			})
			.catch(error => {
				swal({
					title: "Internal Server Error",
					text: "Please Try Refreshing Page",

					button: "Ok"
				});
			});
	};

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
					[name]: null
				}
			};
		});
	};
	onfileChangeHandler = event => {
		let file = event.target.files[0];

		this.setState(prevState => {
			return {
				data: { ...prevState.data, file: file },
				errors: {
					...prevState.errors,
					file: null,
					filesizeError: null
				}
			};
		});
	};

	onSelectChangeHandler = e => {
		let receipents = [...e.target.value];

		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					receipents: receipents
				},
				errors: {
					...prevState.errors,
					receipents: null
				}
			};
		});
	};

	onSubmitHandler = () => {
		//validation
		let validationObj =
			this.props.openMode == "Send"
				? {
						title: { presence: { allowEmpty: false, message: "is required" } },
						description: {
							presence: { allowEmpty: false, message: "is required" }
						},
						url: { url: true },
						type: { presence: { allowEmpty: false, message: "is required" } },
						receipents: {
							presence: { allowEmpty: false, message: "are required" }
						},
						file: {
							presence: { allowEmpty: false, message: "is required" }
						}
				  }
				: {
						title: { presence: { allowEmpty: false, message: "is required" } },
						description: {
							presence: { allowEmpty: false, message: "is required" }
						},
						url: { url: true },
						type: { presence: { allowEmpty: false, message: "is required" } }

						// file: {
						// 	presence: { allowEmpty: false, message: "is required" }
						// }
				  };
		let errors = validate(this.state.data, validationObj);
		let filesizeErr = "";
		if (this.state.data.file) {
			filesizeErr =
				this.state.data.file.size > 2 * 1024 * 1024
					? "File is too large"
					: null;
		}
		if (filesizeErr && errors) {
			this.setState(prevState => {
				return {
					data: {
						...prevState.data
					},

					errors: {
						...prevState.errors,
						...errors,
						filesizeError: filesizeErr
					}
				};
			});
		} else if (errors) {
			this.setState({ errors });
		} else if (filesizeErr) {
			this.setState(prevState => {
				return {
					data: {
						...prevState.data
					},

					errors: {
						...prevState.errors,

						filesizeError: filesizeErr
					}
				};
			});
		} else {
			if (this.props.openMode == "Send") {
				this.sendContent();
			} else {
				this.editContent(this.state.data.id);
			}
		}
	};

	sendContent = () => {
		//button dissble
		//close button disable
		this.setState({
			isLoading: true
		});
		let sendTO = this.state.data.receipents.map(receipent => {
			let obj = JSON.parse(receipent);

			return {
				type: obj.type,
				id: obj.id
			};
		});

		var form = new FormData();

		form.append("title", this.state.data.title);
		form.append("description", this.state.data.description);
		form.append("type", this.state.data.type);
		form.append("url", this.state.data.url);
		form.append("file", this.state.data.file);
		form.append("sendTo", JSON.stringify(sendTO));

		sendContent(this.props.token, form)
			.then(response => {
				swal({
					title: "Success",
					text: "Content" + " has been sent successfully",

					button: "Ok"
				});
				this.props.handleClose();
				this.props.AddContentTableData(response.task);
			})
			.catch(error => {
				swal({
					title: "Error",
					text: error.response.data.message,

					button: "Ok"
				});
				this.setState({
					isLoading: false
				});
			});
	};

	editContent = contentID => {
		var form = new FormData();

		form.append("title", this.state.data.title);
		form.append("description", this.state.data.description);
		form.append("type", this.state.data.type);
		form.append("url", this.state.data.url);
		form.append("file", this.state.data.file);

		editContent(this.props.token, form, contentID)
			.then(response => {
				swal({
					title: "Success",
					text: "Content" + " has been edited successfully",

					button: "Ok"
				});
				this.props.handleClose();
				this.props.updateContentTableData(response.task);
			})
			.catch(error => {
				swal({
					title: "Error",
					text: error.response.data.message,

					button: "Ok"
				});
				this.setState({
					isLoading: false
				});
			});
	};

	render() {
		return (
			<ContentForm
				open={this.props.open}
				onChangeHandler={this.onChangeHandler}
				onfileChangeHandler={this.onfileChangeHandler}
				onSubmit={this.onSubmitHandler}
				errors={this.state.errors}
				data={this.state.data}
				receipents={this.state.receipents}
				types={this.types}
				handleClose={this.props.handleClose}
				onSelectChangeHandler={this.onSelectChangeHandler}
				openMode={this.props.openMode}
				isLoading={this.state.isLoading}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};

export default connect(
	mapStateToProps,
	null
)(SendContent);
