import { test, expect } from "@playwright/test";

test("title is correct", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Sebas López | Portfolio");
});

test("send email is correct", async ({ page }) => {
  await page.goto("/");

  await page.locator('[name="name"]').fill("Sebastián Test");
  await page.locator('[name="email"]').fill("sebaslopez.2002@gmail.com");
  await page.locator('[name="message"]').fill("Testing app");
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");

    expect(dialog.message()).toContain(
      "Thank you I will get back to you as soon as possible."
    );

    await dialog.accept();
  });
  await page.locator('[type="submit"]').click();
  await page.waitForEvent("dialog");
});
