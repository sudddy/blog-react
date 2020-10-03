import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useStyles } from "./commentCardStyle";

const CommentCard = props => {
  const classes = useStyles();
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (props.userLiked) {
      let userId = JSON.parse(localStorage.getItem("user_details"));
      props.userLiked.map(likes => {
        if (likes === userId._id) {
          setClick(true);
        }
      });
    }
  }, []);

  const handleClick = props => {
    if (click) {
      setClick(false);
    } else {
      setClick(true);
    }
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <Row>
      <Col lg={12} sm={12} md={12}>
        <Card className={classes.cards} key={props.commentId}>
          <CardContent className={classes.commentContent}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              title={props.userName}
              subheader={props.comment}
            />

            <div className={classes.likeContent}>
              <IconButton
                className={classes.likeIcon}
                key={props.commentId}
                onClick={handleClick}
              >
                <FavoriteIcon
                  key={props.commentId}
                  className={`${
                    click ? classes.likeButton : classes.unlikeButton
                  }`}
                />
              </IconButton>
              <Typography
                className={classes.likes}
                variant="body2"
                color="textSecondary"
              >
                {props.likes} Likes
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Col>
    </Row>
  );
};

export default CommentCard;
