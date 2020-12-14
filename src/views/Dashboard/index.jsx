import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/styles";
import swal from "sweetalert";
// Material components
import { Grid } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "layouts";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Line } from "react-chartjs-2";
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from "components";
import { fetchData } from "api/result";
import TextField from "@material-ui/core/TextField";
//import styles from "./styles";

// Custom components

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Typography } from "@material-ui/core";
import Loader from "components/loader";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  dropdownButton: {
    marginRight: -theme.spacing(1) * 2
  },
  chartWrapper: {
    height: "400px",
    position: "relative"
  },
  portletFooter: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ur: 0,
      cgpa: 0,
      Xaxes1: [],
      Xaxes2: [],
      Yaxes: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    fetchData(this.props.token)
      .then(response => {
        this.setState({
          Xaxes1: response.Xaxes1,
          Xaxes2: response.Xaxes2,
          Yaxes: response.Yaxes,
          isLoading: false
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

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);
    const data1 = {
      labels: this.state.Xaxes1,
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(37,174,31,0.4)",
          borderColor: "rgba(37,174,31,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.Yaxes
        }
      ]
    };
    const data2 = {
      labels: this.state.Xaxes2,
      datasets: [
        {
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(253,255,0,0.4)",
          borderColor: "rgba(253,255,0,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.Yaxes
        }
      ]
    };

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Enter Your University Name</InputLabel>
            <Select
              value={this.props.ur}
              onChange={e => this.props.updateur(e.target.value)}
              name="ur"
              input={<OutlinedInput name="ur" labelWidth={180} />}
            >
              ><MenuItem value={1}>IIT</MenuItem>
              <MenuItem value={2}>NIT</MenuItem>
              <MenuItem value={3}>DTU</MenuItem>
              <MenuItem value={4}>NSIT</MenuItem>
              <MenuItem value={5}>GGSIPU</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <br />
          <br />

          <TextField
            value={this.props.cgpa}
            onChange={e => this.props.updatecgpa(e.target.value)}
            name="cgpa"
            input={<OutlinedInput name="cgpa" labelWidth={110} />}
            label="Enter Your CGPA"
            variant="outlined"
          />
          <br />
          <Typography color="error" variant="caption">
            {this.props.error}
          </Typography>

          <br />
          <br />
          <Typography
            align="center"
            variant="h3"
            style={{ marginLeft: "400px" }}
          >
            Some Recent Trends...
          </Typography>
          <br />
          <br />
          <br />

          <Portlet {...rest} className={rootClassName}>
            <PortletHeader noDivider>
              <PortletLabel title="Aptitude vs Chances of Getting Placed" />
            </PortletHeader>
            <PortletContent>
              <div className={classes.chartWrapper}>
                {this.state.isLoading ? <Loader /> : <Line data={data1} />}
              </div>
            </PortletContent>
          </Portlet>
          <br />
          <br />
          <br />
          <Portlet {...rest} className={rootClassName}>
            <PortletHeader noDivider>
              <PortletLabel title="Softskills vs Chances of Getting Placed" />
            </PortletHeader>
            <PortletContent>
              <div className={classes.chartWrapper}>
                {this.state.isLoading ? <Loader /> : <Line data={data2} />}
              </div>
            </PortletContent>
          </Portlet>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    ur: state.dashboard.ur,
    cgpa: state.dashboard.cgpa,
    error: state.dashboard.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateur: data => dispatch({ type: "UPDATE UR", data: data }),
    updatecgpa: data => dispatch({ type: "UPDATE CGPA", data: data })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
