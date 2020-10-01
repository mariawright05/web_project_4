class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // 2. Loads cards from the server
  // GET https://around.nomoreparties.co/v1/groupId/cards
  getCardList() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    .catch(err => console.log(err))
  }

  // 1. Loads user info from the server
  // GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    .catch(err => console.log(err))
  }

  // 4. Adds new card to server from add card form
  // POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ title, url }) {
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

  // 6. Create a Popup for deleting a card (not here)
  // Also make trash icon appear only on my cards (not here)

  // 7. Delete a card from server
  // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: "DELETE",
    })
    // .then(console.log(cardID))
    .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    .catch(err => console.log(err))
  }

  // _handleCardDelete() {
  //   this._card.remove();
  //   this._card = null;
  // }

  // 5. Show how many likes a card has (not here)

  // 8. Add and remove likes
  // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  changeLikeCardStatus(cardID, like) {

  }

  // 3. Adds user info to the server from edit user form
  // PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({ name, title }) {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name, 
        about: title
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    .catch(err => console.log(err));
  }


  // 9. Add profile picture to server
  // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({ url }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error! ' + res.statusText))
    .catch(err => console.log(err));
  }
}

export default Api;

