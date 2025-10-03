import { test, expect } from 'fixtures/test'
import { RepmoveUser } from 'data/users';
import { SignInPage } from 'pages/signIn';


test('T0001 - The “Sign Up Now” link is displayed on the Sign In page and navigates to the Sign Up page',
  async ({ SignInPage, SignUpPage }) => {
    await SignInPage.navigate()
    await Promise.all([
      expect(SignInPage.signUpLink).toBeVisible(),
      expect(SignInPage.signUpLink).toHaveText('Sign Up Now')
    ])
    await SignInPage.signUpLink.click()
    await SignUpPage.verifyPagePath()
});

test('T0002 - User can sign in with correct credentials',
  async ({ SignInPage, DashboardPage, ApiClient }) => {
    const [navigate, user] = await Promise.all([
      SignInPage.navigate(),
      ApiClient.registerUser(RepmoveUser.generateRegistrationData())
    ])
    await SignInPage.emailInput.fill(user.credentials.email)
    await SignInPage.passwordInput.fill(user.credentials.password)
    await SignInPage.signInButton.click()
    await DashboardPage.verifyPagePath()
});

test('T0003 - The Sign In form has respective input placeholders',
  async ({ SignInPage }) => {
    await SignInPage.navigate()
    await Promise.all([
      expect(SignInPage.emailInputPlaceholder).toHaveText('Email'),
      expect(SignInPage.passwordInputPlaceholder).toHaveText('Password')
    ])
});

async function t004(SignInPage: SignInPage) {
    await SignInPage.navigate()
    await SignInPage.signInButton.click()
    await Promise.all([
      expect(SignInPage.emailInputErrorText).toHaveText('Please, enter your email address'),
      expect(SignInPage.passwordInputErrorText).toHaveText('The Password is required')
    ])
}

test('T0004 - Error text is displayed under respective input on the Sign In form',
  async ({ SignInPage }) => {
    await t004(SignInPage)
});

test('T0005 - Error text is not displayed under respective input on the Sign In form once you fulfil the requirements of the respective field',
  async ({ SignInPage }) => {
    await t004(SignInPage)
    await SignInPage.passwordInput.fill('1')
    await expect(SignInPage.passwordInputErrorText).toBeVisible({visible: false})
    await SignInPage.emailInput.fill('test@test')
    await expect(SignInPage.emailInputErrorText).toBeVisible({visible: false})
});

test('T0006 - Respective input placeholders are not shown once you enter some values to the Sign In form',
  async ({ SignInPage }) => {
    await SignInPage.navigate()
    const user = RepmoveUser.generateRegistrationData()
    await SignInPage.emailInput.fill(user.email)
    await SignInPage.passwordInput.fill(user.password)
    await Promise.all([
      expect(SignInPage.emailInputPlaceholder).toBeVisible(),
      expect(SignInPage.passwordInputPlaceholder).toBeVisible()
    ])
});

test('T0008 - Alert is displayed when user is trying to log in with incorrect credentials',
  async ({ SignInPage }) => {
    await SignInPage.navigate()
    const user = RepmoveUser.generateRegistrationData()
    await SignInPage.emailInput.fill(user.email)
    await SignInPage.passwordInput.fill(user.password)
    await SignInPage.signInButton.click()
    await expect(SignInPage.alertToast).toHaveText('Invalid to login')
});
