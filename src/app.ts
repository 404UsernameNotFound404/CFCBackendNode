import express from "express";
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const initDB = require("./db/db").initDB;
const mongoose = require("mongoose")

//@ts-ignore
global.staging = true;

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

var corsOptions = {
  exposedHeaders: [
    "Content-Type",
    "Authorization",
    "Institution-Id",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
  ]
};

app.use(cors(corsOptions));

app.use("/user", require("./user/userRouter"));
app.use("/page", require("./page/pageRouter"));
app.use("/organization", require("./organization/organizationRouter"));
app.use("/", async (req: express.Request, res: express.Response) => {
  res.json({ message: "Working" });
});

export const startApp = async () => {
  mongoose
    //@ts-ignore
    .connect(process.env.DB_URL_TEST, { useNewUrlParser: true })
    .then(async (test: any) => {
      console.log(await test.connections[0].models.organization.find({}))
      // console.log(await test.organization.find());
      console.log(process.env.DB_URL_TEST)
      // await initDB();
      app.listen(process.env.PORT, function () {
        console.log("Server is listening on port " + process.env.PORT);
      });
    });
};

startApp();
