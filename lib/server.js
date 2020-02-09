'use strict' ;


// 3d party dependencies
/**
 * express module
 * @const
 */
const express = require('express');
/**
 * morgan module
 * @const
 */
const morgan = require('morgan');
/**
 * cors module
 * @const
 */
const cors = require('cors');

// custom routes
const dynamicRouter = require('../routes/dynamic.js');

// applications constants 
const app = express() ;

// 3d party middleware 
app.use(express.json());

// 3d party dependencies 
app.use(cors());
app.use(morgan('dev'));

// run dynamic router
app.use(dynamicRouter);

//middleware apps
app.use(timeStamp);
app.use(logger); 
app.use(errorHandler);


/**
 * timeStamp middleware
 * @function
 */

// adding time stamp for each request
function timeStamp(req, res , next){
  let newTime = new Date();
  let requestTime = newTime.toUTCString();
  req.requestTime = requestTime ;
  next();
}

/**
 * logger middleware
 * @function
 */

// console.log data from request object for each request 
function logger(req, res, next) {
  console.log('request path:', req.path, ' method:' , req.method, ' request time:' , req.requestTime);
  next();
}

/**
 * errorHandler middleware
 * @function
 */

// middleware 500 error function
function errorHandler(err , req , res , next){
  res.status(500);
  res.statusMessage = 'OBJECT DESTROYED ! (500)';
  res.json({error : err});
}

// route to test timeStamp 
app.get('/timeStamp' , (req , res) => {
  let tester = req.requestTime ;
  res.status(200).send(tester);
});
// testing 500 middleware function
app.get('/test-error' , (req , res , next) => {
  throw errorHandler();
});


/**
 * 404 error middleware
 * @function
 */

// middleware 404 error function
function notFoundHandler(req , res , next){
  res.status(404);
  res.statusMessage = 'WE NEED A MEDIC HERE !! (404)';
  res.json({error : 'NOT FOUND !!!'});
}

app.get('*' , notFoundHandler);

module.exports = {
  logger:logger,
  server : app ,
  start : port => {
    let PORT = port || process.env.PORT || 3000 ;
    // prove of life 
    app.listen(PORT , () => {
      console.log(`Let's Rock !!! ${PORT}`);
    });
  },
};