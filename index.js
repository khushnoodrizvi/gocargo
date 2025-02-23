const handle = require('./app/server')
const express = require('express')
const path = require('path');
const { PORT } = require('./app/common/config');
const httpServer = require("http").createServer(handle)
const port = PORT || 3000
handle.use(express.static(path.join(__dirname, "/build")));

handle.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
