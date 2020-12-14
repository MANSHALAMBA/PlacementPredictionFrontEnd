import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import palette from "theme/palette";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Bar } from "react-chartjs-2";
import {
	Portlet,
	PortletHeader,
	PortletLabel,
	PortletContent
} from "components";
class Visualization extends Component {
	dataset1 = {
		datasets: [
			{
				data: [63, 15, 22],
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
		labels: ["Intelligent", "Dumb", "Smart"]
	};
	dataset2 = {
		labels: ["January", "February", "March", "April"],
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: "rgba(255,99,132,0.2)",
				borderColor: "rgba(255,99,132,1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255,99,132,0.4)",
				hoverBorderColor: "rgba(255,99,132,1)",
				data: [65, 59, 80, 81]
			}
		]
	};

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
		return (
			<Grid container spacing={2}>
				<Grid item md={6}>
					<div className={this.props.classes.chartWrapper}>
						<Portlet>
							<PortletHeader noDivider>
								<PortletLabel title="Student Composition" />
							</PortletHeader>
							<PortletContent>
								<div>
									<Pie data={this.dataset1} options={this.options} />
								</div>
								<div className={this.props.classes.stats}>
									<div className={this.props.classes.label}>
										<Typography variant="body1">Intelligent</Typography>
										<Typography
											style={{ color: palette.primary.main }}
											variant="h2">
											63%
										</Typography>
									</div>
									<div className={this.props.classes.label}>
										<Typography variant="body1">Dumb</Typography>
										<Typography
											style={{ color: palette.danger.main }}
											variant="h2">
											15%
										</Typography>
									</div>
									<div className={this.props.classes.label}>
										<Typography variant="body1">Smart</Typography>
										<Typography
											style={{ color: palette.warning.main }}
											variant="h2">
											22%
										</Typography>
									</div>
								</div>
							</PortletContent>
						</Portlet>
					</div>
				</Grid>
				<Grid item md={6}>
					<div className={this.props.classes.chartWrapper}>
						<Portlet>
							<PortletHeader noDivider>
								<PortletLabel title="Students By Average Score" />
							</PortletHeader>
							<PortletContent>
								<div>
									<Bar data={this.dataset2} options={this.options} />
								</div>
								<div className={this.props.classes.stats}>
									<div className={this.props.classes.label}>
										<Typography variant="body1">January</Typography>
										<Typography
											style={{ color: palette.primary.main }}
											variant="h2">
											65
										</Typography>
									</div>
									<div className={this.props.classes.label}>
										<Typography variant="body1">February</Typography>
										<Typography
											style={{ color: palette.danger.main }}
											variant="h2">
											59
										</Typography>
									</div>
									<div className={this.props.classes.label}>
										<Typography variant="body1">March</Typography>
										<Typography
											style={{ color: palette.warning.main }}
											variant="h2">
											80
										</Typography>
									</div>
									<div className={this.props.classes.label}>
										<Typography variant="body1">April</Typography>
										<Typography
											style={{ color: palette.warning.main }}
											variant="h2">
											81
										</Typography>
									</div>
								</div>
							</PortletContent>
						</Portlet>
					</div>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Visualization);
