const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TAGS": {
      return payload;
    }
    case "PURGE_TAGS": {
      return initialState;
    }
    default:
      return state;
  }
};
