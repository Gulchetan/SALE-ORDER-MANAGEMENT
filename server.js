const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const PORT = process.env.PORT || 3001;


const jsonServerMiddleware = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'build', 
});


app.use(express.static(path.join(__dirname, 'build')));


app.use('/api', middlewares, jsonServerMiddleware);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
