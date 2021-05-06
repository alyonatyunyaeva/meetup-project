class MeetupAPI {
  async login(opts = {}) {
    const { email, password } = opts;
    return fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return res.json();
    });
  }
  async checkSession() {
    return fetch("/api/auth/user", {
      method: "GET",
    });
  }
  async register(email, fullname, password) {
    return fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, password }),
    }).then((res) => res.json());
  }
  async logout() {
    return fetch("/api/auth/logout", {
      method: "POST",
    });
  }
  async uploadImg(opts = {}) {
    const { file } = opts;
    let formData = new FormData();
    formData.append("file", file);

    return fetch("/api/images/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((res) => {
      return res.json();
    });
  }
  async createMeetup(opts) {
    return fetch("/api/meetups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(opts),
    }).then((res) => {
      return res.json();
    });
  }
  async updateMeetup(opts) {
    return fetch(`/api/meetups/${opts.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(opts),
    }).then((res) => {
      return res.json();
    });
  }
  async changeParticipation(id, method) {
    return fetch(`/api/meetups/${id}/participation`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  // async deleteParticipation(id) {
  //   return fetch(`/api/meetups/${id}/participation`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify(opts),
  //   }).then((res) => {
  //     return res.json();
  //   });
  // }
  async fetchMeetups() {
    return fetch("/api/meetups").then((res) => res.json());
  }
  async fetchMeetup(id) {
    return fetch(`/api/meetups/${id}`).then((res) => res.json());
  }
}
export const meetupApi = new MeetupAPI();
