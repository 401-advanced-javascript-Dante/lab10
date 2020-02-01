'use strict' ;

const express = require('express');
const app = express() ;


module.exports = {
    server : app ,
    start : port => {
        let PORT = port || process.env.PORT || 3000 ;
        app.listen(PORT , () => {
            console.log(`Let's Rock !!! ${PORT}`);
        });
    }
}