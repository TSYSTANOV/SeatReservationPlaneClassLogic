import { API_component } from "./API.js";
import { HEADER_component } from "./header.js";
import { PASSENGERS_component } from "./passengers.js";

class chooseTour {
  ROOT_element;
  constructor(root) {
    this.ROOT_element = root;
  }
  async renderForm() {
    HEADER_component.changeHeader("Выберите тур");
    const form = document.createElement("form");
    form.className = "field";
    form.innerHTML = `
        <label class="field__label">Укажите количество человек (max: 6)</label>
        <select class="field__select" id="tour" name="tour"></select>
        <input class="field__input" id="count" name="count" type="number" placeholder="#" min="1" max="6" required="">
        <button class="btn-confirm" type="submit">Подтвердить</button>
        `;
    const tourData = await API_component.getData();

    const options = tourData.map((item) => {
      const option = document.createElement("option");
      option.setAttribute("value", item.id);
      option.textContent = item.tour;
      return option;
    });
    form.querySelector(".field__select").append(...options);
    document.querySelector(this.ROOT_element).append(form);
    this.addEventListener(form);
  }
  closeForm() {
    document.querySelector(this.ROOT_element).innerHTML = "";
  }
  addEventListener(HTMLelement) {
    HTMLelement.addEventListener("submit", () => {
      event.preventDefault();
      this.closeForm();
      PASSENGERS_component.renderForm({
        tourID: HTMLelement.tour.value,
        countPassengers: HTMLelement.count.value,
      });
    });
  }
}

const TOUR_component = new chooseTour(".person-data");
export { TOUR_component };
