
import { useState } from 'react'
import './App.css'

function App() {
  // Initial tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete JavaScript revision',
      category: 'Study',
      priority: 'High',
      completed: false,
    },
    {
      id: 2,
      title: 'Practice 3 DSA problems',
      category: 'Coding',
      priority: 'Medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Read React documentation',
      category: 'Development',
      priority: 'Low',
      completed: true,
    },
  ])

  // Input and filter states
  const [newTask, setNewTask] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  // Add a new task
  const addTask = (e) => {
    e.preventDefault()

    if (!newTask.trim()) return

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      category: 'General',
      priority: 'Medium',
      completed: false,
    }

    setTasks((previousTasks) => [...previousTasks, task])
    setNewTask('')
  }

  // Mark task as completed or pending
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    )
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'Pending') return !task.completed
    if (activeFilter === 'Completed') return task.completed
    return true
  })

  // Dashboard statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">T</div>
          <h2>TaskFlow</h2>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active">
            <span>▦</span> Dashboard
          </a>
          <a href="#tasks" className="nav-item">
            <span>☑</span> My Tasks
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">P</div>
          <div>
            <h4>Parthib</h4>
            <p>Personal Workspace</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>My Dashboard</h1>
          </div>
          <div className="date-label">
            {new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="welcome-label">YOUR PRODUCTIVITY SPACE</p>
            <h2>Welcome back, Parthib! 👋</h2>
            <p>Organize your day and get things done, one task at a time.</p>
          </div>
          <div className="welcome-decoration">✦</div>
        </section>

        {/* Statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">▦</div>
            <p>Total Tasks</p>
            <h2>{totalTasks}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Completed</p>
            <h2>{completedTasks}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">◷</div>
            <p>Pending</p>
            <h2>{pendingTasks}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">↗</div>
            <p>Progress</p>
            <h2>{progress}%</h2>
          </div>
        </section>

        {/* Progress section */}
        <section className="progress-card">
          <div className="progress-heading">
            <div>
              <h3>Your daily progress</h3>
              <p>Keep going! Every completed task counts.</p>
            </div>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </section>

        {/* Task section */}
        <section className="task-section" id="tasks">
          <div className="section-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Manage your daily activities.</p>
            </div>
          </div>

          {/* Add task form */}
          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="What do you need to accomplish?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">+ Add Task</button>
          </form>

          {/* Filters */}
          <div className="filter-tabs">
            {['All', 'Pending', 'Completed'].map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter ? 'filter-btn selected' : 'filter-btn'
                }
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Task list */}
          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <span>📋</span>
                <h3>No tasks found</h3>
                <p>Add a new task or select another filter.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  className={`task-card ${task.completed ? 'completed' : ''}`}
                  key={task.id}
                >
                  <button
                    className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                    onClick={() => toggleTask(task.id)}
                    type="button"
                    aria-label="Toggle task completion"
                  >
                    {task.completed ? '✓' : ''}
                  </button>

                  <div className="task-details">
                    <h3>{task.title}</h3>
                    <div className="task-meta">
                      <span>{task.category}</span>
                      <span className={`priority ${task.priority.toLowerCase()}`}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>

                  <span className="task-status">
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                    type="button"
                    aria-label="Delete task"
                    title="Delete task"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="footer">
          Made with React · TaskFlow © {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  )
}

export default App
