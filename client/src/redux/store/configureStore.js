import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { isServer } from "../../utils/functions/isServer";
import userReducer from "../reducers/userReducer";
import categoriesReducer from "../reducers/categoriesReducer";
import tagsReducer from "../reducers/tagsReducer";
import BlogsReducer from "../reducers/BlogsReducer";

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  tags: tagsReducer,
  blogs: BlogsReducer,
  //ADD OTHER REDUCERS HERE
});

// BINDING MIDDLEWARES
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = (context) => {
  if (isServer()) {
    //If it's on server side, create a store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist using local storage
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["user", "categories", "tags", "blogs"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore, { debug: false });
