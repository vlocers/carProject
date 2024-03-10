const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");
// UI objesini başlatma

const ui = new UI();
const storage = new Storage();


//tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addCar);
    
    document.addEventListener("DOMContentLoaded",function(){
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });

    cardbody.addEventListener("click",deleteCar);
    clear.addEventListener("click",clearAllCars);
}

function addCar(e){
    e.preventDefault();
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if(title ==="" || price ==="" || url===""){
        ui.displayMessages("Tüm alanları doldurun...","danger");
    }
    else{
        //yeni araç
        const newCar = new Car(title,price,url);
        ui.addCarToUI(newCar); //Arayüze araç ekleme
        storage.addCarToStorage(newCar);
        ui.displayMessages("araç başarıyla eklendi","success");
    }
    ui.clearInputs(titleElement,priceElement,urlElement);

    e.preventDefault();
}

function deleteCar(e){
    if(e.target.id === "delete-car"){

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarıyla gerçekleşti ","success");
        ui.deleteCarFromUI(e.target);
    }
}

function clearAllCars(){
    ui.clearAllCarsFromUI();
    storage.clearAllCarsFromStorage();
}