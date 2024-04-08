// Import the 'express' module which is a web application framework for Node.js.
const express = require('express');

// Create an instance of the Express application.
const app = express();

// Define the port number on which the Express server will listen.
const PORT = process.env.PORT || 5000;

// A simple authentication flag to indicate whether a user is authenticated or not.
// NOTE: In real-world applications, you'd typically use more robust mechanisms.
const isAuthenticated = false;

// Define two middleware functions: hello_1 and hello_2.
function hello_1(req, res, next) {
    console.log('Hello from Middleware 1');
    next(); // Call 'next()' to pass control to the next middleware.
}

function hello_2(req, res, next) {
    console.log('Hello from Middleware 2');
    next(); // Call 'next()' to pass control to the next middleware.
}

// A middleware function that checks user's authentication before processing further.
// In Express, middleware functions are functions that have access to the request and response objects,
// and the next middleware function in the application’s request-response cycle.
app.use((req,res,next)=>{
    // If the user is authenticated (based on our simple flag).
    // if(isAuthenticated) {
    //     // Log a message indicating that this middleware was executed.
    //     console.log('This message prints before our Welcome Message')
    //     // Proceed to the next middleware or route handler in line.
    //     next();
    // } else {
    //     // If the user is not authenticated, send a 401 Unauthorized status with an error message.
    //     res.status(401).send('Not Authenticated')
    // }

    isAuthenticated ?  next() :  res.status(401).send('Not Authenticated');
})

// Define a GET route handler for the root ('/') path of the server.
// Whenever someone sends a GET request to the root path, this handler is triggered.
app.get('/', (req,res) => {
    // Send a response back to the client with a welcome message.
    res.send('Welcome to our Express App ! - GET METHOD')
})


// -----------------w4-----------------------------start--------
// Define a route that uses a route parameter.
app.get('/greet/:name', (req, res) => {
    // Access the route parameter 'name' using req.params.
    const { name } = req.params;

    // Send a greeting message with the captured name.
    res.send(`Hello, ${name}!`);
});

// Define a route with two route parameters, :name and :age.
app.get('/user/:name/:age', (req, res) => {
    const { name, age } = req.params;

    // Send a response with the captured name and age.
    res.send(`User Name: ${name}, Age: ${age}`);
});


// Define a route that uses the two middleware functions.
app.get('/chained', [hello_1, hello_2], (req, res, next) => {
    console.log('Handling the final request');
    res.send('Response from the final handler');
}, (req, res) => {
    console.log('Additional middleware after the final handler');
    // You can add additional logic here if needed.
});



// ------------------w4--------------------------------end--------



// Define a POST route handler for the '/post' path.
// This is just an example of how to handle POST requests.
app.post('/post', (req,res) => {
    // Send a response back to the client with a welcome message for the POST request.
    res.send('Welcome to our Express App ! - POST METHOD')
})

// Start the Express server, listening on the defined PORT.
// Once the server starts, the provided callback function will execute, logging a message to the console.
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}/`);
})

module.exports = app