import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Cards, Header, SubmitButton } from "../../component/index";
import "./dashboard.scss";
import { fetchBlogByUserId } from "../../store/blog";
import { connect } from "react-redux";

const Dashboard = props => {
  const history = useHistory();

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("user_details"));
    props.fetchBlogByUserId(userId._id);
  }, []);

  const handleViewBlog = i => {
    localStorage.setItem("ViewBlogId", i);
    history.push(`/viewBlog/${i}`);
  };

  const handleEditBlog = i => {
    localStorage.setItem("editBlogId", i);
    history.push(`/editBlog/${i}`);
  };

  const handleCreateBlog = () => {
    history.push(`/createBlog`);
  };

  const handleViewAll = () => {
    history.push("/viewAll");
  };

  const viewClass = () => {
    if (!props.blogDetails.hasOwnProperty("blog_list")) {
      return (
        <div>
          <div>
            <h1 className="title"> Wow, such Empty! Please add some blogs</h1>;
          </div>
          <Row className="no-blogs">
            <br /> <br />
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
          {props.blogDetails.blog_list.map((blogDetail, index) => (
            <Col className="column">
              {" "}
              <Cards
                edit={"1"}
                name={blogDetail.blogName}
                description={blogDetail.blogDescription}
                key={blogDetail._id}
                onClickView={() => {
                  handleViewBlog(blogDetail._id);
                }}
                onClickEdit={() => {
                  handleEditBlog(blogDetail._id);
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

const mapStateToProps = state => {
  console.log(state);
  return state;
};

export default connect(
  mapStateToProps,
  { fetchBlogByUserId }
)(Dashboard);
