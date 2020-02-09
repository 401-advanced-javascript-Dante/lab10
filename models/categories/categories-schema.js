'use strict' ;


/**
 * mongoose module
 * @constant
 */
const mongoose = require('mongoose');

/**
 * import products schema 
 * @constant
 */
require('../products/products-schema.js');


/**
 * create schema 
 * @constant
 * @function
 */
const categories = mongoose.Schema({
  name: {type : Array , require : true },
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});


/**
 * the virtual method
 * @object
 * @param string
 * @param object
 */
categories.virtual('productsNames' , {
  ref: 'products',
  localField: 'name',
  foreignField: 'name',
  justOne: true,
});

/**
 * join the virtual field
 * @function
 */
function link(){
  try{
    this.populate('productsNames');
  } catch(e){
    console.error(e);
  }
} 

categories.pre('find', link);
categories.pre('findOne', link);


module.exports = mongoose.model('categories', categories);