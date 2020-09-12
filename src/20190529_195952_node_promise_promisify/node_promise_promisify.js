const Promise = require('bluebird');
const fs = require('fs');
const util = require('util');

// Ways to promisify a function
// $ node node_promise_promisify.js

// https://nodejs.org/api/util.html#util_util_promisify_original
const fs_open = util.promisify(fs.open);

// http://bluebirdjs.com/docs/api/promise.promisify.html
const fs_unlink = Promise.promisify(fs.unlink);

// http://bluebirdjs.com/docs/api/promise.promisifyall.html
Promise.promisifyAll(fs);
Promise.promisifyAll(fs, {suffix: '_async'});

main().catch(panic);

async function main()
{
    // Promise.method: function will always return promise

    Promise.resolve(1)
        .then(Promise.method(function () { console.log('foo'); }))
        .then(Promise.method(async function () { console.log('bar'); }));

    console.log('end');
}

async function panic(error)
{
    console.error(error);
    process.exit(1);
}
