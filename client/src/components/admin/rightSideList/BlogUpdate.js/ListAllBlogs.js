import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import randomColor from "../../../../utils/functions/randomColor";
import { API } from "../../../../../config";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({}));

function ListAllBlogs({
  blogs,
  setSelectedBlog,
  setOpenEditBlog,
  startRemoveBlogs,
  changeState,
}) {
  const classes = useStyles();
  return (
    <>
      {blogs.map((blog, i) => (
        <Grid key={i} item>
          <Card style={{ minWidth: 275 }}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Blog written by user"
                  src={`${API}/users/photo/${blog.postedBy.username}`}
                  alt={blog.postedBy.name.toUpperCase()}
                  style={{ backgroundColor: randomColor() }}
                />
              }
              title={blog.title}
              subheader={`${moment(blog.updatedAt).format(
                "MMMM D, YYYY"
              )} | Written By: ${blog.postedBy.name}`}
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
              <Button
                color="primary"
                onClick={() => {
                  setSelectedBlog(blog);
                  setOpenEditBlog(true);
                }}
                style={{ marginLeft: "auto" }}
                aria-label="update blog"
              >
                <CreateIcon />
                <Typography variant="body2">UPDATE BLOG</Typography>
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  startRemoveBlogs(blog.slug, changeState);
                }}
                aria-label="delete"
              >
                <DeleteIcon />
                <Typography variant="body2">DELETE BLOG</Typography>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}

export default ListAllBlogs;
