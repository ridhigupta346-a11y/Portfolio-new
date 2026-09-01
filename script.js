/**
 * Ridhi Kumari - Portfolio Website Interactive Scripts
 * Features: Mobile Nav, Category Filter, Terminal Typewriter, 1-Click Copy, Modals, Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Mobile Navigation Menu Toggle & Smooth Navigation
     ========================================================================== */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  const closeMenu = () => {
    if (navMenu) {
      navMenu.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose) {
    navClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show')) {
      if (!navMenu.contains(e.target) && (!navToggle || !navToggle.contains(e.target))) {
        closeMenu();
      }
    }
  });

  /* ==========================================================================
     2. Header Shadow on Scroll & Active Navigation Link Tracking
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  let isScrolling = false;
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header glass background toggle
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active link highlighting based on current viewport
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });

    isScrolling = false;
  };

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(handleScroll);
      isScrolling = true;
    }
  }, { passive: true });

  handleScroll(); // Initial run

  /* ==========================================================================
     2.1 Hero Showcase Tab Switcher (Profile Photo & Dev Terminal)
     ========================================================================== */
  const tabBtnPhoto = document.getElementById('tab-btn-photo');
  const tabBtnCode = document.getElementById('tab-btn-code');
  const tabContentPhoto = document.getElementById('tab-content-photo');
  const tabContentCode = document.getElementById('tab-content-code');
  const btnQuickTerminal = document.getElementById('btn-quick-terminal');

  function switchHeroTab(tabName) {
    if (tabName === 'code') {
      if (tabBtnCode) {
        tabBtnCode.classList.add('active');
        tabBtnCode.setAttribute('aria-selected', 'true');
      }
      if (tabBtnPhoto) {
        tabBtnPhoto.classList.remove('active');
        tabBtnPhoto.setAttribute('aria-selected', 'false');
      }
      if (tabContentCode) tabContentCode.classList.add('active');
      if (tabContentPhoto) tabContentPhoto.classList.remove('active');
    } else {
      if (tabBtnPhoto) {
        tabBtnPhoto.classList.add('active');
        tabBtnPhoto.setAttribute('aria-selected', 'true');
      }
      if (tabBtnCode) {
        tabBtnCode.classList.remove('active');
        tabBtnCode.setAttribute('aria-selected', 'false');
      }
      if (tabContentPhoto) tabContentPhoto.classList.add('active');
      if (tabContentCode) tabContentCode.classList.remove('active');
    }
  }

  if (tabBtnPhoto) {
    tabBtnPhoto.addEventListener('click', () => switchHeroTab('photo'));
  }
  if (tabBtnCode) {
    tabBtnCode.addEventListener('click', () => switchHeroTab('code'));
  }
  if (btnQuickTerminal) {
    btnQuickTerminal.addEventListener('click', () => switchHeroTab('code'));
  }

  /* ==========================================================================
     3. Hero Terminal Interactive Typewriter Effect
     ========================================================================== */
  const typingElement = document.getElementById('typing-text');
  const phrases = [
    'Ridhi.get_status()',
    '"Building scalable solutions & ready to make an impact!"',
    'Ridhi.get_core_skills()',
    '["C++", "Python", "JavaScript", "SQL", "HTML/CSS"]',
    'Ridhi.check_open_for_work()',
    'True  # Actively interviewing for Internships! 🚀'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 70;

  function typeEffect() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2200; // Pause after typing phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingElement) {
    typeEffect();
  }

  /* ==========================================================================
     4. Project Category Filtering with Clean Animation
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        // Clear any existing animation timeouts on this card
        if (card._filterTimeout) {
          clearTimeout(card._filterTimeout);
          card._filterTimeout = null;
        }

        const category = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || category === filterValue;

        if (shouldShow) {
          card.style.display = 'flex';
          // Trigger reflow for smooth transition
          void card.offsetWidth;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          card._filterTimeout = setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     5. 1-Click Copy Email to Clipboard (Robust Non-Destructive DOM)
     ========================================================================== */
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = 'ridhigupta346@gmail.com';
  let copyTimeoutId = null;

  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const icon = copyBtn.querySelector('i');
      const tooltip = copyBtn.querySelector('.copy-tooltip');

      const setCopiedUI = () => {
        if (icon) icon.className = 'fa-solid fa-check';
        if (tooltip) {
          tooltip.textContent = 'Copied!';
          tooltip.classList.add('show');
        }

        if (copyTimeoutId) clearTimeout(copyTimeoutId);
        copyTimeoutId = setTimeout(() => {
          if (icon) icon.className = 'fa-regular fa-copy';
          if (tooltip) {
            tooltip.textContent = 'Copy';
            tooltip.classList.remove('show');
          }
        }, 2200);
      };

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailText);
          setCopiedUI();
        } else {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = emailText;
          textarea.style.position = 'fixed';
          textarea.style.left = '-999999px';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          setCopiedUI();
        }
      } catch (err) {
        console.warn('Clipboard copy failed:', err);
        setCopiedUI();
      }
    });
  }

  /* ==========================================================================
     6. Interactive Architecture / Project Details Modals
     ========================================================================== */
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.modal-close, .modal-backdrop');

  const openModal = (targetModal) => {
    if (!targetModal) return;
    targetModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeAllModals = () => {
    modals.forEach((m) => m.classList.remove('active'));
    document.body.style.overflow = 'auto';
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = trigger.getAttribute('data-modal');
      const targetModal = document.getElementById(targetModalId);
      openModal(targetModal);
    });
  });

  modalCloses.forEach((closeBtn) => {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllModals();
    });
  });

  // Clicking on the outer modal background (padding area) closes modal
  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });

    // Prevent clicks inside modal-dialog from bubbling to modal
    const dialog = modal.querySelector('.modal-dialog');
    if (dialog) {
      dialog.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeMenu();
    }
  });

  /* ==========================================================================
     7. Contact Form Handling
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('sender-name')?.value || '').trim();
      const email = (document.getElementById('sender-email')?.value || '').trim();
      const subject = (document.getElementById('sender-subject')?.value || '').trim();
      const message = (document.getElementById('sender-message')?.value || '').trim();

      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields.';
        return;
      }

      // Simulate sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Preparing...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        // Construct mailto link
        const mailtoUrl = `mailto:ridhigupta346@gmail.com?subject=${encodeURIComponent(
          `[Portfolio Contact] ${subject || 'Inquiry from ' + name}`
        )}&body=${encodeURIComponent(
          `Hi Ridhi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        formStatus.className = 'form-status success';
        formStatus.innerHTML = `Thank you, ${name}! Opening your email client to send message...`;

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Message Ready!</span> <i class="fa-solid fa-check"></i>';

        // Trigger mail client
        window.location.href = mailtoUrl;

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
          formStatus.textContent = '';
        }, 6000);
      }, 600);
    });
  }

  /* ==========================================================================
     8. Dynamic Current Year in Footer
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
