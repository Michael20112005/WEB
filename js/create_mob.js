const mnameInput = document.getElementById("mname");
const mlifeInput = document.getElementById("mlife");
const mstrengthInput = document.getElementById("mstrength");

document.getElementById("submitMob").addEventListener("click", () => {
  const name = mnameInput.value.trim();
  const life = parseInt(mlifeInput.value);
  const strength = parseInt(mstrengthInput.value);

  let mobs = JSON.parse(localStorage.getItem("mobs")) || [];

  if (mobs.some((mob) => mob.name.toLowerCase() === name.toLowerCase())) {
    alert("Моб з такою назвою вже існує!");
    return;
  }

  if (!name || life <= 0 || strength <= 0 || isNaN(life) || isNaN(strength)) {
    alert(
      "Будь ласка, заповніть всі поля коректно. Життя і сила не можуть бути від'ємними або нульовими!"
    );
    return;
  }

  const newMob = { name, life, strength, image: "/img/creeper.png" };

  mobs.push(newMob);

  localStorage.setItem("mobs", JSON.stringify(mobs));

  alert("Ваш моб успішно створений");

  window.location.href = "/index.html";
});
