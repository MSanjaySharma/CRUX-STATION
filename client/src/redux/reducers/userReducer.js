const initialState = { userInfo: {}, token: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER": {
      return { ...state, userInfo: payload };
    }
    case "SET_TOKEN": {
      return { ...state, token: payload };
    }
    case "REMOVE_USER_TOKEN": {
      return { userInfo: {}, token: null };
    }
    case "PURGE_USERS": {
      return initialState;
    }
    default:
      return state;
  }
};
