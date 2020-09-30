import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
  root: {
    width: "auto",
    height: "auto",
    background: "#fffff"
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
  }
});
