function toggleMenu() {
    const menu = document.querySelector(".menu-links");
  
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      setTimeout(() => {
        menu.style.visibility = "hidden"; // Ensure it fully disappears
      }, 300); // Wait for animation to complete
    } else {
      menu.classList.add("open");
      menu.style.visibility = "visible";
    }
  }
  
  function toggleDescription(button) {
    const projectItem = button.closest(".project-item");
    const description = projectItem.querySelector(".project-description");
  
    if (description.style.display === "none" || description.style.display === "") {
      description.style.display = "block";
      button.textContent = "Collapse";
    } else {
      description.style.display = "none";
      button.textContent = "Description";
    }
  }
  
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const menuLinks = document.querySelector(".menu-links");
  
  function toggleMenu() {
    hamburgerIcon.classList.toggle("open");
    menuLinks.classList.toggle("open");
  }
  
  // Optional: Close the menu if a link is clicked (already present in your HTML structure)
  const menuLinksAnchors = document.querySelectorAll(".menu-links a");
  menuLinksAnchors.forEach(link => {
    link.addEventListener("click", () => {
      toggleMenu(); // Call the toggleMenu function to close the menu
    });
  });
  
  
  // Dark / light mode
  
  const btn = document.getElementById("modeToggle");
  const btn2 = document.getElementById("modeToggle2");
  const themeIcons = document.querySelectorAll(".icon");
  const currentTheme = localStorage.getItem("theme");
  
  if (currentTheme === "dark") {
    setDarkMode();
  }
  
  btn.addEventListener("click", function () {
    setTheme();
  });
  
  btn2.addEventListener("click", function () {
    setTheme();
  });
  
  function setTheme() {
    let currentTheme = document.body.getAttribute("theme");
  
    if (currentTheme === "dark") {
      setLightMode();
    } else {
      setDarkMode();
    }
  }
  
  function setDarkMode() {
    document.body.setAttribute("theme", "dark");
    localStorage.setItem("theme", "dark");
  
    themeIcons.forEach((icon) => {
      icon.src = icon.getAttribute("src-dark");
    });
  }
  
  function setLightMode() {
    document.body.removeAttribute("theme");
    localStorage.setItem("theme", "light");
  
    themeIcons.forEach((icon) => {
      icon.src = icon.getAttribute("src-light");
    });
  }
  
  function showExperience() {
    window.location.href = "#experience";
  }
  
  function showEducation() {
    window.location.href = "#education";
  }
  function showExperience(id) {
  // Hide all experience content
  document.querySelectorAll('.experience-content').forEach((section) => {
    section.classList.remove('active');
  });

  // Remove 'active' class from all buttons
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  // Show the selected experience
  document.getElementById(`exp-${id}`).classList.add('active');

  // Add 'active' to the clicked button
  event.target.classList.add('active');
}

function showProject(id) {
  // Hide all project content
  document.querySelectorAll('.project-content').forEach((proj) => {
    proj.classList.remove('active');
  });

  // Remove 'active' from all buttons
  document.querySelectorAll('.project-tab-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  // Show the selected project content
  const selected = document.getElementById(`project-${id}`);
  if (selected) {
    selected.classList.add('active');
  }

  // Add 'active' to the clicked button
  event.target.classList.add('active');
}
function showCerts(provider) {
  document.querySelectorAll('.certification-content').forEach((el) => {
    el.classList.remove('active');
  });

  document.querySelectorAll('.project-tab-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  document.getElementById(`certs-${provider}`).classList.add('active');
  event.target.classList.add('active');
}
