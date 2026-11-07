const Task = require('../models/Task')
const express = require('express')

const router = express.Router()

// Temporary sample tasks


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
// GET all tasks
// GET - Fetch all tasks from MongoDB
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()

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




// PUT - Update an existing task
// PUT - Update an existing task in MongoDB
router.put('/:id', async (req, res) => {
  try {
   const updatedTask = await Task.findByIdAndUpdate(
  req.params.id,
  req.body,
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


// DELETE - Remove an existing task
// DELETE - Remove an existing task from MongoDB
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(
      req.params.id
    )

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