import React from "react";
import { TextField } from "@material-ui/core";
import { inputStyles } from "./inputFieldStyle";

const InputField = props => {
  const classes = inputStyles();
  return (
    <TextField
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      label={props.label}
      className={classes.root}
      placeholder={props.label}
      variant="outlined"
      style={{ width: props.width }}
      margin="normal"
      color="red"
      onBlur={props.onBlur}
      onChange={props.onChange}
      error={props.hasError}
      InputLabelProps={{
        shrink: true
      }}
      labelWidth={50}
      helperText={props.errorMessage}
    />
  );
};
export default InputField;
