import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Divider } from "@material-ui/core";

import PieChart from "../charts/pie";

import response from "../utils/dataStructure";
import { COLORS } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function DataBreakdown(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>More details:</Typography>
        </AccordionSummary>
        {response.map((value, index) => {
          // generate data for the charts
          if (props.data) {
            var data = value.options.map((opt) => {
              return {
                label: opt,
                value: props.data[value.question][opt],
              };
            });
          }
          return (
            <React.Fragment>
              <Divider />
              <AccordionDetails>
                <Grid container direction="column">
                  <Typography variant="subtitle1">{value.question}</Typography>

                  <Grid item container direction="row" justify="center">
                    <PieChart data={data} />
                  </Grid>
                  {value.options.map((opt, idxxx) => (
                    <Grid
                      item
                      container
                      direction="row"
                      justify="space-between"
                    >
                      <Grid item xs={11}>
                        <div
                          style={{
                            float: "left",
                            width: "0.6rem",
                            height: "0.6rem",
                            margin: "4px",
                            background: COLORS[idxxx],
                          }}
                        ></div>
                        <Typography noWrap variant="body2">
                          {opt}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant="body2">
                          {props.data ? props.data[value.question][opt] : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </React.Fragment>
          );
        })}
      </Accordion>
    </div>
  );
}
