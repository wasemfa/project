const { chromium } = require('playwright');

const users = [
    { username: 'problem_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce' },
    { username: 'error_user', password: 'secret_sauce' },
    { username: 'visual_user', password: 'secret_sauce' }
];
(async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });
    const context = await browser.newContext();
    for (const user of users) {
        const page = await context.newPage();

        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', user.username);
        await page.fill('#password', user.password);
        await page.click('[data-test="login-button"]');


        // Validate Page URL
        const currentUrl = page.url();
        console.assert(currentUrl === 'https://www.saucedemo.com/inventory.html',
            `Incorrect URL after login for ${user.username}`
        );

        // Validate page title
        const title = await page.title();
        console.assert(title === 'Swag Labs',
            `Incorrect Title after login for ${user.username}`
        );


        await page.close();
    }
    await browser.close();

})();
