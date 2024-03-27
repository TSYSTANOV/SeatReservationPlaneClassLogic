class LocalStorage {
  setItem(name, body) {
    localStorage.setItem(name, JSON.stringify(body));
  }
  getItem(name) {
    return localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : [];
  }
}

const LOCAL_STORAGE_component = new LocalStorage();
export { LOCAL_STORAGE_component };
