module.exports.search =  async function search(page, q) {
  await page.focus('input[name=q]');
  await page.type(q);
  page.click('form input[type=submit]');
  return page.waitForNavigation();
}
