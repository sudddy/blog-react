import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
      <CardContent className={classes.content}>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={classes.title}
        >
          <b>{props.name}</b>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.description}
          component="p"
        >
          {props.description}
        </Typography>
      </CardContent>

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
