const fs = require ("fs");

function writeToFile(){
    const p = new Promise(function (onDone){
        console.log("Check 0 : Entering Promise");
        fs.readFile("./a.txt", "utf-8" , function(err,data){
            console.log(data);
            console.log("Check 1 : reading the file");
            data = data + " hi ,this was added after reading the file";
            fs.writeFile("./a.txt",data , () => {
                console.log(data);
                console.log("Check 2 : writing to the file");
                onDone();
            })
        })
    })
    console.log("Check 4 : A check while promise does its things");
    return p ;
}


writeToFile().then( () => {

    console.log("check 5 : This is after resolve");
})
