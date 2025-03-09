// index.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // so we can read tasks.json if desired

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// In-memory store for events
let events = [];
let currentId = 1;

// Load existing events from tasks.json (if you want to pre-populate them)
try {
  const data = fs.readFileSync('./tasks.json', 'utf8');
  const jsonData = JSON.parse(data);
  if (Array.isArray(jsonData)) {
    events = jsonData;
    if (events.length > 0) {
      // This ensures our ID counter doesn’t clash with preexisting IDs
      currentId = Math.max(...events.map(e => e.id)) + 1;
    }
  }
} catch (err) {
  // If tasks.json doesn’t exist or can’t be read, just continue with an empty in-memory array
  console.warn('No valid tasks.json found or file could not be read. Starting with an empty array.');
}

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
 * GET /events
 * Returns all events.
 */
app.get('/events', (req, res) => {
  res.json({
    success: true,
    events
  });
});

/**
 * POST /events
 * Create a new event.
 * Expects JSON body { "title": "...", "description": "..." }
 */
app.post('/events', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'title is required'
    });
  }

  const newEvent = {
    id: currentId++,
    title,
    description: description || '',
    priority: determinePriority(title, description || ''),
    createdAt: new Date().toISOString(),
  };

  events.push(newEvent);

  // Send back the new event with the assigned priority
  res.status(201).json({
    success: true,
    event: newEvent
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());

// // In-memory store for tasks
// let tasks = [];
// let currentId = 1;

// /**
//  * Helper function to determine priority.
//  * Modify this logic to fit your needs.
//  */
// function determinePriority(title, description) {
//   const text = (title + ' ' + description).toLowerCase();

//   if (text.includes('urgent') || text.includes('immediate')) {
//     return 'High';
//   } else if (text.includes('soon')) {
//     return 'Medium';
//   } else {
//     return 'Low';
//   }
// }

// /**
//  * GET /tasks
//  * Returns all tasks.
//  */
// app.get('/tasks', (req, res) => {
//   res.json({
//     success: true,
//     tasks: tasks
//   });
// });

// /**
//  * POST /tasks
//  * Create a new task.
//  * Expects JSON body { "title": "...", "description": "..." }
//  */
// app.post('/tasks', (req, res) => {
//   const { title, description } = req.body;

//   if (!title) {
//     return res.status(400).json({
//       success: false,
//       message: 'Title is required'
//     });
//   }

//   const newTask = {
//     id: currentId++,
//     title,
//     description: description || '',
//     priority: determinePriority(title, description || ''),
//     createdAt: new Date().toISOString(),
//   };

//   tasks.push(newTask);

//   res.status(201).json({
//     success: true,
//     task: newTask
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
