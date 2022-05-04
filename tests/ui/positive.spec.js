// @ts-check
const { test, expect } = require("@playwright/test")

const { RegistrationPage } = require("../../pages/Registration")
const { LoginPage } = require("../../pages/Login")
const { SettingsPage } = require("../../pages/Settings")

test.describe.serial("Happy Path", () => {
  const mfaCode = "9999"
  let email = "user@test.com"
  const password = "Kosmos12@"
  const newPassword = "Kosmos56@"

  test("Should create a new user account", async ({ page }) => {
    const Registration = new RegistrationPage(page)

    await Registration.open()
    await expect(Registration.heading).toHaveText("Sign Up to getting started")

    // Generate and save a random email address for future use
    email = email.replace("user", Registration.uid)

    await Registration.enterEmail(email)
    await Registration.enterName("Test User")
    await Registration.enterPassword(password)
    await Registration.enterConfirmationPassword(password)
    await Registration.enterPhoneNumber("+123456789")
    await Registration.acceptLegalDocuments()

    await Registration.submit()

    await expect(page).toHaveURL("/pba") // Verify that the Confirm phone number page is opened
    await Registration.enterPhoneVerificationCode(mfaCode)
    await Registration.submitVerificationCode()
    await expect(Registration.numberVerifiedModal).toBeVisible()
  })

  test("Should log in as the newly created user", async ({ page }) => {
    const Login = new LoginPage(page)

    await Login.open()
    await expect(Login.heading).toHaveText("Log in to getting started")

    await Login.enterEmail(email)
    await Login.enterPassword(password)
    await Login.acceptLegalDocuments()
    await Login.submitCredentials()

    // Verify that the Events page is opened
    await expect(page).toHaveURL("/events")
  })

  test("Should add user's address", async ({ page }) => {
    const Login = new LoginPage(page)
    const Settings = new SettingsPage(page)

    await Login.open()
    await expect(Login.heading).toHaveText("Log in to getting started")

    await Login.enterEmail(email)
    await Login.enterPassword(password)
    await Login.acceptLegalDocuments()
    await Login.submitCredentials()

    // Verify that the Events page is opened
    await expect(page).toHaveURL("/events")

    await Settings.open()
    await expect(Settings.accountInformationLink).toBeVisible()
    await Settings.openProfileDetailsPage()

    // Verify that the Account information page is opened
    await expect(page).toHaveURL("/settings/account-information")

    await Settings.enterAddress("Ulica 5")
    await Settings.updateProfileInformation()

    await expect(Settings.toastMessage).toHaveText(
      "Account information saved successfully."
    )
  })

  test("Should change user's password ", async ({ page }) => {
    const Login = new LoginPage(page)
    const Settings = new SettingsPage(page)

    await Login.open()
    await expect(Login.heading).toHaveText("Log in to getting started")

    await Login.enterEmail(email)
    await Login.enterPassword(password)
    await Login.acceptLegalDocuments()
    await Login.submitCredentials()

    // Verify that the Events page is opened
    await expect(page).toHaveURL("/events")

    await Settings.open()
    await expect(Settings.loginDetailsLink).toBeVisible()
    await Settings.openLoginDetailsPage()

    // Verify that the Password & security page is opened
    await expect(page).toHaveURL("/settings/login-settings")

    await Settings.enterCurrentPassword(password)
    await Settings.enterNewPassword(newPassword)
    await Settings.enterConfirmationPassword(newPassword)
    await Settings.changePassword()

    await expect(Settings.toastMessage).toHaveText(
      "Password changed successfully."
    )
  })
})
