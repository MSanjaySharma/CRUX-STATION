import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  startListBlogs,
  startUpdateBlog,
  startRemoveBlogs,
} from "../../../../redux/actions/blogActions";
import ListAllBlogs from "./ListAllBlogs";
import QuillBlogUpdate from "./QuillBlogUpdate";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CustomizedSnackbars from "../../../../utils/components/SnackBar";

const BlogUpdate = ({ startListBlogs, startRemoveBlogs, blogs }) => {
  const [openEditBlog, setOpenEditBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});
  const [state, setState] = useState({ message: "", error: "" });

  useEffect(() => {
    startListBlogs();
  }, []);

  useEffect(() => {
    startListBlogs();
  }, [openEditBlog]);

  useEffect(() => {
    if (!state.message && !state.error) {
      startListBlogs();
    }
  }, [state]);

  const changeState = (message, error) => {
    setState({ ...state, message, error });
  };

  return (
    <>
      {!openEditBlog && (
        <>
          <Typography variant="h6" gutterBottom={true} align="center">
            BLOG UPDATE
          </Typography>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <ListAllBlogs
              blogs={blogs}
              setOpenEditBlog={setOpenEditBlog}
              setSelectedBlog={setSelectedBlog}
              startRemoveBlogs={startRemoveBlogs}
              changeState={changeState}
            />
          </Grid>
        </>
      )}

      {openEditBlog && (
        <QuillBlogUpdate
          setOpenEditBlog={setOpenEditBlog}
          setSelectedBlog={setSelectedBlog}
          blog={selectedBlog}
        />
      )}

      {blogs.length < 3 && <div style={{ paddingBottom: "58.5vh" }}></div>}

      <CustomizedSnackbars
        changeState={changeState}
        message={state.message}
        error={state.error}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.filter(
    (blog) => blog.postedBy._id === state.user.userInfo._id
  ),
});

const mapDispatchToProps = {
  startListBlogs,
  startUpdateBlog,
  startRemoveBlogs,
};

export default compose(
  //withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(BlogUpdate);
