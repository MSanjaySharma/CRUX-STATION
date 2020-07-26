import Layout from "../../components/pageoutline/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { API } from "../../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import {
  startListSingleBlog,
  startListRelatedBlogs,
} from "../../redux/actions/blogActions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ShowAllCategories from "../../components/blogs/ShowAllCategories";
import ShowAllTags from "../../components/blogs/ShowAllTags";
import RelatedBlogCard from "../../components/blogs/RelatedBlogCard";
import DisqusThread from "../../components/comments/disqusThread";
import StickyFooter from "../../components/pageoutline/Footer/Footer";

import useDarkMode from "use-dark-mode";

const SingleBlog = ({ blog }) => {
  const { value: isDark } = useDarkMode(true);

  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const loadRelatedBlogs = () => {
    startListRelatedBlogs({ _id: blog._id, categories: blog.categories }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setRelatedBlogs(data);
        }
      }
    );
  };

  useEffect(() => {
    loadRelatedBlogs();
  }, []);

  return (
    <React.Fragment>
      <Layout>
        <main>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            style={{ margin: "0px -16px" }}
          >
            <Grid item style={{ width: "100%", padding: "0px" }} xs={12}>
              <img
                style={{
                  maxHeight: "435px",
                  width: "100%",
                  objectFit: "cover",
                }}
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
              />
            </Grid>
            <Grid style={{ width: "85%", padding: "0px" }} item xs={12}>
              <Typography
                align="center"
                variant="h4"
                style={{ color: "green" }}
              >
                {blog.title}
              </Typography>
              <Typography align="center">
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
                | Publised {moment(blog.updatedAt).fromNow()}
              </Typography>
              {<ShowAllCategories categories={blog.categories} />}
              {<ShowAllTags tags={blog.tags} />}
            </Grid>
            <Grid style={{ width: "85%", padding: "0px" }} item xs={12}>
              <Typography component="span">{renderHTML(blog.body)}</Typography>
            </Grid>
            <Grid style={{ width: "85%", padding: "0px" }} item xs={12}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <RelatedBlogCard relatedBlogs={relatedBlogs} />
              </Grid>
            </Grid>
            <Grid style={{ width: "85%", paddingTop: "30px" }} item xs={12}>
              <DisqusThread
                id={blog._id}
                title={blog.title}
                path={`/blog/${blog.slug}`}
              />
            </Grid>
          </Grid>
        </main>
      </Layout>
      <StickyFooter />
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return startListSingleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;
