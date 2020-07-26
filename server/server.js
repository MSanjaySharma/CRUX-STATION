const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const configureDB = require("./config/database");
const blogsRoutes = require("./config/routes/blogsRoutes");
const usersRoutes = require("./config/routes/usersRoutes");
const categoriesRoutes = require("./config/routes/categoriesRoutes");
const tagsRoutes = require("./config/routes/tagsRoutes");
const likesRoutes = require("./config/routes/likesRoutes");

//app
const app = express();

//db
configureDB();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
} else {
  app.use(cors({origin: `${process.env.CLIENT_URL_PRODUCTION}`}))
}

//routes middlewares
app.use("/apiv1/", blogsRoutes);
app.use("/apiv1/users", usersRoutes);
app.use("/apiv1", categoriesRoutes);
app.use("/apiv1", tagsRoutes);
app.use("/apiv1", likesRoutes)

//port
const port = process.env.PORT || 7331;

app.listen(port, () => {
  console.log(
  `\x1b[94mServer is running on port ${port}\x1b[39m\n\x1b[94mvisit\x1b[39m \x1b[96mhttp://localhost:7331/apiv1\x1b[39m`
  );
});
