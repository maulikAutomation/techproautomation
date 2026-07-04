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
      const company = contactForm.querySelector('#company').value;
      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const phone = contactForm.querySelector('#phone').value;
      const subject = contactForm.querySelector('select').value;
      const message = contactForm.querySelector('textarea').value;

      const btn = contactForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Sending Message...';
      btn.disabled = true;

      // Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzFcjCRsfh_tNEsbV_YASeY1RzjGbLNovNaJp0-tV7v680tO_9rkV93rxTK0i9279J8/exec';

      const formData = {
        company: company,
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
      };

      fetch(scriptURL, {
        method: 'POST',
        // Using text/plain to avoid CORS preflight issues with Google Apps Script
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if(data.result === "success") {
          btn.textContent = 'Message Sent Successfully!';
          btn.style.background = 'var(--accent)';
          contactForm.reset();
        } else {
          btn.textContent = 'Error Sending Message';
          btn.style.background = 'red';
        }
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = 'var(--primary)';
          btn.disabled = false;
        }, 4000);
      })
      .catch(error => {
        console.error('Error!', error.message);
        btn.textContent = 'Error Sending Message';
        btn.style.background = 'red';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = 'var(--primary)';
          btn.disabled = false;
        }, 4000);
      });
    });
  }
});
