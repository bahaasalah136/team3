document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("paymentForm");
  const inputs = form.querySelectorAll("input, select");
  const items = JSON.parse(localStorage.getItem("cartItems")) || [];
  const rightSection = document.querySelector(".right-section");

  if (items.length != 0) {
    rightSection.innerHTML = items
      .map(
        (item) => `
            <div class="property">
                <h2>${item.name}</h2>
                <img src="./images/${item.image}" alt="Property Image" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 10px;" />
                <p><strong>Price :</strong> ${item.price}</p>
                <p><strong>Area:</strong> ${item.area}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Description:</strong> ${item.description}</p>
            </div>
        `
      )
      .join("");
  } else {
    rightSection.innerHTML = `<p> No added items. </p>`;
  }

  // show card
  const cardNumberInput = document.getElementById("cardNumber");
  cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = value.replace(/(.{4})/g, "$1-").slice(0, 19);
    e.target.value = formatted.endsWith("-")
      ? formatted.slice(0, -1)
      : formatted;
  });

 
  form.addEventListener("submit", function (event) {
    let valid = true;

});
    

    // entering values
    form
      .querySelectorAll(".error")
      .forEach((span) => (span.style.display = "none"));
    inputs.forEach((input) => input.classList.remove("error-border"));

    
    if (!form.cardType.value) {
      valid = false;
      document.getElementById("cardTypeError").style.display = "block";
      form.cardType.classList.add("error-border");
    }

    if (!form.fullName.value.trim()) {
      valid = false;
      document.getElementById("fullNameError").style.display = "block";
      form.fullName.classList.add("error-border");
    }

    if (!form.email.value.endsWith("@gmail.com")) {
      valid = false;
      document.getElementById("emailError").style.display = "block";
      form.email.classList.add("error-border");
    }

    if (!form.password.value.trim()) {
      valid = false;
      document.getElementById("passwordError").style.display = "block";
      form.password.classList.add("error-border");
    }

    const phoneDigits = form.phone.value.replace(/\D/g, "");
    if (phoneDigits.length !== 11) {
      valid = false;
      document.getElementById("phoneError").style.display = "block";
      form.phone.classList.add("error-border");
    }

    const cardDigits = form.cardNumber.value.replace(/\D/g, "");
    if (cardDigits.length !== 16) {
      valid = false;
      document.getElementById("cardNumberError").style.display = "block";
      form.cardNumber.classList.add("error-border");
    }

    const cvvDigits = form.cvv.value.replace(/\D/g, "");
    if (cvvDigits.length !== 3) {
      valid = false;
      document.getElementById("cvvError").style.display = "block";
      form.cvv.classList.add("error-border");
    }

    if (!valid) {
      event.preventDefault();
    } else {
      event.preventDefault();
      alert(" Data entered successfully ✅");

      localStorage.removeItem("cartItems");
      localStorage.setItem("cart_count", "0");

      form.reset();
      inputs.forEach((input) => input.classList.remove("error-border"));

      rightSection.innerHTML = `<p>No added items.</p>`;
    }
  });
  
// delete alert
const deleteBtn = document.getElementById("deleteButton");
deleteBtn.addEventListener("click", function () {
  const confirmDelete = confirm("Are you sure you want to delete the entered data?");
  if (!confirmDelete) return;

  
  const inputs = document.querySelectorAll("input, select, textarea");


  // validation
  inputs.forEach((input) => {
    if (input.tagName === "SELECT") {
      input.selectedIndex = 0; 
    } else if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }

    input.classList.remove("error-border");
  });

  // delete button
  document.querySelectorAll(".error").forEach((span) => {
    span.style.display = "none";
  });

  alert(" Data deleted successfully ✅");
});


// Back to Home botton
const backToHomeBtn = document.getElementById("backToHome");
backToHomeBtn.addEventListener("click", function () {
  const confirmBack = confirm("You will be redirected to the home page. Do you want to continue?");
  if (confirmBack) {
    window.location.href = "home.html";
  }
});
