'use strict';

/**
 * import server
 * @constant
 */

const {server} = require('../lib/server.js');
/**
 * super goose module for testing
 * @constant
 */
const supergoose = require('@code-fellows/supergoose');

/**
 * initiate mongoose for server
 * @constant
 * @function
 * @param constant
 */

const mockRequest = supergoose(server) ;


// ready to test the routes 
describe('Test middleware' , () => {

  it('404 works' , ()=> {
    return mockRequest.get('/nothing')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });


  it('timeStamp middleware works !', () => {
    return mockRequest
      .get('/timeStamp')
      .then(result => {
        expect(typeof result.text).toEqual('string');
      })
      .catch(console.error);
  });

  it('Responds 500 Error', () => {
    return mockRequest
      .get('/test-error' )
      .then(result => {
        expect(result.status).toBe(500);
      })
      .catch(console.error);
  });


  
});

describe('Categories API', () => {

  it('get works' , ()=> {
    return mockRequest.get('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('get with id works' , ()=> {
    let newVal = { name: 'DanTe' };
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        return mockRequest.get(`/api/v1/categories/${data.body._id}`)
          .then(data => {
            expect(data.status).toBe(200);
            expect(data.body[0].name[0]).toEqual('DanTe');
          });
        
      });

  });


  it('post works' , ()=> {
    let newVal = { name: 'DanTe'};
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        expect(data.body.name[0]).toBe('DanTe');
      });
  });


  it('update works' , ()=> {
    let newVal = { name: 'DanTe'};
    let updated = { name: 'Nero'};

    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {

        return mockRequest.put(`/api/v1/categories/${data.body._id}`)
          .send(updated)
          .then(data => {
            expect(data.status).toBe(201);
            expect(data.body.name[0]).toBe('Nero');
          });
      });
  });



  it('delete works' , ()=> {
    let newVal = { name: 'DanTe'};
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        return mockRequest.delete(`/api/v1/categories/${data.body._id}`)
          .then(data => {
            return mockRequest.get(`/api/v1/categories/${data.body._id}`)
              .then(data => {
                expect(data.status).toBe(200);
                expect(data.body[0]).toBe(undefined);

              });
          });
      });


  });


}) ;

///////////////// products Test ////////////

describe('Products API', () => {

  it('get works' , ()=> {
    return mockRequest.get('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });
  
  it('get with id works' , ()=> {
    let newVal = { name: 'DanTe' , price : 99 , weight : 85 , quantity_in_stock : 1};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        return mockRequest.get(`/api/v1/products/${data.body._id}`)
          .then(data => {
            expect(data.status).toBe(200);
            expect(data.body[0].name).toEqual('DanTe');
          });
          
      });
  
  });
  
  
  it('post works' , ()=> {
    let newVal = { name: 'DanTe' , price : 99 , weight : 85 , quantity_in_stock : 1};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        Object.keys(newVal).forEach(value => {
          expect(data.body[value]).toEqual(newVal[value]);
        });
      });
  });
  
  
  it('update works' , ()=> {
    let newVal = { name: 'DanTe' , price : 99 , weight : 85 , quantity_in_stock : 1};
    let updated = { name: 'Nero' , price : 0 , weight : 0 , quantity_in_stock : 99};
  
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
  
        return mockRequest.put(`/api/v1/products/${data.body._id}`)
          .send(updated)
          .then(data => {
            expect(data.status).toBe(201);
            expect(data.body.name).toBe('Nero');
          });
      });
  });
  
  
  
  it('delete works' , ()=> {
    let newVal = { name: 'DanTe' , price : 99 , weight : 85 , quantity_in_stock : 1};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        return mockRequest.delete(`/api/v1/products/${data.body._id}`)
          .then(data => {
            return mockRequest.get(`/api/v1/products/${data.body._id}`)
              .then(data => {
                expect(data.status).toBe(200);
                expect(data.body[0]).toBe(undefined);
  
              });
          });
      });
  
  
  });
  
  
}) ;