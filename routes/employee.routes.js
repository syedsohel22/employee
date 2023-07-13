const express = require("express");

const employeeModel = require("../models/employeeModel");

const employeeRouter = express.Router();

// read

employeeRouter.get("/", async (req, res) => {
  try {
    const employee = await employeeModel.find();
    res.send(employee);
  } catch (error) {
    res.json({ err: error.message });
  }
});
// create
employeeRouter.post("/create", async (req, res) => {
  try {
    const employee = new employeeModel(req.body);
    await employee.save();
    res.json({ msg: "new employee has been added", employee: req.body });
  } catch (error) {
    res.json({ err: error.message });
  }
});

// update
employeeRouter.patch("/update/:employeeID", async (req, res) => {
  const { employeeID } = req.params;
  try {
    const employee = employeeModel.findOne({ _id: employeeID });

    await employeeModel.findByIdAndUpdate({ _id: employeeID }, req.body);
    res.json({ msg: " employee data has been updated", employee: req.body });
  } catch (error) {
    res.json({ err: error.message });
  }
});
// delete
employeeRouter.delete("/delete/:employeeID", async (req, res) => {
  const { employeeID } = req.params;
  try {
    const employee = employeeModel.findOne({ _id: employeeID });

    await employeeModel.findByIdAndDelete({ _id: employeeID });
    res.json({ msg: " employee data has been deleted" });
  } catch (error) {
    res.json({ err: error.message });
  }
});

module.exports = employeeRouter;
