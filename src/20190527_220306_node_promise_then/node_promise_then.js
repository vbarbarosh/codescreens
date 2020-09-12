const Promise = require('bluebird');

// How Promise.then is designed to work
// $ node node_promise_then.js

main().catch(panic);

async function main()
{
    // FULFILLED
    await Promise.resolve(1).then(fulfilled, rejected);

    // REJECTED
    await Promise.reject(new Error('555')).then(fulfilled, rejected);

    // MISSED
    try {
        await Promise.resolve(1).then(() => {throw new Error('555')}, rejected);
    }
    catch (error) {
        console.log('MISSED', error);
    }
}

function fulfilled(value)
{
    console.log('FULFILLED', value);
}

function rejected(error)
{
    console.log('REJECTED', error);
}

function panic(error)
{
    console.error('error:', error);
    process.exit(1);
}
