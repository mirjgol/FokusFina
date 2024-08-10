// ***************************IMAGE SLIDER************************** 
// slider select


const slider = document.querySelector(".img-slider-container");

// select all slides


function getAllSlides() {
  return document.querySelectorAll(".img-slider-container .slide");
}

// controls event listeners

document.querySelector(".left").addEventListener("click", moveLeft);
document.querySelector(".right").addEventListener("click", moveRight);
document.querySelector(".play-pause").addEventListener("click", playPause);

// variables


let currentSlide = 1;
let automaticSlide = false;
let automaticSlideTimer;

// controlFunctions



function moveRight() {
  const allSlides = getAllSlides();
  slider.append(allSlides[0]);
  changeCurrentSlide("right");
  updateTitle();
}

function moveLeft() {
  const allSlides = getAllSlides();
  slider.prepend(allSlides[allSlides.length - 1]);
  changeCurrentSlide("left");
  updateTitle();
}

// slide function current


function changeCurrentSlide(direction) {
  const allSlides = getAllSlides();

  if (direction === "right") {
    currentSlide === allSlides.length ? (currentSlide = 1) : currentSlide++;
  } else {
    currentSlide === 1 ? (currentSlide = allSlides.length) : currentSlide--;
  }

  // h2 text change


  document.querySelector(".slides-title").innerText = `Slide ${currentSlide}`;
}

// title


function updateTitle() {
  const allSlides = getAllSlides();
  const title = allSlides[0].querySelector(".slider-img").alt;
  document.querySelector(".controls-container h2").innerText = title;
}

// autoslider function 3 seconds 

function playPause() {
  if (automaticSlide) {
    clearInterval(automaticSlideTimer);
    automaticSlide = false;
    document.querySelector(".play-pause").innerText = "Play";
  } else {
    automaticSlideTimer = setInterval(moveRight, 3000);
    automaticSlide = true;
    document.querySelector(".play-pause").innerText = "Pause";
  }
}

// autoslide

function startAutoSlide() {
  automaticSlideTimer = setInterval(moveRight, 3000); 
  automaticSlide = true;
}


updateTitle();
startAutoSlide();



// ************** FORM VALIDATION ***************** //

// event listener submit button



document.querySelector("#button-form").addEventListener("click", validateForm);

function validateForm(event) {
  event.preventDefault();

  // empty dataobject



  let data = {};

  // For errors
  let validationErrors = {};



  data.anrede = document.querySelector("#anrede").value;
  data.firstName = document.querySelector("#first-name").value;
  data.lastName = document.querySelector("#last-name").value;
  data.streetName = document.querySelector("#streetname").value;
  data.houseNumber = document.querySelector("#housenumber").value;
  data.plz = document.querySelector("#postleitzahl").value;
  data.location = document.querySelector("#location").value;
  data.email = document.querySelector("#email").value;
  data.message = document.querySelector("#message").value;


  // remove  span elements
  if (document.querySelector("form span")) {
    document.querySelectorAll("form span").forEach((element) => {
      element.remove();
    });
  }



  // form validation

  

  // ANREDE
  if (!data.anrede) {
    validationErrors.anrede = "Bitte Anrede eingeben.";
  } else if (data.anrede.length <4) {
    validationErrors.anrede = "Anrede muss mindestens 4 Zeichen enthalten";
  }

  // VORNAME
  if (!data.firstName) {
    validationErrors.firstName = "Bitte Vorname eingeben.";
  } else if (data.firstName.length <= 2) {
    validationErrors.firstName = "Vorname muss mindestens 2 Zeichen enthalten";
  }

  // NACHNAME
  if (!data.lastName) {
    validationErrors.lastName = "Bitte Nachname eingeben.";
  } else if (data.lastName.length <= 2) {
    validationErrors.lastName = "Nachname muss mindestens 2 Zeichen enthalten";
  }

  // STRASSE
  if (!data.streetName) {
    validationErrors.streetName = "Bitte Strassenname eingeben.";
  } else if (data.streetName.length <= 3) {
    validationErrors.streetName = "Strassenname muss mindestens 3 Zeichen enthalten";
  }

  // HAUSNUMMER
  if (!data.houseNumber) {
    validationErrors.houseNumber = "Bitte Hausnummer eingeben.";
  } else if (data.houseNumber.length > 3) {
    validationErrors.houseNumber = "Hausnummer darf maximal 3 Zeichen enthalten";
  }

  // PLZ
  if (!data.plz) {
    validationErrors.plz = "Bitte Postleitzahl eingeben";
  } else {
    const plzRegex = /^\\d{4}$/;
    if (!plzRegex.test(data.plz)) {
      validationErrors.plz = "Bitte eine gültige Postleitzahl eingeben";
    }
  }

  // ORT
  if (!data.location) {
    validationErrors.location = "Bitte Wohnort eingeben.";
  } else if (data.location.length < 2) {
    validationErrors.location = "Wohnort muss mindestens 2 Zeichen enthalten.";
  }

  // EMAIL
  if (!data.email) {
    validationErrors.email = "Bitte E-Mail Adresse eingeben.";
  } else {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(data.email)) {
      validationErrors.email = "Ungültige E-Mail Adresse.";
    }
  }

  // MESSAGE (optional)
  if (data.message !== "" && data.message.length < 10) {
    validationErrors.message = "Die Nachricht muss mindestens 10 Zeichen lang sein.";
  }

  if (Object.keys(validationErrors).length === 0) {
    console.log(data);
  } else {
    displayErrors(validationErrors);
  }
}

