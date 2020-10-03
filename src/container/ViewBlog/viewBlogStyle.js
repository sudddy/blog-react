import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@material-ui/system";
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
  cards: {
    background: "#e2e1e1",
    textAlign: "left",
    borderRadius: "0px",
    borderBottom: "1px solid grey"
  },
  commentSection: {
    paddingTop: "50px",
    position: "relative"
  },
  comments: {
    paddingTop: "60px",
    [theme.breakpoints.up("sm")]: {}
  },
  commentContent: {
    height: "50px",
    border: "3px solid red"
  },
  likeIcon: {
    paddingLeft: "20px"
  },
  likeButton: {
    color: "red"
  },
  unlikeButton: {
    color: "grey"
  },
  likes: {
    paddingLeft: "15px",
    display: "inline-block"
  },

  avatar: {
    backgroundColor: "red"
  },
  commentButton: {
    marginTop: "20px"
  },
  commentForm: {
    // display: "inline-block"
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
