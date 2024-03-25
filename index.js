const express = require("express");
const app = express();
const authenticate = require('./authMiddleware');
const loadConfig = require('./configLoader');
const apiRoutes = require('./apiRoutes');

// Load configuration at startup and start the server
loadConfig().then(config => {
  console.log('Configuration loaded:', config);
  const port = config.port || 3000; // Use port from config if available, otherwise default to 3000
  app.listen(port, () => {
    console.log(`GlobalNoSQL app listening at http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to load configuration at startup:', error);
});

// Apply authentication middleware to all routes except '/ping'
app.use((req, res, next) => {
  if (req.path === '/ping') {
    next();
  } else {
    authenticate(req, res, next);
  }
});

app.get("/ping", (req, res) => {
  console.log("Received ping request");
  res.status(200).send("Server is running");
});

// Use API routes
app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  console.error("An error occurred:", err.stack);
  res.status(500).send("Something broke!");
});