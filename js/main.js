/**
 * Portfolio Website - Main JavaScript
 * Modern, Dynamic, CRUD-Ready Architecture
 */

// ===================================
// Global State & Configuration
// ===================================
const state = {
  theme: localStorage.getItem("theme") || "light",
  isMenuOpen: false,
  currentTestimonial: 0,
  isLoading: true,
};

const config = {
  typingSpeed: 100,
  typingDelay: 2000,
  roles: [
    "Full-Stack Developer",
    "UI/UX Designer",
    "Creative Problem Solver",
    "Tech Enthusiast",
  ],
};

// ===================================
// DOM Elements
// ===================================
const elements = {
  preloader: document.getElementById("preloader"),
  navbar: document.getElementById("navbar"),
  hamburger: document.getElementById("hamburger"),
  navMenu: document.getElementById("nav-menu"),
  themeToggle: document.getElementById("theme-toggle"),
  cursor: document.getElementById("cursor"),
  cursorFollower: document.getElementById("cursor-follower"),
  typedText: document.getElementById("typed-text"),
  backToTop: document.getElementById("back-to-top"),
  contactForm: document.getElementById("contact-form"),
  formStatus: document.getElementById("form-status"),
  testimonialTrack: document.getElementById("testimonial-track"),
  testimonialDots: document.getElementById("testimonial-dots"),
  prevTestimonial: document.getElementById("prev-testimonial"),
  nextTestimonial: document.getElementById("next-testimonial"),
  projectModal: document.getElementById("project-modal"),
  modalBody: document.getElementById("modal-body"),
  modalClose: document.getElementById("modal-close"),
};

// ===================================
// Initialization
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initTheme();
  initNavigation();
  initCustomCursor();
  initTypingEffect();
  initScrollEffects();
  initSkillsAnimation();
  initProjectsFilter();
  initTabs();
  initTestimonials();
  initContactForm();
  initModal();
  initAOS();
  initCounterAnimation();
});

// ===================================
// Preloader
// ===================================
function initPreloader() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      elements.preloader.classList.add("hidden");
      document.body.classList.remove("no-scroll");
      state.isLoading = false;
    }, 500);
  });
}

// ===================================
// Theme Toggle
// ===================================
function initTheme() {
  // Apply saved theme
  document.documentElement.setAttribute("data-theme", state.theme);

  elements.themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("theme", state.theme);
  });
}

// ===================================
// Navigation
// ===================================
function initNavigation() {
  // Hamburger menu toggle
  elements.hamburger.addEventListener("click", () => {
    state.isMenuOpen = !state.isMenuOpen;
    elements.hamburger.classList.toggle("active", state.isMenuOpen);
    elements.navMenu.classList.toggle("active", state.isMenuOpen);
    document.body.classList.toggle("no-scroll", state.isMenuOpen);
  });

  // Close menu on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (state.isMenuOpen) {
        state.isMenuOpen = false;
        elements.hamburger.classList.remove("active");
        elements.navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
}

// ===================================
// Custom Cursor
// ===================================
function initCustomCursor() {
  if (
    window.matchMedia("(hover: hover)").matches &&
    window.innerWidth >= 1024
  ) {
    document.addEventListener("mousemove", (e) => {
      elements.cursor.style.left = e.clientX + "px";
      elements.cursor.style.top = e.clientY + "px";

      // Follower with delay
      setTimeout(() => {
        elements.cursorFollower.style.left = e.clientX + "px";
        elements.cursorFollower.style.top = e.clientY + "px";
      }, 50);
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, .project-card",
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        elements.cursorFollower.classList.add("active");
      });
      el.addEventListener("mouseleave", () => {
        elements.cursorFollower.classList.remove("active");
      });
    });
  }
}

// ===================================
// Typing Effect
// ===================================
function initTypingEffect() {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;

  function type() {
    const currentRole = config.roles[roleIndex];

    if (isWaiting) {
      return;
    }

    if (!isDeleting) {
      // Typing
      elements.typedText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isWaiting = true;
        setTimeout(() => {
          isWaiting = false;
          isDeleting = true;
          type();
        }, config.typingDelay);
        return;
      }
    } else {
      // Deleting
      elements.typedText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % config.roles.length;
      }
    }

    const speed = isDeleting ? config.typingSpeed / 2 : config.typingSpeed;
    setTimeout(type, speed);
  }

  type();
}

// ===================================
// Scroll Effects
// ===================================
function initScrollEffects() {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Navbar background
    elements.navbar.classList.toggle("scrolled", scrollY > 50);

    // Back to top button
    elements.backToTop.classList.toggle("visible", scrollY > 500);
  });

  // Back to top click
  elements.backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===================================
// Skills Animation
// ===================================
function initSkillsAnimation() {
  const skillCards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector(".progress-bar");
          if (progressBar) {
            const progress = progressBar.getAttribute("data-progress");
            setTimeout(() => {
              progressBar.style.width = progress + "%";
            }, 200);
          }
        }
      });
    },
    { threshold: 0.5 },
  );

  skillCards.forEach((card) => observer.observe(card));
}

// ===================================
// Projects Filter
// ===================================
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
          card.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// ===================================
