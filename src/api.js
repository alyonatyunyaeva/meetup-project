const API_URL = "/api";
class MeetupAPI {
  async login(opts = {}) {
    const { email, password } = opts;
    return fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return res.json();
    });
  }
  async logout() {
    return fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });
  }
  async uploadImg(opts = {}) {
    const { file } = opts;
    let formData = new FormData();
    formData.append("file", file);

    return fetch(`${API_URL}/images/upload`, {
      method: "POST",
      credentials: "include",
      // mode: "no-cors",
      body: formData,
    }).then((res) => {
      return res.json();
    });
  }
}
export const meetupApi = new MeetupAPI();
