import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  root: {
    width: "280px",
    height: "auto",
    backgroundColor: "#e0ece4",
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  content: {
    height: "80px"
  },
  title: {
    color: "#0d7377"
  },
  description: {
    color: "#212121"
  },
  pos: {
    marginBottom: 12
  },
  img: {
    paddingLeft: "30px"
  },
  actions: {
    display: "flex",
    justifyContent: "center"
  }
}));
