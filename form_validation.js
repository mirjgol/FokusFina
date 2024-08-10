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
