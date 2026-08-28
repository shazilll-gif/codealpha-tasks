/* ==========================================================================
   SHAZIL AYAZ - PERSONAL CV & PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Custom Glow Cursor --- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');

  if (cursorDot && cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;

      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for interactive elements
    const clickables = document.querySelectorAll('a, button, .project-card, .contact-card, .timeline-content, .edu-card, .achievement-card');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* --- 2. Canvas Ambient Particle Background --- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 70);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#6366f1' : '#06b6d4';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  /* --- 3. Navbar Scroll & ScrollSpy Active Link --- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- 4. Mobile Navigation Menu Toggle --- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksMenu = document.getElementById('nav-links');

  if (mobileToggle && navLinksMenu) {
    mobileToggle.addEventListener('click', () => {
      navLinksMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksMenu.classList.remove('open');
      });
    });
  }

  /* --- 5. Stats Counter & Skill Bar Scroll Animations --- */
  let statsAnimated = false;
  let skillsAnimated = false;

  const aboutSection = document.getElementById('about');
  const skillsSection = document.getElementById('skills');

  window.addEventListener('scroll', () => {
    if (aboutSection && !statsAnimated) {
      const top = aboutSection.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        animateStats();
        statsAnimated = true;
      }
    }

    if (skillsSection && !skillsAnimated) {
      const top = skillsSection.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        animateSkills();
        skillsAnimated = true;
      }
    }
  });

  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let current = 0;
      const timer = setInterval(() => {
        current++;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = `${current}`;
      }, 150);
    });
  }

  function animateSkills() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress;
    });
  }

  /* --- 6. Project Details Modal System --- */
  const projectsData = {
    'cs50': {
      title: 'CS50 (Harvard University Coursework)',
      category: 'Computer Science Coursework',
      image: 'assets/images/project_1.png',
      description: 'An intensive computer science introductory program covering fundamentals of C, Python, SQL, HTML/CSS/JS, algorithm efficiency (Big O notation), memory allocation, and data structures (linked lists, trees, hash tables).',
      tech: ['Computer Science', 'Algorithms', 'C', 'Python', 'SQL', 'Data Structures']
    },
    'dit': {
      title: 'Diploma in IT (Database Design & Systems)',
      category: 'Technical Diploma',
      image: 'assets/images/project_2.png',
      description: 'Comprehensive IT diploma covering database design, relational schema development, computer operations, hardware management, and administrative office tools.',
      tech: ['Database Design', 'SQL', 'MS Office', 'Computer Operations', 'Information Systems']
    }
  };

  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const data = projectsData[id];

      if (data) {
        modalBody.innerHTML = `
          <img src="${data.image}" alt="${data.title}" class="modal-img">
          <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase;">${data.category}</span>
          <h2 style="font-size: 1.8rem; font-weight: 700; margin: 0.3rem 0 1rem 0;">${data.title}</h2>
          <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${data.description}</p>
          <div>
            <h4 style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 0.5rem;">Core Competencies & Stack:</h4>
            <div class="project-tags">
              ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  /* --- 7. Toast Notifications & Copy To Clipboard --- */
  function showToast(message, icon = '✓') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color: var(--accent-emerald); font-weight: bold;">${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3500);
  }

  // Copy contact detail cards
  document.querySelectorAll('.contact-card[data-copy]').forEach(card => {
    card.addEventListener('click', () => {
      const text = card.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: "${text}"`);
      }).catch(() => {
        showToast(`Selected: ${text}`);
      });
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      
      showToast(`Thank you, ${name}! Your message has been sent to Shazil Ayaz.`);
      contactForm.reset();
    });
  }

});
