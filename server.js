require("rootpath")();
require("dotenv").config({
  path: require("path").join(__dirname, "./.env")
});

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const routes = require("routes/route.js");
const jwt = require("middleware/jwt");
const errorHandler = require("middleware/errorHandler");

(async () => {
  await mongoose.connect(
    `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  // use JWT auth to secure the api
  app.use(jwt);

  // api routes
  app.use("/", routes);

  // global error handler
  app.use(errorHandler);

  app.listen(process.env.PORT, function() {
    console.log("Server listening on port " + process.env.PORT);
  });
})();

