$(document).ready(function () {
  console.log("The DOM is fully loaded and ready to be manipulated.");

  // Initialize the loader and welcome message
  displayLoaderAndWelcomeMessage();

  // Initialize the date picker
  initDatePicker();

  // Initialize form validation
  setupFormValidation();

  // Initialize the masonry grid layout
  initializeMasonryGrid();

// ================================== Section 1: Loader and Welcome Message ======================================

// Function to display a loading screen and a welcome message using SweetAlert
function displayLoaderAndWelcomeMessage() {
  $(".loader").fadeIn("slow"); // Show the loader animation slowly

  setTimeout(function () {
    $(".loader").fadeOut("slow", function () {
      $(".container").fadeIn("slow", function () {
        // After loader fades out, show the main container and display a welcome message
        Swal.fire({
          icon: "info", // Info icon
          title: "Welcome!", // Title of the alert
          text: "Welcome to our website!", // Message content
          confirmButtonText: "OK", // Text for the confirmation button
          customClass: {
            popup: "custom-swal", // Custom class for the popup
            confirmButton: "swal2-confirm", // Custom class for the confirm button
          },
        });
      });
    });
  }, 3000); // Wait for 3 seconds before displaying the welcome message
}

// ===================================== Section 2: Datepicker Initialization =====================================

// Function to initialize the jQuery UI datepicker
function initDatePicker() {
  const today = new Date(); // Get today's date
  const maxAdvanceBookingDays = 90; // Maximum advance booking period (90 days)
  const maxDate = new Date(today); // Create a new date object for max date
  maxDate.setDate(today.getDate() + maxAdvanceBookingDays); // Set max date to 90 days from today

  // List of specific dates to block (e.g., holidays, fully booked days)
  const blockedDates = ["2024-12-25", "2025-01-01"]; // Update with actual blocked dates

  // Initialize the jQuery UI datepicker on the element with id 'appointmentDate'
  $("#appointmentDate").datepicker({
    dateFormat: "yy-mm-dd", // Set the date format (Year-Month-Day)
    minDate: today, // Minimum date (today)
    maxDate: maxDate, // Maximum date (90 days from today)
    changeMonth: true, // Allow month selection using a dropdown
    changeYear: false, // Disable year selection dropdown (to limit the booking window)
    defaultDate: today, // Default date set to today's date

    // Disable specific dates and weekends (e.g., Sundays, blocked dates)
    beforeShowDay: function (date) {
      const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
      const formattedDate = $.datepicker.formatDate("yy-mm-dd", date); // Format the date

      // Block Sundays and specified blocked dates
      if (dayOfWeek === 0 || blockedDates.includes(formattedDate)) {
        return [false, "", "Unavailable"]; // Disable the date with custom tooltip
      }
      return [true, "", ""]; // Enable all other dates
    },
  });
}

// ============================== Section 3: Form Validation Setup ================================
// Function to set up the form validation rules
function setupFormValidation() {
  // Add custom validation for strong passwords
  $.validator.addMethod(
    "StrongPassword",
    validateStrongPassword,
    "Password must be 8-12 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character"
  );

  // Initialize the jQuery validation plugin on the form with id 'signup_form'
  $("#signup_form").validate({
    rules: {
      user_name: {
        required: true,
        minlength: 3,
        maxlength: 15,
      },
      user_email: {
        required: true,
        email: true,
      },
      user_phone: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 15,
      },
      user_city: {
        required: true,
      },
      reservation_date: {
        required: true,
      },
      user_service: {
        required: true,
      },
      user_bio: {
        required: true,
        letterswithbasicpunc: true,
      },
    },
    highlight: addErrorBorder, // Apply error styles to the input field when invalid
    unhighlight: removeErrorBorder, // Remove error styles when the field is valid
    messages: {
      user_name: {
        required: "Please enter your name.",
        minlength: "Your name should be at least 3 characters long.",
        maxlength: "Your name should be no longer than 15 characters.",
      },
      user_email: {
        required: "Please enter your email address.",
        email: "Enter a valid email address (e.g., name@example.com).",
      },
      user_phone: {
        required: "Please enter your phone number.",
        digits: "Phone number should contain only numbers.",
        minlength: "Phone number should be at least 10 digits long.",
        maxlength: "Phone number should be no more than 15 digits.",
      },
      user_city: {
        required: "Please select a city from Pakistan.",
      },
      reservation_date: {
        required: "Please select a date for your reservation.",
      },
      user_service: {
        required: "Please select a service for your appointment.",
      },
      user_bio: {
        required: "Please describe any additional services needed.",
        letterswithbasicpunc: "Only letters and punctuation are allowed.",
      },
    },
    // Custom validation logic
    onkeyup: validateOnKeyup,
    onfocusout: validateOnFocusOut,
    onchange: validateOnChange,
    invalidHandler: function (event, validator) {
      // If the form has invalid inputs, show an error alert
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
    submitHandler: showSuccessAlert, // Show success alert when the form is valid
  });
}

// ============================== Section 4: Masonry Grid Setup ================================
// Function to initialize the Masonry grid layout
function initializeMasonryGrid() {
  const grid = document.querySelector(".grid");

  // Initialize Masonry layout on the grid
  const masonry = new Masonry(grid, {
    itemSelector: ".grid-item", // Each grid item class
    gutter: 10, // Space between items
  });

  // Ensure Masonry layout is triggered after images are loaded
  imagesLoaded(grid).on("always", () => {
    masonry.layout(); // Re-layout Masonry after images are fully loaded
  });

  // Log message when layout is complete
  masonry.on("layoutComplete", () => console.log("Layout completed"));
}

// ============================== Section 5: Custom Helper Functions ================================
// Function to validate if the password meets the strength requirements
function validateStrongPassword(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/.test(value);
}

// Helper function to add error border style
function addErrorBorder(element) {
  $(element).addClass("error-border").removeClass("success-border");
}

// Helper function to remove error border style
function removeErrorBorder(element) {
  $(element).addClass("success-border").removeClass("error-border");
}

// Function to display a success alert after the form is submitted
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
  }).then(function (result) {
    // Only submit the form if the user confirms the success alert
    if (result.isConfirmed) {
      form.submit();
    }
  });
}

// Validation function for keyup event
function validateOnKeyup(element) {
  $(element).valid(); // Validate the field on keyup
}

// Validation function for focusout event
function validateOnFocusOut(element) {
  $(element).valid(); // Validate the field when it loses focus
}

// Validation function for change event
function validateOnChange(element) {
  $(element).valid(); // Validate the field when the value changes
}

});