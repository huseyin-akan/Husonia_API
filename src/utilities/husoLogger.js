const log = (value, color, reset) => {
    if(reset === undefined) reset = true;
    
    if(color === 'green') return console.log(`\x1b[32m${value}${reset ? '\x1b[0m' :''}`)
    if(color === 'blue') return console.log(`\x1b[34m${value}${reset ? '\x1b[0m' :''}`)
    if(color === 'yellow') return console.log(`\x1b[33m${value}${reset ? '\x1b[0m' :''}`)
    if(color === 'red') return console.log(`\x1b[31m${value}${reset ? '\x1b[0m' :''}`)
    
    console.log(`${value}${reset ? '\x1b[0m' :''}`);
}

module.exports = {log};