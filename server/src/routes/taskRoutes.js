const Task = require('../models/Task')
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Apply authentication to all task routes
router.use(authMiddleware)


// POST - Create a new task
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      dueDate,
    } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      })
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description || '',
      category: category || 'Study',
      priority: priority || 'Medium',
      dueDate: dueDate || '',
      user: req.user.id,
    })

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: error.message,
    })
  }
})


// GET - Fetch only logged-in user's tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    })

    res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
      error: error.message,
    })
  }
})


// PUT - Update only logged-in user's task
router.put('/:id', async (req, res) => {
  try {
    // Do not allow changing task ownership
    const { user, ...updatedData } = req.body

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updatedData,
      {
        returnDocument: 'after',
        runValidators: true,
      }
    )

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message,
    })
  }
})


// DELETE - Delete only logged-in user's task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message,
    })
  }
})

module.exports = router