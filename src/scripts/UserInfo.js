class UserInfo {
  constructor(nameInput, jobInput) {
    this._name = nameInput;
    this._title = jobInput;
  }

  getUserInfo() {
    this._userData = {name:this._name.textContent,  title:this._title.textContent};
    return this._userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._title.textContent = data.title;
  }

}

export default UserInfo;