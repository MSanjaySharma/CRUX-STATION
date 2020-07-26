import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//components
import PhotoUpload from "../Blog/PhotoUpload";
import CategoryCheckBox from "../Blog/CategoryCheckBox";
import TagCheckBox from "../Blog/TagCheckBox";
import CustomizedSnackbars from "../../../../utils/components/SnackBar";

//actions
import {
  startUpdateBlog,
  startListSingleBlog,
} from "../../../../redux/actions/blogActions";
import { startGetCategories } from "../../../../redux/actions/categoryActions";
import { startGetTags } from "../../../../redux/actions/tagActions";

//helpers
import useStyles from "../Blog/useStyles";
import { quillModules, quillFormats } from "../Blog/quillHelper";
import LocalStoragePullData from "../Blog/LocalStoragePullData";
import { isServer } from "../../../../utils/functions/isServer";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";

function QuillBlogUpdate({
  blog,
  router,
  categories,
  tags,
  startUpdateBlog,
  startGetCategories,
  startGetTags,
  setOpenEditBlog,
  setSelectedBlog,
}) {
  const initialState = {
    title: LocalStoragePullData("title"),
    photo: undefined,
    categoriesChecked: [],
    tagsChecked: [],
    message: "",
    error: "",
    loading: false,
  };
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const [body, setBody] = useState(LocalStoragePullData("body"));

  const {
    title,
    photo,
    categoriesChecked,
    tagsChecked,
    message,
    error,
    loading,
  } = state;

  useEffect(() => {
    //console.log(blog);
    startListSingleBlog(blog.slug).then((blog) => {
      if (blog.error) {
        console.log(error);
      } else {
        setState({
          title: blog.title,
          photo: blog.photo,
          categoriesChecked: blog.categories.map((category) => category._id),
          tagsChecked: blog.tags.map((tag) => tag._id),
          message: "",
          error: "",
          loading: false,
        });
        setBody(blog.body);
      }
    });
  }, []);

  useEffect(() => {
    startGetCategories();
    startGetTags();
  }, [router]);

  useEffect(() => {
    if (message) {
      reset();
    }
  }, [message]);

  const changeState = (message, error) => {
    setState({ ...state, message, error });
  };

  const reset = () => {
    setState({
      title: "",
      photo: undefined,
      categoriesChecked: [],
      tagsChecked: [],
      message: message,
      error: error,
      loading: false,
    });
    setBody("");
    localStorage.removeItem("title");
    localStorage.removeItem("body");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("photo", photo);
    formData.append("categories", categoriesChecked);
    formData.append("tags", tagsChecked);
    //validate the form
    startUpdateBlog(formData, blog.slug, changeState);
  };

  const handleChange = (e) => {
    const data = e.target.name === "photo" ? e.target.files[0] : e.target.value;
    setState({ ...state, [e.target.name]: data });
    if (!isServer() && e.target.name !== "photo") {
      localStorage.setItem([e.target.name], JSON.stringify(data));
    }
  };

  const handleBodyChange = (e) => {
    setBody(e);
    if (!isServer()) {
      localStorage.setItem("body", JSON.stringify(e));
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="center"
              alignContent="center"
              wrap="nowrap"
            >
              <Grid item style={{ width: "100%" }}>
                <form onSubmit={handleSubmit}>
                  <Grid
                    container
                    spacing={3}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="nowrap"
                  >
                    <Grid item style={{ width: "100%" }}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item xs={1}>
                          <Button
                            onClick={() => {
                              setOpenEditBlog(false);
                              setSelectedBlog({});
                            }}
                          >
                            <ArrowBackIosIcon />
                            <Typography>BACK</Typography>
                          </Button>
                        </Grid>
                        <Grid item xs={11}>
                          <TextField
                            id="title"
                            name="title"
                            label="Title of Blog"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={handleChange}
                            required
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid style={{ width: "100%" }} item>
                      <ReactQuill
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Start writing something that makes sense... don't knock out peoples head instead"
                        value={body}
                        onChange={handleBodyChange}
                      />
                    </Grid>

                    <Grid style={{ width: "100%" }} item>
                      <Grid container spacing={2}>
                        <Grid item xs={10}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                          >
                            PUBLISH UPDATED BLOG
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            style={{ width: "100%" }}
                            variant="contained"
                            color="secondary"
                            onClick={reset}
                          >
                            CLEAR ALL
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <PhotoUpload handleChange={handleChange} />
              </Grid>
              <Grid item>
                <CategoryCheckBox
                  categories={categories}
                  state={state}
                  setState={setState}
                  categoriesChecked={categoriesChecked}
                />
              </Grid>

              <Grid item>
                <TagCheckBox
                  tags={tags}
                  state={state}
                  setState={setState}
                  tagsChecked={tagsChecked}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <CustomizedSnackbars
        changeState={changeState}
        message={message}
        error={error}
        reset={reset}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  tags: state.tags,
});

const mapDispatchToProps = {
  startUpdateBlog,
  startGetCategories,
  startGetTags,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(QuillBlogUpdate);
