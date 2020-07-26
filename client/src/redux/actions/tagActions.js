import axios from "../../config/axios";
import { getCookie } from "../../utils/functions/cookie";
import slugify from "slugify";
import jwtError from "../../utils/functions/jwtError";


//SET TAG
export const setTags = (tags) => {
  return { type: "SET_TAGS", payload: tags };
};

//CREATE TAG
export const startCreateTag = (tagName, changeState) => {
  return (dispatch) => {
    axios
      .post(
        "/tag",
        { name: tagName },
        {
          headers: {
            Authorization: getCookie("token", ""),
          },
        }
      )
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          changeState("", response.data.error);
        } else {
          axios
            .get("/tags")
            .then((response) => {
              const tags = response.data;
              console.log(response.data);
              changeState("You have created a new tag", "");
              dispatch(setTags(tags));
            })
            .catch((err) => {
              changeState("You have created a new Tag ..couldn't get data", "");
            });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          jwtError(dispatch);
        } else {
          changeState("", "Unable to create tag!!! Try again later");
        }
      });
  };
};

//GET ALL TAGS
export const startGetTags = () => {
  return (dispatch) => {
    axios
      .get("/tags")
      .then((response) => {
        const tags = response.data;
        dispatch(setTags(tags));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

//GET INDIVIDUAL TAG
export const startIndividualTags = (tagName) => {
  return (dispatch) => {
    axios
      .get(`/tag/${slugify(tagName).toLowerCase()}`)
      .then((response) => {
        const tag = response.data;
        console.log(tag);
        //dispatch(setUser(user));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

//DELETE TAG
export const startDeleteTag = (tagName, changeState) => {
  return (dispatch) => {
    axios
      .delete(`/tag/${slugify(tagName).toLowerCase()}`, {
        headers: {
          Authorization: getCookie("token", ""),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          changeState("", response.data.error);
        } else {
          axios
            .get("/tags")
            .then((response) => {
              const tags = response.data;
              dispatch(setTags(tags));
              changeState("Tag deleted succesfully", "");
            })
            .catch((err) => {
              changeState("deleted tag ..couldn't get data", "");
            });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          jwtError(dispatch);
        } else {
          changeState("", "Unable to delete tag!!! Try again later");
        }
      });
  };
};

//GET ALL BLOGS OF A TAG
export const startListBlogsOfSingleTag = (slug, skip, limit) => {
  return axios
    .get(`/tag-blog/${slug}`, { skip, limit })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};
