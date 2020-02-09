'use strict';

/**
 * import schema and DB CRUD
 * @constant
 */
const schema = require('./categories-schema.js');
const Mongo = require('../mongo.js');


/**
 * categories 
 * @class
 */
class Categories extends Mongo {
  constructor(){
    super(schema);
  }
}

module.exports = new Categories() ;