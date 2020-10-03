import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { SubmitButton } from "../../component";
import { Header, InputMultiLine, CommentCard } from "../../component/index";
import { fetchBlogById, updateBlog } from "../../store/blog";
import { useStyles } from "./viewBlogStyle";

const ViewBlog = props => {
  const classes = useStyles();
  const { handleSubmit, control, register } = useForm();
  const [comments, setComments] = useState([]);
  const [clickId, setClickId] = useState(false);

  useEffect(() => {
    let viewBlogId = localStorage.getItem("ViewBlogId");
    props.fetchBlogById(viewBlogId);
    setComments([
      {
        userId: "rags",
        userName: "Raghavan Chandrasekar",
        comment: "Heyy, Nice article about world war",
        commentId: 1,
        image: "",
        likes: 3,
        userIdLiked: []
      },
      {
        userId: "rags",
        userName: "Chandrasekar Narasimhan",
        comment: "Good one",
        commentId: 2,
        image: "",
        likes: ""
      }
    ]);
  }, []);

  const updateComment = () => {};

  const saveComments = comment => {};

  const onSubmit = formValues => {};

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
          <CommentCard
            commentId={comment.commentId}
            userName={comment.userName}
            comment={comment.comment}
          />
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
