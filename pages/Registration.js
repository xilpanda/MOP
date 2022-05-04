exports.RegistrationPage = class RegistrationPage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page
  }

  async open() {
    this.page.goto("/signup")
  }

  get heading() {
    return this.page.locator(".main-container >> p").nth(1)
  }

  async enterEmail(email) {
    await this.page.locator("#email").fill(email)
  }

  async enterName(name) {
    await this.page.locator("#name").fill(name)
  }

  async enterPassword(password) {
    await this.page.locator("#password").fill(password)
  }

  async enterConfirmationPassword(password) {
    await this.page.locator("#confirm_password").fill(password)
  }

  async enterPhoneNumber(phone) {
    await this.page.locator("#phone_number").fill(phone)
  }

  async acceptLegalDocuments() {
    await this.page.locator("label div >> nth=1").check()
    // await this.page
    //   .locator('input[data-testid="terms-and-conditions-signup"]')
    //   .check()
  }

  get uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  async submit() {
    await this.page.locator('[data-testid="signup-button"]').click()
  }

  async enterPhoneVerificationCode(code) {
    await this.page.locator("#registration_code").fill(code)
  }

  async submitVerificationCode() {
    await this.page.locator('[data-testid="pba-signup-button"]').click()
  }

  get numberVerifiedModal() {
    return this.page.locator("text=Your phone number is now verified")
  }
}
