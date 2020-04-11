const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue2 = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

const array = ['up', 'down', 'left', 'right']
// implement response functionality here somewhre......

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  res.writeHead(200, headers);


  // respond with random command from array (if the method is GET)
  // if (req.method === 'GET') {
  //   res.write(array[Math.floor(Math.random()*4)]);
  // }

  // send message down of dequeued
  if (req.method === 'GET') {
    const dequeued = messageQueue2.dequeue();
    if (dequeued) {
      res.write(dequeued);
    }
  }

  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
