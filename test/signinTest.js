import {Selector, ClientFunction} from 'testcafe'

// getLocation usng ClientFunction
const getPageHref = ClientFunction(() => document.location.href.toString());

// 2 ° Fixture
fixture `GitHub SignIn`
    .page `https://github.com/`
    .meta({
        'author':'medaimane',
        'creationDate':'21-10-2018'
    })
    .before(async ctx => {})
    .after(async ctx => {})
    .beforeEach( async t => {})
    .afterEach( async t => {});

// 3° test
test
    .meta('id', 'test003')
    .before( async t => {
        const login_link = await Selector('a').withText('Sign in');
        
        await t
            .expect(login_link.exists).ok()
            .click(login_link)
            
            .catch((reason) => {
                console.error(reason.type);
            });
    })
    ('Signin with username', async t => {
        
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
            
            .typeText(username, 'testcafeUsername')
            .typeText(password, 'testcafePassword123')
            
            .catch((reason) => {
                console.error(reason.type);
            });

        const signin_btn = await Selector('input[type="submit"]');

        await t
            .setTestSpeed(0.1)
            
            .expect(username.value).contains('testcafeUsername', 'username input contains text "testcafeUsername"')
            .expect(password.value).contains('testcafePassword123', 'password input contains the password')
            
            .expect(signin_btn.exists).ok()
            .click(signin_btn)

            .expect(await Selector('div[class="flash flash-full flash-error"]').exists).notOk()

            .catch((reason) => {
                console.error(reason.type);
            });
    })
    .after( async t => {            

        // test page location
        await t
            .debug()
            .expect(await getPageHref()).eql('https://github.com/', 'The page is valid')
            .expect(await getPageHref()).notEql('https://github.com/session')
            .catch((reason) => {
                console.error(reason.type);
            });

        const user_links_dropdown = await Selector('#user-links').child('li').nth(2);
        const get_logged_username = await Selector('strong[class="css-truncate-target"]').textContent;
        const logoutbtn = await Selector('button[type="submit"]').withText('Sign out');

        await t
            .expect(user_links_dropdown.exists).ok()
            .click(user_links_dropdown)
            
            .setTestSpeed(0.2)
            .expect(get_logged_username).eql('testcafeUsername', 'The username checked on dropdown menu')
            .expect(logoutbtn.exists).ok()
            
            .setTestSpeed(0.1)
            .click(logoutbtn)
            
            .catch((reason) => {
                console.error(reason.type);
            });
    });