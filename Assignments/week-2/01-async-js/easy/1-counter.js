// ## Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second

setInterval(fn,1000);
let a = 0 ;

function fn(){
    console.log(`counter:${a++}`);
    
}

