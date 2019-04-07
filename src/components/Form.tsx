import React, { Component } from "react";
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
      <h1 onClick={() => this.props.setAppState("win")}>AppState</h1>
      <button onClick={this.submit}>Is code valid?</button>
      {this.state.codeValidated ? "Code validated" : "Invalid Code"}
    </section>
  }
}
