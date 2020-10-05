import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { SubmitButton } from "../../component";
import { Header, InputMultiLine, CommentCard } from "../../component/index";
import {
  fetchBlogById,
  updateBlog,
  addComment,
  editComment
} from "../../store/blog";
import { useStyles } from "./viewBlogStyle";

const ViewBlog = props => {
  const classes = useStyles();
  const { handleSubmit, control, register } = useForm({
    defaultValues: ""
  });
  const [blogId, setBlogId] = useState("");
  const [fetchBlog, setFetchBlog] = useState(false);

  const handleClick = () => {
    setFetchBlog(true);
  };

  useEffect(() => {
    let viewBlogId = localStorage.getItem("ViewBlogId");
    setBlogId(viewBlogId);
    props.fetchBlogById(viewBlogId);
    setFetchBlog(false);
  }, [fetchBlog]);

  async function onSubmit(formValues) {
    console.log(formValues);
    var data;
    if (props.user.hasOwnProperty("logged_user")) {
      data = {
        _id: blogId,
        comments: {
          userId: props.user.logged_user.user._id,
          userName:
            props.user.logged_user.user.firstName +
            " " +
            props.user.logged_user.user.lastName,
          comment: formValues.comment,
          userIdLiked: []
        }
      };
      await props.addComment(data);
      setFetchBlog(true);
    } else {
      alert("Login Please!");
    }
  }

  const displayComments = () => {
    if (props.blogDetails.hasOwnProperty("blogDetail")) {
      if (!props.blogDetails.blogDetail.hasOwnProperty("comments")) {
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
    }

    return (
      <div className={classes.comments}>
        {props.blogDetails.blogDetail.comments.map(comment => (
          <CommentCard
            commentId={comment._id}
            userName={comment.userName}
            comment={comment.comment}
            userLiked={comment.userIdLiked}
            blogId={blogId}
            username={comment.userName.substring(0, 1)}
            userId={props.user.logged_user.user._id}
            likes={comment.userIdLiked ? comment.userIdLiked.length : 0}
            onClick={() => handleClick(comment._id)}
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
              name="comment"
              control={control}
              class={"bgWhite"}
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
      <Row>{displayComments()}</Row>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { updateBlog, fetchBlogById, addComment, editComment }
)(ViewBlog);
