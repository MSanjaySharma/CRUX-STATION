import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import renderHTML from "react-render-html";
import moment from "moment";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import MUILink from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { startLikeUnlikeBlog } from "../../redux/actions/userActions";

import useDarkMode from "use-dark-mode";

import { API } from "../../../config";

function PaperList({
  blogs,
  isAuthenticated,
  likedPosts,
  startLikeUnlikeBlog,
}) {
  const { value: isDark } = useDarkMode();

  const [openDiag, setOpenDiag] = useState(false);

  const handleLikeUnlike = (blogId) => {
    startLikeUnlikeBlog(blogId);
  };

  const handleDiag = (shouldLogin) => {
    if (shouldLogin) {
      setOpenDiag(false);
      Router.push("/signin");
    } else {
      setOpenDiag(false);
    }
  };

  return (
    <>
      {blogs.map((blog, i) => (
        <Grid key={i} item style={{ width: "100%" }}>
          <Paper
            elevation={3}
            style={{ maxWidth: "1200px", margin: "auto", padding: "16px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Link href={`/blogs/${blog.slug}`}>
                  <MUILink
                    style={
                      isDark
                        ? { textDecoration: "none", color: "white" }
                        : { textDecoration: "none", color: "black" }
                    }
                  >
                    <Typography variant="h6">{blog.title}</Typography>
                  </MUILink>
                </Link>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                {blog.categories.map((category, i) => (
                  <Chip
                    key={i}
                    label={`${category.name}`}
                    onClick={() => Router.push(`/categories/${category.slug}`)}
                    size="small"
                    color="primary"
                    variant="outlined"
                    //style={{ marginTop: "2px", marginRight: "5px" }}
                    style={{ borderStyle: "none" }}
                  />
                ))}
                {blog.tags.map((tag, i) => (
                  <Chip
                    key={i}
                    label={`#${tag.name}`}
                    onClick={() => Router.push(`/tags/${tag.slug}`)}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    //style={{ marginTop: "2px", marginRight: "5px" }}
                    style={{ borderStyle: "none" }}
                  />
                ))}
              </Grid>

              <Grid item xs={2}>
                <Paper elevation={10}>
                  <CardMedia
                    style={{
                      height: "150px",
                      width: "100%",
                      borderRadius: "5px",
                    }}
                    image={`${API}/blog/photo/${blog.slug}`}
                    alt={"NO IMAGE"}
                  />
                </Paper>
              </Grid>

              <Grid item xs={10}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item style={{ paddingBottom: "15px" }}>
                    <Paper>
                      <Typography component="span">
                        {renderHTML(blog.excerpt)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item style={{ width: "100%" }}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item>
                        <Typography>
                          Written By:{" "}
                          <Link href={`/profile/${blog.postedBy.username}`}>
                            <a
                              style={
                                isDark
                                  ? { textDecoration: "none", color: "white" }
                                  : { textDecoration: "none", color: "black" }
                              }
                            >
                              {blog.postedBy.name}
                            </a>
                          </Link>{" "}
                          | Publised {moment(blog.createdAt).fromNow()}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          {!isAuthenticated && (
                            <IconButton
                              onClick={() => {
                                setOpenDiag(true);
                              }}
                              color="secondary"
                            >
                              <FavoriteBorderIcon />
                            </IconButton>
                          )}

                          {isAuthenticated ? (
                            likedPosts.includes(blog._id) ? (
                              <IconButton
                                onClick={() => handleLikeUnlike(blog._id)}
                                color="secondary"
                              >
                                <Favorite />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => handleLikeUnlike(blog._id)}
                                color="secondary"
                              >
                                <FavoriteBorderIcon />
                              </IconButton>
                            )
                          ) : (
                            ""
                          )}

                          <IconButton color="secondary">
                            <ShareIcon />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item>
                        {" "}
                        <Link href={`/blogs/${blog.slug}`}>
                          <Button color="primary">
                            <Typography style={{ textTransform: "none" }}>
                              Read More
                            </Typography>
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
      <Dialog
        open={openDiag}
        onClose={() => handleDiag(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Liked the post you saw?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Login in to like the post. Show your appreciation towards the post.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDiag(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDiag(true);
            }}
            color="secondary"
            autoFocus
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user.token,
  likedPosts: state.user.userInfo.likedPosts,
});

const mapDispatchToProps = { startLikeUnlikeBlog };

export default connect(mapStateToProps, mapDispatchToProps)(PaperList);