// Tabs (Skills & Experience)
// ===================================
function initTabs() {
  // Skills tabs
  const skillTabs = document.querySelectorAll(".tab-btn");
  const skillContents = document.querySelectorAll(".tab-content");

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      skillTabs.forEach((t) => t.classList.remove("active"));
      skillContents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  // Experience tabs
  const expTabs = document.querySelectorAll(".exp-tab-btn");
  const expContents = document.querySelectorAll(".exp-tab-content");

  expTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-exp-tab");

      expTabs.forEach((t) => t.classList.remove("active"));
      expContents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
}

// ===================================
// Testimonials Slider
// ===================================
function initTestimonials() {
  const cards = document.querySelectorAll(".testimonial-card");
  const totalSlides = cards.length;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    elements.testimonialDots.appendChild(dot);
  }

  function updateSlider() {
    elements.testimonialTrack.style.transform = `translateX(-${state.currentTestimonial * 100}%)`;

    // Update dots
    document
      .querySelectorAll(".testimonial-dots .dot")
      .forEach((dot, index) => {
        dot.classList.toggle("active", index === state.currentTestimonial);
      });
  }

  function goToSlide(index) {
    state.currentTestimonial = index;
    updateSlider();
  }

  function nextSlide() {
    state.currentTestimonial = (state.currentTestimonial + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    state.currentTestimonial =
      (state.currentTestimonial - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  elements.nextTestimonial.addEventListener("click", nextSlide);
  elements.prevTestimonial.addEventListener("click", prevSlide);

  // Auto-play
  setInterval(nextSlide, 5000);
}

// ===================================
// Contact Form
// ===================================
function initContactForm() {
  elements.contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = elements.contactForm.querySelector(".btn-submit");
    submitBtn.classList.add("loading");

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message
    elements.formStatus.textContent =
      "Message sent successfully! I'll get back to you soon.";
    elements.formStatus.className = "form-status success";

    submitBtn.classList.remove("loading");
    elements.contactForm.reset();

    // Hide status after 5 seconds
    setTimeout(() => {
      elements.formStatus.className = "form-status";
    }, 5000);
  });
}

// ===================================
// Project Modal
// ===================================
function initModal() {
  // Project data (CRUD-ready structure)
  const projects = {
    1: {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform built with React and Node.js...",
      image:
        "[images.unsplash.com](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800)",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      codeUrl: "#",
    },
    2: {
      title: "Fitness Tracking App",
      description: "Mobile app for tracking workouts and health metrics...",
      image:
        "[images.unsplash.com](https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800)",
      tech: ["React Native", "Firebase", "Redux"],
      liveUrl: "#",
      codeUrl: "#",
    },
    // Add more projects...
  };

  // Open modal
  document.querySelectorAll(".project-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project");
      const project = projects[projectId];

      if (project) {
        elements.modalBody.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 12px; margin-bottom: 24px;">
                    <h2 style="margin-bottom: 16px;">${project.title}</h2>
                    <p style="margin-bottom: 24px; color: var(--text-secondary);">${project.description}</p>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
                        ${project.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
                    </div>
                    <div style="display: flex; gap: 16px;">
                        <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.codeUrl}" class="btn btn-secondary" target="_blank">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    </div>
                `;
        elements.projectModal.classList.add("active");
        document.body.classList.add("no-scroll");
      }
    });
  });

  // Close modal
  const closeModal = () => {
    elements.projectModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  elements.modalClose.addEventListener("click", closeModal);
  elements.projectModal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      elements.projectModal.classList.contains("active")
    ) {
      closeModal();
    }
  });
}

// ===================================
// AOS (Animate On Scroll) Init
// ===================================
function initAOS() {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 50,
  });
}

// ===================================
// Counter Animation
// ===================================
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 1500;
  const stepTime = duration / 50;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ===================================
// CRUD Helper Functions (untuk pengembangan lebih lanjut)
// ===================================

/**
 * API Service - siap untuk integrasi dengan backend
 */
const apiService = {
  baseUrl: "/api", // Ganti dengan URL API kamu

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  },

  async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("PUT Error:", error);
      throw error;
    }
  },

  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      console.error("DELETE Error:", error);
      throw error;
    }
  },
};

/**
 * Project Manager - CRUD untuk projects
 */
const projectManager = {
  projects: [],

  async loadProjects() {
    // Untuk development, gunakan data lokal
    // Untuk production, uncomment baris di bawah:
    // this.projects = await apiService.get('/projects');
    this.renderProjects();
  },

  async addProject(project) {
    // await apiService.post('/projects', project);
    this.projects.push(project);
    this.renderProjects();
  },

  async updateProject(id, updates) {
    // await apiService.put(`/projects/${id}`, updates);
    const index = this.projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...updates };
      this.renderProjects();
    }
  },

  async deleteProject(id) {
    // await apiService.delete(`/projects/${id}`);
    this.projects = this.projects.filter((p) => p.id !== id);
    this.renderProjects();
  },

  renderProjects() {
    const grid = document.getElementById("projects-grid");
    // Implementasi render projects
    console.log("Rendering projects:", this.projects);
  },
};

// Export untuk penggunaan modular
if (typeof module !== "undefined" && module.exports) {
  module.exports = { apiService, projectManager };
}
