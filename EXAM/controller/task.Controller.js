const Task = require("../model/Task.model");

exports.addTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.user, // ✅ FIXED
    });

    res.json({ msg: "Task Added", task });
  } catch (err) {
    res.json({ msg: "Error in add task", err });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user }); // ✅ FIXED
    res.json(tasks);
  } catch (err) {
    res.json({ msg: "Error in fetch tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ msg: "Task Updated", task });
  } catch (err) {
    res.json({ msg: "Error in update" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task Deleted" });
  } catch (err) {
    res.json({ msg: "Error in delete" });
  }
};