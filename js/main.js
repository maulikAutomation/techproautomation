document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Extract form data
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const subject = contactForm.querySelector('select').value;
      const message = contactForm.querySelector('textarea').value;

      const btn = contactForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Opening Email App...';
      btn.disabled = true;

      // Construct mailto link
      const mailtoLink = `mailto:info@mrtechautomation.in?subject=Website Inquiry: ${subject}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      
      setTimeout(() => {
        window.location.href = mailtoLink;
        btn.textContent = 'Email App Opened';
        btn.style.background = 'var(--accent)';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = 'var(--primary)';
          btn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }
});
