import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import background from "../../assets/blog.jpeg"; // with import
import { InputField, SubmitButton } from "../../component/index";
import { Modal } from "../../component/index";
import "./signup.scss";

const Signup = props => {
  const [isModalOpen, toggleModal] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: ""
  });

  async function onSubmit(formValues) {
    let existingUserDetails = JSON.parse(localStorage.getItem("user_details"));

    if (existingUserDetails === null || existingUserDetails === undefined) {
      existingUserDetails = [];
    }

    let id = parseInt(localStorage.getItem("userID"));
    if (Number.isNaN(id)) {
      id = 1000;
      localStorage.setItem("userID", 1000);
    }
    id += 1;
    console.log("id check", id);
    formValues.userId = id;
    existingUserDetails.push(formValues);

    localStorage.setItem("userID", id);
    localStorage.setItem("user_details", JSON.stringify(existingUserDetails));
    toggleModal(true);
  }

  const handleModalClick = e => {
    toggleModal(false);
    props.history.push("/login");
  };

  return (
    <div className="whole-container">
      <Image src={background} className="img-background" />

      <div className="container signup-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <Row className="each-row"></Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  label={"First Name"}
                  name="firstName"
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
                  name="lastName"
                  label={"Last Name"}
                  control={control}
                  width={310}
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="email"
                  label={"Email Id"}
                  control={control}
                  width={310}
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="password"
                  label={"Password"}
                  type={"password"}
                  control={control}
                  width={310}
                />
              </Col>
            </Row>
            <Row className="each-row">
              <Col className="sub-button">
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
      <Modal isOpen={isModalOpen} dialogMessage={"Successfully Registered"}>
        <SubmitButton label="ok" onClick={handleModalClick}></SubmitButton>
      </Modal>
    </div>
  );
};

export default Signup;
