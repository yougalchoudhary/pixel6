// query to get user name from url
const url = new URL(window.location.href);
const userName = url.searchParams.get("name");

// set message with user name
document.getElementById(
  "userName"
).innerHTML = `Dear ${userName} Thank you for your inquiry A 4 digit verification number has been sent to your phone number, please enter in the following box and submit for confirmation`;

// count variable to count the number of time user enter the otp
let count = 0;

// function to handle and validate otp form number
const otpHandler = () => {
  count++;
  const otp = document.getElementById("otp").value;
  // if otp match then navigate to success page
  if (otp === "12345") {
    window.location.href = `./success.html`;
  } else {
    // else ask for re-enter otp and check the count is less then or equal to 3
    if (count <= 3) {
      document.getElementById("otp").value = "";
      document.getElementById("error").innerHTML = "re-enter the correct OTP";
    } else {
      // if greater the 3 attempts then navigate to error page
      window.location.href = `http://pixel6.co/error`;
    }
  }
};
