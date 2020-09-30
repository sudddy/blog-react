import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Cards, SubmitButton } from "../../component/index";
import { Header } from "../../component/index";
import "./dashboard.scss";

const Dashboard = props => {
  const [blogDetails, setblogDetails] = useState([]);

  const history = useHistory();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let blogs = JSON.parse(localStorage.getItem("blog_details"));
    let finalBlogs = [];
    if (blogs !== null) {
      finalBlogs = blogs.filter(blog => blog.userId === user[0].userId);
    }
    setblogDetails(finalBlogs);
  }, []);

  const handleViewBlog = (i, blogDetails) => {
    localStorage.setItem("view_blog", JSON.stringify(blogDetails));
    history.push(`/viewBlog/${i}`);
  };

  const handleEditBlog = (i, blogDetails) => {
    localStorage.setItem("edit_blog", JSON.stringify(blogDetails));
    history.push(`/editBlog`);
  };

  const handleCreateBlog = () => {
    history.push(`/createBlog`);
  };

  const handleViewAll = () => {
    history.push("/viewAll");
  };

  const viewClass = () => {
    if (blogDetails.length === 0) {
      return (
        <div className="whole-container">
          <Row className="no-blogs">
            <Col lg={12}>
              <h4> No blogs to dislay</h4>
            </Col>
            <br />
            <Col>
              <SubmitButton
                label="Add Blog"
                variant="outlined"
                color="primary"
                onClick={handleCreateBlog}
              >
                Add Blog
              </SubmitButton>
              <SubmitButton
                label="View all Blogs"
                variant="outlined"
                color="primary"
                onClick={handleViewAll}
              ></SubmitButton>
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
                edit={"1"}
                name={blogDetail.name}
                description={blogDetail.description}
                key={blogDetail.id}
                onClickView={() => {
                  handleViewBlog(blogDetail.id, blogDetail);
                }}
                onClickEdit={() => {
                  handleEditBlog(blogDetail.id, blogDetail);
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
              label="View all Blogs"
              variant="outlined"
              color="primary"
              onClick={handleViewAll}
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

export default Dashboard;
