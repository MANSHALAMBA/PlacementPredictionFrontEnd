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
class BySkillSet extends PureComponent {
	constructor(props) {
		super(props);
		this.state = BySkillSet.getVisualizationData(props.questions, props.skills);
	}
	static getVisualizationData = (questions, quizskills) => {
		let numberOfquestions = questions.length;
		let lengthofquizskills = quizskills.length;

		// let skillsByPercent = new Array(lengthofquizskills);
		let skillsByPercent = [];
		for (var i = 0; i < lengthofquizskills; i++) {
			skillsByPercent.push(0);
		}

		// skillsByPercent = skillsByPercent.map(skillpercent => {
		// 	skillpercent = 0;
		// 	return skillpercent;
		// });

		questions.map(question => {
			question.skills.map(skill => {
				let index = quizskills.indexOf(skill);
				++skillsByPercent[index];
			});
		});

		skillsByPercent = skillsByPercent.map(skillpercent => {
			skillpercent = (skillpercent / numberOfquestions) * 100;
			return skillpercent.toFixed(2);
		});

		return {
			skillsByPercent
		};
	};

	static getDerivedStateFromProps(props, state) {
		//check if props.questions has changed
		let data = BySkillSet.getVisualizationData(props.questions, props.skills);
		if (data === state.skillsByPercent) {
			return null;
		} else {
			return data;
		}
	}

	render() {
		let data = {
			datasets: [
				{
					data: [...this.state.skillsByPercent],
					backgroundColor: [
						palette.primary.main,
						palette.danger.main,
						palette.warning.main,
						...palette.extraColors
					],
					borderWidth: 8,
					borderColor: palette.common.white,
					hoverBorderColor: palette.common.white
				}
			],
			labels: [...this.props.skills]
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
						<PortletLabel title="Questions By Skills Set" />
					</PortletHeader>
					<PortletContent>
						<div>
							<Pie data={data} options={options} />
						</div>
						<div className={this.props.classes.stats}>
							{this.state.skillsByPercent.map((skillpercent, index) => {
								return (
									<div className={this.props.classes.label}>
										<Typography variant="body1">
											{this.props.skills[index]}
										</Typography>
										<Typography
											style={{ color: data.datasets[0].backgroundColor[index] }}
											variant="h4">
											{skillpercent}%
										</Typography>
									</div>
								);
							})}
						</div>
					</PortletContent>
				</Portlet>
			</div>
		);
	}
}

export default withStyles(styles)(BySkillSet);
