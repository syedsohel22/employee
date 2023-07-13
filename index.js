const express = require("express");
const connection = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const { userRouter } = require("./routes/user.routes");
const employeeRouter = require("./routes/employee.routes");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "welcome to employee management api" });
});

app.use("/user", userRouter);
app.use("/employees", employeeRouter);
//app.use("/employee", employeeRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB..!");
    console.log(`Server running on port ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
