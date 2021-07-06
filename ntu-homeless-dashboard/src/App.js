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

import { getDataFromBackend } from "./utils/dataRetriever";
import bgTile from "./assets/background.jpg";

const useStyles = makeStyles({
  background: {
    backgroundPosition: "center top",
    backgroundImage: `url(${bgTile})`,
    backgroundRepeat: "repeat",
    minHeight: "100vh",
  },
  height_100vh: {
    height: "100vh",
  },
  height_100_percent: {
    height: "100%",
  },
  width_100_percent: {
    width: "100%",
  },
  color_green: {
    color: "green",
  },
  color_red: {
    color: "red",
  },
  header_height: {
    height: "2vh",
  },
  banner_title: {
    padding: "24px 32px 0px",
  },
  banner_body: {
    padding: "0px 32px 0px",
  },
  padding_bottom: {
    paddingBottom: "12px",
  },
});

function App() {
  const classes = useStyles();

  const [data, setData] = useState({});

  useEffect(() => {
    getDataFromBackend().then((res) => {
      setData(res.data);
    });
    setInterval(() => {
      getDataFromBackend().then((res) => {
        setData(res.data);
      });
    }, 30000);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={clsx(classes.background)}>
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
                  Data represented is from crowd sourced data and is updated
                  every half minute.
                </Typography>
                <Typography
                  className={clsx(classes.banner_body, classes.padding_bottom)}
                  gutterBottom
                  variant="body2"
                >
                  Contribute to this data{" "}
                  <a href="https://forms.gle/LNJSygqDufDmgN557">here.</a>
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
              spacing={0}
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
                    <Typography variant="body1">
                      {data.num_not_approved
                        ? `${data.num_approved + data.num_not_approved}`
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Paper variant="outlined">
                  {data.num_not_approved && (
                    <Grid container direction="row">
                      <div
                        style={{
                          backgroundColor: "green",
                          height: "0.4rem",
                          width: `${
                            (data.num_approved * 100) /
                            (data.num_approved + data.num_not_approved)
                          }%`,
                        }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: "red",
                          height: "0.4rem",
                          width: `${
                            (data.num_not_approved * 100) /
                            (data.num_approved + data.num_not_approved)
                          }%`,
                        }}
                      ></div>
                    </Grid>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Card
                  variant="outlined"
                  className={clsx(classes.height_100_percent)}
                >
                  <CardContent className={clsx(classes.color_green)}>
                    <Typography variant="h5">Successful Allocation</Typography>
                    <Typography variant="body1">
                      {data.num_approved ? `${data.num_approved}` : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  variant="outlined"
                  className={clsx(classes.height_100_percent)}
                >
                  <CardContent className={clsx(classes.color_red)}>
                    <Typography variant="h5">
                      Unsuccessful Allocation
                    </Typography>
                    <Typography variant="body1">
                      {data.num_not_approved ? `${data.num_not_approved}` : 0}
                    </Typography>
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
                <DataBreakdown data={data.approved} />
              </Grid>
              <Grid item xs={6}>
                <DataBreakdown data={data.not_approved} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
