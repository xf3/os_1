export class Api {
  constructor() {
    // стандартная реализация -- объект options
    this._token = "80a75492-21c5-4330-a02f-308029e94b63";
    this._groupId = "cohort0";
    this._address = "https://nomoreparties.co";
  }

  request(url, headers, rest) {
    return fetch(`${this._address}/${this._groupId}${url}`, {
      headers: {
        authorization: this._token,
        ...headers,
      },
      ...rest,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }
}
