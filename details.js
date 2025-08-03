const storedProperties = localStorage.getItem("properties");
const savecart = [];
document.addEventListener("DOMContentLoaded", function () {
  // =====================count cart
  const count_ = localStorage.getItem("cart_count");

  let cart_count = count_ ? JSON.parse(count_) : 0;
  document.querySelector(".cart-count").innerHTML = `${cart_count}`;
  // =====================count cart
  // Function to get URL parameter by name
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const propertieId = getUrlParameter("id");
  console.log("Product ID from URL:", propertieId);

  const item = JSON.parse(storedProperties)?.find((p) => p.id == propertieId);
  console.log(item);

  document.getElementById("myimg").src = `./images/${item.image}`;
  document.getElementById("myprice").innerText = `EGP${item.price}`;
  document.getElementById("myarea").innerText = `${item.area}`;
  document.getElementById("mylocation").innerText = `${item.location}`;
  document.getElementById("mydate").innerText = `${item.date}`;
  document.getElementById("mypriceper").innerText = `${(
    item.price / item.area
  ).toFixed(3)}`;
  document.getElementById("mydescription").innerText = `${item.description}`;
  //===================cart count===================
  const aad = document.getElementById("add");
  aad.addEventListener("click", function () {
    savecart.push(item);
    localStorage.setItem("cartItems", JSON.stringify(savecart));
    cart_count++;
    localStorage.setItem("cart_count", JSON.stringify(cart_count));
    alert("The property has been added");
    location.reload();
  });
});
