#!/usr/bin/env node

const path = require('path');
const puppeteer = require('puppeteer');

// Get bounding box of an svg
//
// $ node app_svgbbox.js a.svg
// 2.74 -61.85 180.86 62.43

main().catch(panic);

async function main()
{
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(__dirname, process.argv[2])}`);
        const bbox = await page.evaluate(function () {
            const r = document.querySelector('svg').getBBox();
            return [r.x, r.y, r.width, r.height].map(format).join(' ');
            function format(num) {
                return num.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
            }
        });
        console.log(bbox);
    }
    finally {
        await browser.close();
    }
}

function panic(error)
{
    console.error(error);
    process.exit(1);
}
