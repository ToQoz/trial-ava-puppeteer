const puppeteer = require('puppeteer')
const test = require('ava')

let browser
test.before(async t => { browser = await puppeteer.launch() })
test.after('cleanup', t => { browser.close() })

test('target=blank', async (t) => {
  const page = await browser.newPage()
  await page.goto('https://www.kidscannon.com', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.querySelector('[href^="https://blog.kidscannon.com"]').removeAttribute('target'))
  await page.click('[href^="https://blog.kidscannon.com"]')
  await page.waitForNavigation()
  const h1 = await page.evaluate(() => document.querySelector('h1.collectionHeader-name').innerText)
  t.truthy(h1 === 'KidsCannon Blog')
})
