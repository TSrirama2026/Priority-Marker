// test.js
const axios = require('axios');

async function testMicroservice() {
  try {
    // This data simulates an "event" being created on another site
    // and sent over to your microservice.
    const eventData = {
      title: "Doctor's Appointment",
      date: "2025-03-15",
      necessity: "medical"
    };

    // Make a POST request to your running microservice
    const response = await axios.post('http://localhost:3000/assignPriority', eventData);

    console.log('Response from microservice:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the test function
testMicroservice();