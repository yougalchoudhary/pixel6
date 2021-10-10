const states = {
  madhayaPradesh: "123",
  maharastra: "456",
  goa: "789",
};

let phoneNumberValidate = false;

// function to manage service provider
const manageServiceProvider = (serviceProvider, stateNumber, dom) => {
  const img = document.getElementById("serviceProvider");

  // if valid service provider then set logo of service provider
  if (
    Number(serviceProvider) >= 621 &&
    Number(serviceProvider) <= 799 &&
    stateNumber === ""
  ) {
    img.src =
      "https://logos-world.net/wp-content/uploads/2020/11/Jio-Logo-2016-present.jpg";
    dom.value = `(${serviceProvider})-`;
  } else if (
    Number(serviceProvider) >= 801 &&
    Number(serviceProvider) <= 920 &&
    stateNumber === ""
  ) {
    img.src =
      "http://www.logotaglines.com/wp-content/uploads/2016/08/idea-cellular-logo.jpg";
    dom.value = `(${serviceProvider})-`;
  } else if (
    Number(serviceProvider) >= 921 &&
    Number(serviceProvider) <= 999 &&
    stateNumber === ""
  ) {
    img.src =
      "https://images.livemint.com/img/2020/09/07/1600x900/Logo_Color_1599462534815_1599462543241.png";
    dom.value = `(${serviceProvider})-`;
  } else {
    if (serviceProvider.length >= 3) {
      const error = document.getElementById("error");
      error.innerHTML = "invalid number";
      phoneNumberValidate = true;
    } else {
      const error = document.getElementById("error");
      error.innerHTML = "";
    }
  }
};

// function for phone number validation in the given formate
const phoneNumberValidation = (value) => {
  let substringDivide = 0;

  if (value.length >= 4) {
    substringDivide = 1;
  }

  const serviceProvider = value.substring(substringDivide, 4);
  const stateNumber = value.substring(6, 9);
  const rest = value.substring(10, 14);
  const dom = document.getElementById("phoneNumber");

  manageServiceProvider(serviceProvider, stateNumber, dom);

  if (!isNaN(stateNumber) && stateNumber.length > 0 && rest === "") {
    dom.value = `(${serviceProvider})-${stateNumber}`;
  }

  if (value.length === 9) {
    dom.value = `(${serviceProvider})-${stateNumber}-`;
  }

  if (rest) {
    dom.value = `(${serviceProvider})-${stateNumber}-${rest}`;
  }

  const stateName = Object.keys(states).find(
    (stateKeys) => states[stateKeys] === stateNumber
  );

  if (stateNumber.length >= 3) {
    // set state Name if found
    if (stateName) {
      document.getElementById("stateName").innerHTML = stateName;
      document.getElementById("error").innerHTML = "";
    } else {
      document.getElementById("error").innerHTML = "invalid number";
      phoneNumberValidate = false;
    }
  }

  if (value.length < 14) {
    phoneNumberValidate = false;
  }
};

// function for full name validation
const fullNameValidation = (value) => {
  const regex = /^[a-zA-Z ]*$/;

  if (!regex.test(value)) {
    return false;
  } else {
    const splitedName = value.split(" ");
    if (splitedName[0].length < 4 || splitedName[1].length < 4) {
      return false;
    } else {
      return true;
    }
  }
};

// function for email validation
const emailValidation = (value) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value);
};

// function to validate user name and email in the given formate
const validate = (name, email) => {
  const isValid = {};
  isValid.name = fullNameValidation(name);
  isValid.email = emailValidation(email);

  if (!isValid.email) {
    const emailValidator = document.getElementById("emailError");
    emailValidator.innerHTML = "Not a valid email";
  } else {
    const emailValidator = document.getElementById("emailError");
    emailValidator.innerHTML = "";
  }

  if (!isValid.name) {
    const nameValidator = document.getElementById("fullNameError");
    nameValidator.innerHTML = "Not a valid name";
  } else {
    const nameValidator = document.getElementById("fullNameError");
    nameValidator.innerHTML = "";
  }

  if (!phoneNumberValidate) {
    const nameValidator = document.getElementById("error");
    nameValidator.innerHTML = "Not a valid Number";
  } else {
    const nameValidator = document.getElementById("error");
    nameValidator.innerHTML = "";
  }
  return { ...isValid, phoneNumberValidate };
};

// function to accept form data from html page
const submitFormHandler = () => {
  const assignmentForm = document.getElementById("assignmentForm");
  const form = new FormData(assignmentForm);

  const name = form.get("fullName");
  const email = form.get("email");
  const isValid = validate(name, email); // validate function is use to validate html form data
  const notValidForm = Object.keys(isValid).some(
    (isValidKey) => isValid[isValidKey] === false
  );

  // if form is valid then navigate to otp page
  if (!notValidForm) {
    window.location.href = `./otpForm.html?name=${name.split(" ")[0]}`;
  }
};
