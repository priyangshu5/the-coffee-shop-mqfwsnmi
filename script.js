document.addEventListener('DOMContentLoaded', function() {

    // Mobile Nav Toggle
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    if (nav && navUl) {
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.setAttribute('aria-label', 'Toggle navigation');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '&#9776;';
        nav.insertBefore(menuToggle, navUl);

        menuToggle.addEventListener('click', function() {
            const isOpen = navUl.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        });
    }

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile nav if open after clicking a link
                    if (navUl && navUl.classList.contains('active')) {
                        navUl.classList.remove('active');
                        if (menuToggle) {
                            menuToggle.setAttribute('aria-expanded', 'false');
                            menuToggle.innerHTML = '&#9776;';
                        }
                    }
                }
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('section, footer');
    if (revealElements.length > 0) {
        revealElements.forEach(function(el) {
            el.classList.add('reveal-hidden');
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    entry.target.classList.remove('reveal-hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // Contact Form Submission Handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';
            
            if (submitBtn) {
                submitBtn.textContent = 'Sent!';
                submitBtn.disabled = true;
            }

            setTimeout(function() {
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 2500);
        });
    }

    // Current Year in Footer
    const footer = document.getElementById('footer');
    if (footer) {
        const copyP = footer.querySelector('p');
        if (copyP) {
            const currentYear = new Date().getFullYear();
            copyP.innerHTML = copyP.innerHTML.replace(/\d{4}/, currentYear);
        }
    }

});