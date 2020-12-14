import React, { PureComponent } from "react";
import { Pie } from "react-chartjs-2";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import palette from "theme/palette";
import Typography from "@material-ui/core/Typography";

import {
	Portlet,
	PortletHeader,
	PortletLabel,
	PortletContent
} from "components";

class Bydifficultylevel extends PureComponent {
	constructor(props) {
		super(props);
		this.state = Bydifficultylevel.getVisualizationData(props.questions);
	}
	static getVisualizationData = questions => {
		let easy = 0;
		let medium = 0;
		let hard = 0;

		questions.map(question => {
			switch (question.difficultyLevel) {
				case "easy":
					++easy;
					break;
				case "medium":
					++medium;
					break;
				case "hard":
					++hard;
			}
		});

		return {
			easy,
			medium,
			hard
		};
	};

	static getDerivedStateFromProps(props, state) {
		//check if props.questions has changed
		let data = Bydifficultylevel.getVisualizationData(props.questions);
		if (
			data.easy === state.easy &&
			data.medium === state.medium &&
			data.hard === state.hard
		) {
			return null;
		} else {
			return data;
		}
	}

	render() {
		let data = {
			datasets: [
				{
					data: [this.state.easy, this.state.medium, this.state.hard],
					backgroundColor: [
						palette.primary.main,
						palette.danger.main,
						palette.warning.main
					],
					borderWidth: 8,
					borderColor: palette.common.white,
					hoverBorderColor: palette.common.white
				}
			],
			labels: ["Easy", "Medium", "Hard"]
		};

		let options = {
			legend: {
				display: false
			},
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			cutoutPercentage: 80,
			layout: { padding: 0 },
			tooltips: {
				enabled: true,
				mode: "index",
				intersect: false,
				borderWidth: 1,
				borderColor: palette.border,
				backgroundColor: palette.common.white,
				titleFontColor: palette.text.primary,
				bodyFontColor: palette.text.secondary,
				footerFontColor: palette.text.secondary
			}
		};
		return (
			<div className={this.props.classes.chartWrapper}>
				<Portlet>
					<PortletHeader noDivider>
						<PortletLabel title="Questions By Difficulty Level" />
					</PortletHeader>
					<PortletContent>
						<div>
							<Pie data={data} options={options} />
						</div>
						<div className={this.props.classes.stats}>
							<div className={this.props.classes.label}>
								<Typography variant="body1">Easy</Typography>
								<Typography
									style={{ color: palette.primary.main }}
									variant="h2">
									{this.state.easy}
								</Typography>
							</div>
							<div className={this.props.classes.label}>
								<Typography variant="body1">Medium</Typography>
								<Typography style={{ color: palette.danger.main }} variant="h2">
									{this.state.medium}
								</Typography>
							</div>
							<div className={this.props.classes.label}>
								<Typography variant="body1">Hard</Typography>
								<Typography
									style={{ color: palette.warning.main }}
									variant="h2">
									{this.state.hard}
								</Typography>
							</div>
						</div>
					</PortletContent>
				</Portlet>
			</div>
		);
	}
}

export default withStyles(styles)(Bydifficultylevel);
