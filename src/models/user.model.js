export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static addUser(name, email, password) {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password
    );
    users.push(newUser);
    return newUser//register if not logged in
  }

  static isValidUser(email, password) {
    const user = users.find(
      (u) =>
        u.email == email && u.password == password
    );
    return user;
  }
}

var users = [];
