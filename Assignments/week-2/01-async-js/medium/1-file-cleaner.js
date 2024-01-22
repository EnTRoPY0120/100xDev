const fs = require ("fs");

function editFileAndWrite(){

    const p = new Promise(function(resolve){

        fs.readFile("../easy/a.txt", "utf-8", function(err,data){
            console.log(data);
            const newData = data.replace(/\s{2,}/g, " ");
            fs.writeFile("../easy/a.txt",newData, () => {
                console.log("After removal of whitespaces and writing it to the file :");
                console.log(newData);
                resolve();
            })
        })
    })
    return p;
}


editFileAndWrite().then(function() {
    console.log("The async function is complete");
})