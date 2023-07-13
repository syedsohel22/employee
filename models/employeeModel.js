const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    department: String,
    salary: Number,
  },
  {
    versionKey: false,
  }
);

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;
