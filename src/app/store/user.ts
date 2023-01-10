export class User {
  constructor() { }

  getToken() {
    return localStorage.getItem('token')
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  logOut() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('username')
  }

  setId(id: number) {
    sessionStorage.setItem('userId', id.toString());
  }

  getId() {
    let id = sessionStorage.getItem('userId');
    return id ? parseFloat(id) : false;
  }

  setUsername(username: string) {
    sessionStorage.setItem('username', username);
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }
}