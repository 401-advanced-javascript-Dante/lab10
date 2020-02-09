'use strict';


/**
 * import schema and DB CRUD
 * @constant
 */
const schema = require('./products-schema.js');
const Mongo = require('../mongo.js');


/**
 * products 
 * @class
 */
class products extends Mongo{
  constructor(){
    super(schema);
  }
}

module.exports = new products() ;