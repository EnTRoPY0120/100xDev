const express  = require("express");
const app = express();
const port = 3000 

const users = [{
    name : 'John',
    kidneys : [{
        healthy : false
    },
    {
        healthy : true
    }]
}]
app.get('/' , function(req,res) {
    console.log('hello world')
    
})


app.listen(port)