
import { useEffect, useState } from 'react'

function TaskForm({
  onAddTask,
  editingTask,
  onUpdateTask,
  onCancelEdit,
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Study')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
useEffect(() => {
  if (editingTask) {
    setTitle(editingTask.title)
    setDescription(editingTask.description || '')
    setCategory(editingTask.category)
    setPriority(editingTask.priority)
    setDueDate(editingTask.dueDate || '')
  } else {
    setTitle('')
    setDescription('')
    setCategory('Study')
    setPriority('Medium')
    setDueDate('')
  }
}, [editingTask])
const handleSubmit = (e) => {
  e.preventDefault()

  if (!title.trim()) return

  const taskData = {
    title: title.trim(),
    description: description.trim(),
    category,
    priority,
    dueDate,
  }

  if (editingTask) {
    onUpdateTask(editingTask.id, taskData)
  } else {
    onAddTask(taskData)
  }

  if (!editingTask) {
    setTitle('')
    setDescription('')
    setCategory('Study')
    setPriority('Medium')
    setDueDate('')
  }
}

  return (
    <form className="advanced-task-form" onSubmit={handleSubmit}>
     <div className="form-header">
  <div>
    <h3>{editingTask ? 'Edit Task' : 'Create a new task'}</h3>
    <p>
      {editingTask
        ? 'Update your task details.'
        : 'Organize your next activity.'}
    </p>
  </div>
  <span className="form-icon">✦</span>
</div>

      <div className="form-group">
        <label>Task title *</label>
        <input
          type="text"
          placeholder="Enter your task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Add some details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Study</option>
            <option>Coding</option>
            <option>Development</option>
            <option>Personal</option>
            <option>Work</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Due date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

     <div className="form-actions">
  {editingTask && (
    <button
      type="button"
      className="cancel-edit-btn"
      onClick={onCancelEdit}
    >
      Cancel
    </button>
  )}

  <button type="submit" className="create-task-btn">
    {editingTask ? 'Save Changes' : '+ Create Task'}
  </button>
</div>
    </form>
  )
}

export default TaskForm
