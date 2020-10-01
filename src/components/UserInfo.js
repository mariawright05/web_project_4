class UserInfo {
  constructor(nameInput, jobInput, avatarInput) {
    this._name = nameInput;
    this._title = jobInput;
    this._avatar = avatarInput;
  }


  getUserTextInfo() {
    this._userData = {name:this._name.textContent,  title:this._title.textContent};
    return this._userData;
  }

  setUserTextInfo({ name, title }) {
    this._name.textContent = name;
    this._title.textContent = title;
  }

  getUserAvatarInfo() {
    this._userImage = {avatar:this._avatar.src};
    return this._userImage;
  }

  setUserAvatarInfo ({ avatar }) {
    this._avatar.src = avatar;
  }

}


export default UserInfo;