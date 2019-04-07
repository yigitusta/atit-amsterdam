import React, { Component } from 'react';
import logo from "./img/logo.png";
import {Form} from "./components/Form";
import {Info} from "./components/Info";
import { AppState } from "./types";

type GlobalState = {
  appState: AppState
}

class App extends Component<{}, GlobalState> {
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
        </header>
        <main>
          <Info appState={this.state.appState} />
          <Form appState={this.state.appState} setAppState={this.setAppState} />
        </main>
      </div>
    );
  }
}

export default App;
