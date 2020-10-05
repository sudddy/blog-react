import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Cards, SubmitButton } from "../../component/index";
import { Header } from "../../component/index";
import { fetchBlogList } from "../../store/blog";
import { connect } from "react-redux";

const ViewAllDashboard = props => {
  const history = useHistory();
  const [url, setUrl] = useState("");

  useEffect(() => {
    props.fetchBlogList();
    setUrl(window.location.host);
  }, []);

  const handleBlog = i => {
    localStorage.setItem("ViewBlogId", i);
    history.push(`/viewBlog/${i}`);
  };

  const handleCreateBlog = () => {
    history.push(`/createBlog`);
  };
  const handleViewMyDashboard = () => {
    history.push("/dashboard");
  };

  const viewAllBlogs = () => {
    if (Object.keys(props.blogDetails).length === 0) {
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
          {props.blogDetails.blog_list.map((blogDetail, index) => (
            <Col className="column">
              {" "}
              <Cards
                name={blogDetail.blogName}
                description={blogDetail.blogDescription}
                key={blogDetail._id}
                url={url + "/viewBlog/" + blogDetail._id}
                onClickView={() => {
                  handleBlog(blogDetail._id);
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
                label="View My Blogs"
                variant="outlined"
                color="primary"
                onClick={handleViewMyDashboard}
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
      {viewAllBlogs()}
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return state;
};

export default connect(
  mapStateToProps,
  { fetchBlogList }
)(ViewAllDashboard);
