import React, { Component } from "react";

import { Dashboard as DashboardLayout } from "layouts";
import { APTITUDE } from "../../constants";
import style from "./style.module.css";
// styles
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import { evaluateresult } from "api/result";
import Dialog from "./components/dialog";

class CoreSubjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {
          id: "1",
          question: "Time taken for addition of element in queue is ?",
          options: ["O(1)", "O(n)", "O(log n)", "None of these"],
          correct: "O(1)",
          isCorrect: "NA"
        },
        {
          id: "2",
          question:
            "The data structure required for Breadth First Traversal on a graph is ?",
          options: ["queue", "stack", "array", "tree"],
          correct: "queue",
          isCorrect: "NA"
        },
        {
          id: "3",
          question:
            "Which oe of the following statements about the function Process Array is CORRECT?",
          options: [
            "It will run into an infinite loop when x is not in listA",
            "It is an implementation of binary search.",
            "It will always find the maximum element in listA.",
            "It will return -1 even when x is present in listA."
          ],
          correct: "It will run into an infinite loop when x is not in listA",
          isCorrect: "NA"
        },
        {
          id: "4",
          question: "Assuming P != NP, which of the following is true ?",
          options: [
            "NP-complete = NP",
            "NP-complete cap P = Phi",
            "NP-hard = NP",
            "P = NP-complete"
          ],
          correct: "NP-complete cap P = Phi",
          isCorrect: "NA"
        },
        {
          id: "5",
          question:
            "Let X be a problem that belongs to the class NP. Then which one of the following is TRUE?",
          options: [
            "There is no polynomial time algorithm for X.",
            "If X can be solved deterministically in polynomial time, then P = NP",
            "If X is NP-hard, then it is NP-complete.",
            "X may be undecidable."
          ],
          correct: "If X is NP-hard, then it is NP-complete.",
          isCorrect: "NA"
        },
        {
          id: "6",
          question:
            "Which module gives control of the CPU to the process selected by the short-term scheduler?",
          options: [
            "dispatcher",
            "interrupt",
            "scheduler",
            "none of the mentioned"
          ],
          correct: "dispatcher",
          isCorrect: "NA"
        },
        {
          id: "7",
          question:
            "The processes that are residing in main memory and are ready and waiting to execute are kept on a list called ?",
          options: [
            "job queue",
            "ready queue",
            "execution queue",
            "process queue"
          ],
          correct: "job queue",
          isCorrect: "NA"
        },
        {
          id: "8",
          question: "The request and release of resources are ___________ ?",
          options: [
            "command line statements",
            "interrupts",
            " system calls",
            "special programs"
          ],
          correct: "interrupts",
          isCorrect: "NA"
        },
        {
          id: "9",
          question: " An un-interruptible unit is known as ",
          options: ["single", "atomic", "static", "none of the mentioned"],
          correct: "atomic",
          isCorrect: "NA"
        },
        {
          id: "10",
          question:
            " The packet of information at the application layer is called __________?",
          options: [" Packet", "Message", "segment", "frame"],
          correct: "Message",
          isCorrect: "NA"
        },
        {
          id: "11",
          question: " Application layer offers _______ service. ?",
          options: [
            "End to end",
            "Process to process",
            "Both End to end and Process to process",
            "None of the mentioned"
          ],
          correct: "End to end",
          isCorrect: "NA"
        },
        {
          id: "12",
          question:
            "For each attribute of a relation, there is a set of permitted values, called the ________ of that attribute.?",
          options: ["Domain", "Relation", "Set", "Schema"],
          correct: "Domain",
          isCorrect: "NA"
        },
        {
          id: "13",
          question:
            "Database __________ which is the logical design of the database, and the database _______ which is a snapshot of the data in the database at a given instant in time.?",
          options: [
            "Instance, Schema",
            "Relation, Schema",
            " Relation, Domain",
            "Schema, Instance"
          ],
          correct: "Schema, Instance",
          isCorrect: "NA"
        },
        {
          id: "14",
          question:
            "A domain is atomic if elements of the domain are considered to be ____________ units.?",
          options: ["Different", "Indivisbile", "Constant", "Divisible"],
          correct: "Indivisbile",
          isCorrect: "NA"
        }
      ],
      score: 0,
      open: false,
      isLoading: true,
      answer: []
    };
  }
  handleClose = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        open: false,
        isLoading: true
      };
    });
  };

  handleChange = (e, id) => {
    // console.log(e.target.value);
    // console.log(id);
    let [...questions] = this.state.questions;
    let score = this.state.score;
    //console.log(questions);
    questions = questions.map(ques => {
      if (ques.id == id) {
        // update isCorrect
        ques.isCorrect = e.target.value == ques.correct ? "Right" : "Wrong";
        score = e.target.value == ques.correct ? score + 1 : score;
      }
      return ques;
    });

    this.setState({
      questions: questions,
      score: score
    });
  };
  onSubmit = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        open: true
      };
    });

    const data = {
      aptitude: this.props.aptitudescore,
      softskills: (this.props.aptitudescore / 340) * (2 / 5) * 120,
      ur: this.props.ur,
      cgpa: this.props.cgpa,
      domainknowledge: this.state.score / 14
    };
    evaluateresult(this.props.token, data)
      .then(response => {
        this.setState(prevState => {
          return {
            ...prevState,

            answer: response.answer,
            isLoading: false
          };
        });

        // swal({
        //   title: "Success",
        //   text:
        //     response.answer[0] +
        //     " " +
        //     response.answer[1] +
        //     " " +
        //     response.answer[2],

        //   button: "Ok"
        // });
      })
      .catch(error => {
        swal({
          title: "Error",
          text: "Please check your input and try again",

          button: "Ok"
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <DashboardLayout mode={APTITUDE} title="Core Subjects">
        <div className={classes.root}>
          {this.state.questions.map(ques => {
            let idx = ques.id;
            return (
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <div>
                    <Typography>
                      {ques.id}) {ques.question}
                    </Typography>

                    <RadioGroup onChange={e => this.handleChange(e, ques.id)}>
                      {ques.options.map(option => {
                        return (
                          <FormControlLabel
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        );
                      })}
                    </RadioGroup>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  {ques.isCorrect == "Right" ? (
                    <div>
                      <CheckIcon
                        color="secondary"
                        className={style.svg_icons}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {ques.isCorrect == "Wrong" ? (
                    <div>
                      <ClearIcon color="error" className={style.svg_icons} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Grid>
              </Grid>
            );
          })}
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onSubmit}
            >
              Evaluate My Result
            </Button>
          </div>
          <Dialog
            handleClose={this.handleClose}
            open={this.state.open}
            isLoading={this.state.isLoading}
            data={this.state.answer}
          />
        </div>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    ur: state.dashboard.ur,
    cgpa: state.dashboard.cgpa,
    aptitudescore: state.dashboard.aptitudescore
  };
};

export default connect(mapStateToProps)(withStyles(styles)(CoreSubjects));
