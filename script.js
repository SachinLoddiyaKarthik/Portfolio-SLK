const menu = document.querySelector(".menu-links");
const icon = document.querySelector(".hamburger-icon");

function toggleMenu() {
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  document.body.classList.toggle("body-no-scroll");
}
  
function toggleDescription(button) {
  if (!button) return;
  
  const projectItem = button.closest(".project-item");
  if (!projectItem) return;
  
  const description = projectItem.querySelector(".project-description");
  if (!description) return;

  const isVisible = description.style.display !== "none" && description.style.display !== "";
  
  description.style.display = isVisible ? "none" : "block";
  button.textContent = isVisible ? "Description" : "Collapse";
}
  
// Close menu when links are clicked
document.addEventListener('DOMContentLoaded', function() {
  const menuLinksAnchors = document.querySelectorAll(".menu-links a");
  menuLinksAnchors.forEach(link => {
    link.addEventListener("click", () => {
      const hamburgerIcon = document.querySelector(".hamburger-icon");
      if (hamburgerIcon && hamburgerIcon.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  // Typing effect for main tagline
  const taglineEl = document.getElementById('typing-tagline');
  if (taglineEl) {
    const fullText = taglineEl.textContent;
    let i = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    let pauseAfter = 1200;

    function type() {
      if (!isDeleting) {
        taglineEl.textContent = fullText.substring(0, i + 1);
        i++;
        if (i < fullText.length) {
          setTimeout(type, typingSpeed);
        } else {
          isDeleting = true;
          setTimeout(type, pauseAfter);
        }
      } else {
        taglineEl.textContent = fullText.substring(0, i - 1);
        i--;
        if (i > 0) {
          setTimeout(type, typingSpeed / 2);
        } else {
          isDeleting = false;
          setTimeout(type, 600);
        }
      }
    }
    taglineEl.textContent = '';
    setTimeout(type, 600);
  }

  // Ripple effect for all .btn elements
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Default to light theme on mobile if system prefers light
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  
  let currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    currentTheme = isMobile && !prefersDark ? "light" : (prefersDark ? "dark" : "light");
  }
  
  if (currentTheme === "dark") {
    setDarkMode();
  } else {
    setLightMode();
  }

  const accordions = document.querySelectorAll(".accordion .accordion-header");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  const timelineItems = document.querySelectorAll(".timeline-item");
  const detailButtons = document.querySelectorAll(".btn-details");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  timelineItems.forEach((item) => {
    observer.observe(item);
  });

  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      this.setAttribute("aria-expanded", !isExpanded);
      this.innerHTML = isExpanded ? "View Details" : "Hide Details";

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
  
// Dark / light mode with improved error handling
const modeToggle = document.getElementById("modeToggle");
const modeToggle2 = document.getElementById("modeToggle2");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");
const themeIcons = document.querySelectorAll(".icon");

// Add event listeners with error handling
if (modeToggle) {
  modeToggle.addEventListener("click", setTheme);
}

if (modeToggle2) {
  modeToggle2.addEventListener("click", setTheme);
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("click", setTheme);
}

function setTheme() {
  const currentTheme = document.documentElement.getAttribute("theme");
  
  if (currentTheme === "dark") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setDarkMode() {
  document.documentElement.setAttribute("theme", "dark");
  localStorage.setItem("theme", "dark");
  updateImageSources("dark");
}

function setLightMode() {
  document.documentElement.removeAttribute("theme");
  localStorage.setItem("theme", "light");
  updateImageSources("light");
}

function updateImageSources(theme) {
  const images = document.querySelectorAll("img[src-light][src-dark]");
  images.forEach(img => {
    if (img) {
      if (theme === "dark") {
        img.src = img.getAttribute("src-dark");
      } else {
        img.src = img.getAttribute("src-light");
      }
    }
  });
}

// Navigation functions with proper event handling
function showExperience(event, id) {
  if (!id) {
    window.location.href = "#experience";
    return;
  }

  // Hide all experience content
  document.querySelectorAll('.experience-content').forEach((section) => {
    section.classList.remove('active');
  });

  // Remove 'active' class from all buttons
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  // Show the selected experience
  const selectedExp = document.getElementById(`exp-${id}`);
  if (selectedExp) {
    selectedExp.classList.add('active');
  }

  // Add 'active' to the clicked button
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

function showEducation() {
  window.location.href = "#education";
}

function showProject(event, id) {
  if (!id) return;

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
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

function showCerts(event, provider) {
  if (!provider) return;

  document.querySelectorAll('.certification-content').forEach((el) => {
    el.classList.remove('active');
  });

  document.querySelectorAll('.project-tab-btn').forEach((btn) => {
    btn.classList.remove('active');
  });

  const selectedCerts = document.getElementById(`certs-${provider}`);
  if (selectedCerts) {
    selectedCerts.classList.add('active');
  }

  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// On-scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.fade-in-section');

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
