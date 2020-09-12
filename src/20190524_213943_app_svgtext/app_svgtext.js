#!/usr/bin/env node

const TextToSVG = require('text-to-svg');
const path = require('path');
const puppeteer = require('puppeteer');

// Render a text into .svg file
//
// $ svgtext.js font.ttf Hello
// <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://...

main().catch(panic);

async function main()
{
    // https://github.com/shrhdk/text-to-svg
    const svg = TextToSVG.loadSync(process.argv[2]).getSVG(process.argv[3]);
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.goto(`data:image/svg+xml;utf8,${encodeURI(svg)}`);
        const out = await page.evaluate(function () {
            const elem = document.querySelector('svg');
            const r = elem.getBBox();
            const bbox = [r.x, r.y, r.width, r.height].map(format).join(' ');
            elem.setAttribute('viewBox', bbox);
            elem.removeAttribute('width');
            elem.removeAttribute('height');
            return elem.outerHTML;
            function format(num) {
                return num.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
            }
        });
        console.log(out);
    }
    finally {
        await browser.close();
    }
}

async function panic(error)
{
    console.error(error);
    process.exit(1);
}
