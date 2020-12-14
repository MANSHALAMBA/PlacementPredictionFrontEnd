import React, { PureComponent } from "react";

import styles from "./styles";
import { withStyles } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import Bydifficultylevel from "./components/Bydifficultylevel";
import BySkillSet from "./components/BySkillSet";

class Visualization extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Grid container spacing={2}>
				<Grid item md={6}>
					<Bydifficultylevel questions={this.props.questions} />
				</Grid>
				<Grid item md={6}>
					<BySkillSet
						questions={this.props.questions}
						skills={this.props.skills}
					/>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Visualization);
