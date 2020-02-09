'use strict';

/**
 * mongoose module
 * @constant
 */
const mongoose = require('mongoose');

/**
 * create schema 
 * @constant
 * @function
 */
const products = mongoose.Schema({
  name: {type: String , required : true},
  price: {type: Number , required : true},
  weight: {type : Number , required: true},
  quantity_in_stock: {type : Number , required: true}, 
});


module.exports = mongoose.model('products' , products); 