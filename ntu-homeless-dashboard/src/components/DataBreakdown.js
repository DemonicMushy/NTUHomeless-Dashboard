import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Divider } from "@material-ui/core";

import response from "../utils/dataStructure";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    // fontWeight: theme.typography.fontWeightRegular,
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
          <Typography className={classes.heading}>More details:</Typography>
        </AccordionSummary>
        {response.map((value) => (
          <React.Fragment>
            <Divider />
            <AccordionDetails>
              <Grid container direction="column">
                <Typography variant="subtitle1">{value.question}</Typography>
                {value.options.map((opt) => (
                  <Grid item container direction="row" justify="space-between">
                    <Grid item xs={11}>
                      <Typography noWrap variant="body2">
                        {opt}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="body2">{props.data ? props.data[value.question][opt] : ""}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </React.Fragment>
        ))}
      </Accordion>
    </div>
  );
}
