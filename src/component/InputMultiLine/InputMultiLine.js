import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  input: {
    backgroundColor: "white",
    borderRadius: "8px"
  }
}));

const InputMultiLine = props => {
  const classes = useStyles();
  return (
    <TextField
      id={props.id}
      name={props.name}
      type={props.type}
      className={classes.input}
      value={props.value}
      label={props.label}
      placeholder={props.label}
      variant="outlined"
      multiline
      rows={props.row}
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
