const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);

// import user router
const userRouter = require('./users/userRouter.js');
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  next();

  // Calling next() will signal express that the middleware has 
  // finished and it should call the next middleware function. If 
  // next() is not called and a response is not sent back to the client, 
  // the request will hang and clients will get a timeout error, 

};

module.exports = server;
