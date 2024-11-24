import {expect, test} from '@playwright/test'

test.describe('Google Test', () => {
    test('Validate login with existing user details', async ({page}) => {
        const googleURL = 'https://www.google.com'
        const searchBar = page.getByLabel('חיפוש', {exact: true})
        const playwrightResult = page.getByRole('link', {
            name: 'Playwright: Fast and reliable',
        })

        await page.goto(googleURL)
        await searchBar.click()
        await searchBar.fill('Playwright')
        await searchBar.press('Enter')
        await expect(playwrightResult).toBeVisible()
    })
})

test('Exercise 4', async ({page}) => {
    await page.goto('https://devexpress.github.io/testcafe/example/')
    await expect(page.getByTestId('tried-testcafe-checkbox')).not.toBeChecked()
    await expect(page.locator('#slider')).toBeDisabled()
})
test('Exercise 8', async ({page}) => {
    const myName = 'Netanel'
    const featuresCheckbox = [
        'remote-testing-checkbox',
        'parallel-testing-checkbox',
        'analysis-checkbox',
    ]

    await page.goto('https://devexpress.github.io/testcafe/example/')
    await expect(
        page.getByText(
            'This webpage is used as a sample in TestCafe tutorials.',
        ),
    ).toBeVisible()
    await page.getByTestId('macos-radio').check()

    for (const checkbox of featuresCheckbox) {
        await page.getByTestId(checkbox).check()
    }

    await page.getByTestId('tried-testcafe-checkbox').check()
    await page
        .getByTestId('preferred-interface-select')
        .selectOption('JavaScript API')
    await page.getByTestId('name-input').type(myName)
    await expect(page.getByTestId('submit-button')).toBeEnabled()
    await page.getByTestId('submit-button').click()
    await expect(page).toHaveURL(
        'https://devexpress.github.io/testcafe/example/thank-you.html',
    )
    await expect(page.getByText(`Thank you, ${myName}!`)).toBeVisible()
})
