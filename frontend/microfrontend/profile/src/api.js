import Api from "../../src/utils/api";

export default class ProfileApi extends Api {
  setUserInfo({ name, about }) {
    return this.request(`/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  setUserAvatar({ avatar }) {
    return this.request(`/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}
