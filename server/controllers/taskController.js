import Task from "../models/Task.js";
import Task from "../models/Task.js";
export const getTasks = async (req, res) => {
  try {
    const filter =
      req.user.role === "admin" ? {} : { user_id: req.user.userId };
    const tasks = await Task.find(filter).populate("user_id", "name email");
    return res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const Task = await Task.create({
      title,
      description,
      user_id: req.user.userId,
    });
    return res.status(201).json({
      message: "task created ",
      task,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateTask = async (req,res) =>{
    const {id} = req.params;
    const {title,description} = req.body;
    const task = await Task.findOneAndUpdate({
        _id:id,
        user_id:req.user.userId
    })
}