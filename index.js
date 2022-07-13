const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const config = require("config");

const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const apiRouter = require("./routes/auth");
const problem = require("./routes/problem");
const tags = require("./routes/tags");

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
  require("dotenv").config();
}

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(bodyParser.json());
app.set("trust proxy", 1);
app.use("/api/problem", problem);
app.use("/api/tags", tags);
app.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
    console.log(err);
  }
  console.log(err.message);
  res.status(err.statusCode).send({
    error:
      err.statusCode >= 500
        ? "An unexpected error ocurred, please try again later."
        : err.message,
  });
});

(async function () {
  try {
    await mongoose.connect(
      "mongodb+srv://mukul:mukul@mukul.lcc65.mongodb.net/codechef?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Connected to database");
  } catch (err) {
    throw new Error(err);
  }
})();

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`));
