const Task = require("../models/Tasks");
const { validationResult } = require("express-validator");

// Crear tarea
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

exports.getTasks = async (req, res) => {
  const { completed } = req.query;

  try {
    const filter = completed ? { completed: completed === "true" } : {};
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea", error });
  }
};

exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};
