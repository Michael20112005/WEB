const urlParams = new URLSearchParams(window.location.search);
const mobName = urlParams.get("id");

let mobs = JSON.parse(localStorage.getItem("mobs")) || [];

const mobToEdit = mobs.find((mob) => mob.name === mobName);

if (mobToEdit) {
  document.getElementById("mname").value = mobToEdit.name;
  document.getElementById("mlife").value = mobToEdit.life;
  document.getElementById("mstrength").value = mobToEdit.strength;
} else {
  alert("Моб не знайдений!");
}

document.getElementById("submitEdit").addEventListener("click", function () {
  const newName = document.getElementById("mname").value.trim();
  const newLife = parseInt(document.getElementById("mlife").value);
  const newStrength = parseInt(document.getElementById("mstrength").value);

  if (
    mobs.some(
      (mob) =>
        mob.name.toLowerCase() === newName.toLowerCase() && mob.name !== mobName
    )
  ) {
    alert("Моб з такою назвою вже існує!");
    return;
  }

  if (
    !newName ||
    newLife <= 0 ||
    newStrength <= 0 ||
    isNaN(newLife) ||
    isNaN(newStrength)
  ) {
    alert(
      "Будь ласка, заповніть всі поля коректно. Життя і сила повинні бути більше 0."
    );
    return;
  }

  mobToEdit.name = newName;
  mobToEdit.life = newLife;
  mobToEdit.strength = newStrength;

  localStorage.setItem("mobs", JSON.stringify(mobs));

  alert("Параметри моба успішно змінені!");
  window.location.href = "../index.html";
});
