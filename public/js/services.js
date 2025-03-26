$(function () {
  console.log("The DOM is fully loaded and ready to be manipulated.");

  // ======================================= Loader and Welcome Message ==========================================
  // Initializes the loader and displays a welcome message when the page is ready.
  displayLoaderAndWelcomeMessage();

  // ============================================ Initialize Datepicker ===========================================
  // Initializes the datepicker with specific configurations (like date range and blocked dates).
  initDatePicker();

  // =========================================== Initialize Form Validation ======================================
  // Initializes form validation for the signup form.
  setupFormValidation();


  /* ================================* Section 1: Loader and Welcome Message* ===================================== */
  // Function to display loader and show welcome message after page loads.
  function displayLoaderAndWelcomeMessage() {
    $(".loader").fadeIn("slow"); // Show loader with a fade effect.

    // After 3 seconds, hide the loader and show the main content.
    setTimeout(function () {
      $(".loader").fadeOut("slow", function () {
        $(".container").fadeIn("slow", function () {
          // Show a sweet alert with a welcome message.
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
    }, 3000); // Delay of 3 seconds before transitioning.
  }

  /* =====================================* Section 2: Datepicker Setup* ========================================== */
  // Function to initialize the jQuery UI datepicker with custom settings.
  function initDatePicker() {
    const today = new Date(); // Get today's date.
    const maxAdvanceBookingDays = 90; // Maximum date range of 90 days from today.
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxAdvanceBookingDays); // Set the max date.

    // List of blocked dates (e.g., holidays).
    const blockedDates = ["2024-12-25", "2025-01-01"]; 

    // Initialize the datepicker with the desired settings.
    $("#appointmentDate").datepicker({
      dateFormat: "yy-mm-dd", // Set date format to Year-Month-Day.
      minDate: today, // Set the minimum selectable date to today.
      maxDate: maxDate, // Set the maximum selectable date to 90 days ahead.
      changeMonth: true, // Enable month selection.
      changeYear: false, // Disable year dropdown (for a shorter booking window).
      defaultDate: today, // Default to today's date.

      // Function to disable specific dates and weekends.
      beforeShowDay: function (date) {
        const dayOfWeek = date.getDay(); // Get the day of the week.
        const formattedDate = $.datepicker.formatDate("yy-mm-dd", date); // Format the date.

        // Block Sundays (dayOfWeek === 0) and any dates in the blockedDates array.
        if (dayOfWeek === 0 || blockedDates.includes(formattedDate)) {
          return [false, "", "Unavailable"]; // Disable the date with a custom tooltip.
        }
        return [true, "", ""]; // Enable all other dates.
      },
    });
  }

  /* ========================================* Section 3: Form Validation Setup*================================== */
  // Function to set up form validation with custom rules and messages.
  function setupFormValidation() {
    // Custom validation method for a strong password.
    $.validator.addMethod(
      "StrongPassword",
      validateStrongPassword,
      "Password must be 8-12 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character"
    );

    // Custom validation for valid date format.
    $.validator.addMethod("validDate", function(value, element) {
      return this.optional(element) || /^[\d]{4}-[\d]{2}-[\d]{2}$/.test(value); // Validate date format (YYYY-MM-DD).
    }, "Please select a valid date.");

    // Set up the form validation rules.
    $("#signup_form").validate({
      rules: {
        user_name: { required: true, minlength: 3, maxlength: 15 },
        user_email: { required: true, email: true, nowhitespace: true },
        user_phone: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 15,
        },
        user_city: { required: true },
        reservation_date: { required: true, validDate: true },
        user_service: { required: true },
        user_bio: { required: true }, // Adjust if specific validation for 'user_bio' is needed.
      },
      highlight: addErrorBorder, // Apply custom error border style when validation fails.
      unhighlight: removeErrorBorder, // Remove error border when validation is passed.
      messages: {
        user_name: {
          required: "Please enter your name.",
          minlength: "Your name should be at least 3 characters long.",
          maxlength: "Your name should be no longer than 15 characters.",
        },
        user_email: {
          required: "Please enter your email address.",
          email: "Enter a valid email address (e.g., name@example.com).",
          nowhitespace: "Email addresses cannot contain spaces.",
        },
        user_phone: {
          required: "Please enter your phone number.",
          digits: "Phone number should contain only numbers.",
          minlength: "Phone number should be at least 10 digits long.",
          maxlength: "Phone number should be no more than 15 digits.",
        },
        user_city: { required: "Please select a city from Pakistan." },
        reservation_date: {
          required: "Please select a date for your reservation.",
          validDate: "Please select a valid date.",
        },
        user_service: {
          required: "Please select a service for your appointment.",
        },
        user_bio: {
          required: "Please describe any additional services needed.",
        },
      },
      // Validation functions triggered on specific events.
      onkeyup: validateOnKeyup,
      onfocusout: validateOnFocusOut,
      onchange: validateOnChange,
      invalidHandler: showErrorAlert, // Show an alert when form contains invalid fields.
      submitHandler: showSuccessAlert, // Show success alert on valid form submission.
    });
  }

  // Strong password validation function.
  function validateStrongPassword(value) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/.test(value); // Regex for strong password.
  }

  /* ========================================* Section 4: Form Helper Functions* ================================== */
  // Add custom border styling for fields with errors.
  function addErrorBorder(element) {
    $(element).addClass("error-border").removeClass("success-border");
  }

  // Remove custom border styling when validation passes.
  function removeErrorBorder(element) {
    $(element).addClass("success-border").removeClass("error-border");
  }

  // Function to show success alert after successful form submission.
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
      form.submit(); // Submit the form after user confirms.
    });
  }

  // Function to show error alert when form validation fails.
  function showErrorAlert(event, validator) {
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
  }

  // Trigger validation on keyup events.
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
