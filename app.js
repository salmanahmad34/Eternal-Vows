document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    mobileBtn.addEventListener('click', () => {
        // Simple toggle for mobile (can be expanded with a slide-out panel CSS)
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#FFFFFF';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        
        navActions.style.display = isVisible ? 'none' : 'flex';
        navActions.style.flexDirection = 'column';
        navActions.style.position = 'absolute';
        navActions.style.top = 'calc(100% + 180px)';
        navActions.style.left = '0';
        navActions.style.right = '0';
        navActions.style.background = '#FFFFFF';
        navActions.style.padding = '20px';
        navActions.style.paddingTop = '0';
        navActions.style.boxShadow = '0 20px 20px rgba(0,0,0,0.1)';
    });

    // Reset mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navActions.style.display = '';
            navActions.style.flexDirection = '';
            navActions.style.position = '';
        }
    });

    // 3. Scroll Entrance Animations (Intersection Observer)
    const animElements = document.querySelectorAll('.scroll-anim');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));

    // 4. Carousel Logic
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.template-card'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = Array.from(document.querySelectorAll('.dot'));
    
    let currentIndex = 1; // Start at center active card
    let cardWidth = cards[0].getBoundingClientRect().width;
    let gap = 30; // gap from CSS
    
    const updateCarousel = (index) => {
        // Highlight active card
        cards.forEach(c => c.classList.remove('active-card'));
        if(cards[index]) cards[index].classList.add('active-card');
        
        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        if(dots[index]) dots[index].classList.add('active');

        // Scroll track
        if(track && cards[index]) {
            track.scrollTo({
                left: cards[index].offsetLeft - (track.clientWidth / 2) + (cards[index].clientWidth / 2),
                behavior: 'smooth'
            });
        }
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    // Auto-scroll carousel every 5 seconds
    setInterval(() => {
        if(window.innerWidth > 768) { // Only auto-scroll on desktop
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel(currentIndex);
        }
    }, 5000);

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 6. Login Modal Logic
    const modal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-modal');
    const googleLoginBtn = document.getElementById('google-login-btn');
    
    // Select all buttons that should trigger the login modal
    const getStartedBtns = document.querySelectorAll('.btn-primary, .login-link');
    
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Simulate Google Login and Redirect to Dashboard
    googleLoginBtn.addEventListener('click', () => {
        googleLoginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        googleLoginBtn.style.pointerEvents = 'none';
        
        // Simulate network delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });

    // --- 7. Interactive Hero Mockup Simulator ---
    const simGroom = document.getElementById('sim-groom');
    const simBride = document.getElementById('sim-bride');
    const mockGroom = document.getElementById('mock-groom-span');
    const mockBride = document.getElementById('mock-bride-span');
    const previewScreen = document.getElementById('phone-preview-screen');
    const themeDots = document.querySelectorAll('.theme-dot');

    if (simGroom && mockGroom) {
        simGroom.addEventListener('input', () => {
            mockGroom.textContent = simGroom.value || 'Groom';
        });
    }

    if (simBride && mockBride) {
        simBride.addEventListener('input', () => {
            mockBride.textContent = simBride.value || 'Bride';
        });
    }

    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            themeDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            const selectedTheme = dot.getAttribute('data-theme');
            if (previewScreen) {
                previewScreen.classList.remove('theme-champagne', 'theme-rose', 'theme-dark');
                previewScreen.classList.add(`theme-${selectedTheme}`);
            }
        });
    });

    // --- 8. Mockup Countdown Clock ---
    const mockDaysEl = document.getElementById('mock-days');
    const mockHoursEl = document.getElementById('mock-hours');
    const mockMinEl = document.getElementById('mock-minutes');
    const mockSecEl = document.getElementById('mock-seconds');

    if (mockDaysEl && mockHoursEl && mockMinEl && mockSecEl) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 14);
        targetDate.setHours(targetDate.getHours() + 8);
        targetDate.setMinutes(targetDate.getMinutes() + 45);
        targetDate.setSeconds(targetDate.getSeconds() + 30);

        const updateMockCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                targetDate.setDate(new Date().getDate() + 14);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            mockDaysEl.textContent = String(days).padStart(2, '0');
            mockHoursEl.textContent = String(hours).padStart(2, '0');
            mockMinEl.textContent = String(minutes).padStart(2, '0');
            mockSecEl.textContent = String(seconds).padStart(2, '0');
        };

        updateMockCountdown();
        setInterval(updateMockCountdown, 1000);
    }

});
