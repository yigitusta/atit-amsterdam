import React from "react";
import { AppState } from "../types";

export interface InfoProps { appState: AppState }

export const Info = ({ appState }: InfoProps) => {
    const placeholder = "Vier Uhr nachts auf der AVUS\n" +
    "AMG, Abt und Brabus\n" +
    "Mit siebenhundert Pferden – König Artus\n" +
    "Bis der Kommissar fragt, „Was'n da los?“ ";

    const data = {
      "default": {
        "title": "Get a Golden Ticket to Amsterdam!",
        "content": placeholder
      },
      "error": {
        "title": "Get a Golden Ticket to Amsterdam!",
        "content": placeholder
      },
      "win": {
        "title": "Congratulations! You Won!",
        "content": placeholder
      },
      "lose": {
        "title": "Better luck next time",
        "content": placeholder
      }
    };
    return <section>
      <h1>{data[appState].title}</h1>
      <pre>{data[appState].content}</pre>
    </section>
};