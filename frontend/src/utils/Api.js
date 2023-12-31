
class Api {
  constructor ({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  // Проверка ответа сервера после запроса
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  // Получение списка всех карточек в виде массива
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  // Добавление карточки
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkServerResponse)
  }
  // Удаление карточки
  deleteCardApi(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
  }

  // Загрузка информации о пользователе с сервера
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkServerResponse)
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  // Замена данных пользователя
  changeProfile(data) {
    console.log(data);
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkServerResponse)
  }

  // Замена аватара
  changeAvatar(data) {
    console.log(data);
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar})
    })
      .then(this._checkServerResponse)
  }

  // Добавление лайка карточке
  addLike(_id, isLiked) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers,
    })
      .then(this._checkServerResponse)
  }
  // Удаление лайка карточки
  deleteLike(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
  }

  // Общий промис для отрисовки страницы
  getPromiseAll() {
    return Promise.all([
      this.getCards(),
      this.getUser()
    ])
  }
}

const api = new Api({
  url: "https://api.mikryukovka.nomoreparties.sbs",
  headers: {
    authorization: "",
    "Content-Type": "application/json",
  }
})

export default api;
