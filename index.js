console.log("Welcome to magical Notes!");
showNotes();


//If user add a note add it to loacal sorage

let ddBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
        console.log(notesObj);
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title:addTitle.value,
        text:addTxt.value
    } 
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();

});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += ` <div class="noteCard card m-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${index+1}. ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
        </div>
        </div>
        `
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing To show use add A note section above to add a note`;
    }


}

// function to delete a note

function deleteNote(index) {
    // console.log("I am deleting!", index);

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    console.log('Input Event Fired  ' + inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

});