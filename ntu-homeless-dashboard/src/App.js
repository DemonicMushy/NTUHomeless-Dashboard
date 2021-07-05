import React, { useState, useEffect } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import DataBreakdown from "./components/DataBreakdown";

import dataRetriever from "./utils/dataRetriever";

const useStyles = makeStyles({
  height_100_percent: {
    height: "100%",
  },
  width_100_percent: {
    width: "100%",
  },
  color_blue: {
    color: "blue",
  },
  header_height: {
    height: "2vh",
  },
  banner_title: {
    padding: "24px 32px 0px",
  },
  banner_body: {
    padding: "0px 32px 12px",
  },
});

function App() {
  const classes = useStyles();

  const [data, setData] = useState({});

  useEffect(() => {
    dataRetriever.getDataFromBackend().then((res) => {
      setData(res.data)
      console.log(res.data)
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center" spacing={2}>
          {/* Banner */}
          <Grid id="banner" item container xs={12} md={11} lg={10}>
            <Paper
              variant="outlined"
              className={clsx(classes.width_100_percent)}
            >
              <Typography
                className={clsx(classes.banner_title)}
                gutterBottom
                variant="h5"
              >
                NTUHomeless Dashboard
              </Typography>
              <Typography
                className={clsx(classes.banner_body)}
                gutterBottom
                variant="body2"
              >
                Data represented is from crowd sourced data.
              </Typography>
            </Paper>
          </Grid>

          {/* Overall allocation stats */}
          <Grid
            id="overall-allocation-stats"
            item
            container
            direction="row"
            justify="center"
            spacing={3}
            xs={12}
            md={11}
            lg={10}
          >
            <Grid item xs={12}>
              <Card
                variant="outlined"
                className={clsx(classes.height_100_percent)}
              >
                <CardContent>
                  <Typography variant="h5">Total students</Typography>
                  <Typography variant="body1">{`${data.num_approved + data.num_not_approved}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                variant="outlined"
                className={clsx(classes.height_100_percent)}
              >
                <CardContent>
                  <Typography variant="h5">Successful Allocation</Typography>
                  <Typography variant="body1">{`${data.num_approved}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                variant="outlined"
                className={clsx(classes.height_100_percent)}
              >
                <CardContent>
                  <Typography variant="h5">Unsuccessful Allocation</Typography>
                  <Typography variant="body1">{`${data.num_not_approved}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Data breakdowns */}
          <Grid
            id="data-breakdowns"
            item
            container
            direction="row"
            justify="center"
            spacing={3}
            xs={12}
            md={11}
            lg={10}
          >
            <Grid item xs={6}>
              <DataBreakdown data={data.approved}/>
            </Grid>
            <Grid item xs={6}>
              <DataBreakdown data={data.not_approved}/>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
