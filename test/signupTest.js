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

        // Step 1 : Fill out inputs and submit the form
        
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
            .expect(username.getAttribute('class')).eql('form-control is-autocheck-successful', 'valid password') // validate email
            .debug()
            
            .typeText(email, 'testcafeEmail@email.com') // tape email
            .expect(email.getAttribute('class')).eql('form-control is-autocheck-successful', 'valid email') // validate email
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
        
        // Captcha verification with success
        await t
            // .debug()
            .expect(await Selector('svg[class="octicon octicon-check text-green"]').exists).ok() // captch verification pass with success
            .catch((reason) => {
                console.error(reason.type);
            });

        // Submit button
        const signup_btn = await Selector('button[id="signup_button"]');

        await t
            // .debug()
            .setTestSpeed(0.1)

            // Input data check
            .expect(username.value).contains('testcafeUsername', 'username input contains text "testcafeUsername"')
            .expect(username.value).contains('testcafeUsername', 'username input contains text "testcafeEmail@email.com"')
            .expect(password.value).contains('testcafePassword123', 'password input contains the password')

            // Singup Check
            .expect(signup_btn.exists).ok()
            .expect(signup_btn.getAttribute('type')).eql('submit')
            .click(signup_btn)

            .catch((reason) => {
                console.error(reason.type);
            });

            const continuebtn = await Selector('button[class="btn btn-primary js-choose-plan-submit"]');

        // Step 2 : Choose the plan and continue
        await t
            .debug()
            
            .setTestSpeed(0.1)
            .expect(continuebtn.exists).ok()
            .expect(continuebtn.getAttribute('type')).eql('submit', 'input type valid')
            .click(continuebtn)
            
            .catch((reason) => {
                console.error(reason.type);
            });

        // Step 3 : Survey

        const prog_exp_very = await Selector('input[value="476"]');
        // const prog_exp_some = await Selector('input[value="475"]');
        // const prog_exp_new = await Selector('input[value="461"]');

        const github_uses_plan_dev = await Selector('input[value="468"]');
        // ....

        const describe_pro = await Selector('input[value="470"]');
        // ...

        const submit_input = await Selector('input[type="submit"]')

        await t
            .setTestSpeed(0.1)
            .debug()
            .expect(prog_exp_very.exists).ok()
            .expect(prog_exp_very.getAttribute('type')).eql('radio')
            .click(prog_exp_very)

            .debug()
            .expect(github_uses_plan_dev.exists).ok()
            .expect(github_uses_plan_dev.getAttribute('type')).eql('checkbox')
            .click(github_uses_plan_dev)
            .expect(github_uses_plan_dev.checked).ok()

            .debug()
            .expect(describe_pro.exists).ok()
            .expect(describe_pro.getAttribute('type')).eql('radio')
            .click(describe_pro)

            .debug()
            .expect(submit_input.exists).ok()
            .click(submit_input)

            .catch((reason) => {
                console.error(reason.type);
            });
    })
    .after( async t => {
        await t.debug();
    });