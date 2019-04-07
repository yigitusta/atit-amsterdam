import React, { Component } from "react";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { isValidCode } from "../utils";
import { AppState } from "../types";

export interface FormProps { appState: AppState, setAppState: (appState: AppState) => any }

interface FormState {
  codeValidated?: boolean
}

export class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  async submit() {
    const validated = await isValidCode("541051768");
    this.setState({ codeValidated: validated });
  }

  render() {
    return <section>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Check your personal lucky code!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it?
          </Typography>
        </Grid>
        <Grid item xs={6}>
          firstname
        </Grid>
        <Grid item xs={6}>
          surname
        </Grid>
        <Grid item xs={12}>
          email
        </Grid>
        <Grid item xs={12}>
          phone
        </Grid>
        <Grid item xs={12}>
          voucher
        </Grid>
        <Grid item xs={12}>
          accept
        </Grid>
        <Grid item xs={12}>
          send
        </Grid>
      </Grid>
      <h1 onClick={() => this.props.setAppState("win")}>AppState</h1>
      <button onClick={this.submit}>Is code valid?</button>
      {this.state.codeValidated ? "Code validated" : "Invalid Code"}
    </section>
  }
}
