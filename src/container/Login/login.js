/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { InputField, Modal, SubmitButton } from "../../component/index";
import "./login.scss";
import { Typography } from "@material-ui/core";

const Login = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [Login, setLogin] = useState(false);
  const [dialogMessage, setdialogMessage] = useState("");
  const { handleSubmit, control } = useForm({
    defaultValues: ""
  });

  useEffect(() => {}, [props]);

  async function onSubmit(formValues) {
    console.log(formValues);
    let loginDetails = JSON.parse(localStorage.getItem("user_details"));
    if (loginDetails !== null && loginDetails !== undefined) {
      // eslint-disable-next-line array-callback-return
      var loggedInUser = loginDetails.filter(user => {
        if (
          user.email === formValues.email &&
          user.password === formValues.password
        ) {
          return user;
        }
      });

      if (loggedInUser.length) {
        console.log("user", loggedInUser);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        localStorage.setItem("loggedUsedId", parseInt(loggedInUser[0].userId));
        toggleModal(true);
        setdialogMessage("Logged in Successfully");
        setLogin(true);
      } else {
        toggleModal(true);
        setdialogMessage("Email/ Password is invalid");
      }
    }
  }

  const handleModalClick = e => {
    toggleModal(false);
    if (Login) {
      props.history.push("/dashboard");
    }
  };

  const handleSignup = () => {
    props.history.push("/signup");
  };

  return (
    <div className="whole-login">
      <div className="container login-container">
        <Typography className="heading" variant="h3">
          {" "}
          Login
        </Typography>
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-login-fields">
            <Row className="each-row"></Row>

            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="email"
                  label={"Email Id"}
                  control={control}
                  width="290px"
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
                  width="290px"
                />
              </Col>
            </Row>

            <SubmitButton
              control={control}
              type="submit"
              label=" Login"
            ></SubmitButton>
          </div>
          <div>
            <br />
          </div>
        </form>

        <Row>
          <div className="signup">
            <Typography className="s-text">New to the blog?</Typography>
            <a onClick={handleSignup}>signup</a>
          </div>
          <br />
          <br />
        </Row>

        <Modal isOpen={isModalOpen} dialogMessage={dialogMessage}>
          <SubmitButton label="ok" onClick={handleModalClick}></SubmitButton>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
