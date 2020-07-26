import axios from "../../config/axios";
import queryString from "query-string";
import { getCookie } from "../../utils/functions/cookie";
import jwtError from "../../utils/functions/jwtError";

//SET BLOGS
export const setBlogs = (blogs) => {
  return { type: "SET_BLOGS", payload: blogs };
};

export const updateBlog = (blog) => {
  return { type: "UPDATE_BLOGS", payload: blog };
};

export const deleteBlog = (id) => {
  return { type: "DELETE_BLOGS", payload: id };
};

//LIST BLOGS
export const startListBlogs = () => {
  return (dispatch) => {
    axios
      .get("/blogs")
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          console.log(response.data.error);
        } else {
          //console.log(response.data);
          dispatch(setBlogs(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//UPDATE BLOG
export const startUpdateBlog = (blog, slug, changeState) => {
  return (dispatch) => {
    axios
      .put(`/blog/${slug}`, blog, {
        headers: {
          Authorization: getCookie("token", ""),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          console.log(response.data);
          changeState("", response.data.error);
        } else {
          dispatch(updateBlog(response.data));
          changeState("Blog updated succesfully", "");
        }
      })
      .catch((error) => {
        //console.log(error.response);
        if (error.response.status === 401) {
          jwtError(dispatch);
        } else {
          changeState("", error.response.data.error);
        }
      });
  };
};

//REMOVE BLOG
export const startRemoveBlogs = (slug, changeState) => {
  return (dispatch) => {
    axios
      .delete(`/blog/${slug}`, {
        headers: {
          Authorization: getCookie("token", ""),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          console.log(response.data);
          changeState("", response.data.error);
        } else {
          console.log(response.data);
          dispatch(deleteBlog(response.data._id));
          changeState("Blog deleted succesfully", "");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          jwtError(dispatch);
        } else {
          changeState("", error.response.data.error);
        }

        //console.log(error.response);
      });
  };
};

//CREATE BLOG
export const startCreateBlog = (blog, changeState) => {
  return (dispatch) => {
    axios
      .post("/blog", blog, {
        headers: {
          Authorization: getCookie("token", ""),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          changeState("", response.data.error);
        } else {
          changeState("Blog created succesfully", "");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          jwtError(dispatch);
        } else {
          changeState("", error.response.data.error);
        }
        //console.log(error.response);
      });
  };
};

//LIST BLOGS ALONG WITH CATEGORIES AND TAGS
export const startListBlogsWithCategoriesAndTags = (skip, limit) => {
  return axios
    .post("/blogs-categories-tags", { skip, limit })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

//GET SINGLE BLOG
export const startListSingleBlog = (slug) => {
  return axios
    .get(`/blog/${slug}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

//GET RELATED BLOGS
export const startListRelatedBlogs = (blogDetails) => {
  return axios
    .post("/blogs/related", blogDetails)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

//SEARCH BLOGS
export const blogSearch = (params) => {
  let query = queryString.stringify(params);
  return axios
    .get(`/blogs/search?${query}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};


