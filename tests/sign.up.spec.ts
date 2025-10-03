import { test, expect } from 'fixtures/test'
import { RepmoveUser } from 'data/users';
import { SignInPage } from 'pages/signIn';
import { Industry } from 'data/enums';


test('T0007 - User can sign up using email method',
  async ({ SignUpPage, DashboardPage }) => {
    await SignUpPage.navigate()
    const user = RepmoveUser.generateRegistrationData()
    await SignUpPage.firstNameInput.fill(user.fistName)
    await SignUpPage.lastNameInput.fill(user.lastName)
    await SignUpPage.companyNameInput.fill(user.companyName)
    await SignUpPage.industrySelect.click()
    await SignUpPage.industrySelectOption(Industry.InsuranceAndBenefits).click()
    await SignUpPage.emailInput.fill(user.email)
    await SignUpPage.selectPhoneCountry('+380')
    await SignUpPage.phoneNumberInput.fill('611111111')
    await SignUpPage.passwordInput.fill(user.password)
    await SignUpPage.signUpButton.click()
    await DashboardPage.verifyPagePath()
});

test('T0009 - The “Sign In” link is displayed on the Sign Up page and navigates to the Sign In page',
  async ({ SignUpPage, SignInPage }) => {
    await SignUpPage.navigate()
    await expect(SignUpPage.signInLink).toHaveText('Sign In')
    await SignUpPage.signInLink.click()
    await SignInPage.verifyPagePath()
});

test('T0010 - Input placeholders are displayed for the Sign Up form',
  async ({ SignUpPage, SignInPage }) => {
    await SignUpPage.navigate()
    await Promise.all([
      expect(SignUpPage.firstNameInputPlaceholder).toHaveText('First Name'),
      expect(SignUpPage.lastNameInputPlaceholder).toHaveText('Last Name'),
      expect(SignUpPage.companyNameInputPlaceholder).toHaveText('Company Name'),
      expect(SignUpPage.industrySelectPlaceholder).toHaveText('Industry'),
      expect(SignUpPage.emailInputPlaceholder).toHaveText('Email'),
      expect(SignUpPage.phoneNumberInputPlaceholder).toHaveText('Phone'),
      expect(SignUpPage.passwordInputPlaceholder).toHaveText('Password')
    ])
});

test('T0011 - Error messages for empty inputs on the Sign Up page',
  async ({ SignUpPage, SignInPage }) => {
    await SignUpPage.navigate()
    await Promise.all([
      expect(SignUpPage.firstNameInputPlaceholder).toHaveText('First Name'),
      expect(SignUpPage.lastNameInputPlaceholder).toHaveText('Last Name'),
      expect(SignUpPage.companyNameInputPlaceholder).toHaveText('Company Name'),
      expect(SignUpPage.industrySelectPlaceholder).toHaveText('Industry'),
      expect(SignUpPage.emailInputPlaceholder).toHaveText('Email'),
      expect(SignUpPage.phoneNumberInputPlaceholder).toHaveText('Phone'),
      expect(SignUpPage.passwordInputPlaceholder).toHaveText('Password')
    ])
});

test('T0012 - Error messages for the “First Name” input on the Sign Up page',
  async ({ SignUpPage }) => {
    await SignUpPage.navigate()
    await SignUpPage.firstNameInput.fill('a')
    await expect(SignUpPage.firstNameInputErrorText).toHaveText('Min length for First Name is 2')
    await SignUpPage.firstNameInput.fill('aa')
    await expect(SignUpPage.firstNameInputErrorText).toBeVisible({visible: false})
});

test('T0013 - Error messages for the “Last Name” input on the Sign Up page',
  async ({ SignUpPage }) => {
    await SignUpPage.navigate()
    await SignUpPage.lastNameInput.fill('a')
    await expect(SignUpPage.lastNameInputErrorText).toHaveText('Min length for Last Name is 2')
    await SignUpPage.lastNameInput.fill('aa')
    await expect(SignUpPage.lastNameInputErrorText).toBeVisible({visible: false})
});

test('T0014 - Error messages for the “Company Name” input on the Sign Up page',
  async ({ SignUpPage }) => {
    await SignUpPage.navigate()
    await SignUpPage.signUpButton.click()
    await expect(SignUpPage.companyNameInputErrorText).toHaveText('The Company Name is required')
    await SignUpPage.companyNameInput.fill('a')
    await expect(SignUpPage.companyNameInputErrorText).toBeVisible({visible: false})
});

test('T0015 - Error messages for the “Industry” selector on the Sign Up page',
  async ({ SignUpPage }) => {
    await SignUpPage.navigate()
    await SignUpPage.signUpButton.click()
    await expect(SignUpPage.industrySelectErrorText).toHaveText('Please, select the industry')
    await SignUpPage.industrySelect.click()
    await SignUpPage.industrySelectOption(Industry.Medical).click()
    await expect(SignUpPage.industrySelectErrorText).toBeVisible({visible: false})
});

test('T0016 - Error messages for the “Email” input on the Sign Up page',
  async ({ SignUpPage }) => {
    await SignUpPage.navigate()
    await SignUpPage.signUpButton.click()
    await expect(SignUpPage.emailInputErrorText).toHaveText('Please, enter your email address')
    await SignUpPage.emailInput.fill('invalid email')
    await expect(SignUpPage.emailInputErrorText).toHaveText('Invalid email address')
    await SignUpPage.emailInput.fill(RepmoveUser.generateRegistrationData().email)
    await expect(SignUpPage.emailInputErrorText).toBeVisible({visible: false})
});

test('T0017 - Error messages for the “Phone” input on the Sign Up page',
  async ({ SignUpPage }) => {
    await SignUpPage.navigate()
    await SignUpPage.signUpButton.click()
    await expect(SignUpPage.phoneNumberInputErrorText).toHaveText('The Phone is required')
    await SignUpPage.selectPhoneCountry('+380')
    await SignUpPage.phoneNumberInput.fill('6')
    await expect(SignUpPage.phoneNumberInputErrorText).toHaveText('Wrong number format')
    await SignUpPage.phoneNumberInput.fill('611111111')
    await expect(SignUpPage.phoneNumberInputErrorText).toBeVisible({visible: false})
});

test('T0018 - Error messages for the “Password” input on the Sign Up page',
  async ({ SignUpPage }) => {
    await SignUpPage.navigate()
    await SignUpPage.signUpButton.click()
    await expect(SignUpPage.passwordInputErrorText).toHaveText('The Password is required')
    await SignUpPage.passwordInput.fill('1234')
    await expect(SignUpPage.passwordInputErrorText).toHaveText('Min length for Password is 5')
    await SignUpPage.passwordInput.fill('12345')
    await expect(SignUpPage.passwordInputErrorText).toBeVisible({visible: false})
});