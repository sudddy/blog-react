import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  cards: {
    background: "#e2e1e1",
    textAlign: "left",
    borderRadius: "0px",
    borderBottom: "1px solid grey"
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
  }
}));
