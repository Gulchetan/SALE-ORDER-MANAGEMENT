const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const PORT = process.env.PORT || 8080;

// Setup JSON Server
const jsonServerMiddleware = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'build',  // This tells json-server to serve static files from React build directory
});

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, 'build')));

// JSON Server middleware
app.use('/api', middlewares, jsonServerMiddleware);

// For any other requests, redirect to the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
