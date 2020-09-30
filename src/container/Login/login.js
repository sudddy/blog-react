import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import background from "../../assets/blog.jpeg"; // with import
import { InputField, Modal, SubmitButton } from "../../component/index";
import "./login.scss";

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

  return (
    <div className="whole-container">
      <Image src={background} className="img-background" />
      <div className="container login-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <Row className="each-row"></Row>

            <Row className="each-row">
              <Col>
                <Controller
                  as={InputField}
                  name="email"
                  label={"Email Id"}
                  control={control}
                  width="300px"
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
                  width="300px"
                />
              </Col>
            </Row>

            <Row className="each-row">
              <Col className="sub-button">
                <SubmitButton
                  control={control}
                  type="submit"
                  label=" Login"
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

export default Login;
