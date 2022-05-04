exports.LoginPage = class LoginPage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page
  }

  async open() {
    await this.page.goto("/login")
  }

  get heading() {
    return this.page.locator(".main-container >> p").nth(1)
  }

  async enterEmail(email) {
    await this.page.locator("#email").fill(email)
  }
  async enterPassword(password) {
    await this.page.locator("#password").fill(password)
  }

  async acceptLegalDocuments() {
    await this.page.locator("label div >> nth=1").check()
  }

  async submitCredentials() {
    await this.page.locator('[data-testid="login-button"]').click()
  }
}
