import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { InputField, Modal, SubmitButton } from "../../component/index";
import "./signup.scss";
import { Typography } from "@material-ui/core";

const Signup = props => {
  const [isModalOpen, toggleModal] = useState(false);

  const { handleSubmit, control, register, errors } = useForm({
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
    <div className="whole-signup">
      <div className="container signup-container">
        <Typography className="heading" variant="h3">
          {" "}
          Sign up
        </Typography>
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
                  ref={register({ required: true })}
                  id={"outlined-full-width"}
                  width={290}
                />
                {errors.firstName && (
                  <span role="alert">This field is required</span>
                )}
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="lastName"
                  ref={register({ required: true })}
                  label={"Last Name"}
                  control={control}
                  width={290}
                />
                {errors.lastName && (
                  <span role="alert">This field is required</span>
                )}
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="email"
                  label={"Email Id"}
                  ref={register({
                    required: "Required",
                    pattern: {
                      value: /^ [A - Z0 -9._ % +-] +@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address"
                    }
                  })}
                  control={control}
                  width={290}
                />
                {errors.email && errors.email.message}
              </Col>
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="password"
                  label={"Password"}
                  type={"password"}
                  ref={register({ required: true })}
                  control={control}
                  width={290}
                />
                {errors.password && (
                  <span role="alert">This field is required</span>
                )}
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
