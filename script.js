let mobs = JSON.parse(localStorage.getItem("mobs")) || [
  {
    name: "Steve",
    life: 100,
    strength: 50,
    image: "/img/steve.png",
  },
  {
    name: "Pig",
    life: 30,
    strength: 5,
    image: "/img/pig.png",
  },
  {
    name: "Angel",
    life: 80,
    strength: 70,
    image: "/img/angel.png",
  },
  {
    name: "Zombie",
    life: 60,
    strength: 40,
    image: "/img/zombie.png",
  },
  {
    name: "Skeleton",
    life: 50,
    strength: 35,
    image: "/img/skeleton.png",
  },
  {
    name: "Enderman",
    life: 120,
    strength: 90,
    image: "/img/enderman.png",
  },
];

if (!localStorage.getItem("mobs")) {
  localStorage.setItem("mobs", JSON.stringify(mobs));
}

const mobContainer = document.getElementById("mob_container");
const totalLifeSpan = document.getElementById("total_life");
const totalStrengthSpan = document.getElementById("total_strength");
const findInput = document.getElementById("find_input");
const findButton = document.getElementById("find_button");
const cancelButton = document.getElementById("cancel_button");
const sortSelect = document.getElementById("sort_select");

let filteredMobs = [...mobs];

function displayMobs(mobList) {
  mobContainer.innerHTML = "";
  mobList.forEach((mob) => {
    let mobItem = document.createElement("li");
    mobItem.classList.add("item-card");
    let image = mob.image ? mob.image : "/img/default.png";
    mobItem.innerHTML = `
      <img src="${image}" class="item-card__image" alt="${mob.name}">
      <div class="item-card__body">
          <h3 class="item-card__title">${mob.name}</h3>
          <p class="item-card__text">Життя: ${mob.life}</p>
          <p class="item-card__text">Сила: ${mob.strength}</p>
          <a href="html/edit.html?id=${mob.name}" class="btn edit-btn">Редагувати</a>
          <button class="btn delete-btn">Видалити</button>
      </div>
    `;

    mobItem
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteMob(mob.name));

    mobContainer.appendChild(mobItem);
  });
  console.log("Моби відображені:", mobList);
}

function deleteMob(mobName) {
  mobs = mobs.filter((mob) => mob.name !== mobName);
  localStorage.setItem("mobs", JSON.stringify(mobs));
  displayMobs(mobs);
  calculateSummary(mobs);
}

function calculateSummary(mobList) {
  let totalLife = mobList.reduce((acc, mob) => acc + mob.life, 0);
  let totalStrength = mobList.reduce((acc, mob) => acc + mob.strength, 0);

  totalLifeSpan.textContent = totalLife;
  totalStrengthSpan.textContent = totalStrength;

  console.log(
    "Загальна кількість життя:",
    totalLife,
    "Загальна сила:",
    totalStrength
  );
}

function searchMobs() {
  let query = findInput.value.trim().toLowerCase();
  filteredMobs = mobs.filter((mob) => mob.name.toLowerCase().includes(query));
  displayMobs(filteredMobs);
  calculateSummary(filteredMobs);
}

function clearSearch() {
  findInput.value = "";
  filteredMobs = [...mobs];
  displayMobs(filteredMobs);
  calculateSummary(filteredMobs);
}

function sortMobs() {
  let selectedValue = sortSelect.value;
  let sortedMobs = [...filteredMobs];

  if (selectedValue === "name") {
    sortedMobs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedValue === "life") {
    sortedMobs.sort((a, b) => b.life - a.life);
  } else if (selectedValue === "strength") {
    sortedMobs.sort((a, b) => b.strength - a.strength);
  }

  displayMobs(sortedMobs);
}

findButton.addEventListener("click", searchMobs);
cancelButton.addEventListener("click", clearSearch);
sortSelect.addEventListener("change", sortMobs);

displayMobs(mobs);
calculateSummary(mobs);
