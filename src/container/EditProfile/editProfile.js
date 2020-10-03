import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Header, InputField, Modal, SubmitButton } from "../../component/index";
import "./editProfile.scss";
import { connect } from "react-redux";
import { editProfile, getUser } from "../../store/user";

const EditProfile = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [field, setField] = useState(false);
  const [update, setUpdate] = useState(false);

  const { handleSubmit, control, setValue, register } = useForm({
    defaultValues: {}
  });

  useEffect(() => {
    if (props.user.hasOwnProperty("logged_user")) {
      props.getUser(props.user.logged_user.user._id);
      setField(true);
    }
  }, []);

  useEffect(() => {
    if (props.user.hasOwnProperty("logged_user") && field) {
      setValue("firstName", props.user.logged_user.user.firstName);
      setValue("lastName", props.user.logged_user.user.lastName);
      setField(false);
    }
  }, [props]);

  useEffect(() => {
    if (update) {
      if (props.user.hasOwnProperty("user")) {
        if (props.user.user.n === 1) {
          toggleModal(true);
          setDialogMessage("updated Successfully");
          setUpdate(false);
        }
      }
    }
  }, [update]);

  const handleModalClick = e => {
    toggleModal(false);
    props.history.push("/dashboard");
  };

  async function onSubmit(formValues) {
    formValues._id = props.user.logged_user.user._id;
    await props.editProfile(formValues);
    setUpdate(true);
  }
  // const displayPicture = () => {
  //   storedImg = localStorage.getItem("img");
  //   if (!storedImg) {
  //     return <h5> Please upload image to view</h5>;
  //   }
  //   return <Image src={storedImg} width="300px" height="300px" />;
  // };

  return (
    <div className="whole-edit">
      <Header />

      <div className="container edit-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography className="heading" variant="h3">
            {" "}
            Edit Profile
          </Typography>

          {/* <Row>{displayPicture()}</Row> */}

          <div className="form-fields">
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="firstName"
                  label={"First Name"}
                  ref={register}
                  control={control}
                  width="290px"
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="lastName"
                  ref={register}
                  label={"Last Name"}
                  control={control}
                  width="290px"
                />
              </Col>
            </Row>
            <br />
            <Row className="each-row">
              <Col>
                <input
                  type="file"
                  name="img"
                  ref={register}
                  control={control}
                />
              </Col>
            </Row>

            <Row className="each-row">
              <Col className="sub-button">
                <SubmitButton
                  control={control}
                  type="submit"
                  label=" Edit Profile"
                ></SubmitButton>
              </Col>
            </Row>
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen} dialogMessage={dialogMessage}>
        <SubmitButton label="ok" onClick={handleModalClick}></SubmitButton>
      </Modal>
    </div>
  );
};
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { editProfile, getUser }
)(EditProfile);
