import {Selector, ClientFunction} from 'testcafe'

// getLocation using ClientFunction
const getPageHref = ClientFunction(() => document.location.href.toString());

// 2 ° Fixture
fixture `GitHub SignIn`
    .page `https://github.com/`
    .meta({
        'author':'medaimane',
        'creationDate':'21-10-2018'
    })

// 3° test
test
    .meta('id', 'test006')
    .before( async t => {
        const login_link = await Selector('a').withText('Sign in');
        
        await t
            .expect(login_link.exists).ok()
            .click(login_link)
            
            .catch((reason) => {
                console.error(reason.type);
            });
    })
    ('Fake infos errors', async t => {
        
        // test page location
        await t
            .expect(await getPageHref()).eql('https://github.com/login', 'The page is valid');

        const signin_form = await Selector('form');

        await t
            .setTestSpeed(0.1)
            .debug()
            .expect(signin_form.exists).ok()
            .expect(signin_form.getAttribute('method')).eql('post', 'form method valid')
            .expect(signin_form.getAttribute('action')).eql('/session', 'form action valid')
            
            .catch((reason) => {
                console.error(reason.type);
            });

        const username = await Selector('input[id="login_field"]');
        const password = await Selector('input[id="password"]');

        await t
            .setTestSpeed(0.1)

            .expect(username.exists).ok()
            .expect(username.getAttribute('type')).eql('text', 'input type valid')
            .expect(username.value).eql('', 'username input is empty', { timeout: 500 })
            
            .expect(password.exists).ok()
            .expect(password.getAttribute('type')).eql('password', 'input type valid')
            .expect(password.value).eql('', 'password input is empty', { timeout: 500 })
            
            .catch((reason) => {
                console.error(reason.type);
            });
        
        await t
            .setTestSpeed(0.1)
            
            .typeText(username, 'faketestcafeUsername')
            .typeText(password, 'faketestcafePassword123')
            
            .catch((reason) => {
                console.error(reason.type);
            });

        const signin_btn = await Selector('input[type="submit"]');

        await t
            .setTestSpeed(0.1)
            
            .expect(username.value).contains('faketestcafeUsername', 'username input contains text "testcafeUsername"')
            .expect(password.value).contains('faketestcafePassword123', 'password input contains the password')
            
            .expect(signin_btn.exists).ok()
            .click(signin_btn)

            .expect(await Selector('div[class="flash flash-full flash-error"]').exists).ok()

            .catch((reason) => {
                console.error(reason.type);
            });
    })
    .after( async t => {            

        // test page location
        await t
            .debug()
            .expect(await getPageHref()).eql('https://github.com/session')
            .catch((reason) => {
                console.error(reason.type);
            });
    });