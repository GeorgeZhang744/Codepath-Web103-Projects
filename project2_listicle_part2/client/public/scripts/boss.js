const renderBoss = async () => {
  const requestedID = parseInt(window.location.href.split("/").pop());

  const response = await fetch("/bosses");
  const data = await response.json();

  const bossContent = document.getElementById("boss-content");
  let boss = data.find((boss) => boss.id === requestedID);
  console.log(boss)

  if (boss) {
    document.getElementById("image").src = boss.image;
    document.getElementById("name").textContent = boss.name;
    document.getElementById("health").textContent = "Health: " + boss.health;
    document.getElementById("location").textContent = "Location: " + boss.location;
    document.getElementById("description").textContent = boss.description;
    document.title = `Hollow Knight Boss - ${boss.name}`;
  } else {
    const message = document.createElement("h2");
    message.textContent = "No Bosses Found 😞";
    bossContent.appendChild(message);
  }
};

renderBoss();
