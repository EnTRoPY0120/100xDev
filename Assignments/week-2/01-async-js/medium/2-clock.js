function displayClock(){  
    const time = new Date();
    const HH = time.getHours();
    const MM = time.getMinutes();
    const SS = time.getSeconds();
    console.log(`${HH}:${MM}::${SS}`);

    if(HH < 13){
        console.log(`${HH}:${MM}::${SS} AM`);
    } else{
        console.log(`${HH-12}:${MM}::${SS} PM\n`);
    }
            
}

setInterval(displayClock,1000);