import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import background from "../../assets/blog.jpeg"; // with import
import { InputField, Modal, SubmitButton } from "../../component/index";

const EditProfile = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [dialogMessage, setdialogMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const { handleSubmit, control, setValue, register } = useForm({
    defaultValues: {}
  });

  useEffect(() => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setCurrentUser(loggedInUser[0]);
    setValue("firstName", loggedInUser[0].firstName);
    setValue("lastName", loggedInUser[0].lastName);
    console.log(loggedInUser[0]);
  }, []);

  async function onSubmit(formValues) {
    console.log(formValues);
    let loginDetails = JSON.parse(localStorage.getItem("user_details"));
    let currentUserDetails;

    if (loginDetails !== null && loginDetails !== undefined) {
      currentUserDetails = loginDetails.map(user => {
        if (user.userId === currentUser.userId) {
          user.firstName = formValues.firstName;
          user.lastName = formValues.lastName;
          return user;
        }
        return user;
      });
    }
    console.log("currrent user detials,", currentUserDetails);
    localStorage.setItem("user_details", JSON.stringify(currentUserDetails));
    setdialogMessage("Profile Edited Successfully");
    toggleModal(true);
  }

  const handleModalClick = e => {
    toggleModal(false);
    props.history.push("/dashboard");
  };

  return (
    <div className="whole-container">
      <div className="container login-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <Row className="each-row"></Row>

            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="firstName"
                  label={"First Name"}
                  ref={register}
                  control={control}
                  width="300px"
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
                  width="300px"
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
          <div>
            <br />
          </div>
        </form>

        <Modal isOpen={isModalOpen} dialogMessage={dialogMessage}>
          <SubmitButton label="ok" onClick={handleModalClick}></SubmitButton>
        </Modal>
      </div>
    </div>
  );
};

export default EditProfile;
