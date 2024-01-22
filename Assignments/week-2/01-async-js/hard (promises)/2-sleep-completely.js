/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    return new Promise(function (resolve){
        const begin = Date.now();
        const end = begin + milliseconds ;
        while(Date.now() < end){
            
        }
        resolve();
       
    })
}

sleep().then(function(){
    console.log(`Function that halts the JS thread(busy wait) for given number of milliseconds `);
})

module.exports = sleep;
