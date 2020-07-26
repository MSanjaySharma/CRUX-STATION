import axios from "../../config/axios";
import { getCookie } from "../../utils/functions/cookie";
import slugify from "slugify";
import jwtError from "../../utils/functions/jwtError";

//SET CATEGORY
export const setCategories = (categories) => {
  return { type: "SET_CATEGORIES", payload: categories };
};

//CREATE CATEGORY
export const startCreateCategory = (categoryName, changeState) => {
  return (dispatch) => {
    axios
      .post(
        "/category",
        { name: categoryName },
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
            .get("/categories")
            .then((response) => {
              const categories = response.data;
              console.log(response.data);
              changeState("You have created a new Category", "");
              dispatch(setCategories(categories));
            })
            .catch((err) => {
              changeState(
                "You have created a new Category ..couldn't get data",
                ""
              );
            });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          jwtError(dispatch);
        } else {
          changeState("", "Unable to create category!!! Try again later");
        }
      });
  };
};

//GET ALL CATEGORIES
export const startGetCategories = () => {
  return (dispatch) => {
    axios
      .get("/categories")
      .then((response) => {
        const categories = response.data;
        dispatch(setCategories(categories));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

//GET INDIVIDUAL CATEGORY
export const startIndividualCategories = (categoryName) => {
  return (dispatch) => {
    axios
      .get(`/category/${slugify(categoryName).toLowerCase()}`)
      .then((response) => {
        const category = response.data;
        console.log(category);
        //dispatch(setUser(user));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

//DELETE CATEGORY
export const startDeleteCategory = (categoryName, changeState) => {
  return (dispatch) => {
    axios
      .delete(`/category/${slugify(categoryName).toLowerCase()}`, {
        headers: {
          Authorization: getCookie("token", ""),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("error")) {
          changeState("", response.data.error);
        } else {
          axios
            .get("/categories")
            .then((response) => {
              const categories = response.data;
              dispatch(setCategories(categories));
              changeState("Category deleted succesfully", "");
            })
            .catch((err) => {
              changeState("deleted category ..couldn't get data", "");
            });
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 401) {
          jwtError(dispatch);
        } else {
          changeState("", "Unable to delete category!!! Try again later");
        }
      });
  };
};

//GET ALL BLOGS OF A CATEGORY
export const startListBlogsOfSingleCategory = (slug, skip, limit) => {
  return axios
    .get(`/category-blog/${slug}`, { skip, limit })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};
