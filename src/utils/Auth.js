class Auth {
  constructor() {
    this._baseUrl = "https://api.mesto479.nomoredomains.club";
  }

  signup(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) =>{
        if (res.ok) {
          console.log(res)
          return res.json();
        } else if(res.status === 400){
          console.log('Некорректно заполнено одно из полей ')
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((e) => console.log(e));
  }

  signin(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if(res.status === 400){
          console.log('Не передано одно из полей ')
        } else if(res.status === 401){
          console.log('Пользователь с email не найден')
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((e) => console.log(e));
  }
  tokenValidity(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if(res.status === 400){
          console.log('Токен не передан или передан не в том формате')
        } else if(res.status === 401){
          console.log('Переданный токен некорректен')
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch((e) => console.log(e));
  }
}
const auth = new Auth();
export default auth;
