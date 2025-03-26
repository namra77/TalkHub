$(document).ready(function () {

  // ================================= Section 1: Loader and Welcome Message =======================================
  
  // Function to handle the loader display and show the welcome message after a delay
  $(".loader").fadeIn("slow");

  setTimeout(function () {
    $(".loader").fadeOut("slow", function () {
      $(".container").fadeIn("slow", function () {
        Swal.fire({
          icon: "info",
          title: "Welcome!",
          text: "Welcome to our website!",
          confirmButtonText: "OK",
          customClass: {
            popup: "custom-swal", 
            confirmButton: "swal2-confirm", 
          },
        });
      });
    });
  }, 3000); 
  
  // ================================= Section 2: jQuery Validation Custom Method ================================

  // Add a custom validation method for strong passwords
  $.validator.addMethod(
    "StrongPassword",
    validateStrongPassword,
    "Password must be 8-12 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character"
  );
  

  // ================================= Section 3: Form Validation Setup ============================================

  // jQuery Validation setup for the signup form with rules and messages
  $("#signup_form").validate({
    rules: {
      user_fname: {
        required: true,
        minlength: 3,
        maxlength: 15,
      },
      user_lname: {
        required: true,
        minlength: 3,
        maxlength: 15,
      },
      user_email: {
        required: true,
        email: true,
        nowhitespace: true,
      },
      user_subject: {
        required: true,
        letterswithbasicpunc: true,
      },
      user_bio: {
        required: true,
        letterswithbasicpunc: true,
      },
    },
    highlight: addErrorBorder,
    unhighlight: removeErrorBorder,
    messages: {
      user_fname: {
        required: "Please enter your first name.",
        minlength: "Your name should be at least 3 characters long.",
        maxlength: "Your name should be no longer than 15 characters.",
      },
      user_lname: {
        required: "Please enter your last name.",
        minlength: "Your name should be at least 3 characters long.",
        maxlength: "Your name should be no longer than 15 characters.",
      },
      user_email: {
        required: "Please enter your email address.",
        email: "Enter a valid email address (e.g., name@example.com).",
        nowhitespace: "Email addresses cannot contain spaces.",
      },
      user_subject: {
        required: "Please describe any additional services needed.",
        letterswithbasicpunc: "Only letters and punctuation are allowed.",
      },
      user_bio: {
        required: "Please describe any additional services needed.",
        letterswithbasicpunc: "Only letters and punctuation are allowed.",
      },
    },
    onkeyup: validateOnKeyup,
    onfocusout: validateOnFocusOut,
    onchange: validateOnChange,
    invalidHandler: function (event, validator) {
      if (validator.numberOfInvalids()) {
        Swal.fire({
          icon: "error",
          title: "Form Error",
          text: "Please correct the errors in the form.",
          confirmButtonText: "OK",
          customClass: {
            popup: "custom-swal", 
            confirmButton: "swal2-confirm", 
          },
        });
      }
    },
    submitHandler: showSuccessAlert,
  });

  // ================================= Section 4: Strong Password Validation =======================================

  // Function to validate the strength of the password
  function validateStrongPassword(value) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/.test(value);
  }

  // ================================= Section 5: Error Border Styling ============================================

  // Function to add error styling to form fields
  function addErrorBorder(element) {
    $(element).addClass("error-border").removeClass("success-border");
  }

  // Function to remove error styling and add success styling to form fields
  function removeErrorBorder(element) {
    $(element).addClass("success-border").removeClass("error-border");
  }

  // ================================= Section 6: Success Message on Form Submit ================================
  
  // Function to show a success message after the form is successfully submitted
  function showSuccessAlert(form) {
    Swal.fire({
      icon: "success",
      title: "Form Submitted",
      text: "All fields are valid! Your form has been successfully submitted.",
      confirmButtonText: "OK",
      customClass: {
        popup: "custom-swal", 
        confirmButton: "swal2-confirm", 
      },
    }).then(function () {
      form.submit(); 
    });
  }

  // ================================= Section 7: Validation Trigger Functions ====================================

  // Functions to trigger validation on different events (keyup, focusout, change)
  
  function validateOnKeyup(element) {
    $(element).valid();
  }

  function validateOnFocusOut(element) {
    $(element).valid();
  }

  function validateOnChange(element) {
    $(element).valid();
  }

});
