const renderBosses = async () => {
  const response = await fetch("/bosses");
  const data = await response.json();

  const mainContent = document.getElementById("main-content");

  if (data) {
    data.map((boss) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const topContainer = document.createElement("div");
      topContainer.classList.add("top-container");

      const bottomContainer = document.createElement("div");
      bottomContainer.classList.add("bottom-container");
   
      topContainer.style.backgroundImage = `url(${boss.image})`;

      const name = document.createElement("h3");
      name.textContent = boss.name;
      bottomContainer.appendChild(name);

      const location = document.createElement("p");
      location.textContent = "Location: " + boss.location;
      bottomContainer.appendChild(location);

      const link = document.createElement("a");
      link.textContent = "Read More >";
      link.setAttribute("role", "button");
      link.href = `/bosses/${boss.id}`;
      bottomContainer.appendChild(link);

      card.appendChild(topContainer);
      card.appendChild(bottomContainer);

      mainContent.appendChild(card);
    });
  } else {
    const message = document.createElement("h2");
    message.textContent = "No Bosses Found 😞";
    mainContent.appendChild(message);
  }
};

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
  window.location.href = "../404.html";
} else {
  renderBosses();
}

