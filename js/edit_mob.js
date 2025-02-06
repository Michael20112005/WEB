const urlParams = new URLSearchParams(window.location.search);
const mobId = urlParams.get("id");

const fetchMob = async (id) => {
  try {
    const response = await fetch(`/mobs/${id}`);
    if (!response.ok) throw new Error("Моб не знайдений!");

    const mob = await response.json();
    document.getElementById("mname").value = mob.name;
    document.getElementById("mlife").value = mob.life;
    document.getElementById("mstrength").value = mob.strength;
  } catch (error) {
    alert(error.message);
    window.location.href = "../index.html";
  }
};

const updateMob = async (id, updatedMob) => {
  try {
    const response = await fetch(`/mobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMob),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Помилка сервера: ${error.message || "Не вдалося оновити моба"}`);
      return;
    }

    alert("Параметри моба успішно змінені!");
    window.location.href = "../index.html";
  } catch (error) {
    console.error("Помилка під час оновлення моба:", error);
    alert("Сталася помилка при з'єднанні з сервером. Спробуйте пізніше.");
  }
};

document.getElementById("submitEdit").addEventListener("click", async () => {
  const newName = document.getElementById("mname").value.trim();
  const newLife = parseInt(document.getElementById("mlife").value, 10);
  const newStrength = parseInt(document.getElementById("mstrength").value, 10);

  if (
    !newName ||
    isNaN(newLife) ||
    isNaN(newStrength) ||
    newLife <= 0 ||
    newStrength <= 0
  ) {
    alert(
      "Будь ласка, заповніть всі поля коректно. Життя і сила повинні бути більше 0."
    );
    return;
  }

  await updateMob(mobId, {
    name: newName,
    life: newLife,
    strength: newStrength,
  });
});

fetchMob(mobId);
