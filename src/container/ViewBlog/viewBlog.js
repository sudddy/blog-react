import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../component";
import { Header } from "../../component/index";

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up("xs")]: {
      display: "inline-block",
      paddingTop: "100px"
    }
  },

  blog: {
    padding: "50px"
  },

  textarea: {
    [theme.breakpoints.up("xs")]: {
      width: "200px",
      paddingLeft: "20px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "650px"
    },
    width: "950px",
    border: "2px solid  white"
  },
  cards: {
    width: "350px",
    height: "auto",
    background: "#e2e1e1",
    textAlign: "left",
    [theme.breakpoints.up("xs")]: {
      width: "250px"
    }
  },
  commentSection: {
    paddingTop: "50px",
    position: "relative"
  },
  comments: {
    display: "inline-block",
    paddingTop: "60px",
    paddingLeft: "20px",
    [theme.breakpoints.up("sm")]: {}
  },
  commentButton: {
    marginTop: "20px"
  },
  commentHeading: {
    color: "#FFF",
    position: "absolute",
    left: "20px"
  },
  commentForm: {
    display: "inline-block"
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

export default function ViewBlog() {
  const classes = useStyles();
  const [currentblogDetails, setblogDetails] = useState({});
  const [comments, setComment] = useState([]);
  const [newComment, setNewComment] = useState(false);

  const { handleSubmit, control, register } = useForm({
    defaultValues: ""
  });

  useEffect(() => {
    let content = JSON.parse(localStorage.getItem("view_blog"));
    if (content !== null) {
      setblogDetails(content);
    }
    updateComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateComment = () => {
    let content = JSON.parse(localStorage.getItem("view_blog"));
    let localComments = JSON.parse(localStorage.getItem("blog_details"));
    if (localComments != null) {
      // eslint-disable-next-line array-callback-return
      localComments = localComments.map(blog => {
        if (blog.id === content.id) {
          console.log("this is inside blog", blog.comments);
          if ("comments" in blog) {
            setComment(blog.comments);
            return blog;
          }
        }
      });
    }
    console.log("this is the current blog details", currentblogDetails);
    console.log("this is the commments ", localComments);
  };

  useEffect(() => {
    updateComment();
    setNewComment(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newComment]);

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

      localStorage.setItem("blog_details", JSON.stringify(blogDetails));
      setNewComment(true);
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
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    <b>USER: </b>
                    {comment.username}
                  </Typography>
                  <br />
                  <Typography variant="body1" gutterBottom>
                    {comment.comment}
                  </Typography>
                </CardContent>
              </Card>{" "}
              <br />
            </Col>
          </Row>
        ))}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Header />
      <Row className={classes.blog}>
        <Typography variant="h3" component="h1" className={classes.title}>
          {currentblogDetails.name
            ? currentblogDetails.name
            : "Name is Empty ! Validations in progress "}
        </Typography>

        <Typography variant="subtitle1" className={classes.desc} gutterBottom>
          {currentblogDetails.description
            ? currentblogDetails.description
            : "description is Empty ! Validations in progress "}
        </Typography>

        <Typography variant="body1" className={classes.content} gutterBottom>
          {currentblogDetails.content
            ? currentblogDetails.content
            : "description is Empty ! Validations in progress "}
        </Typography>
      </Row>
      <Row>
        <div class={classes.commentHeading}>
          <Typography variant="h4" component="h1">
            Comments:
          </Typography>
        </div>
      </Row>
      <Row className={classes.commentSection}>
        <Col className={classes.commentForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextareaAutosize
              className={classes.textarea}
              rowsMax={2}
              name="comment"
              control={control}
              ref={register}
              aria-label="maximum height"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <div className={classes.commentButton}>
              <SubmitButton
                label="Express your views"
                type="submit"
                control={control}
              ></SubmitButton>
            </div>
          </form>
        </Col>
      </Row>
      <Row>
        <div class={classes.commentHeading}>
          <Typography variant="h4" component="h1">
            Comments History:
          </Typography>
        </div>
      </Row>
      <Row>{displayComments(comments)}</Row>
    </div>
  );
}
