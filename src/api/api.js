async function fetch_all_pages(url) {
  let haveResult = true;
  let result = [];
  let page = 1;

  while (haveResult) {
    const response = await fetch(`${url}?page=${page}`);
    const tmpItems = await response.json();
    if (tmpItems.length > 0) {
      result = result.concat(tmpItems);
      page++;
    } else {
      haveResult = false;
    }
  }

  return result;
}

let pathUrl = null;

export const api = {
  async getUsers(searchString) {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchString}`
    );
    return await response.json();
  },
  async getUserInfo(username) {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);
    return await response.json();
  },
  async getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    const data = await fetch_all_pages(url);

    return data;
  },
  async getIssues(owner, reponame, page) {
    const url = `https://api.github.com/repos/${owner}/${reponame}/issues?page=${page}`;
    const response = await fetch(url);
    return await response.json();
  },

  async getFiles(owner, reponame) {
    const url = `https://api.github.com/repos/${owner}/${reponame}/contents/`;
    const response = await fetch(url);
    return await response.json();
  },

  async getNewPath(owner, reponame, path) {
    const url = `https://api.github.com/repos/${owner}/${reponame}/contents/${path}`;
    const response = await fetch(url);
    return await response.json();
  },
};
