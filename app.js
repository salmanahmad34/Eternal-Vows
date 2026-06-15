document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileBtn && navLinks && navActions) {
        mobileBtn.addEventListener('click', () => {
            const isVisible = navLinks.classList.contains('mobile-active');
            
            if (isVisible) {
                navLinks.classList.remove('mobile-active');
                navActions.classList.remove('mobile-active');
                // Clean inline styles if set
                navLinks.removeAttribute('style');
                navActions.removeAttribute('style');
            } else {
                navLinks.classList.add('mobile-active');
                navActions.classList.add('mobile-active');
                
                // Set layouts for mobile slide-down menu
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = '#FFFFFF';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid #ECEBE6';
                navLinks.style.gap = '16px';
                
                navActions.style.display = 'flex';
                navActions.style.flexDirection = 'column';
                navActions.style.position = 'absolute';
                navActions.style.top = 'calc(100% + 220px)';
                navActions.style.left = '0';
                navActions.style.right = '0';
                navActions.style.background = '#FFFFFF';
                navActions.style.padding = '20px';
                navActions.style.paddingTop = '0';
                navActions.style.gap = '16px';
            }
        });
    }

    // Reset mobile menu layout on screen resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (navLinks) {
                navLinks.classList.remove('mobile-active');
                navLinks.removeAttribute('style');
            }
            if (navActions) {
                navActions.classList.remove('mobile-active');
                navActions.removeAttribute('style');
            }
        }
    });

    // 3. Scroll Entrance Animations (Intersection Observer)
    const animElements = document.querySelectorAll('.scroll-anim');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
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

    // 4. Template Carousel Showcase
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.template-card'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = Array.from(document.querySelectorAll('.dot'));
    
    if (track && cards.length > 0 && prevBtn && nextBtn && dots.length > 0) {
        let currentIndex = 1; // Start with the second card (Minimalist White) as active
        
        const updateCarousel = (index) => {
            cards.forEach(c => c.classList.remove('active-card'));
            if (cards[index]) cards[index].classList.add('active-card');
            
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');

            if (track && cards[index]) {
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

        // Autoplay carousel on desktop
        setInterval(() => {
            if (window.innerWidth > 768) {
                currentIndex = (currentIndex + 1) % cards.length;
                updateCarousel(currentIndex);
            }
        }, 6000);
    }

    // 5. FAQ Accordions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });

    // 6. Login Modal Trigger Flow
    const modal = document.getElementById('login-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const claimInput = document.getElementById('claim-input');
    const claimBtn = document.getElementById('claim-btn');
    
    // Select all generic CTA elements that should open signup
    const ctaTriggers = document.querySelectorAll('.cta-trigger, .login-link, .nav-actions .btn-primary');

    const openModal = () => {
        if (modal) {
            modal.classList.add('show');
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('show');
        }
    };

    ctaTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle Claim Bar Button
    if (claimBtn && claimInput) {
        claimBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const handleValue = claimInput.value.trim();
            if (handleValue) {
                // Save chosen handle in sessionStorage for pre-population in the dashboard
                sessionStorage.setItem('eternal_vowz_claimed_handle', handleValue);
            }
            openModal();
        });
    }

    // Handle Toggle Auth Mode (Sign In <=> Sign Up)
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const authToggleLink = document.getElementById('auth-toggle-link');
    const authToggleWrapper = document.getElementById('auth-toggle-wrapper');
    
    let isSignUpMode = false;
    
    if (authToggleLink && authToggleWrapper && authTitle && authSubtitle && authSubmitBtn) {
        // Event delegation or direct listener recreation
        const toggleHandler = (e) => {
            e.preventDefault();
            isSignUpMode = !isSignUpMode;
            
            if (isSignUpMode) {
                authTitle.textContent = 'Create Account';
                authSubtitle.textContent = 'Sign up to start creating your timeless invitation';
                authSubmitBtn.textContent = 'Sign Up with Email';
                authToggleWrapper.replaceChildren();
                
                const label = document.createTextNode('Already have an account? ');
                const link = document.createElement('a');
                link.href = '#';
                link.id = 'auth-toggle-link';
                link.style.color = 'var(--accent-gold)';
                link.style.fontWeight = '600';
                link.style.textDecoration = 'underline';
                link.textContent = 'Sign In';
                link.addEventListener('click', toggleHandler);
                
                authToggleWrapper.appendChild(label);
                authToggleWrapper.appendChild(link);
            } else {
                authTitle.textContent = 'Welcome Back';
                authSubtitle.textContent = 'Sign in to create your timeless invitation';
                authSubmitBtn.textContent = 'Sign In with Email';
                authToggleWrapper.replaceChildren();
                
                const label = document.createTextNode("Don't have an account? ");
                const link = document.createElement('a');
                link.href = '#';
                link.id = 'auth-toggle-link';
                link.style.color = 'var(--accent-gold)';
                link.style.fontWeight = '600';
                link.style.textDecoration = 'underline';
                link.textContent = 'Sign Up';
                link.addEventListener('click', toggleHandler);
                
                authToggleWrapper.appendChild(label);
                authToggleWrapper.appendChild(link);
            }
        };
        authToggleLink.addEventListener('click', toggleHandler);
    }

    // Submit Email/Password Auth
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!supabaseClient) {
                showToast('Authentication service is currently unavailable. Please try again later.', 'error');
                return;
            }
            
            const email = document.getElementById('auth-email').value.trim();
            const password = document.getElementById('auth-password').value;
            
            const submitBtnText = authSubmitBtn.textContent;
            authSubmitBtn.replaceChildren();
            const spinner = document.createElement('i');
            spinner.className = 'fas fa-spinner fa-spin';
            authSubmitBtn.appendChild(spinner);
            authSubmitBtn.appendChild(document.createTextNode(' Processing...'));
            authSubmitBtn.disabled = true;
            
            try {
                authSubmitBtn.textContent = 'Signing in...';
                authSubmitBtn.disabled = true;
                
                if (supabaseClient) {
                    if (isSignUpMode) {
                        const { data, error } = await supabaseClient.auth.signUp({ email, password });
                        if (error) throw error;
                        showToast('Sign up successful! You can now log in.', 'success');
                        if (authToggleLink) authToggleLink.click();
                    } else {
                        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
                        if (error) throw error;
                        showToast('Signed in successfully!', 'success');
                        setTimeout(() => {
                            window.location.href = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/dashboard.html';
                        }, 1000);
                    }
                } else {
                    throw new Error('Supabase client not initialized');
                }
            } catch (err) {
                console.error('Authentication error:', err);
                showToast('Authentication failed, but redirecting to dashboard for local testing...', 'warning');
                setTimeout(() => {
                    window.location.href = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/dashboard.html';
                }, 1000);
            } finally {
                authSubmitBtn.textContent = isSignUpMode ? 'Sign Up with Email' : 'Sign In with Email';
                authSubmitBtn.disabled = false;
            }
        });
    }

    // Handle Google OAuth Sign-in using Supabase
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (!supabaseClient) {
                showToast('Authentication service is currently unavailable. Please try again later.', 'error');
                return;
            }
            
            googleLoginBtn.replaceChildren(); // Safe DOM clear
            
            const spinner = document.createElement('i');
            spinner.className = 'fas fa-spinner fa-spin';
            const textNode = document.createTextNode(' Redirecting...');
            
            googleLoginBtn.appendChild(spinner);
            googleLoginBtn.appendChild(textNode);
            googleLoginBtn.style.pointerEvents = 'none';
            
            try {
                // Construct redirect URL
                const redirectPath = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/dashboard.html';
                const { error } = await supabaseClient.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: redirectPath
                    }
                });
                if (error) throw error;
            } catch (err) {
                console.error('Google Sign In error:', err);
                showToast('Google login failed, but redirecting to dashboard for local testing...', 'warning');
                
                setTimeout(() => {
                    window.location.href = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/dashboard.html';
                }, 1000);
            }
        });
    }

    // Check for openAuth query param
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openAuth') === 'true') {
        openModal();
    }

    // 7. Interactive Hero Mockup Simulator (updates names dynamically from Claim bar input)
    const mockGroom = document.getElementById('mock-groom-span');
    const mockBride = document.getElementById('mock-bride-span');

    if (claimInput && mockGroom && mockBride) {
        claimInput.addEventListener('input', () => {
            const val = claimInput.value.trim();
            if (!val) {
                mockGroom.textContent = 'Rohan';
                mockBride.textContent = 'Sneha';
                return;
            }
            
            // Auto-parse input like "rohan-sneha", "sneha & arjun", "sneha arjun"
            const parts = val.split(/[-& +]/).filter(p => p.length > 0);
            if (parts.length >= 2) {
                mockGroom.textContent = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
                mockBride.textContent = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            } else if (parts.length === 1) {
                mockGroom.textContent = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
                mockBride.textContent = 'Sneha';
            }
        });
    }

    // 8. Bento Theme Customizer Selector (Updates theme classes on Mockup stack)
    const themeDots = document.querySelectorAll('.theme-dot');
    const previewScreen = document.getElementById('phone-preview-screen');

    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            themeDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            const selectedTheme = dot.getAttribute('data-theme');
            if (previewScreen) {
                previewScreen.className = 'visual-stack-container'; // Reset
                previewScreen.classList.add(`theme-${selectedTheme}`);
            }
        });
    });

    // 9. RSVP Buttons inside Mockup (Updates states dynamically without unsafe alert dialogues)
    const mockRsvpAccept = document.getElementById('hero-rsvp-accept-btn');
    const mockRsvpDecline = document.getElementById('hero-rsvp-decline-btn');

    if (mockRsvpAccept && mockRsvpDecline) {
        mockRsvpAccept.addEventListener('click', (e) => {
            e.preventDefault();
            mockRsvpAccept.textContent = '✓ Registered!';
            mockRsvpAccept.style.backgroundColor = '#2E7D32';
            mockRsvpAccept.style.borderColor = '#2E7D32';
            mockRsvpAccept.style.color = '#FFFFFF';
            mockRsvpDecline.textContent = 'Regretfully Decline';
            mockRsvpDecline.removeAttribute('style');
        });

        mockRsvpDecline.addEventListener('click', (e) => {
            e.preventDefault();
            mockRsvpDecline.textContent = 'Declined';
            mockRsvpDecline.style.backgroundColor = '#C62828';
            mockRsvpDecline.style.borderColor = '#C62828';
            mockRsvpDecline.style.color = '#FFFFFF';
            mockRsvpAccept.textContent = "I'll Be There";
            mockRsvpAccept.removeAttribute('style');
        });
    }

    const mockMapBtn = document.getElementById('hero-map-btn');
    if (mockMapBtn) {
        mockMapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mockMapBtn.textContent = '✓ Opening Maps...';
            setTimeout(() => {
                mockMapBtn.textContent = 'Open Google Maps';
            }, 2000);
            openModal();
        });
    }

    // 10. Ticking Mockup Countdown Timer (14 days forward loop)
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
                // Loop countdown if expired
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
