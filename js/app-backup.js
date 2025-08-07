/* ============================================
   MAIN JAVASCRIPT - PORTFOLIO WEBSITE
   ============================================ */

// ============================================
// TYPEWRITER EFFECT
// ============================================

function typewriterEffect(element, text, speed = 100, callback = null) {
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================

function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
  
  // Update aria-expanded for accessibility
  const isExpanded = navMenu.classList.contains('active');
  navToggle.setAttribute('aria-expanded', isExpanded);
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

function handleHeaderScroll() {
  const header = document.querySelector('.header');
  const scrolled = window.scrollY > 50;
  
  if (scrolled) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
}

// ============================================
// PROJECT LIGHTBOX
// ============================================

function createLightbox() {
  const lightboxHTML = `
    <div id="lightbox" class="lightbox">
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-info">
          <h3 class="lightbox-title"></h3>
          <p class="lightbox-description"></p>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  
  // Add lightbox styles
  const lightboxStyles = `
    <style>
      .lightbox {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        animation: fadeIn 0.3s ease-out;
      }
      
      .lightbox-content {
        position: relative;
        margin: auto;
        padding: 20px;
        max-width: 90%;
        max-height: 90%;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
      }
      
      .lightbox-image {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      }
      
      .lightbox-close {
        position: absolute;
        top: 15px;
        right: 35px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s;
      }
      
      .lightbox-close:hover {
        color: #ccc;
      }
      
      .lightbox-info {
        color: white;
        margin-top: 20px;
      }
      
      .lightbox-title {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }
      
      .lightbox-description {
        font-size: 1rem;
        opacity: 0.8;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', lightboxStyles);
}

function openLightbox(imageSrc, title, description) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDescription = lightbox.querySelector('.lightbox-description');
  
  lightboxImage.src = imageSrc;
  lightboxTitle.textContent = title;
  lightboxDescription.textContent = description;
  
  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// ============================================
// FORM HANDLING
// ============================================

function handleContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('.btn-primary');
  const originalText = submitButton.textContent;
  
  // Show loading state
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // TODO: Replace with your actual form handling service
  // This is a placeholder - you'll need to implement actual form submission
  setTimeout(() => {
    // Show success message
    submitButton.textContent = 'Message Sent!';
    submitButton.style.background = 'var(--color-secondary)';
    
    // Reset form
    form.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.style.background = '';
    }, 3000);
  }, 2000);
}

// ============================================
// PARALLAX EFFECT (OPTIONAL)
// ============================================

function handleParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================

function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function createScrollToTopButton() {
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '↑';
  scrollButton.className = 'scroll-to-top';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  
  const buttonStyles = `
    <style>
      .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
      }
      
      .scroll-to-top:hover {
        background: var(--color-primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', buttonStyles);
  document.body.appendChild(scrollButton);
  
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Show/hide based on scroll position
  function toggleScrollButton() {
    if (window.scrollY > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', toggleScrollButton);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize typewriter effect for hero
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.textContent = '';
    typewriterEffect(heroTitle, 'Hi, I\'m Kajan Subakannan', 100);
  }
  
  // Set up intersection observer for animations
  const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
  animatedElements.forEach(el => observer.observe(el));
  
  // Set up smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScrollTo(targetId);
      
      // Close mobile menu if open
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
  
  // Set up mobile navigation
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Set up header scroll effect
  window.addEventListener('scroll', () => {
    handleHeaderScroll();
    updateActiveNavigation();
    // Uncomment for parallax effect
    // handleParallax();
  });
  
  // Set up contact form
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Set up project lightbox
  createLightbox();
  
  // Close lightbox when clicking outside or on close button
  document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });
  
  // Close lightbox with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
  
  // Set up project image clicks
  document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('click', function() {
      const card = this.closest('.project-card');
      const title = card.querySelector('.project-title').textContent;
      const description = card.querySelector('.project-description').textContent;
      openLightbox(this.src, title, description);
    });
  });
  
  // Set up lazy loading
  setupLazyLoading();
  
  // Create scroll to top button
  createScrollToTopButton();
  
  // Add cursor pointer to project images
  document.querySelectorAll('.project-image').forEach(img => {
    img.style.cursor = 'pointer';
  });
  
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Optimize scroll event listeners
const optimizedScrollHandler = throttle(() => {
  handleHeaderScroll();
  updateActiveNavigation();
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log(`
🚀 Portfolio Website Loaded Successfully!
👨‍💻 Built by Kajan Subakannan
🌟 Thanks for checking out the console!

Interested in the code? Check out the GitHub repository:
https://github.com/KajanGH/Kajan_Subakannan_Portfolio
`);