class UserInfo {
  constructor(nameInput, jobInput) {
    this._name = nameInput;
    this._title = jobInput;
  }

  getUserInfor() {
    this._userData = {name:this._name.textContent,  title:this._title.textContent};
    return this._userData;
  }

  setUserInfor({ name, title }) {
    this._name.textContent = name;
    this._title.textContent = title;
  }

}

export default UserInfo;