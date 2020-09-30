import { makeStyles } from "@material-ui/core/styles";
export const headerStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      height: "80px",
      backgroundColor: "#6648ff",
      borderRadius: "0px 0px 6px 6px"
    }
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,

  welcomeFont: {
    fontSize: "16px",
    paddingLeft: "15px"
  },
  toolbarMenu: {
    position: "absolute",
    right: "40px"
  }
}));
