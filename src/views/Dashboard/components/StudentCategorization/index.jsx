import React, { Component } from "react";

// Externals
import { Doughnut } from "react-chartjs-2";
import classNames from "classnames";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material components
import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

// Shared components
import {
	Portlet,
	PortletHeader,
	PortletLabel,
	PortletContent
} from "components";

// Palette
import palette from "theme/palette";

// Chart configuration

// Component styles
import styles from "./styles";

class StudentCategorization extends Component {
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
	render() {
		let data = {
			datasets: [
				{
					data: this.props.data,
					backgroundColor: [
						palette.primary.main,
						palette.danger.main,
						palette.warning.main,
						palette.info.main
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
					<PortletLabel title="Student Categorization" />
				</PortletHeader>
				<PortletContent>
					<div className={classes.chartWrapper}>
						<Doughnut data={data} options={this.options} />
					</div>
					<div className={classes.stats}>
						{this.props.labels.map((label, index) => {
							return (
								<div className={classes.device}>
									<Typography variant="body1">{label}</Typography>
									<Tooltip title="Number of Students">
										<Typography
											style={{ color: data.datasets[0].backgroundColor[index] }}
											variant="h6">
											{this.props.data[index]}
										</Typography>
									</Tooltip>
									<Tooltip title="Average Score">
										<Typography
											style={{ color: data.datasets[0].backgroundColor[index] }}
											variant="h6">
											{this.props.avgScore[index]}
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

StudentCategorization.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentCategorization);
