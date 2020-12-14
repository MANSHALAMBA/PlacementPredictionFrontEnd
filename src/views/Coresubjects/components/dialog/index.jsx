import React, { Component } from "react";

import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Bar } from "react-chartjs-2";
import palette from "theme/palette";

class dialog extends Component {
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
            labelString: "Category Of Company"
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
            labelString: "% Chances of getting placed"
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
    const classes = this.props;
    let data = {
      labels: ["Service Based", "Start Ups", "Product Based"],
      datasets: [
        {
          backgroundColor: [
            palette.primary.main,
            palette.danger.main,
            palette.warning.main
          ],
          data: this.props.data
        }
      ]
    };
    return (
      <div>
        {" "}
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
          disableBackdropClick={true}
          fullWidth={true}
          maxWidth="xl"
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.handleClose}
          >
            <div
              style={{
                marginLeft: "210px",
                marginRight: "2px",
                float: "right"
              }}
            >
              <IconButton aria-label="close" onClick={this.props.handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            {this.props.isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress
                  size={40}
                  thickness={3.6}
                  className={classes.centralize}
                  style={{ marginLeft: "90px" }}
                />
                <Typography gutterBottom>
                  Our Machine Learning Algorithm is working ...
                </Typography>
              </div>
            ) : (
              <Bar data={data} options={this.options} height={400} />
            )}
          </DialogContent>
          <DialogActions>
            <Button style={{ color: "white" }}></Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(dialog);
