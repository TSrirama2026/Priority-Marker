const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies:
app.use(express.json());

// Simple function to assign a priority based on event data:
function assignPriority(eventData) {
  // In a real app, you'd have more complex logic here.
  // For demonstration, let's just do something simple:
  if (!eventData || !eventData.necessity) {
    return 'normal';  // default
  }

  switch (eventData.necessity.toLowerCase()) {
    case 'urgent':
      return 'high';
    case 'medical':
      return 'high';
    case 'optional':
      return 'low';
    default:
      return 'normal';
  }
}

// POST route for assigning event priority
app.post('/assignPriority', (req, res) => {
  const eventData = req.body;
  
  // Determine priority
  const priority = assignPriority(eventData);
  
  // Send back the result
  res.json({
    success: true,
    priority: priority
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Microservice listening on port ${PORT}`);
});
