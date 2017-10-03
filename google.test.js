const puppeteer = require('puppeteer');
const test = require('ava');

const google = require('./pages/google');

let browser
test.before(async t => { browser = await puppeteer.launch() })
test.after('cleanup', t => { browser.close() })

test('search q=google', async (t) => {
    const page = await browser.newPage();
    await page.goto('https://google.co.jp', { waitUntil: 'networkidle' });
    await google.search(page, 'google');
    let firstResultText = await page.evaluate(() => document.querySelector('#ires a').innerText);
    t.truthy(firstResultText === 'Google');
});

test('search q=github', async (t) => {
    const page = await browser.newPage();
    await page.goto('https://google.co.jp', { waitUntil: 'networkidle' });
    await google.search(page, 'github');
    let firstResultText = await page.evaluate(() => document.querySelector('#ires a').innerText);
    t.truthy(firstResultText === "The world's leading software development platform · GitHub");
});
