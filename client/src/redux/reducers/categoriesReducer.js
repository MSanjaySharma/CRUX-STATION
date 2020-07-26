const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORIES": {
      return payload;
    }
    case "PURGE_CATEGORIES": {
      return initialState;
    }
    default:
      return state;
  }
};
