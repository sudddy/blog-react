import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  root: {
    width: "280px",
    height: "auto",
    backgroundColor: "#e2e1e1",
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  title: {
    fontSize: 14,
    paddingLeft: "20px",
    paddingTop: "20px",
    color: "#000"
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
  },
  textColor: {
    color: "#000"
  }
}));
