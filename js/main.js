/**
 * 信毅會 Faith Learning Society
 * Main JavaScript File - Responsive Optimized
 */

(function() {
  'use strict';

  // ========================================
  // DOM Elements
  // ========================================
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const faqItems = document.querySelectorAll('.faq-item');
  const revealElements = document.querySelectorAll('.reveal');
  const body = document.body;

  // ========================================
  // Mobile Menu Toggle - FIXED
  // ========================================
  function initMobileMenu() {
    if (!mobileMenuToggle || !navMenu) return;

    mobileMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const isOpen = navMenu.classList.contains('active');
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Handle resize - close menu if window becomes larger
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
          closeMenu();
        }
      }, 100);
    });
  }

  function openMenu() {
    navMenu.classList.add('active');
    mobileMenuToggle.classList.add('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }

  // ========================================
  // Header Scroll Effect
  // ========================================
  function initHeaderScroll() {
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ========================================
  // FAQ Accordion
  // ========================================
  function initFAQ() {
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', function() {
          // Close other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });

          // Toggle current item
          item.classList.toggle('active');
        });

        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
          }
        });

        // Make focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', item.classList.contains('active'));
      }
    });
  }

  // ========================================
  // Scroll Reveal Animation
  // ========================================
  function initScrollReveal() {
    if (!revealElements.length) return;

    const revealOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
      
      revealElements.forEach(element => {
        revealObserver.observe(element);
      });
    } else {
      // Fallback for older browsers
      revealElements.forEach(element => {
        element.classList.add('active');
      });
    }
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          // Close mobile menu if open
          closeMenu();
          
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without scrolling
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  // ========================================
  // Button Ripple Effect
  // ========================================
  function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          pointer-events: none;
          width: 100px;
          height: 100px;
          left: ${x - 50}px;
          top: ${y - 50}px;
          transform: scale(0);
          animation: ripple 0.6s linear;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation to document
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ========================================
  // Lazy Loading Images
  // ========================================
  function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (!lazyImages.length) return;

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // ========================================
  // Accessibility Enhancements
  // ========================================
  function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    }

    // Set aria-expanded on mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.setAttribute('aria-label', '開啟選單');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.setAttribute('aria-controls', 'nav-menu');
    }

    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.pillar-card, .feature-card, .audience-card');
    interactiveElements.forEach(element => {
      if (!element.getAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });
  }

  // ========================================
  // Touch Device Detection
  // ========================================
  function initTouchDetection() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.documentElement.classList.add('touch-device');
    } else {
      document.documentElement.classList.add('no-touch');
    }
  }

  // ========================================
  // Viewport Height Fix for Mobile
  // ========================================
  function initViewportFix() {
    // Fix for mobile browsers where 100vh includes address bar
    function setViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setViewportHeight, 100);
    });
  }

  // ========================================
  // Performance Optimization
  // ========================================
  function initPerformance() {
    // Debounce function for scroll/resize events
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

    // Throttle function for frequent events
    function throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }

    // Expose utilities globally if needed
    window.FaithWill = window.FaithWill || {};
    window.FaithWill.utils = { debounce, throttle };
  }

  // ========================================
  // Print Styles Handler
  // ========================================
  function initPrintHandler() {
    window.addEventListener('beforeprint', () => {
      // Expand all FAQ items for printing
      faqItems.forEach(item => item.classList.add('active'));
      
      // Show all reveal elements
      revealElements.forEach(el => el.classList.add('active'));
    });
  }

  // ========================================
  // Initialize Everything
  // ========================================
  function init() {
    initTouchDetection();
    initViewportFix();
    initMobileMenu();
    initHeaderScroll();
    initFAQ();
    initScrollReveal();
    initSmoothScroll();
    initButtonRipple();
    initLazyLoad();
    initAccessibility();
    initPerformance();
    initPrintHandler();

    // Log initialization
    console.log('🌟 信毅會 Faith Learning Society - Website Initialized');
    console.log('📚 信而有毅，學而無障');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
