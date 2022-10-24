class Auth {
  constructor() {
    this._baseUrl = "https://auth.nomoreparties.co";
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  signup(password, email) {
    debugger;
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }

  signin(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       "password": password,
        "email": email,
      }),
    })
      .then((res) => this._checkResponse(res))
      .catch((e) => console.log(e))
  }

  tokenValidity(JWT) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
    })
      .then((res) => this._checkResponse(res))
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }
}

const auth = new Auth();
export default auth;
