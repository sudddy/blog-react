import { makeStyles } from "@material-ui/core/styles";

export const inputStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#673ab7"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#673ab7"
    }
  }
});
