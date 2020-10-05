import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Cards, Header, SubmitButton } from "../../component/index";
import "./dashboard.scss";
import { fetchBlogByUserId } from "../../store/blog";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const Dashboard = props => {
  const history = useHistory();
  const [url, setUrl] = useState("");

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("user_details"));
    props.fetchBlogByUserId(userId._id);
    setUrl(window.location.host);
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
      return <CircularProgress></CircularProgress>;
    }

    if (props.blogDetails.hasOwnProperty("blog_list")) {
      if (props.blogDetails.blog_list.length === 0) {
        return (
          <div>
            <div>
              <h1 className="title"> Wow, such Empty! Please add some blogs</h1>
              ;
            </div>
            <Row className="no-blogs">
              <div className="create">
                <SubmitButton
                  label="Add Blog"
                  variant="outlined"
                  color="primary"
                  onClick={handleCreateBlog}
                >
                  Add Blog
                </SubmitButton>
              </div>
              <div className="view">
                <SubmitButton
                  label="View all Blogs"
                  variant="outlined"
                  color="primary"
                  onClick={handleViewAll}
                ></SubmitButton>
              </div>
            </Row>
          </div>
        );
      }
    }
    return (
      <div className="blogs">
        <Row>
          {props.blogDetails.blog_list.map((blogDetail, index) => (
            <Col className="column" key={blogDetail._id}>
              {" "}
              <Cards
                edit={"1"}
                name={blogDetail.blogName}
                description={blogDetail.blogDescription}
                key={blogDetail._id}
                url={url + "/viewBlog/" + blogDetail._id}
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
            <div className="create">
              <SubmitButton
                label="Add Blog"
                variant="outlined"
                color="primary"
                onClick={handleCreateBlog}
              >
                Add Blog
              </SubmitButton>
            </div>
            <div className="view">
              <SubmitButton
                label="View all Blogs"
                variant="outlined"
                color="primary"
                onClick={handleViewAll}
              ></SubmitButton>
            </div>
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
