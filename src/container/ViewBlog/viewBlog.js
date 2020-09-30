import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../component";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "inline-block"
  },
  commentSection: {
    paddingTop: "50px",
    border: "1px solid green"
  },
  textarea: {
    width: "210px"
  }
});

export default function ViewBlog() {
  const classes = useStyles();
  const [currentblogDetails, setblogDetails] = useState({});
  const [comments, setComment] = useState([]);
  const [user, setUser] = useState([]);
  const { handleSubmit, control, register } = useForm({
    defaultValues: ""
  });

  const displayComments = () => {
    return (
      <div>
        <Card className={classes.root}>
          <CardContent></CardContent>
        </Card>
      </div>
    );
  };

  useEffect(() => {
    let content = JSON.parse(localStorage.getItem("view_blog"));
    if (content !== null) {
      setblogDetails(content);
    }
  }, []);

  const saveComments = comment => {
    let blogDetails = JSON.parse(localStorage.getItem("blog_details"));
    if (blogDetails != null) {
      blogDetails = blogDetails.map(blog => {
        if (blog.id === currentblogDetails.id) {
          if ("comments" in blog) {
            blog.comments.push(comment);
          } else {
            blog.comments = [];
            blog.comments.push(comment);
          }
          return blog;
        }
        return blog;
      });

      console.log("this is the current blog details", blogDetails);
      localStorage.setItem("blog_details", JSON.stringify(blogDetails));
    }
  };

  const onSubmit = formValues => {
    let username = localStorage.getItem("logggedInUsername");
    let id = localStorage.getItem("userID");
    let comment = {
      id: id,
      username: username,
      comment: formValues.comment
    };
    saveComments(comment);
  };

  return (
    <div>
      <Row className={classes.root}>
        <Typography variant="h1" component="h2" gutterBottom>
          {currentblogDetails.name}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          {currentblogDetails.description}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {currentblogDetails.content}
        </Typography>
      </Row>
      <Row className={classes.commentSection}>
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextareaAutosize
              className={classes.textarea}
              rowsMax={8}
              name="comment"
              control={control}
              ref={register}
              aria-label="maximum height"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />

            <SubmitButton
              label="Express your views"
              type="submit"
              control={control}
            ></SubmitButton>
          </form>
        </Col>
      </Row>
    </div>
  );
}
