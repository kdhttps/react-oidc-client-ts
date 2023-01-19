export class UserAuthentication {
  constructor(userManager) {
    this.userManager = userManager
  }

  async getAccessToken() {
    try {
      const user = await this.userManager.getUser()
      return user?.access_token
    } catch (e) {
      throw new Error("Failed to get access token", e)
    }
  }

  async signinRedirect() {
    return this.userManager.signinRedirect()
  }

  async verifyCodeAndGetAccessToken() {
    try {
      const user = await this.userManager.signinCallback()
      return user?.access_token
    } catch (e) {
      throw new Error("Failed to get token by code", e)
    }
  }

  async renewToken() {
    try {
      const user = await this.userManager.signinSilent()
      return user?.access_token
    } catch (e) {
      throw new Error("Failed to renew token", e)
    }
  }

  async signoutRedirect() {
    return this.userManager.signoutRedirect()
  }
}
