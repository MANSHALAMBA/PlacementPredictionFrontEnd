import React, { Component } from "react";

// Externals
import classNames from "classnames";
import { Doughnut } from "react-chartjs-2";

import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Shared components
import {
	Portlet,
	PortletHeader,
	PortletLabel,
	PortletContent
} from "components";

// Component styles
import styles from "./styles";
// Palette
import palette from "theme/palette";
import Tooltip from "@material-ui/core/Tooltip";

class SkillComposition extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	// Chart options
	options = {
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
	// this.props.data.map(element => {
	// 	let r = Math.floor(Math.random() * 735);
	// 	let g = Math.floor(Math.random() * 200);
	// 	let b = Math.floor(Math.random() * 103);
	// 	let color = "rgb(" + r + ", " + g + ", " + b + ")";
	// 	return color;
	// })
	render() {
		let data = {
			datasets: [
				{
					data: this.props.data,
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
			labels: this.props.labels
		};

		const { classes, className, ...rest } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<Portlet {...rest} className={rootClassName}>
				<PortletHeader noDivider>
					<PortletLabel title="Content Categorization By SkillSet" />
				</PortletHeader>
				<PortletContent>
					<div className={classes.chartWrapper}>
						<Doughnut data={data} options={this.options} />
					</div>
					<div className={classes.stats}>
						{this.props.labels.map((label, index) => {
							return (
								<div className={classes.device}>
									<Typography variant="h5">
										{label.charAt(0).toUpperCase() + label.slice(1)}
									</Typography>
									<Tooltip title="Number of Studymaterial Posted">
										<Typography
											style={{ color: data.datasets[0].backgroundColor[index] }}
											variant="h4">
											{this.props.data[index]}
										</Typography>
									</Tooltip>
								</div>
							);
						})}
					</div>
				</PortletContent>
			</Portlet>
		);
	}
}

SkillComposition.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SkillComposition);
