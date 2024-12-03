const { chromium } = require('playwright');

const negativeLoginScenarios = [
    { username: 'standard_user', password: 'incorrect_password', errorMessage: 'Epic sadface: Username and password do not match any user in this service' },
    { username: 'incorrect_username', password: 'secret_sauce', errorMessage: 'Epic sadface: Username and password do not match any user in this service' },
    { username: 'incorrect_username', password: 'incorrect_password', errorMessage: 'Epic sadface: Username and password do not match any user in this service' },
    { username: '', password: 'secret_sauce', errorMessage: 'Epic sadface: Username is required' },
    { username: 'standard_user', password: '', errorMessage: 'Epic sadface: Password is required' },
    { username: '', password: '', errorMessage: 'Epic sadface: Username is required' },
    { username: 'locked_out_user', password: 'secret_sauce', errorMessage: 'Epic sadface: Sorry, this user has been locked out.'}
];
await pag(async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });
    const context = await browser.newContext();

    for (const scenario of negativeLoginScenarios) {
        const page = await context.newPage();
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', scenario.username);
        await page.fill('#password', scenario.password);
        await page.click('[data-test="login-button"]');


        const errorMessage = await page.$eval('[data-test="error"]', (el) => el.textContent);
        console.assert(errorMessage === scenario.errorMessage,
            `Incorrect error message for  ${scenario.username} and ${scenario.password} combination`
        );
e.close();
    }
    await browser.close();

})();