
class Passengers{
    ROOT_element
    PassengersData = []
    constructor(root){
        this.ROOT_element = root
    }
    renderForm(objectData){
        const {tourID, countPassengers} = objectData
        console.log(countPassengers)

    //     <form class="person">
    //     <h2 class="person__title">Пассажир #1</h2>
        
    //     <div class="field">
    //       <label class="field__label">ФИО</label>
    //       <input class="field__input" id="name0" name="name" type="text" placeholder="Введите ваше ФИО" required="">
    //     </div>

    //     <div class="field">
    //       <label class="field__label">Номер билета (10 цифр)</label>
    //       <input class="field__input" id="ticket0" name="ticket" type="text" placeholder="Номер билета" required="" minlength="10" maxlength="10">
    //     </div>
        
    //     <button class="btn-confirm" type="submit">Подтвердить</button>
    //   </form>
    }
    createPassenger(){

    }
}

const PASSENGERS_component = new Passengers('.person-data')
export {PASSENGERS_component}