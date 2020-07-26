const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_BLOGS": {
      return payload;
    }
    case "UPDATE_BLOGS": {
      return state.map((blog) => {
        if (blog._id === payload._id) {
          return Object.assign({}, blog, payload);
        } else {
          return blog;
        }
      });
    }
    case "DELETE_BLOGS": {
      return state.filter((blog) => blog._id !== payload);
    }
    case "PURGE_BLOGS": {
      return initialState;
    }
    default:
      return state;
  }
};
