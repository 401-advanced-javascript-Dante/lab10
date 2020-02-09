'use strict' ;

/**
 * server 
 * @constant
 */
const server = require('./lib/server.js');
/**
 * mongoose module
 * @constant
 */
const mongoose = require('mongoose');

/**
 * Mongodb url 
 * @constant
 */
const MONGODB_URI = 'mongodb://localhost:27017/lab10';

/**
 * Mongodb options
 * @constant
 */

const mongooseOptions = {
  useNewUrlParser: true ,
  useCreateIndex: true ,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

/**
 * connect mongodb and pass param
 * @param string
 * @param object
 */
mongoose.connect( MONGODB_URI , mongooseOptions);

/**
 * start the server
 * @object
 */
server.start();