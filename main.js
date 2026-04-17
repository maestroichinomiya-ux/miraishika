// Header scroll effect
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add animation class to sections
document.querySelectorAll(
  '.medical-card, .feature-item, .staff-card, .equipment-item, .about-grid, .section-header'
).forEach(el => {
  el.classList.add('fade-target');
  observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .fade-target {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-target.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .medical-card:nth-child(2) { transition-delay: 0.08s; }
  .medical-card:nth-child(3) { transition-delay: 0.16s; }
  .medical-card:nth-child(4) { transition-delay: 0.08s; }
  .medical-card:nth-child(5) { transition-delay: 0.16s; }
  .medical-card:nth-child(6) { transition-delay: 0.24s; }
  .feature-item:nth-child(2) { transition-delay: 0.08s; }
  .feature-item:nth-child(3) { transition-delay: 0.12s; }
  .feature-item:nth-child(4) { transition-delay: 0.16s; }
  .equipment-item:nth-child(2) { transition-delay: 0.1s; }
  .equipment-item:nth-child(3) { transition-delay: 0.2s; }
`;
document.head.appendChild(style);
