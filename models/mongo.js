'use strict';


// CRUD methods for MONGO DB  
class Mongo {
  constructor(schema){
    this.schema = schema ;
  }
    

  /**
     * read data from DB
     * @param _id  
     * @return {object}
     */

  read(_id){
    try{

      if(_id){
        return this.schema.find({_id});
      }else{
        console.log('ererere');
        return this.schema.find({});
      }

    }catch(e){
      console.log(e);
    }
  }

  /**
     * add data to DB
     * @param value  
     * @return {object}
     */
  create(value){
    let newValue = new this.schema(value);
    return newValue.save();
  }

  /**
     * update data in DB
     * @param _id 
     * @param value  
     * @return {object}
     */

  update(_id , value){
    return this.schema.findByIdAndUpdate(_id , value , {new : true});
  }


  /**
     * delete data from DB
     * @param _id 
     * @return {object}
     */

  delete(_id){
    return this.schema.findOneAndDelete(_id); 
  }
}


module.exports = Mongo ;