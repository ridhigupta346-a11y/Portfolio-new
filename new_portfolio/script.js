/**
 * Ridhi Kumari - Portfolio Website Interactive Scripts
 * Features: Mobile Nav, Category Filter, Terminal Typewriter, 1-Click Copy, Modals, Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Mobile Navigation Menu Toggle
     ========================================================================== */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show');
      document.body.style.overflow = 'auto';
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
      document.body.style.overflow = 'auto';
    });
  });

  /* ==========================================================================
     2. Header Shadow on Scroll & Active Navigation Link Tracking
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header glass background toggle
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting based on current viewport
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run

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
     4. Project Category Filtering
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
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     5. 1-Click Copy Email to Clipboard
     ========================================================================== */
  const copyBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailText = 'ridhigupta346@gmail.com';

  if (copyBtn && copyTooltip) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText);
        copyTooltip.textContent = 'Copied!';
        copyTooltip.classList.add('show');
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i><span class="copy-tooltip show" id="copy-tooltip">Copied!</span>';

        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i><span class="copy-tooltip" id="copy-tooltip">Copy</span>';
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = emailText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        copyTooltip.textContent = 'Copied!';
        copyTooltip.classList.add('show');
        setTimeout(() => {
          copyTooltip.classList.remove('show');
        }, 2000);
      }
    });
  }

  /* ==========================================================================
     6. Interactive Architecture / Project Details Modals
     ========================================================================== */
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.modal-close, .modal-backdrop');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetModalId = trigger.getAttribute('data-modal');
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloses.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      modals.forEach((m) => m.classList.remove('active'));
      document.body.style.overflow = 'auto';
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach((m) => m.classList.remove('active'));
      document.body.style.overflow = 'auto';
      if (navMenu) navMenu.classList.remove('show');
    }
  });

  /* ==========================================================================
     7. Contact Form Handling
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const subject = document.getElementById('sender-subject').value.trim();
      const message = document.getElementById('sender-message').value.trim();

      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields.';
        return;
      }

      // Simulate sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        // Construct mailto link as fallback or direct handler
        const mailtoUrl = `mailto:ridhigupta346@gmail.com?subject=${encodeURIComponent(
          `[Portfolio Contact] ${subject || 'Inquiry from ' + name}`
        )}&body=${encodeURIComponent(
          `Hi Ridhi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        formStatus.className = 'form-status success';
        formStatus.innerHTML = `Thank you, ${name}! Opening your email client to send message...`;

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Message Prepared!</span> <i class="fa-solid fa-check"></i>';

        // Trigger mail client
        window.location.href = mailtoUrl;

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
          formStatus.textContent = '';
        }, 6000);
      }, 750);
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
