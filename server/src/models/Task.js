const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'Study',
  },
  priority: {
    type: String,
    default: 'Medium',
  },
  dueDate: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
   // ADD THE NEW USER FIELD HERE
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Task = mongoose.model('Task', taskSchema)



module.exports = Task