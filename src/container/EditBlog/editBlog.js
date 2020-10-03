import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import {
  Header,
  InputField,
  InputMultiLine,
  Modal,
  SubmitButton
} from "../../component/index";
import "./editBlog.scss";
import { connect } from "react-redux";
import { updateBlog, fetchBlogById } from "../../store/blog";

const EditBlog = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [field, setField] = useState(false);
  const [update, setUpdate] = useState(false);

  const { handleSubmit, control, register, setValue } = useForm({
    defaultValues: ""
  });

  useEffect(() => {
    let editblogId = localStorage.getItem("editBlogId");
    props.fetchBlogById(editblogId);
    setField(true);
  }, []);

  useEffect(() => {
    if (props.blogDetails.hasOwnProperty("blogDetail") && field) {
      setValue("blogName", props.blogDetails.blogDetail.blogName);
      setValue("blogDescription", props.blogDetails.blogDetail.blogDescription);
      setValue("blogContent", props.blogDetails.blogDetail.blogContent);
      setField(false);
    }
  }, [props]);

  useEffect(() => {
    if (update) {
      if (props.blogDetails.hasOwnProperty("updateResult")) {
        if (props.blogDetails.updateResult.n === 1) {
          toggleModal(true);
          setDialogMessage("updated Successfully");
          setUpdate(false);
        }
      }
    }
  }, [update]);

  async function onSubmit(formValues) {
    formValues._id = props.blogDetails.blogDetail._id;
    await props.updateBlog(formValues);
    setUpdate(true);
  }

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
  { updateBlog, fetchBlogById }
)(EditBlog);
