import React, { useState } from "react";
import moment from "moment";
import { API } from "../../../config";
import Router from "next/router";
import { connect } from "react-redux";
import randomColor from "../../utils/functions/randomColor";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { startLikeUnlikeBlog } from "../../redux/actions/userActions";

function RelatedBlogCard({
  relatedBlogs,
  isAuthenticated,
  likedPosts,
  startLikeUnlikeBlog,
}) {
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
      {relatedBlogs.map((blog, i) => (
        <Grid key={i} item>
          <Card style={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Blog written by user"
                  style={{ backgroundColor: randomColor() }}
                >
                  {blog.postedBy.name[0].toUpperCase()}
                </Avatar>
              }
              title={blog.title}
              subheader={moment(blog.createdAt).format("MMMM D, YYYY")}
            />
            <CardMedia
              style={{ height: 0, paddingTop: "56.25%" }}
              image={`${API}/blog/photo/${blog.slug}`}
              title={blog.title}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {blog.excerpt}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
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

              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <Button
                onClick={() => Router.push(`/blogs/${blog.slug}`)}
                aria-label="read more"
                style={{ marginLeft: "auto" }}
              >
                {" "}
                <Typography variant="body2">Read More</Typography>
                <KeyboardArrowRightIcon />
              </Button>
            </CardActions>
          </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(RelatedBlogCard);
