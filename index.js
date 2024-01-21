const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dbConnector = require("./utils/dbConnector");
const userRouter = require('./routers/userRouter');
const todoRouter = require('./routers/todoRouter');
const { errorHandler } = require("./middlewares/errorHandler");
dotenv.config();

const app = express();
app.use(cookie_parser());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user",userRouter)
app.use("/api/todo",todoRouter);

app.use(errorHandler)

const connection =async()=>{
  await dbConnector();
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening at Port ${process.env.SERVER_PORT}`);
  });
}

connection();


