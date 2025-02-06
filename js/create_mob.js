const mnameInput = document.getElementById("mname");
const mlifeInput = document.getElementById("mlife");
const mstrengthInput = document.getElementById("mstrength");

document.getElementById("submitMob").addEventListener("click", async () => {
  const name = mnameInput.value.trim();
  const life = parseInt(mlifeInput.value, 10);
  const strength = parseInt(mstrengthInput.value, 10);

  if (!name || isNaN(life) || isNaN(strength) || life <= 0 || strength <= 0) {
    alert(
      "Будь ласка, заповніть всі поля коректно. Життя і сила мають бути додатними числами!"
    );
    return;
  }

  try {
    const response = await fetch("/mobs");
    if (!response.ok) throw new Error("Помилка завантаження мобів");
    const { mobs } = await response.json();

    if (mobs.some((mob) => mob.name.toLowerCase() === name.toLowerCase())) {
      alert("Моб з таким ім'ям вже існує! Оберіть інше ім'я.");
      return;
    }

    const newMob = {
      name,
      life,
      strength,
      image: "/img/creeper.png",
    };

    const createResponse = await fetch("/mobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMob),
    });

    if (!createResponse.ok) {
      const error = await createResponse.json();
      alert(`Помилка сервера: ${error.message || "Не вдалося створити моба"}`);
      return;
    }

    const data = await createResponse.json();
    alert(`Ваш моб "${data.name}" успішно створений!`);
    window.location.href = "../index.html";
  } catch (error) {
    console.error("Помилка:", error);
    alert("Сталася помилка при з'єднанні з сервером. Спробуйте пізніше.");
  }
});
