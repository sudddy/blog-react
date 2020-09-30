import React from "react";
import { Button } from "@material-ui/core";
import { buttonStyles } from "./buttonStyle";

const SubmitButton = props => {
  const classes = buttonStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      size="large"
      type={props.type}
      onClick={props.onClick}
    >
      {" "}
      {props.label}{" "}
    </Button>
  );
};
export default SubmitButton;
