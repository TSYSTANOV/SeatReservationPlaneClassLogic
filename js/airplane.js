import { API_component } from "./API.js";
import { TOUR_component } from "./chooseTour.js";
import { HEADER_component } from "./header.js";
import { LOCAL_STORAGE_component } from "./localStorage.js";

class AirPlane {
  ROOT_element;
  checkedPlaces = [];
  boockedPlaces = [];
  constructor(root) {
    this.ROOT_element = root;
  }
  async renderPlane(PassengersData) {
    HEADER_component.changeHeader("Выберите свои места");
    const tours = await API_component.getData();

    const { scheme } = tours.filter(
      (el) => el.id === PassengersData[0].tourID
    )[0];
    this.boockedPlaces = LOCAL_STORAGE_component.getItem(
      PassengersData[0].tourID
    ).map((elem) => elem.seat);
    console.log(scheme);
    const planeFuselage = this.createPlaneFuselage(scheme);

    const form = document.createElement("form");
    form.className = "choises-seat";
    const fuselage = document.createElement("fieldset");
    fuselage.className = "plane";
    fuselage.setAttribute("name", "plane");
    fuselage.append(
      this.createCockpit(PassengersData.length),
      ...planeFuselage
    );

    form.append(fuselage);
    document.querySelector(this.ROOT_element).append(form);
    this.addListenerFoSeats(fuselage, PassengersData.length);
    this.addListenerForForm(form, PassengersData);
  }
  createCockpit(count) {
    const div = document.createElement("div");
    div.className = "cockpit";
    div.innerHTML = `
    <h1 class="cockpit-title">Выберите ${count} м</h1>
    <button class="cockpit-confirm" type="submit">Подтвердить</button>`;
    return div;
  }
  createPlaneFuselage(schene) {
    let placeNumber = 1;
    const fuselage = schene.map((item) => {
      if (item === "exit") {
        return this.createExitFuselage();
      } else {
        const seats = this.createSeats(item, placeNumber);
        placeNumber += item;
        console.log(placeNumber);
        return seats;
      }
    });
    return fuselage;
  }
  createExitFuselage() {
    const div = document.createElement("div");
    div.className = "exit fuselage";
    return div;
  }
  createSeats(number, placeNum) {
    let placeNumber = placeNum;
    let rowPlaces = 1;
    const ol = document.createElement("ol");
    ol.className = "fuselage";

    const alfavit = ["A", "B", "C", "D", "E", "F"];
    const boockedPlaces = this.boockedPlaces;
    createPlacesInPlane();
    function createPlacesInPlane() {
      const li = document.createElement("li");
      const seats = document.createElement("ol");
      seats.className = "seats";
      let elems = [];
      for (let i = 0; i < alfavit.length; i++) {
        const seatPlace = document.createElement("li");
        seatPlace.className = "seat";
        seatPlace.innerHTML = `
        <label
          ><input name="seat" type="checkbox" value="${placeNumber}${alfavit[i]}"
        /></label>
      `;

        if (boockedPlaces.includes(placeNumber + alfavit[i])) {
          seatPlace.querySelector("input").disabled = true;
        }
        elems.push(seatPlace);
      }

      seats.append(...elems);
      li.append(seats);
      ol.append(li);
      if (rowPlaces < number) {
        rowPlaces++;
        placeNumber++;
        createPlacesInPlane();
      }
    }
    return ol;
  }
  addListenerFoSeats(HTMLelement, countPassengers) {
    HTMLelement.addEventListener("click", () => {
      if (event.target.tagName !== "INPUT") {
        return;
      } else {
        if (this.checkedPlaces.includes(event.target.value)) {
          this.checkedPlaces.splice(
            this.checkedPlaces.indexOf(event.target.value),
            1
          );
          this.changeAllPlaces(HTMLelement, false);
        } else {
          if (this.checkedPlaces.length !== countPassengers) {
            this.checkedPlaces.push(event.target.value);
            if (this.checkedPlaces.length === countPassengers) {
              this.changeAllPlaces(HTMLelement, true);
            }
          }
        }
        console.log(this.checkedPlaces);
      }
    });
  }
  addListenerForForm(HTMLelement, PassengersData) {
    HTMLelement.addEventListener("submit", () => {
      event.preventDefault();
      if (PassengersData.length !== this.checkedPlaces.length) {
        return;
      }
      const passengersInfo = PassengersData.map((passenger, index) => {
        passenger.seat = this.checkedPlaces[index];
        return passenger;
      });
      const data = LOCAL_STORAGE_component.getItem(passengersInfo[0].tourID);
      data.push(...passengersInfo);
      LOCAL_STORAGE_component.setItem(passengersInfo[0].tourID, data);
      this.closeForm();
      HEADER_component.changeHeader(
        `Спасибо, Ваши места ${this.checkedPlaces.join(", ")}`
      );
      this.checkedPlaces = [];
      setTimeout(() => {
        TOUR_component.renderForm();
      }, 2000);
    });
  }
  changeAllPlaces(HTMLelement, disable) {
    HTMLelement.querySelectorAll("input").forEach((el) => {
      if (disable) {
        if (!this.checkedPlaces.includes(el.value)) {
          el.disabled = true;
        }
      } else {
        if (!this.boockedPlaces.includes(el.value)) {
          el.disabled = false;
        }
      }
    });
  }
  closeForm() {
    document.querySelector(this.ROOT_element).innerHTML = "";
  }
}

const AIRPLANE_component = new AirPlane(".person-data");
export { AIRPLANE_component };
