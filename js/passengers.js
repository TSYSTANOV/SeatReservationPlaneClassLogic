import { AIRPLANE_component } from "./airplane.js";
import { HEADER_component } from "./header.js";

class Passengers {
  ROOT_element;
  PassengersData = [];
  constructor(root) {
    this.ROOT_element = root;
  }
  renderForm(objectData) {
    HEADER_component.changeHeader("Введите свои данные");

    const { tourID, countPassengers } = objectData;

    for (let i = 1; i <= countPassengers; i++) {
      const form = document.createElement("form");
      form.className = "person";
      form.innerHTML = `
            <h2 class="person__title">Пассажир #${i}</h2>        
            <div class="field">
                <label class="field__label">ФИО</label>
                <input class="field__input" id="name${i}" name="name" type="text" placeholder="Введите ваше ФИО" required="">
            </div>
            <div class="field">
                <label class="field__label">Номер билета (10 цифр)</label>
                <input class="field__input" id="ticket${i}" name="ticket" type="text" placeholder="Номер билета" required="" minlength="10" maxlength="10">
            </div>        
            <button class="btn-confirm" type="submit">Подтвердить</button>`;
      this.addListener(form, tourID, countPassengers);
      document.querySelector(this.ROOT_element).append(form);
    }
  }
  addListener(HTMLelement, tourID, countPassengers) {
    HTMLelement.addEventListener("submit", () => {
      event.preventDefault();
      HTMLelement.name.disabled = true;
      HTMLelement.ticket.disabled = true;
      HTMLelement.querySelector("button").disabled = true;
      this.createPassenger(
        HTMLelement.name.value,
        HTMLelement.ticket.value,
        tourID,
        countPassengers
      );
    });
  }
  createPassenger(name, ticket, tourID, countPassengers) {
    this.PassengersData.push({
      name,
      ticket,
      tourID,
    });

    if (+this.PassengersData.length === +countPassengers) {
      this.closeForm();
      AIRPLANE_component.renderPlane(this.PassengersData);
      this.PassengersData = [];
    }
  }
  closeForm() {
    document.querySelector(this.ROOT_element).innerHTML = "";
  }
}

const PASSENGERS_component = new Passengers(".person-data");
export { PASSENGERS_component };
