document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect & Active States
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    function toggleMenu() {
        navMenu.classList.toggle('active');
        if (menuOverlay) menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        const isActive = navMenu.classList.contains('active');
        
        // Simple animation for hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    mobileToggle.addEventListener('click', toggleMenu);

    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in if you don't want it to fade out on scroll up
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
});
