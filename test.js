// test.js
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  try {
    // 1. Create a new event (POST /events)
    const createResponse = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Finish the important presentation',
        description: 'urgent: this is critical'
      })
    });
    const createData = await createResponse.json();

    console.log('Create Event Response:', createData);

    // 2. Get all events (GET /events)
    const getResponse = await fetch(`${BASE_URL}/events`);
    const getData = await getResponse.json();

    console.log('GET All Events Response:', getData);

    // A real test would have asserts here, e.g., 
    // expect(createData.event.priority).toBe('High');
    // for demonstration, we just log results

    console.log('All tests ran successfully');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

// Run the test script
runTests();
