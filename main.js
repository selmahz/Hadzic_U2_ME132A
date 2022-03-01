"use strict";

//create new chracter and return it
function createNewCharacter(name, house, gender, patronum, bloodstatus) {
    let character = {
        name: name,
        house: house,
        gender: gender,
        patronum: patronum,
        bloodstatus: bloodstatus,
    }

    return character;
}

//add new dog to database 
function addCharacterToData(database, character) {

        database.push(character);
}


//remove character based on name from database
function removeCharacterById(characters, id) {
    for (let i = 0; i < characters.length; i++) {
        let character = characters[i];

        if (character.id == id) {
            let confirmCharacter = confirm(`Are you sure you want to remove ${character.name}?`);

            if (confirmCharacter) { 
                characters.splice(i, 1); //måste gå igenom alla karaktärer och efter DET ska det splica, confirm rutan måste ju komma innan den tar bort karaktär 
                return;
            }
        }
    }
}


//return all characters based on house 
function getCharactersByHouse(characters, house) {
    let charactersByHouse = [];

    for (let character of characters) {
        if (character.house.toLowerCase() == house.toLowerCase()) {
            charactersByHouse.push(character);
        }
    }

    return charactersByHouse;
}


//return all characters based on gender
function getCharactersByGender(characters, gender) {
    let charactersByGender = [];

    for (let character of characters) {
        if (character.gender.toLowerCase() == gender.toLowerCase()) {
            charactersByGender.push(character);
        }
    }

    return charactersByGender;
}


//render character into html element 
function renderCharacter(character) {
    let div = document.createElement("div");
    div.classList.add("character");
    div.id = character.id;

    div.innerHTML = `
    <div>${character.name}</div>
    <div>${character.house}</div>
    <div>${character.gender}</div>
    <div>${character.patronum}</div>
    <div>${character.bloodstatus}</div>
    <button type="button">Remove</button>
    `;

    return div;
}


//render array of characters into html
function renderCharacters(characters) {
    let charactersElement = document.getElementById("HPcharacters");
    charactersElement.innerHTML = "";

    for (let character of characters) {
        let characterElement = renderCharacter(character);
        charactersElement.appendChild(characterElement);
    }

    setRemoveCharacterHandlers();
}


//form add-char-form submitted 
function addCharacterSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
        if (name == "") {
            alert("Fill in all the information, please");
            return false;
        }

    let house = document.getElementById("house").value;
        if (house == "") {
            alert("Fill in all the information, please");
            return false;
    }

    let gender = document.getElementById("gender").value;
        if (gender == "") {
             alert("Fill in all the information, please");
            return false;
    }   

    let patronum = document.getElementById("patronum").value;
    if (patronum == "") {
        alert("Fill in all the information, please");
        return false;
    }

    let bloodstatus = document.getElementById("bloodstatus").value;
    if (bloodstatus == "") {
        alert("Fill in all the information, please");
        return false;
    }

    let character = createNewCharacter(name, house, gender, patronum, bloodstatus);

    character.id = database[database.length - 1].id + 1;

    addCharacterToData(database, character)
    renderCharacters(database);

    let form = document.getElementById("addHPcharacters");
    form.reset();
}

function setAddCharacterHandler() {
    let form = document.getElementById("addHPcharacters");
    form.addEventListener("submit", addCharacterSubmit);
}

//when clicking the remove button
function removeCharacterClick(event) {
    let button = event.target;
    let id = button.parentElement.id; 

    removeCharacterById(database, id);
    renderCharacters(database);
 }


//add click event handler to all remove-buttons
function setRemoveCharacterHandlers() {
    let buttons = document.querySelectorAll(".character button");

     for (let button of buttons) {
         button.addEventListener("click", removeCharacterClick);
    }
}


//filter by house 
function filterByHouse(event) {
    event.preventDefault();
    let house = document.getElementById("filter-house").value;
    let characters = getCharactersByHouse(database, house);
    renderCharacters(characters);
}

//filter by gender
function filterByGender(event) {
    event.preventDefault();
    let gender = document.getElementById("filter-gender").value;
    let characters = getCharactersByGender(database, gender);
    renderCharacters(characters);
}

function onShowAllClick() {
    document.getElementById("filter-house").value = "";
    document.getElementById("filter-gender").value = "";
    renderCharacters(database);
}

function setFilterCharacterHandlers() {
    let houseForm = document.getElementById("filter-by-house");
    let genderForm = document.getElementById("filter-by-gender");
    let showAll = document.getElementById("show-all");

    houseForm.addEventListener("submit", filterByHouse);
    genderForm.addEventListener("submit", filterByGender);
    showAll.addEventListener("click", onShowAllClick);
}

//adjust the page
renderCharacters(database);
setAddCharacterHandler();
setFilterCharacterHandlers();