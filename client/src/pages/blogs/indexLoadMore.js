import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/pageoutline/Layout";
import { startListBlogsWithCategoriesAndTags } from "../../redux/actions/blogActions";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import PaperList from "../../components/blogs/PaperList";
import ShowAllCategories from "../../components/blogs/ShowAllCategories";
import ShowAllTags from "../../components/blogs/ShowAllTags";
import StickyFooter from "../../components/pageoutline/Footer/Footer";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    startListBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const LoadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <Button
          variant="outlined"
          style={{ width: "300px" }}
          onClick={loadMore}
        >
          Load more
        </Button>
      )
    );
  };

  return (
    <>
      <Layout>
        <main>
          <Typography align="center" gutterBottom={true} variant="h4">
            PROGRAMMING BLOGS
          </Typography>
          <ShowAllCategories categories={categories} />
          <ShowAllTags tags={tags} />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            style={{ margin: "0px -16px" }}
          >
            <PaperList blogs={blogs} />
            <PaperList blogs={loadedBlogs} />
            <Grid item>
              <LoadMoreButton />
            </Grid>
          </Grid>
        </main>
      </Layout>
      <StickyFooter />
    </>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 10;
  return startListBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(err);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default Blogs;
