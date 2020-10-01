import { Button } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { InputField, Modal } from "../../component/index";
import { SubmitButton } from "../../component/index";
import "./editBlog.scss";
import { Header } from "../../component/index";

const EditBlog = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({});

  const { handleSubmit, control, register, setValue } = useForm({
    defaultValues: ""
  });

  useEffect(() => {
    let existingBlogDetails = JSON.parse(localStorage.getItem("edit_blog"));
    setValue("name", existingBlogDetails.name);
    setValue("description", existingBlogDetails.description);
    setValue("content", existingBlogDetails.content);
    setCurrentBlog(existingBlogDetails);
  }, []);

  const onSubmit = formValues => {
    console.log(formValues);

    let fullBlogDetails = JSON.parse(localStorage.getItem("blog_details"));

    fullBlogDetails = fullBlogDetails.map(blog => {
      if (blog.id === currentBlog.id) {
        blog.name = formValues.name;
        blog.description = formValues.description;
        blog.content = formValues.content;
        return blog;
      }
      return blog;
    });
    console.log(fullBlogDetails);
    localStorage.setItem("blog_details", JSON.stringify(fullBlogDetails));
    toggleModal(true);
  };
  useEffect(() => {}, []);

  const handleModalClick = e => {
    toggleModal(false);
    props.history.push("/dashboard");
  };

  return (
    <div className="whole-edit-blog">
      <Header />
      <div className="container edit-blog-container">
        <Typography className="heading" variant="h3">
          {" "}
          Edit Blog
        </Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  label={"Blog Name"}
                  name="name"
                  control={control}
                  id={"outlined-full-width"}
                  width={290}
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="description"
                  label={"Blog Descrition"}
                  control={control}
                  width={290}
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col className="heading">
                <Typography>Blog content</Typography>
              </Col>
              <Col>
                <TextareaAutosize
                  className="textarea"
                  rowsMax={8}
                  name="content"
                  control={control}
                  ref={register}
                  aria-label="maximum height"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col className="button">
                <Button
                  className={props.className}
                  color="primary"
                  variant="contained"
                  size="large"
                  control={control}
                  type="submit"
                  label="Register"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
          <div>
            <br />
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen} dialogMessage={"Blog Edited Successfully"}>
        <SubmitButton
          label="ok"
          className="modal-button"
          onClick={handleModalClick}
        ></SubmitButton>
      </Modal>
    </div>
  );
};

export default EditBlog;
