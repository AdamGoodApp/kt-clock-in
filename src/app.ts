import * as dotenv from 'dotenv';
import type { Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import CheckJapaneseHoliday from './vacation';

dotenv.config();

const { URL, ID, PASSWORD } = process.env;

const login = async (page: Page) => {
  await page.type('#id', ID as string);
  await page.type('#password', PASSWORD as string);
  await page.locator('.btn-control-message').click();
};

(async () => {
  // Check if its a National holiday
  if (await CheckJapaneseHoliday()) {
    return
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(URL as string);

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Log in
  await login(page);

  // Click Clock-in button
  await page.locator('#buttons li:first-child div').hover();
  await page.locator('#buttons li:first-child div').click();

  await browser.close();
})();