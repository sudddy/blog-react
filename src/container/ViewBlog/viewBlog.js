import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { SubmitButton } from "../../component";
import { Header, InputMultiLine } from "../../component/index";
import { fetchBlogById, updateBlog } from "../../store/blog";
import { useStyles } from "./viewBlogStyle";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardHeader from "@material-ui/core/CardHeader";

const ViewBlog = props => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [click, setClick] = useState(true);

  const { handleSubmit, control, register } = useForm({
    defaultValues: ""
  });

  useEffect(() => {
    let viewBlogId = localStorage.getItem("ViewBlogId");
    props.fetchBlogById(viewBlogId);
    setComments([
      {
        userId: "rags",
        userName: "Raghavan Chandrasekar",
        comment: "Heyy, Nice article about world war",
        commentId: 2,
        image: "",
        likes: 3,
        userIdLiked: []
      },
      {
        userId: "rags",
        userName: "Chandrasekar Narasimhan",
        comment: "Good one",
        commentId: 1,
        image: "",
        likes: ""
      }
    ]);
  }, []);

  const updateComment = () => {};

  const saveComments = comment => {};

  const onSubmit = formValues => {};

  const handleLike = () => {
    if (click) {
      setClick(false);
    } else {
      setClick(true);
    }
  };

  const displayComments = comments => {
    if (comments.length === 0) {
      return (
        <div>
          <h1 className={classes.title}>
            {" "}
            Wow, such Empty! Please share your comments
          </h1>
          ;
        </div>
      );
    }

    return (
      <div className={classes.comments}>
        {comments.map(comment => (
          <Row>
            <Col lg={12} sm={12} md={12}>
              <Card className={classes.cards}>
                <CardContent className="classes.commentContent">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    title={comment.userName}
                    subheader={comment.comment}
                  />
                  <div className={classes.likeContent}>
                    <IconButton
                      className={classes.likeIcon}
                      onClick={handleLike}
                    >
                      <FavoriteIcon
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
                      6 Likes
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    );
  };

  if (!props.blogDetails.hasOwnProperty("blogDetail")) {
    return (
      <div>
        <CircularProgress disableShrink />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Header />

      <Row className={classes.blogHeader}>
        <Typography variant="h3" component="h1" className={classes.title}>
          {props.blogDetails.blogDetail.blogName}
        </Typography>

        <Typography variant="subtitle1" className={classes.desc} gutterBottom>
          {props.blogDetails.blogDetail.blogDescription}
        </Typography>
      </Row>

      <Row className={classes.blog}>
        <Typography variant="body1" className={classes.content} gutterBottom>
          {props.blogDetails.blogDetail.blogContent}
        </Typography>
      </Row>
      <Row className={classes.commentSection}>
        <Col className={classes.commentForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={InputMultiLine}
              // label={"Leave your comment"}
              name="comment"
              control={control}
              fullWidth
              row={4}
              ref={register}
              aria-label="maximum height"
            />

            <div className={classes.commentButton}>
              <SubmitButton
                label="Leave your Comment"
                type="submit"
                control={control}
              ></SubmitButton>
            </div>
          </form>
        </Col>
      </Row>
      <Row>{displayComments(comments)}</Row>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { updateBlog, fetchBlogById }
)(ViewBlog);
