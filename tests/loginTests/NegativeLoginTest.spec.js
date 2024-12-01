import {expect, test} from '@playwright/test'

test.describe('Negative Login Suite', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/')
        await expect(page.getByText('Swag Labs')).toBeVisible()
    })

    test('Login with the user: Locked_out_user', async ({page}) => {
        await page.locator('[data-test="username"]').fill('locked_out_user')
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.locator('[data-test="login-button"]').click()
        await expect(page.locator('[data-test="error"]')).toHaveText(
            'Epic sadface: Sorry, this user has been locked out.',
        )
    })
})
