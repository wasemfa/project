import {expect, test} from '@playwright/test'

test.describe('Positive Login Suite', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/')
        await expect(page.getByText('Swag Labs')).toBeVisible()
    })

    test('Login with the user: "standard_user"', async ({page}) => {
        await page.locator('[data-test="username"]').fill('standard_user')
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.locator('[data-test="login-button"]').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await expect(page.locator('[data-test="title"]')).toHaveText('Products')
    })
})
