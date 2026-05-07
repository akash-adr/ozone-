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

    // 4. Hero Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const carouselTrack = document.getElementById('heroCarousel');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;
        
        const updateCarousel = (newIndex) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = newIndex;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };
        
        const nextSlide = () => {
            let newIndex = (currentSlide + 1) % totalSlides;
            updateCarousel(newIndex);
        };
        
        const prevSlide = () => {
            let newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel(newIndex);
        };
        
        const startSlideShow = () => {
            slideInterval = setInterval(nextSlide, 2500);
        };
        
        const resetSlideShow = () => {
            clearInterval(slideInterval);
            startSlideShow();
        };
        
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetSlideShow();
            });
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetSlideShow();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarousel(index);
                resetSlideShow();
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetSlideShow();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetSlideShow();
            }
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (carouselTrack) {
            carouselTrack.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            carouselTrack.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchEndX < touchStartX - 50) {
                    nextSlide();
                    resetSlideShow();
                }
                if (touchEndX > touchStartX + 50) {
                    prevSlide();
                    resetSlideShow();
                }
            }, { passive: true });
        }
        
        startSlideShow();
    }
});
