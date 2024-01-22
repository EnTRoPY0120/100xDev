// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. (Hint : Use Timeout)


function fn(){

    console.log(`counter: ${a++}`);
    setTimeout(fn,1000);
}
let a = 0;
fn();
