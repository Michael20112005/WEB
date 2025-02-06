const mobContainer = document.getElementById("mob_container");
const totalLifeSpan = document.getElementById("total_life");
const totalStrengthSpan = document.getElementById("total_strength");
const findInput = document.getElementById("find_input");
const findButton = document.getElementById("find_button");
const cancelButton = document.getElementById("cancel_button");
const sortSelect = document.getElementById("sort_select");
const addMobForm = document.getElementById("mobForm");
const mobNameInput = document.getElementById("mname");
const mobLifeInput = document.getElementById("mlife");
const mobStrengthInput = document.getElementById("mstrength");

const toggleLoader = (isLoading) => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = isLoading ? "block" : "none";
};

const fetchMobs = async (query = "", sortBy = "") => {
  toggleLoader(true); // Pending
  try {
    const response = await fetch(`/mobs?searchQuery=${query}&sortBy=${sortBy}`);
    if (response.ok) {
      const { mobs, totalLife, totalStrength } = await response.json();
      displayMobs(mobs); // Fulfilled
      totalLifeSpan.textContent = totalLife;
      totalStrengthSpan.textContent = totalStrength;
    } else {
      throw new Error("Failed to fetch mobs");
    }
  } catch (error) {
    console.error("Помилка:", error.message); // Rejected
    alert("Не вдалося завантажити мобів. Спробуйте пізніше.");
  } finally {
    toggleLoader(false);
  }
};

const displayMobs = (mobList) => {
  mobContainer.innerHTML = mobList.length
    ? mobList
        .map(
          (mob) => `
      <li class="item-card">
        <img src="${
          mob.image || "/img/default.png"
        }" class="item-card__image" alt="${mob.name}">
        <div class="item-card__body">
          <h3 class="item-card__title">${mob.name}</h3>
          <p class="item-card__text">Життя: ${mob.life}</p>
          <p class="item-card__text">Сила: ${mob.strength}</p>
          <div class="item-card__buttons">
            <button class="item-card__edit-button" data-id="${
              mob.id
            }">Edit</button>
            <button class="item-card__delete-button" data-id="${
              mob.id
            }">Delete</button>
          </div>
        </div>
      </li>`
        )
        .join("")
    : "<li>Немає доступних мобів.</li>";

  document.querySelectorAll(".item-card__edit-button").forEach((button) => {
    button.addEventListener("click", () => editMob(button.dataset.id));
  });

  document.querySelectorAll(".item-card__delete-button").forEach((button) => {
    button.addEventListener("click", () => deleteMob(button.dataset.id));
  });
};

const addMob = async (event) => {
  event.preventDefault();

  const name = mobNameInput.value.trim();
  const life = parseInt(mobLifeInput.value, 10);
  const strength = parseInt(mobStrengthInput.value, 10);

  if (!name || isNaN(life) || isNaN(strength)) {
    console.error("Всі поля повинні бути заповнені коректними значеннями");
    return;
  }

  const newMob = {
    name,
    life,
    strength,
    image: "/img/default.png",
  };

  toggleLoader(true);
  try {
    const response = await fetch("/mobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMob),
    });
    if (!response.ok) throw new Error("Не вдалося додати моба");
    await fetchMobs();
    addMobForm.reset();
  } catch (error) {
    console.error("Помилка:", error.message);
  } finally {
    toggleLoader(false);
  }
};

const editMob = (id) => {
  window.location.href = `html/edit.html?id=${id}`;
};

const deleteMob = async (id) => {
  if (!confirm("Ви впевнені, що хочете видалити цього моба?")) return;
  toggleLoader(true);
  try {
    const response = await fetch(`/mobs/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Не вдалося видалити моба");
    await fetchMobs();
  } catch (error) {
    console.error("Помилка:", error.message);
  } finally {
    toggleLoader(false);
  }
};

const searchMobs = () => {
  const query = findInput.value.trim().toLowerCase();
  fetchMobs(query);
};

const clearSearch = () => {
  findInput.value = "";
  fetchMobs();
};

const sortMobs = () => {
  const sortBy = sortSelect.value;
  fetchMobs("", sortBy);
};

document.addEventListener("DOMContentLoaded", () => {
  fetchMobs();
});

findButton.addEventListener("click", searchMobs);
cancelButton.addEventListener("click", clearSearch);
sortSelect.addEventListener("change", sortMobs);
addMobForm?.addEventListener("submit", addMob);
