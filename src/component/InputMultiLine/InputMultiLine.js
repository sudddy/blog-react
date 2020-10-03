import React from "react";
import { TextField } from "@material-ui/core";

const InputMultiLine = props => {
  return (
    <TextField
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      label={props.label}
      placeholder={props.label}
      variant="outlined"
      multiline
      rows={8}
      fullWidth
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
export default InputMultiLine;
