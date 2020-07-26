import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { startListBlogsWithCategoriesAndTags } from "../../redux/actions/blogActions";
import ShowAllCategories from "../blogs/ShowAllCategories";
import RelatedBlogCard from "../blogs/RelatedBlogCard";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MUILink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

function Home({ isAuthenticated }) {
  const [state, setState] = useState("");
  useEffect(() => {
    startListBlogsWithCategoriesAndTags(0, 3).then((data) => {
      if (data.error) {
        console.log(err);
      } else {
        setState({
          blogs: data.blogs,
          categories: data.categories,
          tags: data.tags,
          totalBlogs: data.size,
        });
      }
    });
  }, []);

  const { blogs, categories, tags } = state;
  const background = "/crux.jpg";
  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item style={{ paddingTop: "12vh" }}>
          <Typography
            variant="h1"
            align="center"
          >{`Get to the CRUX`}</Typography>
          <Typography
            variant="h1"
            align="center"
          >{`of what matters to you.`}</Typography>
          <Typography
            variant="h2"
            align="center"
            style={{ paddingTop: "3vh" }}
          >{`What's Trending`}</Typography>
          <Grid style={{ maxWidth: "70vw" }}>
            {state && (
              <ShowAllCategories
                categories={categories.slice(0, 30)}
                size="medium"
                color="default"
                variant="default"
                avatar={true}
              />
            )}
          </Grid>
        </Grid>
        <Grid item style={{ paddingTop: "7vh" }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Link href={isAuthenticated ? "/blogs" : "/signup"}>
                <Button
                  size="large"
                  style={{ backgroundColor: "rgb(16, 179, 55)", width: "30vw" }}
                >
                  Get Started
                </Button>
              </Link>
            </Grid>
            {!isAuthenticated && (
              <>
                <Grid item>
                  <Typography variant="subtitle2" align="center">
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Link href="/signin">
                    <MUILink
                      style={{
                        textDecoration: "none",
                        color: "rgb(6, 97, 28)",
                      }}
                    >
                      <Typography>Sign In</Typography>
                    </MUILink>
                  </Link>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item style={{ width: "85%", paddingTop: "3vh" }}>
          <Paper elevation={0} style={{ padding: "50px" }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs={5}>
                <img
                  style={{
                    maxHeight: "420px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={`/design community.svg`}
                  alt="community"
                />
              </Grid>
              <Grid item xs={7}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={10}
                >
                  <Grid item>
                    {!isAuthenticated && (
                      <Typography variant="h4" align="center">
                        Join an active community of tech savvy cruxians and be
                        part of a community in the making.
                      </Typography>
                    )}
                    {isAuthenticated && (
                      <Typography variant="h4" align="center">
                        Hey there fellow Cruxian!!! You are an active part of a tech
                        savvy community. Explore around and feel at home.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item style={{ paddingTop: "15vh" }}>
                    <Link href={isAuthenticated ? "/blogs" : "/signup"}>
                      <Button
                        size="large"
                        style={{
                          backgroundColor: "rgb(16, 179, 55)",
                          width: "15vw",
                        }}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item style={{ width: "85%" }}>
          <Paper elevation={0} style={{ padding: "50px" }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <Grid item xs={7}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={10}
                >
                  <Grid item>
                    <Typography variant="h4" align="center">
                      Share your ideas, opinions, learnings and guide other
                      cruxians through their journey
                    </Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: "15vh" }}>
                    <Link href="/Learn More">
                      <Button
                        size="large"
                        style={{
                          backgroundColor: "rgb(133, 117, 13)",
                          width: "15vw",
                        }}
                      >
                        Learn More
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <img
                  style={{
                    maxHeight: "420px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={`/share opinion.svg`}
                  alt="community"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Typography align="center" variant="h2" style={{ padding: "5vh" }}>
            What's New
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={3}
          >
            {state && <RelatedBlogCard relatedBlogs={blogs} />}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({ isAuthenticated: !!state.user.token });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/* style={{
    backgroundImage: `url(${background})`,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    //backgroundAttachment: "fixed",
  }} */
