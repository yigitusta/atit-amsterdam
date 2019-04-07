import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles, createStyles } from "@material-ui/core/styles";
import logo from "./img/logo.png";
import { Form } from "./components/Form";
import { Info } from "./components/Info";
import { AppState } from "./types";

type GlobalState = {
  appState: AppState
}

const styles = createStyles({
  paper: {
    padding: "24px",
    textAlign: 'center',
    height: "100%",
  },
  flexGrow: {
    flexGrow: 1
  },
  root: {
    height: "95vh",
    width: "98vw",
    flexDirection: "column",
    margin: "0 auto",
    padding: 0
  },
  innerContainer: {
    height: "100%",
    flexGrow: 1,
    justifyContent: "space-between"
  }
});

interface AppProps {
  classes: {
    root: string;
    paper: string;
    innerContainer: string;
    flexGrow: string;
  }
}

class App extends Component<AppProps, GlobalState> {
  constructor(props: any) {
    super(props);
    this.state = {
      appState: "default"
    };
    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(newAppState: AppState) {
    this.setState({
      appState: newAppState
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item>
          <header className="App-header">
            <img src={logo} alt="logo" style={{ width: "300px" }} />
          </header>
        </Grid>
        <Grid item className={classes.flexGrow}>
          <Grid container spacing={24} className={classes.innerContainer}>
            <Grid item xs={6} className={classes.flexGrow}>
              <Paper className={classes.paper}>
                <Info appState={this.state.appState} />
              </Paper>
            </Grid>
            <Grid item xs={6} className={classes.flexGrow}>
              <Paper className={classes.paper}>
                <Form appState={this.state.appState} setAppState={this.setAppState} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
