class Header {
  ROOT_element;
  headerClass;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderHeader() {
    const h1 = document.createElement("h1");
    h1.className = "title";
    h1.textContent = "Выберите тур";
    document.querySelector(this.ROOT_element).prepend(h1);
    this.headerClass = h1.className;
  }
  changeHeader(title) {
    document.querySelector(`.${this.headerClass}`).textContent = title;
  }
}

const HEADER_component = new Header(".app");
export { HEADER_component };
