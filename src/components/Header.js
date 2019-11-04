import React from "react";
import { AccessAlarm } from "@material-ui/icons";
import { SvgIcon } from "@material-ui/core";
import { FlameIcon } from "../svgs/svgs";

import "./Header.scss";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

export default function Header() {
  return (
    <div className="header">
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>WELCOME</Grid>
          <Grid item>
            <div className="header__logo">
              <FlameIcon />
              Feedr
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
