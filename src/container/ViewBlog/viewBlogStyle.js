import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      paddingTop: "100px",
      display: "inline-block",
      justifyContent: "center",
      textAlign: "Justify",
      padding: "50px"
    }
  },
  blogHeader: {
    display: "block",
    textAlign: "center"
  },

  commentSection: {
    paddingTop: "50px",
    position: "relative"
  },
  comments: {
    paddingTop: "60px",
    [theme.breakpoints.up("sm")]: {}
  },

  commentButton: {
    marginTop: "20px"
  },

  title: {
    color: "#fff"
  },
  desc: {
    color: "#dd904e",
    paddingBottom: "25px"
  },
  content: {
    color: "#fff"
  }
}));
