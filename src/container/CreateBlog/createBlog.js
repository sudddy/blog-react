import { Button } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { InputField, Modal } from "../../component/index";
import { SubmitButton } from "../../component/index";
import "./createBlog.scss";

const CreateBlog = props => {
  const [isModalOpen, toggleModal] = useState(false);

  const { handleSubmit, control, register } = useForm({
    defaultValues: ""
  });

  const onSubmit = formValues => {
    console.log(formValues);

    //get blog details
    let existingBlogDetails = JSON.parse(localStorage.getItem("blog_details"));
    if (existingBlogDetails === null || existingBlogDetails === undefined) {
      existingBlogDetails = [];
    }

    let id = parseInt(localStorage.getItem("maximumID"));
    if (Number.isNaN(id)) {
      id = 0;
      localStorage.setItem("maximumID", 0);
    }
    id += 1;
    console.log("id check", id);

    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    formValues.id = id;
    formValues.userId = user[0].userId;

    console.log(existingBlogDetails);

    existingBlogDetails.push(formValues);
    localStorage.setItem("maximumID", id);
    localStorage.setItem("blog_details", JSON.stringify(existingBlogDetails));
    toggleModal(true);
  };
  useEffect(() => {}, []);

  const handleModalClick = e => {
    toggleModal(false);
    props.history.push("/dashboard");
  };

  return (
    <div className="whole-container">
      <div className="container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <Row className="each-row"></Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  label={"Blog Name"}
                  name="name"
                  control={control}
                  id={"outlined-full-width"}
                  width={310}
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
                  width={310}
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
      <Modal isOpen={isModalOpen} dialogMessage={"Blog Created Successfully"}>
        <SubmitButton
          label="ok"
          className="modal-button"
          onClick={handleModalClick}
        ></SubmitButton>
      </Modal>
    </div>
  );
};

export default CreateBlog;
