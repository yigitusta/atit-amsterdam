import React from "react";
import { AppState } from "../types";

export interface FormProps { appState: AppState, setAppState: (appState: AppState) => any }

export const Form = ({ appState, setAppState }: FormProps) => {
  return (
    <section>
      <h1 onClick={() => setAppState("win")}>AppState</h1>
      {appState}
    </section>
  )
};
