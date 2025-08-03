//===================aya-----------------
const storedProperties = localStorage.getItem("properties");
localStorage.clear(storedProperties);
const properties = storedProperties ? JSON.parse(storedProperties) : [];
let cout_id = 1;
function savproperti() {
  let name = document.getElementById("title");
  let location1 = document.getElementById("location");
  let area = document.getElementById("type");
  let price = document.getElementById("price");
  let description = document.getElementById("description");
  let image = document.getElementById("image");
  let date = new Date();
  let formatted = date.toLocaleDateString("en-GB");
  const inputs = [name, location1, area, price, description, image];
  const errors = document.querySelectorAll(".error");

  let hasError = false;

  errors.forEach((err) => (err.textContent = ""));

  inputs.forEach((input, index) => {
    if (!input.value.trim()) {
      errors[index].textContent = "This field is required.";
      hasError = true;
    }
  });
  if (area.value && (parseFloat(area.value) <= 0 || isNaN(area.value))) {
    errors[2].textContent = "Please enter a valid area.";
    hasError = true;
  }

  if (price.value && (parseFloat(price.value) <= 0 || isNaN(price.value))) {
    errors[3].textContent = "Please enter a valid price.";
    hasError = true;
  }

  if (image.value == "") {
    errors[5].textContent = "Please enter a valid image URL.";
    hasError = true;
  }

  if (hasError) return;
  properties.unshift({
    id: cout_id,
    name: name.value,
    location: location1.value,
    area: area.value,
    price: price.value,
    description: description.value,
    image: image.value,
    date: formatted,
  });

  cout_id++;
  localStorage.setItem("properties", JSON.stringify(properties));
  alert("Property added successfully!");
  document.getElementById("propertyForm").reset();
}
