import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

// Material helpers
import { withStyles } from "@material-ui/styles";

// Material icons

// Shared components
import {
	Portlet,
	PortletHeader,
	PortletLabel,
	PortletContent
} from "components";

// Chart configuration

// Component styles
import styles from "./styles";
import palette from "theme/palette";

class ProjectBarGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	options = {
		responsive: true,
		maintainAspectRatio: false,
		animation: false,
		legend: { display: false },
		cornerRadius: 0,
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
		},
		layout: { padding: 0 },
		scales: {
			xAxes: [
				{
					barThickness: 24,
					maxBarThickness: 24,
					barPercentage: 0.5,
					categoryPercentage: 0.5,
					ticks: {
						fontColor: palette.text.secondary
					},
					scaleLabel: {
						display: true,
						labelString: "Name of Project"
					},
					gridLines: {
						display: false,
						drawBorder: false
					}
				}
			],
			yAxes: [
				{
					ticks: {
						fontColor: palette.text.secondary,
						beginAtZero: true,
						min: 0
					},
					scaleLabel: {
						display: true,
						labelString: "% Completion of Project"
					},
					gridLines: {
						borderDash: [2],
						borderDashOffset: [2],
						color: palette.divider,
						drawBorder: false,
						zeroLineBorderDash: [2],
						zeroLineBorderDashOffset: [2],
						zeroLineColor: palette.divider
					}
				}
			]
		}
	};

	render() {
		const { classes, className, ...rest } = this.props;

		const rootClassName = classNames(classes.root, className);

		let data = {
			labels: this.props.labels,
			datasets: [
				{
					backgroundColor: palette.primary.main,
					data: this.props.data
				}
			]
		};

		return (
			<Portlet {...rest} className={rootClassName}>
				<PortletHeader noDivider>
					<PortletLabel title="Project Completion Status" />
				</PortletHeader>
				<PortletContent>
					<div className={classes.chartWrapper}>
						<Bar data={data} options={this.options} />
					</div>
				</PortletContent>
			</Portlet>
		);
	}
}

ProjectBarGraph.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectBarGraph);
