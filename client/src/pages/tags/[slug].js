import { useState } from "react";
import Layout from "../../components/pageoutline/Layout";
import { startListBlogsOfSingleTag } from "../../redux/actions/tagActions";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import PaperList from "../../components/blogs/PaperList";
import StickyFooter from "../../components/pageoutline/Footer/Footer";

const BlogsRelatedTagList = ({
  blogs,
  tag,
  totalBlogs,
  blogsLimit,
  blogSkip,
  error,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    startListBlogsOfSingleTag(tag.slug, toSkip, limit).then((data) => {
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
        {!tag && (
          <Typography align="center" gutterBottom={true} variant="h4">
            {`No Such Tags exists`}
          </Typography>
        )}
        {tag && (
          <main>
            <Typography align="center" gutterBottom={true} variant="h4">
              {`${tag.name.toUpperCase()}'s RELATED BLOGS`}
            </Typography>
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
        )}

        {!totalBlogs && (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <img src="/empty.png" alt="no blog to display" />
            </Grid>
          </Grid>
        )}
      </Layout>
      <StickyFooter />
    </>
  );
};

BlogsRelatedTagList.getInitialProps = ({ query }) => {
  let skip = 0;
  let limit = 10;
  return startListBlogsOfSingleTag(query.slug, skip, limit).then((data) => {
    if (data.error) {
      return { error: data.error };
      console.log(err);
    } else {
      console.log(data);
      return {
        blogs: data.blogs,
        tag: data.tag,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default BlogsRelatedTagList;
