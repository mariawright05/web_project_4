class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // GET https://around.nomoreparties.co/v1/groupId/cards
  getCardList() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    .catch(err => console.log(err))
  }

  // GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    .catch(err => console.log(err))
  }

  getAppInfo() {
    // wait from results from last 2 functions, then render all of them together
  }

  // POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ title, url }) {
    console.log(title, url);
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: title, 
        link: url
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    .catch(err => console.log(err));
  }

  // 33:30
  // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  // removeCard(cardID) {
  //   return fetch(this._baseUrl + '/cards/', {
  //     headers: this._headers,
  //     method: "DELETE",
  //   })
  //   .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
  //   .catch(err => console.log(err))
  // }

  // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  changeLikeCardStatus(cardID, like) {

  }

    // PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({ name, about }) {

  }

  // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({ avatar }) {

  }
}

export default Api;

// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/group-3",
//   headers: {
//     authorization: "5707ddd2-2e4a-4b11-a4a0-b8d42848d184",
//     "Content-Type": "application/json"
//   }
// });