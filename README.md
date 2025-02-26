# Priority-Marker
This microservice is responsible for assigning priority to events

First, ensure that you are connected to the microservice. The microservice is public.

Secondly, configure the microservice with your own host. Currently, the microservices runs on
a localhost, but you can make it public if you desire to.

Third, load your data into a json file. This can then be uploaded to the miscroservice and it
will assign the priority level needed.

Progmatic Request

fetch('http://localhost:3000/tasks', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    // Convert response to JSON
    return response.json();
  })
  .then(data => {
    console.log('Tasks:', data.tasks);
  })
  .catch(error => {
    console.error('Error:', error);
  });


Progrmatic Recieve

fetch('http://localhost:3000/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Finish project',
    description: 'urgent: do it soon'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('Created Task:', data.task);
  })
  .catch(error => {
    console.error('Error:', error);
  });
