const express = require("express")
const app = express();
const port = process.env.PORT || 3000 
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.get('/' , (req,res) => {
    res.send('Hello world');
})

app.post("/conversations" , (req,res) => {
    // const message = req.body.message;
    console.log(req.body);
    // console.log(req.headers)
    
});

app.listen(port , () => {
    console.log(`Listening to the port ${port}`);
})