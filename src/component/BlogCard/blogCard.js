import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./blogStyles";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
  TwitterShareButton
} from "react-share";

const Cards = props => {
  const classes = useStyles();

  const editBlog = props => {
    if (props.edit === "1") {
      return (
        <Button size="small" color="primary" onClick={props.onClickEdit}>
          EDIT BLOG
        </Button>
      );
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.textColor}
          >
            <b>{props.name}</b>
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.textColor}
            component="p"
          >
            {props.description
              ? props.description
              : "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <FacebookShareButton
          url={props.url}
          quote={props.name}
          className={classes.socialMediaButton}
        >
          <FacebookIcon size={22} />
        </FacebookShareButton>
        <TwitterShareButton
          url={props.url}
          quote={props.name}
          className={classes.socialMediaButton}
        >
          <TwitterIcon size={22} />
        </TwitterShareButton>
        <EmailShareButton
          url={props.url}
          quote={props.name}
          className={classes.socialMediaButton}
        >
          <EmailIcon size={22} />
        </EmailShareButton>
        <Button size="small" color="primary" onClick={props.onClickView}>
          VIEW BLOG
        </Button>
        {editBlog(props)}
      </CardActions>
    </Card>
  );
};

export default Cards;
