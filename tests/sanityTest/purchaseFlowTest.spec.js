const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Validate Page URL
    const currentUrl = page.url();
    console.assert(currentUrl === 'https://www.saucedemo.com/inventory.html',
        'Incorrect URL after login'
    );

    // Validate page title
    const title = await page.title();
    console.assert(title === 'Swag Labs',
        'Incorrect Title after login'
    );

    // Add 2 products
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Validate Cart Icon
    const cartBadge = await page.$eval('[data-test="shopping-cart-badge"]', (el) => el.textContent);
    console.assert(cartBadge === '2',
        'Incorrect number of items in cart badge'
    );

    // Navigate to the Cart
    await page.locator('[data-test="shopping_cart_link"]').click();

    // Validate Cart Page URL
    const cartUrl = page.url();
    console.assert(cartUrl === 'https://www.saucedemo.com/cart.html',
        'Incorrect URL after clicking the cart icon'
    );


    // Validate Cart Page Title
    const cartTitle = await page.title();
    console.assert(cartTitle === 'Your Cart',
        'Incorrect title of the cart page'
    );


    // Validate the cart items 
    const cartItems = await page.$$eval('.cart_item', (items) => items.length);
    console.assert(cartItems === 2,
        'Incorrect number of items in the cart'
    );

    // Click on Checkout in cart
    await page.locator('[data-test="checkout"]').click();

    // Validate Checkout Page URL
    const checkoutUrl = page.url();
    console.assert(checkoutUrl === 'https://www.saucedemo.com/checkout-step-one.html',
        'Incorrect URL after Checkout button click'
    );

    // Validate Checkout Page Title
    const checkoutTitle = await page.title();
    console.assert(checkoutTitle === 'Checkout: Your Information',
        'Incorrect title of the checkout page'
    );

    // Fill out the Checkout Page
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12121');
    await page.locator('[data-test="continue"]').click();

    // Validate checkout-step-two
    const checkoutStep2 = page.url();
    console.assert(checkoutStep2 === 'https://www.saucedemo.com/checkout-step-two.html',
        'Incorrect URl after continue'
    );

    // Validate title checkout-step-two
    const checkoutStep2Title = await page.title();
    console.assert(checkoutStep2Title === 'Checkout: Overview',
        'Incorrect Title after continue'
    );

    // Checkout button Click
    await page.locator('[data-test="finish"]').click();

    // final checkout
    const checkoutEnd = page.url();
    console.assert(checkoutEnd === 'https://www.saucedemo.com/checkout-complete.html',
        'Incorrect URl after finish'
    );


    // Validate title checkout-step-two
    const checkoutEndTitle = await page.title();
    console.assert(checkoutEndTitle === 'Checkout: Complete!',
        'Incorrect Title after finish'
    );
    // Verify Success Message
    const successMessage = await page.$eval('.complete-header', (el) => el.textContent);
    console.assert(successMessage === 'THANK YOU FOR YOUR ORDER',
        'Thank You Message is not displayed'
    );

    const successText = await page.$eval('#checkout_complete_container', (el) => el.textContent);
    console.assert(successText.includes('Your order has been dispatched, and will arrive just as fast as the pony can get there!'),
        'Order confirmation text is not present'
    );


    await browser.close();
})();
