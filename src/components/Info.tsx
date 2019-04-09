import React from "react";
import { AppState } from "../types";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

export interface InfoProps { appState: AppState }

export const Info = ({ appState }: InfoProps) => {
    const placeholder = "Gingerbread cake jelly pudding jelly beans. Fruitcake gingerbread wafer wafer gingerbread apple pie marshmallow. Biscuit jelly cookie dragée brownie dessert carrot cake macaroon bonbon. Unerdwear.com liquorice marshmallow fruitcake caramels dessert gingerbread. Cupcake caramels biscuit macaroon. Cookie fruitcake chocolate bar donut bonbon tiramisu cake croissant. Pastry gingerbread pastry danish halvah sweet muffin jelly. Macaroon cake icing halvah marshmallow applicake. Jelly-o cupcake lemon drops applicake macaroon donut.";

    const data = {
      "default": {
        "title": "Get a Golden Ticket to Amsterdam!",
        "content": placeholder
      },
      "win": {
        "title": "Congratulations! You Won!",
        "content": placeholder.slice(0, 200)
      },
      "lose": {
        "title": "Better luck next time",
        "content": placeholder.slice(0, 200)
      }
    };
    return <section>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {data[appState].title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            {data[appState].content}
          </Typography>
        </Grid>
      </Grid>
    </section>
};