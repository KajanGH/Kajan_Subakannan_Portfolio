/* ============================================
   MODERN PORTFOLIO JAVASCRIPT
   Enhanced with advanced animations and interactions
   ============================================ */

// ========== CONSTANTS & CONFIGURATION ==========
const CONFIG = {
  typewriter: {
    speed: 100,
    deleteSpeed: 50,
    delayBetweenPhrases: 2000,
    loop: true
  },
  animations: {
    observerOptions: {
      threshold: 0.1,
      rootMargin: '-50px'
    },
    staggerDelay: 100
  },
  particles: {
    count: 50,
    speed: 0.5,
    size: 2
  }
};

// ========== UTILITY FUNCTIONS ==========
const utils = {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
};

// ========== MODERN TYPEWRITER EFFECT ==========
class TypewriterEffect {
  constructor(element, phrases) {
    this.element = element;
    this.phrases = phrases;
    this.currentPhraseIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.isPaused = false;
    
    this.init();
  }
  
  init() {
    this.element.style.borderRight = '2px solid';
    this.element.style.animation = 'blink 1s infinite';
    this.addBlinkAnimation();
    this.type();
  }
  
  addBlinkAnimation() {
    if (!document.querySelector('#typewriter-blink-style')) {
      const style = document.createElement('style');
      style.id = 'typewriter-blink-style';
      style.textContent = `
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: var(--color-primary); }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  type() {
    if (this.isPaused) {
      setTimeout(() => this.type(), 100);
      return;
    }
    
    const currentPhrase = this.phrases[this.currentPhraseIndex];
    const shouldDelete = this.isDeleting;
    const speed = shouldDelete ? CONFIG.typewriter.deleteSpeed : CONFIG.typewriter.speed;
    
    if (shouldDelete) {
      this.currentCharIndex--;
    } else {
      this.currentCharIndex++;
    }
    
    const displayText = currentPhrase.substring(0, this.currentCharIndex);
    this.element.textContent = displayText;
    
    // Determine next action
    if (!shouldDelete && this.currentCharIndex === currentPhrase.length) {
      // Finished typing, start deleting after delay
      this.isPaused = true;
      setTimeout(() => {
        this.isPaused = false;
        this.isDeleting = true;
        this.type();
      }, CONFIG.typewriter.delayBetweenPhrases);
      return;
    }
    
    if (shouldDelete && this.currentCharIndex === 0) {
      // Finished deleting, move to next phrase
      this.isDeleting = false;
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
    }
    
    setTimeout(() => this.type(), speed + Math.random() * 50);
  }
}

// ========== PARALLAX HERO BACKGROUND ==========
class ParallaxBackground {
  constructor() {
    this.hero = document.querySelector('.hero');
    this.scrollY = 0;
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', utils.throttle(() => {
      this.scrollY = window.pageYOffset;
      this.updateParallax();
    }, 16));
  }
  
  updateParallax() {
    if (this.hero) {
      const speed = 0.5;
      const yPos = this.scrollY * speed;
      this.hero.style.transform = `translateY(${yPos}px)`;
    }
  }
}

// ========== ENHANCED SCROLL ANIMATIONS ==========
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.elements = [];
    this.init();
  }
  
  init() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      CONFIG.animations.observerOptions
    );
    
    this.observeElements();
  }
  
  observeElements() {
    const selectors = [
      '.fade-in-up',
      '.fade-in-left', 
      '.fade-in-right',
      '.skill-item',
      '.project-card',
      '.timeline-item'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        // Add staggered animation delay
        el.style.animationDelay = `${index * CONFIG.animations.staggerDelay}ms`;
        el.style.opacity = '0';
        el.style.transform = this.getInitialTransform(el);
        this.observer.observe(el);
      });
    });
  }
  
  getInitialTransform(element) {
    if (element.classList.contains('fade-in-left')) return 'translateX(-50px)';
    if (element.classList.contains('fade-in-right')) return 'translateX(50px)';
    return 'translateY(30px)';
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.animateElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
  
  animateElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translate(0, 0)';
    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Add special effects for different element types
    if (element.classList.contains('skill-item')) {
      setTimeout(() => {
        element.style.transform = 'translate(0, 0) scale(1.02)';
        setTimeout(() => {
          element.style.transform = 'translate(0, 0) scale(1)';
        }, 200);
      }, 300);
    }
  }
}

// ========== ENHANCED LIGHTBOX GALLERY ==========
class LightboxGallery {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightbox-image');
    this.closeBtn = document.querySelector('.lightbox-close');
    this.currentImageIndex = 0;
    this.images = [];
    
    this.init();
  }
  
  init() {
    this.setupProjectImages();
    this.bindEvents();
  }
  
  setupProjectImages() {
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => this.openLightbox(img.src, index));
      this.images.push(img.src);
    });
  }
  
  bindEvents() {
    this.closeBtn?.addEventListener('click', () => this.closeLightbox());
    this.lightbox?.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox?.classList.contains('active')) return;
      
      switch(e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    });
  }
  
  openLightbox(imageSrc, index = 0) {
    this.currentImageIndex = index;
    this.lightboxImage.src = imageSrc;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    this.lightboxImage.style.opacity = '0';
    this.lightboxImage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      this.lightboxImage.style.opacity = '1';
      this.lightboxImage.style.transform = 'scale(1)';
      this.lightboxImage.style.transition = 'all 0.3s ease';
    }, 50);
  }
  
  closeLightbox() {
    this.lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.lightboxImage.src = this.images[this.currentImageIndex];
  }
  
  previousImage() {
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.images.length - 1 
      : this.currentImageIndex - 1;
    this.lightboxImage.src = this.images[this.currentImageIndex];
  }
}

// ========== ENHANCED NAVIGATION ==========
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.header = document.querySelector('.header');
    this.toggle = document.querySelector('.nav-toggle');
    this.menu = document.querySelector('.nav-menu');
    this.links = document.querySelectorAll('.nav-link');
    this.lastScrollY = 0;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.createMobileMenu();
  }
  
  bindEvents() {
    // Mobile menu toggle
    this.toggle?.addEventListener('click', () => this.toggleMobileMenu());
    
    // Smooth scroll for navigation links
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = this.header?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          this.closeMobileMenu();
        }
      });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', utils.throttle(() => {
      this.updateHeaderOnScroll();
    }, 16));
  }
  
  createMobileMenu() {
    if (!this.menu || window.innerWidth >= 768) return;
    
    this.menu.style.position = 'fixed';
    this.menu.style.top = '100%';
    this.menu.style.left = '0';
    this.menu.style.right = '0';
    this.menu.style.background = 'rgba(255, 255, 255, 0.95)';
    this.menu.style.backdropFilter = 'blur(10px)';
    this.menu.style.flexDirection = 'column';
    this.menu.style.padding = '2rem';
    this.menu.style.transform = 'translateY(-100%)';
    this.menu.style.transition = 'transform 0.3s ease';
    this.menu.style.zIndex = '999';
  }
  
  toggleMobileMenu() {
    const isOpen = this.toggle?.getAttribute('aria-expanded') === 'true';
    this.toggle?.setAttribute('aria-expanded', !isOpen);
    
    if (window.innerWidth < 768) {
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    }
  }
  
  openMobileMenu() {
    if (this.menu) {
      this.menu.style.display = 'flex';
      this.menu.style.transform = 'translateY(0)';
      document.body.style.overflow = 'hidden';
    }
  }
  
  closeMobileMenu() {
    if (this.menu) {
      this.menu.style.transform = 'translateY(-100%)';
      document.body.style.overflow = '';
      setTimeout(() => {
        if (window.innerWidth < 768) {
          this.menu.style.display = 'none';
        }
      }, 300);
    }
    this.toggle?.setAttribute('aria-expanded', 'false');
  }
  
  updateHeaderOnScroll() {
    const currentScrollY = window.pageYOffset;
    
    if (this.header) {
      if (currentScrollY > 100) {
        this.header.style.background = 'rgba(255, 255, 255, 0.98)';
        this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        this.header.style.background = 'rgba(255, 255, 255, 0.95)';
        this.header.style.boxShadow = 'none';
      }
    }
    
    this.lastScrollY = currentScrollY;
  }
}

// ========== ENHANCED CONTACT FORM ==========
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }
  
  init() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.addRealTimeValidation();
  }
  
  addRealTimeValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', utils.debounce(() => {
        this.clearFieldError(input);
      }, 300));
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    this.clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }
    
    // Minimum length validation
    if (field.name === 'message' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long.';
    }
    
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }
    
    return isValid;
  }
  
  showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      errorElement.style.color = '#ef4444';
      errorElement.style.fontSize = '0.875rem';
      errorElement.style.marginTop = '0.25rem';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }
  
  clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      this.showFormMessage('Please fix the errors above.', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.showFormMessage('Thank you! Your message has been sent successfully.', 'success');
      this.form.reset();
      
    } catch (error) {
      this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }
  
  showFormMessage(message, type) {
    let messageElement = this.form.querySelector('.form-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      messageElement.style.padding = '1rem';
      messageElement.style.borderRadius = '0.5rem';
      messageElement.style.marginTop = '1rem';
      messageElement.style.fontWeight = '500';
      this.form.appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.style.background = type === 'success' ? '#dcfce7' : '#fef2f2';
    messageElement.style.color = type === 'success' ? '#166534' : '#dc2626';
    messageElement.style.border = `1px solid ${type === 'success' ? '#bbf7d0' : '#fecaca'}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
}

// ========== PERFORMANCE OPTIMIZATIONS ==========
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
  }
  
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  preloadCriticalResources() {
    const criticalImages = [
      '/assets/images/headshot.jpg'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// ========== INITIALIZATION ==========
class PortfolioApp {
  constructor() {
    this.components = {};
    this.init();
  }
  
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }
  
  initializeComponents() {
    try {
      // Initialize core components
      this.components.navigation = new Navigation();
      this.components.scrollAnimations = new ScrollAnimations();
      this.components.lightbox = new LightboxGallery();
      this.components.contactForm = new ContactForm();
      this.components.performance = new PerformanceOptimizer();
      
      // Initialize typewriter effect
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        this.components.typewriter = new TypewriterEffect(heroTitle, [
          'Full-Stack Developer',
          'UI/UX Designer', 
          'Problem Solver',
          'Creative Thinker'
        ]);
      }
      
      // Initialize parallax (optional)
      this.components.parallax = new ParallaxBackground();
      
      console.log('Portfolio initialized successfully!');
      
    } catch (error) {
      console.error('Error initializing portfolio:', error);
    }
  }
}

// ========== START APPLICATION ==========
const portfolio = new PortfolioApp();
