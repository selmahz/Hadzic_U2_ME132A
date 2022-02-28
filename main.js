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
function addCharToData (characterList, character) { 
    characterList.push(character); 
}


//removes character based on name (hantera character listan och ta bort id)
function removeCharById (characterList, Id) {
    for (let i = 0; i < characterList.lenght; i++) {
    let character = characterList[i];

    if (character.id == id) {
        characterList.splice(i, 1);
        return;
       }
    }
} 


//return all characters based on house
function getCharByHouse (characterList, house) {
    let charByHouse = [];

    for (let character of characterList) {
        if (character.house.toLowerCase() == house.toLowerCase()) {
            charByHouse.push(character);
        }
    }

    return charByHouse;
}


//return all characters based on gender
function getCharByGender (characterList, gender) {
    let charByGender = [];

    for (let character of characterList) {
        if (character.gender.toLowerCase() == gender.toLowerCase()) {
            charByGender.push(character);
        }
    }

    return charByGender;
}


//return all characters based on patronum 
function getCharByPatronum (characterList, patronum) {
    let charByPatronum = [];

    for (let character of characterList) {
        if (character.patronum.toLowerCase() == patronum.toLowerCase()) {
            charByPatronum.push(character);
        }
    }

    return charByPatronum;
}


//return all characters based on bloodstatus 
function getCharByBlood (characterList, bloodstatus) {
    let charByBlood = [];

    for (let character of characterList) {
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
function renderCharacters(characterList) {
    let charactersElement = document.getElementById("HPchar");
    charactersElement.innerHTML = "";

    //go through alla characters and unsert html
    for (let character of characterList) {
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
    character.id = characterList[characterList.lenght - 1].id + 1;

    addCharToData(characterList, character);
    renderCharacters(characterList);

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
    removeCharById (characterList, id);
    renderCharacters (characterList);
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
    let characters = getCharByHouse(characterList, house);
    //re-render
    renderCharacters(characters);
}


// Filter by gender
function filterByGenderubmit (event) {
    event.preventDefault();

    //what house?
    let gender = document.getElementById("gender-house").value;
    //get by house
    let characters = getCharByHouse(characterList, gender);
    //re-render
    renderCharacters(characters);
}

