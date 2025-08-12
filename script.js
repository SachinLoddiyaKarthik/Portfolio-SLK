// Function to toggle the hamburger menu
const menu = document.querySelector(".menu-links");
const icon = document.querySelector(".hamburger-icon");

function toggleMenu() {
  const isOpen = menu.classList.toggle("open");
  icon.classList.toggle("open");
  icon.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("body-no-scroll");
}

// Function to toggle project description visibility
function toggleDescription(button) {
  if (!button) return;

  const projectItem = button.closest(".project-item");
  if (!projectItem) return;

  const description = projectItem.querySelector(".project-description");
  if (!description) return;

  const isVisible =
    description.style.display !== "none" && description.style.display !== "";

  description.style.display = isVisible ? "none" : "block";
  button.textContent = isVisible ? "Description" : "Collapse";
}

// Main DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  // Close hamburger menu when a link is clicked
  const menuLinksAnchors = document.querySelectorAll(".menu-links a");
  menuLinksAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      const hamburgerIcon = document.querySelector(".hamburger-icon");
      if (hamburgerIcon && hamburgerIcon.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  // Typing effect for the main tagline
  const taglineEl = document.getElementById("typing-tagline");
  if (taglineEl) {
    const fullText = taglineEl.textContent;
    let i = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const pauseAfter = 1200;

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
    taglineEl.textContent = "";
    setTimeout(type, 600);
  }

  // Ripple effect for all .btn elements
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  // Initialize theme based on user preference or local storage
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  let currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    currentTheme =
      isMobile && !prefersDark ? "light" : prefersDark ? "dark" : "light";
  }
  
  if (currentTheme === "dark") {
    setDarkMode();
  } else {
    setLightMode();
  }

  // Intersection observer for timeline animations
  const timelineItems = document.querySelectorAll(".timeline-item");
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

  // Event listener for "View Details" buttons in the experience section
  const detailButtons = document.querySelectorAll(".btn-details");
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

  // Intersection observer for fade-in section animations
  const sections = document.querySelectorAll(".fade-in-section");
  if (sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Project Modal Logic
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("project-modal");
  if (modal) {
    const modalBody = modal.querySelector(".modal-body");
    const closeModalBtn = modal.querySelector(".modal-close-btn");

    projectCards.forEach((card) => {
      const viewBtn = card.querySelector('.view-details-btn');
      if (viewBtn) {
        viewBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const iconHTML = card.querySelector(".project-icon").innerHTML;
          const title = card.querySelector(".project-card-title").textContent;
          const date = card.querySelector(".project-date").textContent;
          const detailsHTML = card.querySelector(".project-details").innerHTML;
          const tagsHTML = card.querySelector(".project-tags").innerHTML;
          const linksHTML = card.querySelector(".project-links").innerHTML;

          modalBody.innerHTML = `
            <div class="project-icon">${iconHTML}</div>
            <h3 class="project-card-title">${title}</h3>
            <p class="project-date">${date}</p>
            ${detailsHTML}
            <div class="project-tags">${tagsHTML}</div>
            <div class="project-links">${linksHTML}</div>
          `;

          modal.classList.add("active");
          modal.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
        });
      }
    });

    const closeModal = () => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }
});

// --- Theme Toggling ---
const themeToggles = document.querySelectorAll(".theme-toggle");
themeToggles.forEach(toggle => {
  toggle.addEventListener("click", setTheme);
});

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
  images.forEach((img) => {
    if (img) {
      const src = theme === "dark" ? img.getAttribute("src-dark") : img.getAttribute("src-light");
      img.src = src;
    }
  });
}

// --- Tab Navigation Functions ---
function showExperience(event, id) {
  if (!id) {
    window.location.href = "#experience";
    return;
  }
  
  document.querySelectorAll(".experience-content").forEach((section) => {
    section.classList.remove("active");
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const selectedExp = document.getElementById(`exp-${id}`);
  if (selectedExp) {
    selectedExp.classList.add("active");
  }

  if (event && event.target) {
    event.target.classList.add("active");
  }
}

function showEducation() {
  window.location.href = "#education";
}

function showProject(event, id) {
  if (!id) return;

  document.querySelectorAll(".project-content").forEach((proj) => {
    proj.classList.remove("active");
  });

  document.querySelectorAll(".project-tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const selected = document.getElementById(`project-${id}`);
  if (selected) {
    selected.classList.add("active");
  }

  if (event && event.target) {
    event.target.classList.add("active");
  }
}

function showCerts(event, provider) {
  if (!provider) return;

  document.querySelectorAll(".certification-content").forEach((el) => {
    el.classList.remove("active");
  });

  document.querySelectorAll(".project-tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const selectedCerts = document.getElementById(`certs-${provider}`);
  if (selectedCerts) {
    selectedCerts.classList.add("active");
  }

  if (event && event.target) {
    event.target.classList.add("active");
  }
}
