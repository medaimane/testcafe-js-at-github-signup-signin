import {Selector, ClientFunction, RequestLogger} from 'testcafe';

// getLocation using ClientFunction
const getPageHref = ClientFunction(() => document.location.href.toString());

// 1 ° Fixture
fixture `GitHub SignUp`
    .page `https://github.com`
    .meta({
        'author':'medaimane',
        'creationDate':'21-10-2018'
    })
    .before(async ctx => {  /* fixture hooks */ })
    .after(async ctx => {})
    .beforeEach( async t => { /* test hooks*/ })
    .afterEach( async t => {});

// 1° test
test
    .meta('id', 't001')
    .meta('creationDate', '21-10-2018')
    
    .before( async t => {
        const signup_link = Selector('a').withText('Sign up');
        
        if(await signup_link.exists && await signup_link.visible){
            await t
                // .expect(signup_link.exists).ok()
                // .expect(signup_link.visible).ok()
                .click(signup_link)
                
                .catch((reason) => {
                    console.error(reason.type);
                });
        }
    })
    
    ('Register', async t => {

        // Selecting the form
        const signup_form = await Selector('form[id="signup-form"]');
        
        // Check for the form
        await t
            // .debug()
            .setTestSpeed(0.1)
            .expect(signup_form.exists).ok()
            .expect(signup_form.getAttribute('method')).eql('post', 'form method valid')
            .expect(signup_form.getAttribute('action')).eql('/join', 'form action valid')
            .catch((reason) => {
                console.error(reason.type);
            });


        // Inputs
        const username = await Selector('input[name="user[login]"]');
        const email = await Selector('input[name="user[email]"]');
        const password = await Selector('input[name="user[password]"]');

        // check the inputs
        await t
            // .debug()
            .setTestSpeed(0.1)

            // username input check
            .expect(username.exists).ok()
            .expect(username.getAttribute('type')).eql('text', 'input type valid')
            .expect(username.value).eql('', 'password input is empty')

            // email input check
            .expect(email.exists).ok()
            .expect(email.getAttribute('type')).eql('text', 'input type valid')
            .expect(email.value).eql('', 'password input is empty')

            // password input check
            .expect(password.exists).ok()
            .expect(password.getAttribute('type')).eql('password', 'input type valid')
            .expect(password.value).eql('', 'password input is empty')

            .catch((reason) => {
                console.error(reason.type);
            });

        // fill out the inputs
        await t
            // .debug()
            .setTestSpeed(0.1)
            
            .typeText(username, 'testcafeUsername') // tape username
            .expect(username.getAttribute('class')).eql('form-control is-autocheck-successful', 'valid password')
            .debug()
            
            .typeText(email, 'testcafeEmail@email.com') // tape email
            .expect(email.getAttribute('class')).eql('form-control is-autocheck-successful', 'valid email')
            .debug()

            .typeText(password, 'testcafePassword123') // tape password
            // Check if there is a valid and secure password string
            // .expect(await Selector('span[class="text-green"]').withText('more than 15 characters').exists).ok()
            // .debug()
            // .expect(await Selector('span[class="text-green"]').withText('or at least 7 characters').exists).ok()
            // .debug()
            // .expect(await Selector('span[class="text-green"]').withText('and including a number').exists).ok()

            .catch((reason) => {
                console.error(reason.type);
            });


        // Verify account with captcha
        // const funCaptcha = await Selector('div[id="FunCaptcha"]');
        // const funCaptchaCanvas = await Selector('canvas[id="FunCAPTCHA"]');
        
        await t
            .debug()
            
            // .expect(funCaptcha.exists).ok()
            // .debug()
            // .expect(funCaptchaCanvas.exists).ok()

            .expect(await Selector('svg[class="octicon octicon-check text-green"]').exists).ok()
            .catch((reason) => {
                console.error(reason.type);
            });

        // Submit button
        const signup_btn = await Selector('button[id="signup_button"]');

        await t
            .debug()
            .setTestSpeed(0.1)
            // Input data check
            .expect(username.value).contains('testcafeUsername', 'username input contains text "testcafeUsername"')
            .expect(username.value).contains('testcafeUsername', 'username input contains text "testcafeEmail@email.com"')
            .expect(password.value).contains('testcafePassword123', 'password input contains the password')

            // Singup Check
            .expect(signup_btn.exists).ok()
            .expect(signup_btn.getAttribute('type')).eql('submit')
            .click(signup_btn)  // submit a form

            .catch((reason) => {
                console.error(reason.type);
            });

        // const error_captcha = await Selector('div[id="js-flash-container"]')

        // if(error_captcha.exists && error_captcha.visible){
            
        // }
    })
    .after( async t => {
        await t.debug();
    });

// 2° test
test
    .meta('id', 'test002')
    .before( async t => {})
    ('Choose a plan', async t => {
        
        // const form = await Selector('form[class="setup-form"]');

        // Default free plan choosen automatically
        // const freeplan_rbtn = await Selector('input[value="free"]');
        // const proplan_rbtn = await Selector('input[value="pro"]');
        
        // const setup_organization = await Selector('#setup_organization');
        // const send_me_update = await Selector('#all_emails');
        
        const continuebtn = await Selector('button[class="btn btn-primary js-choose-plan-submit"]'); // .withText('Continue')

        // Test form inputs exists/type
        await t
            .setTestSpeed(0.1)
            
            // .expect(form.exists).ok()
            // .expect(form.getAttribute('method')).eql('post', 'method valid')

            // .debug()
            // .expect(freeplan_rbtn.exists).ok()
            // .expect(freeplan_rbtn.getAttribute('type')).eql('radio', 'input type valid')

            // .debug()
            // .expect(proplan_rbtn.exists).ok()
            // .expect(proplan_rbtn.getAttribute('type')).eql('radio', 'input type valid')

            // .debug()
            // .expect(setup_organization.exists).ok()
            // .expect(setup_organization.getAttribute('type')).eql('checkbox', 'input type valid')
            
            // .debug()
            // .expect(send_me_update.exists).ok()
            // .expect(send_me_update.getAttribute('type')).eql('checkbox', 'input type valid')
            
            .debug()
            .expect(continuebtn.exists).ok()
            .expect(continuebtn.getAttribute('type')).eql('submit', 'input type valid')
            
            .catch((reason) => {
                console.error(reason.type);
            });

        await t
            .debug()
            .setTestSpeed(0.1)
            
            
            // .click(send_me_update)
            // .expect(checkbox.checked).ok()
            // .debug()
            
            .click(continuebtn)
            
            .catch((reason) => {
                console.error(reason.type);
            });
    })
    .after( async t => {
        await t.debug();
    });