// errors function fo display



function displayErrors(errors) {
  Object.keys(errors).forEach((key) => {
    const errContainer = document.createElement("span");
    errContainer.innerHTML = errors[key];
    errContainer.style.color = "red";
    document.querySelector(`#${key}`).after(errContainer);
  });
}

// validation for each field



function validateField(field) {
  let value = field.value;
  let error = null;

  switch (field.id) {
    case 'anrede':
      if (!value) error = "Bitte Anrede eingeben.";
      else if (value.length <= 4) error = "Anrede muss mindestens 4 Zeichen enthalten";
      break;
    case 'first-name':
      if (!value) error = "Bitte Vorname eingeben.";
      else if (value.length <= 2) error = "Vorname muss mindestens 2 Zeichen enthalten";
      break;
    case 'last-name':
      if (!value) error = "Bitte Nachname eingeben.";
      else if (value.length <= 2) error = "Nachname muss mindestens 2 Zeichen enthalten";
      break;
    case 'streetname':
      if (!value) error = "Bitte Strassenname eingeben.";
      else if (value.length <= 3) error = "Strassenname muss mindestens 3 Zeichen enthalten";
      break;
    case 'housenumber':
      if (!value) error = "Bitte Hausnummer eingeben.";
      else if (value.length > 3) error = "Hausnummer darf maximal 3 Zeichen enthalten";
      break;
    case 'postleitzahl':
      const plzRegex = /^([1-9][0-9]{4})$/;
      if (!value) error = "Bitte Postleitzahl eingeben";
      else if (!plzRegex.test(value)) error = "Bitte eine gültige Postleitzahl eingeben";
      break;
    case 'location':
      if (!value) error = "Bitte Wohnort eingeben.";
      else if (value.length < 2) error = "Wohnort muss mindestens 2 Zeichen enthalten.";
      break;
    case 'email':
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!value) error = "Bitte E-Mail Adresse eingeben.";
      else if (!emailRegex.test(value)) error = "Ungültige E-Mail Adresse.";
      break;
    case 'message':
      if (value !== "" && value.length < 10) error = "Die Nachricht muss mindestens 10 Zeichen lang sein.";
      break;
  }

  if (error) {
    const errContainer = document.createElement("span");
    errContainer.innerHTML = error;
    errContainer.style.color = "red";
    field.after(errContainer);
  }
}

// focusout eventlistener


document.querySelectorAll("input, textarea").forEach(field => {
  field.addEventListener("focusout", () => validateField(field));
});



/** 
 * INSPIRATION CARDS
 */



/*** 
getData ();

async function getData() {

  const response = await fetch('inspiration.json')

  const data = await response.json()

  displayCards(data)

}

//

function displayCards (data) {

  data.forEach(card => {
    const ul = document.createElement ('ul')
    ul.classList.add('card')

    const template = `
<li><h2>Name:</h2>${card.title}</li>
<li><img height="200" src="images/${card.thumbnail}" alt="${card.title}"></li>
<li>Idee:${card.body}</li>
<li>Material:${card.material}</li>
<li>Funktion:${card.use}</li>
<li>Jahr:${card.year}</li>`

ul.innerHTML = template

document.querySelector(".inspiration-container").appendChild(ul)
  })
}

*/


/** 
 * INSPIRATION CARDS
 */


getInspirationData()

async function getInspirationData(){
  try{
    const response = await fetch('inspiration.json')
    const data = await response.json()

    displayData(data)


  } catch(error) {
    console.error("Fehler beim Abrufen der Daten:", error); // Fehler
  }
}

function displayData(inspirations) {
  const inspirationContainer = document.createElement('section')
  inspirationContainer.classList.add('inspiration-container')

  inspirations.forEach(inspiration => {
    const template = `
    <div class="inspiration">
  <h2>Title: ${inspiration.title}</h2>
  <img src="${inspiration.thumbnail}" alt="${inspiration.title}">
  <p>Idee: ${inspiration.body}</p>
  <p>Material: ${inspiration.material}</p>
  <p>Verwendung: ${inspiration.use}</p>
  <p>Entstehung: ${inspiration.year}</p>
</div>
    `

    inspirationContainer.innerHTML += template
  })

  document.querySelector('.inspiration-content').innerText= ''
  document.querySelector('.inspiration-content').appendChild(inspirationContainer)

}










