const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// In-memory store for tasks
let tasks = [];
let currentId = 1;

/**
 * Helper function to determine priority.
 * Modify this logic to fit your needs.
 */
function determinePriority(title, description) {
  const text = (title + ' ' + description).toLowerCase();

  if (text.includes('urgent') || text.includes('immediate')) {
    return 'High';
  } else if (text.includes('soon')) {
    return 'Medium';
  } else {
    return 'Low';
  }
}

/**
 * GET /tasks
 * Returns all tasks.
 */
app.get('/tasks', (req, res) => {
  res.json({
    success: true,
    tasks: tasks
  });
});

/**
 * POST /tasks
 * Create a new task.
 * Expects JSON body { "title": "...", "description": "..." }
 */
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  const newTask = {
    id: currentId++,
    title,
    description: description || '',
    priority: determinePriority(title, description || ''),
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    task: newTask
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
