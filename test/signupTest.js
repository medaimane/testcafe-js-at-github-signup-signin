import {Selector, ClientFunction, RequestLogger} from 'testcafe';

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
        const signup_link = await Selector('a').withText('Sign up');
        
        await t
            .expect(signup_link.exists).ok()
            .click(signup_link)
            
            .catch((reason) => {
                console.error(reason.type);
            });
    })
    
    ('Register', async t => {

        // Selecting the form
        const signup_form = await Selector('form[id="signup-form"]');
        
        // Check for the form
        await t
            .debug()
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
            .debug()
            .setTestSpeed(0.1)

            // .expect(getPageHref()).eql('https://github.com/', 'the next page appear')
            
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
            .debug()
            .setTestSpeed(0.1)
            
            .typeText(username, 'testcafeUsername') // tape username
            .typeText(email, 'testcafeEmail@email.com') // tape email
            .typeText(password, 'testcafePassword123') // tape password
            
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
    })
    .after( async t => {});

// 2° test
test
    .meta('id', 'test002')
    .before( async t => {})
    ('Plan', async t => {
        
        const freeplan_rbtn = await Selector('input[value="free"]');
        // const proplan_rbtn = await Selector('input[value="pro"]');
        const setup_organization = await Selector('#setup_organization');
        const send_me_update = await Selector('#all_emails');
        
        const submitbtn = await Selector('.js-choose-plan-submit');

        await t
            debug()
            .setTestSpeed(0.1)
            .click(freeplan_rbtn)
            .click(send_me_update)
            .click(submitbtn)
            .catch((reason) => {
                console.error(reason.type);
            });
    })
    .after( async t => {});