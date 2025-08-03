
// constant cards in the home
const properties = [
  {
    image: "images/one.png", 
    name: "Luxury Villa",
    price: "$500,000",
    location :"cairo"
  },
  {
    image: "images/two.png",
    name: "Luxury Home",
    price: "$750,000",
    location :"Aswan"
  },
  {
    image: "images/three.png",
    name: "Luxury Home",
    price: "$1,000,000",
    location :"Assiut"
  },
  {
    image: "images/four.png",
    name: "Luxury Villa",
    price: "$80,000",
    location :"Minya"
  },
  {
    image: "images/five.png",
    name: "Luxury Villa",
    price: "$700,000",
    location :"Luxer"
  },
  {
    image: "images/six.png",
    name: "Luxury Apartment",
    price: "$1,000,000",
    location :"New Assiut"
  }
];

// backgroud is variable
const images = [
  'F:/nti/project2/team3/images/backgrounds/one.jpg',
  'F:/nti/project2/team3/images/backgrounds/two.jpg',
  'F:/nti/project2/team3/images/backgrounds/three.jpg',
  'F:/nti/project2/team3/images/backgrounds/four.jpg',
  'F:/nti/project2/team3/images/backgrounds/five.jpg'
];

let current = 0;

function changeBackground() {
  document.body.style.backgroundImage = `url('${images[current]}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "norepeat";
  current = (current + 1) % images.length;
}

setInterval(changeBackground, 3000); 
window.onload = changeBackground; 


// add cards is in here
const cardsContainer = document.getElementById("propertyCards");

function displayCards() {
  properties.forEach((property) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${property.image}">
      <h3>${property.name}</h3>
      <p>${property.price}</p>
      <p>${property.location}</p>
    `;

    card.addEventListener("click", () => {
  window.location.href = `SearchResults.html?id=${property.id} target="_blank"`;
});

    cardsContainer.appendChild(card);
  });
}

window.onload = displayCards;
