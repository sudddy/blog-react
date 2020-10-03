import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  Header,
  InputField,
  Modal,
  SubmitButton,
  InputMultiLine
} from "../../component/index";

import { addBlog } from "../../store/blog";
import "./createBlog.scss";

const CreateBlog = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const { handleSubmit, control, register } = useForm({
    defaultValues: ""
  });

  async function onSubmit(formValues) {
    let userId = JSON.parse(localStorage.getItem("user_details"));
    formValues.userId = userId;
    await props.addBlog(formValues);
  }

  useEffect(() => {
    if (props.blogDetails.hasOwnProperty("added_blog")) {
      if (props.blogDetails.added_blog._id) {
        setDialogMessage("Blog Created Successfully");
        toggleModal(true);
      } else {
        setDialogMessage("Blog creation failed. Please try again");
        toggleModal(true);
      }
    }
  }, [props]);

  const handleModalClick = e => {
    toggleModal(false);
    props.history.push("/dashboard");
  };

  return (
    <div className="whole-create">
      <Header />
      <div className="container create-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography className="heading" variant="h3">
            {" "}
            Create Blog
          </Typography>
          <div className="form-fields">
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  label={"Blog Name"}
                  name="blogName"
                  control={control}
                  id={"outlined-full-width"}
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="blogDescription"
                  label={"Blog Descrition"}
                  control={control}
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputMultiLine}
                  label={"Blog Content"}
                  name="blogContent"
                  control={control}
                  fullWidth
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
      <Modal isOpen={isModalOpen} dialogMessage={dialogMessage}>
        <SubmitButton
          label="ok"
          className="modal-button"
          onClick={handleModalClick}
        ></SubmitButton>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { addBlog }
)(CreateBlog);
