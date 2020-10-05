import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { InputField, Modal, SubmitButton } from "../../component/index";
import "./signup.scss";
import { registerUser } from "../../store/user";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { ErrorMessage } from "@hookform/error-message";

const Signup = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [dialogMessage, setDialogMessage] = useState();

  const { handleSubmit, control, register, errors } = useForm({
    defaultValues: ""
  });

  async function onSubmit(formValues) {
    await props.registerUser(formValues);
  }

  useEffect(() => {
    if (props.user.hasOwnProperty("signup")) {
      toggleModal(true);
      setDialogMessage(props.user.signup.message);
    }
  }, [props]);

  const handleModalClick = e => {
    toggleModal(false);
    if (props.user.signup.code === "10") {
      props.history.push("/login");
    }
  };

  return (
    <div className="whole-signup">
      <div className="container signup-container">
        <Typography className="heading" variant="h4">
          {" "}
          Sign up
        </Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  label={"First Name"}
                  name="firstName"
                  control={control}
                  rules={{ required: true }}
                  id={"outlined-full-width"}
                  width={290}
                />
              </Col>
              <ErrorMessage
                errors={errors}
                name="firstName"
                message="FirstName is required"
              />
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="lastName"
                  rules={{ required: true }}
                  label={"Last Name"}
                  control={control}
                  width={290}
                />
              </Col>
              <ErrorMessage
                errors={errors}
                name="lastName"
                message="LastName is required"
              />
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
                  rules={{ required: true }}
                  control={control}
                  width={290}
                />
              </Col>
              <ErrorMessage
                errors={errors}
                name="email"
                message="Email is required"
              />
            </Row>
            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="password"
                  label={"Password"}
                  type={"password"}
                  rules={{ required: true }}
                  control={control}
                  width={290}
                />
              </Col>
              <ErrorMessage
                errors={errors}
                name="password"
                message="Password is required"
              />
            </Row>
            <Row className="each-row">
              <Col className="sub-button">
                <SubmitButton
                  className={props.className}
                  color="primary"
                  variant="contained"
                  size="large"
                  control={control}
                  type="submit"
                  label="Register"
                >
                  Submit
                </SubmitButton>
              </Col>
            </Row>
          </div>
          <div>
            <br />
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
  { registerUser }
)(Signup);
