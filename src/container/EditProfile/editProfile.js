import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Header, InputField, Modal, SubmitButton } from "../../component/index";
import "./editProfile.scss";

const EditProfile = props => {
  const [isModalOpen, toggleModal] = useState(false);
  const [dialogMessage, setdialogMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [imageData, setImageData] = useState("");
  var storedImg;
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
    var fileReader = new FileReader();

    if (formValues.img.length) {
      const handleFileRead = fileReader => {
        const content = fileReader.target.result;
        localStorage.setItem("img", content);
      };

      fileReader.onloadend = handleFileRead;
      fileReader.readAsDataURL(formValues.img[0]);
    }

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

  const displayPicture = () => {
    storedImg = localStorage.getItem("img");
    if (!storedImg) {
      return <h5> Please upload image to view</h5>;
    }
    return <Image src={storedImg} width="300px" height="300px" />;
  };

  return (
    <div className="whole-edit">
      <Header />

      <div className="container edit-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography className="heading" variant="h3">
            {" "}
            Edit Profile
          </Typography>

          <Row>{displayPicture()}</Row>

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

export default EditProfile;
