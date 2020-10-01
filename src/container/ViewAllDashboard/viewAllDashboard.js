import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Cards, SubmitButton } from "../../component/index";
import { Header } from "../../component/index";

const ViewAllDashboard = props => {
  const [blogDetails, setblogDetails] = useState([]);

  const history = useHistory();
  useEffect(() => {
    // localStorage.setItem("blog_details", JSON.stringify(sampleBlog));
    setblogDetails(JSON.parse(localStorage.getItem("blog_details")));
  }, []);

  const handleBlog = (i, blogDetails) => {
    console.log("key", i);
    localStorage.setItem("view_blog", JSON.stringify(blogDetails));
    history.push(`/viewBlog/${i}`);
  };

  const handleCreateBlog = () => {
    history.push(`/createBlog`);
  };
  const handleViewMyDashboard = () => {
    history.push("/dashboard");
  };

  const viewClass = () => {
    if (!blogDetails) {
      return (
        <div>
          <div>
            <h1 className="title"> Wow, such Empty! Please add some blogs</h1>;
          </div>
          <Row className="no-blogs">
            <br /> <br />
            <Col>
              <Row className="add-blogs">
                <SubmitButton
                  label="View My Blogs"
                  variant="outlined"
                  color="primary"
                  onClick={handleViewMyDashboard}
                ></SubmitButton>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="blogs">
        <Row>
          {blogDetails.map((blogDetail, index) => (
            <Col className="column">
              {" "}
              <Cards
                name={blogDetail.name}
                description={blogDetail.description}
                key={blogDetail.id}
                onClickView={() => {
                  handleBlog(blogDetail.id, blogDetail);
                }}
              ></Cards>
            </Col>
          ))}
          <Row className="add-blogs">
            <SubmitButton
              label="Add Blog"
              variant="outlined"
              color="primary"
              onClick={handleCreateBlog}
            >
              Add Blog
            </SubmitButton>
            <SubmitButton
              label="View My Blogs"
              variant="outlined"
              color="primary"
              onClick={handleViewMyDashboard}
            ></SubmitButton>
          </Row>
        </Row>
      </div>
    );
  };

  return (
    <div className="main">
      <Header />
      {viewClass()}
    </div>
  );
};

export default ViewAllDashboard;
