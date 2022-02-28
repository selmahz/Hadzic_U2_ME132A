"use strict"

//create new chracter and return it
function createNewChar (name, house, gender, patronum, bloodstatus) {
    let character = {
        name: name,
        house: house,
        gender: gender,
        patronum: patronum,
        bloodstatus: bloodstatus
    }; 

    return character;
}


//add new character to database
function addCharToData (database, character) { 
    database.push(character); 
}


//removes character based on name (hantera character listan och ta bort id)
function removeCharById(characters, id) {
    for (let i = 0; i < characters.lenght; i++) {
    let character = characters[i];

    if (character.id == id) {
        characters.splice(i, 1);
        return;
       }
    }
} 


//return all characters based on house
function getCharByHouse (database, house) {
    let charByHouse = [];

    for (let character of characters) {
        if (character.house.toLowerCase() == house.toLowerCase()) {
            charByHouse.push(character);
        }
    }

    return charByHouse;
}


//return all characters based on gender
function getCharByGender (database, gender) {
    let charByGender = [];

    for (let character of characters) {
        if (character.gender.toLowerCase() == gender.toLowerCase()) {
            charByGender.push(character);
        }
    }

    return charByGender;
}


//return all characters based on patronum 
function getCharByPatronum (database, patronum) {
    let charByPatronum = [];

    for (let character of characters) {
        if (character.patronum.toLowerCase() == patronum.toLowerCase()) {
            charByPatronum.push(character);
        }
    }

    return charByPatronum;
}


//return all characters based on bloodstatus 
function getCharByBlood (characterList, bloodstatus) {
    let charByBlood = [];

    for (let character of database) {
        if (character.bloodstatus.toLowerCase() == bloodstatus.toLowerCase()) {
            charByBlood.push(character);
        }
    }

    return charByBlood;
}


//render a character into html element
function renderCharacter (character) {
    let div = document.createElement("div");
    div.classList.add("HPchar");
    div.id = HPchar.id; 

    div.innerHTML = `
        <div>${HPchar.name}</div>
        <div>${HPchar.house}</div>
        <div>${HPchar.gender}</div>
        <div>${HPchar.patronum}</div>
        <div>${HPchar.bloodstatus}</div>
        <button type="button">Remove</button>
    `;

    return div;
}


//render array of character into html 
function renderCharacters(database) {
    let charactersElement = document.getElementById("HPchar");
    charactersElement.innerHTML = "";

    //go through alla characters and unsert html
    for (let character of database) {
        let characterElement = renderCharacter(character);
        charactersElement.appendChild(characterElement);
    }

    //remove handlers for characters
    setRemoveCharacterHandlers(); 
}


// When <form id="add-dog-form"> is submitted
function onAddCharacterSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let house = document.getElementById("house").value;
    let gender = document.getElementById("gender").value;
    let patronum = document.getElementById("patronum").value;
    let bloodstatus = document.getElementById("bloodstatus").value;

    let character = createNewChar(name, house, gender, patronum, bloodstatus);

    //calculate new id 
    character.id = database[database.lenght - 1].id + 1;

    addCharToData(database, character);
    renderCharacters(database);

    //reset all fields in form 
    let form = document.getElementById("add-HPchar");
    form.reset();
}


//"click" event handler to button-add
function setAddCharacterHandler() {
    let form = document.getElementById("add-HPchar");
    form.addEventListener("submit", onAddCharacterSubmit);
}

// When user click remove-dog-button
function onRemoveCharacterClick (event) {
    let button = event.target;
    let id = button.parentElement.id;
    removeCharById (database, id);
    renderCharacters (database);
}


// Add "click" event handler to all remove-buttons
function setRemoveCharacterHandlers() {
    let buttons = document.querySelectorAll(".character button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveCharacterClick);
    }
}

// Filter by house
function filterByHouseSubmit (event) {
    event.preventDefault();

    //what house?
    let house = document.getElementById("filter-house").value;
    //get by house
    let characters = getCharByHouse(database, house);
    //re-render
    renderCharacters(characters);
}


// Filter by gender
function filterByGenderubmit (event) {
    event.preventDefault();

    //what house?
    let gender = document.getElementById("gender-house").value;
    //get by house
    let characters = getCharByHouse(database, gender);
    //re-render
    renderCharacters(characters);
}


//show all click
function showAllClick() {
    document.getElementById("filter-house").value = "";
    document.getElementById("filter-gender").value = "";

    renderCharacters(database);
}

//set filter
function setFilterHandlers() {
    let houseForm = document.getElementById("filter-by-house");
    let genderForm = document.getElementById("filter-by-gender");
    let showAll = document.getElementById("show-all");

    houseForm.addEventListener("submit", filterByGenderubmit);
    genderForm.addEventListener("submit", filterByGenderubmit);
    showAll.addEventListener("click", showAllClick);
}


//adjust the page 
renderCharacters(database);
setAddCharacterHandler();
setFilterHandlers();