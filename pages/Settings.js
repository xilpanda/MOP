exports.SettingsPage = class SettingsPage {
  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page
  }

  async open() {
    await this.page.goto("/settings")
  }

  get accountInformationLink() {
    return this.page.locator("text=Account information")
  }

  get loginDetailsLink() {
    return this.page.locator("text=Login details")
  }

  async openProfileDetailsPage() {
    await this.accountInformationLink.click()
  }

  async openLoginDetailsPage() {
    await this.loginDetailsLink.click()
  }

  async enterAddress(address) {
    await this.page.locator("#address").fill(address)
  }

  async updateProfileInformation() {
    await this.page
      .locator('[data-testid="account-information-button"]')
      .click()
  }

  get toastMessage() {
    return this.page.locator('[role="alert"]')
  }

  async enterCurrentPassword(password) {
    await this.page.locator("#current_password").fill(password)
  }

  async enterNewPassword(password) {
    await this.page.locator("#new_password").fill(password)
  }

  async enterConfirmationPassword(password) {
    await this.page.locator("#confirm_password").fill(password)
  }

  async changePassword() {
    await this.page.locator('[data-testid="change-password-button"]').click()
  }
}
