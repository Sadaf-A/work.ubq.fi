import { trackDevRelReferral } from "./devrel-tracker";
import { getGitHubAccessToken } from "./getters/get-github-access-token";
import { getGitHubUser } from "./getters/get-github-user";
import { GitHubUser } from "./github-types";
import { displayGitHubUserInformation } from "./rendering/display-github-user-information";
import { renderGitHubLoginButton } from "./rendering/render-github-login-button";

export async function authentication() {

  const gitHubUser: null | GitHubUser = await getGitHubUser();
  if (gitHubUser) {
    trackDevRelReferral(gitHubUser.login + "|" + gitHubUser.id);
    await displayGitHubUserInformation(gitHubUser);
  }
  const accessToken = await getGitHubAccessToken();
  if (!accessToken) {
    renderGitHubLoginButton();
  }
}
