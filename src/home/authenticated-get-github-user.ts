import { Octokit } from "@octokit/rest";

export async function authenticatedGetGitHubUser() {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substr(1)); // remove the '#' and parse
  const providerToken = params.get("provider_token");

  if (!providerToken) {
    throw new Error("Access token not found in URL fragment");
  }

  const octokit = new Octokit({ auth: providerToken });
  const response = (await octokit.request("GET /user")) as GitHubUserResponse;
  return response.data;
}

interface GitHubUserResponse {
  status: number;
  url: string;
  headers: {
    "cache-control": string;
    "content-type": string;
    etag: string;
    "last-modified": string;
    "x-accepted-oauth-scopes": string;
    "x-github-media-type": string;
    "x-github-request-id": string;
    "x-oauth-scopes": string;
    "x-ratelimit-limit": string;
    "x-ratelimit-remaining": string;
    "x-ratelimit-reset": string;
    "x-ratelimit-resource": string;
    "x-ratelimit-used": string;
  };
  data: GitHubUser;
}

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
