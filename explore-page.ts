import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🔍 Exploring Factorial Calculator Application...\n');

  await page.goto('http://qainterview.pythonanywhere.com');
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({ path: 'docs/factorial-page-initial.png', fullPage: true });

  // Get page title
  const title = await page.title();
  console.log('📄 Page Title:', title);

  // Find all input elements
  const inputs = await page.locator('input').all();
  console.log(`\n📝 Found ${inputs.length} input element(s):`);
  for (let i = 0; i < inputs.length; i++) {
    const type = await inputs[i].getAttribute('type');
    const name = await inputs[i].getAttribute('name');
    const id = await inputs[i].getAttribute('id');
    const placeholder = await inputs[i].getAttribute('placeholder');
    console.log(`  Input ${i + 1}: type="${type}", name="${name}", id="${id}", placeholder="${placeholder}"`);
  }

  // Find all buttons
  const buttons = await page.locator('button').all();
  console.log(`\n🔘 Found ${buttons.length} button element(s):`);
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    const type = await buttons[i].getAttribute('type');
    const id = await buttons[i].getAttribute('id');
    console.log(`  Button ${i + 1}: text="${text?.trim()}", type="${type}", id="${id}"`);
  }

  // Find all links
  const links = await page.locator('a').all();
  console.log(`\n🔗 Found ${links.length} link(s):`);
  for (let i = 0; i < links.length; i++) {
    const text = await links[i].textContent();
    const href = await links[i].getAttribute('href');
    console.log(`  Link ${i + 1}: text="${text?.trim()}", href="${href}"`);
  }

  // Find headings
  const h1 = await page.locator('h1').all();
  console.log(`\n📌 Found ${h1.length} H1 heading(s):`);
  for (let i = 0; i < h1.length; i++) {
    const text = await h1[i].textContent();
    console.log(`  H1 ${i + 1}: "${text?.trim()}"`);
  }

  // Find all text elements
  const allText = await page.textContent('body');
  console.log('\n📋 Page Body Text:');
  console.log(allText);

  // Test factorial calculation
  console.log('\n🧪 Testing factorial calculation with 5:');
  const input = page.locator('input[name="number"]');
  await input.fill('5');

  const calculateBtn = page.locator('button[type="submit"]');
  await calculateBtn.click();

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'docs/factorial-page-after-submit.png', fullPage: true });

  const resultText = await page.textContent('body');
  console.log('Result:', resultText);

  console.log('\n✅ Exploration complete! Screenshots saved to docs/ folder\n');

  await browser.close();
})();
