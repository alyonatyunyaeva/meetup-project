const API_URL = "https://course-vue.javascript.ru/api";
class MeetupAPI {
  async login(opts = {}) {
    const { email, password } = opts;
    return fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  }
  async logout() {
    return fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({}),
    });
  }
  async uploadImg(opts = {}) {
    const { file } = opts;
    let formData = new FormData();
    formData.append("file", file);

    return fetch(`${API_URL}/images/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
  }
}
export const meetupApi = new MeetupAPI();
