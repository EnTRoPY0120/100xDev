const fs = require ("fs");

function readFromFile(){    
    const p = new Promise(function (resolve){ 
        fs.readFile("./a.txt", "utf-8" , function (err,data) {
        console.log("The Content of the file is :");
        resolve();
        console.log(data);
        
    })
    console.log("after reading the file")
})
return p;
}
function doSomething(){
    readFromFile().then(function () {
        console.log("before the loop");
        for(let i = 0 ; i < 10000000000 ; i++){

        }
        console.log("after the loop");
    })
}

doSomething();