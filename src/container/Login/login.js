/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { InputField, Modal, SubmitButton } from "../../component/index";
import "./login.scss";
import { loginUser } from "../../store/user";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

const Login = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [Login, setLogin] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: ""
  });

  useEffect(() => {
    if (Object.keys(props.user).length > 0) {
      if ("logged_user" in props.user) {
        if (props.user.logged_user.code === "03") {
          setLogin(false);
          toggleModal(true);
          return;
        }
        if (props.user.logged_user.user) {
          localStorage.setItem(
            "user_details",
            JSON.stringify(props.user.logged_user.user)
          );
          setLogin(true);
          toggleModal(true);
        } else {
          setLogin(false);
        }
      }
    }
  }, [props]);

  async function onSubmit(formValues) {
    await props.loginUser(formValues);
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

        <Modal
          isOpen={isModalOpen}
          dialogMessage={
            Login ? "Login successful" : "Email/Password is invalid"
          }
        >
          <SubmitButton label="ok" onClick={handleModalClick}></SubmitButton>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return state;
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
