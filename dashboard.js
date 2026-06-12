document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Luxury Splash Screen Logic ---
    const splash = document.getElementById('splash-screen');
    const splashPlayed = sessionStorage.getItem('splashPlayed');

    const hideSplash = () => {
        if (splash) {
            splash.classList.add('splash-hidden');
            document.body.style.overflow = '';
        }
    };

    if (splash) {
        if (splashPlayed) {
            splash.style.display = 'none';
        } else {
            document.body.style.overflow = 'hidden';
            sessionStorage.setItem('splashPlayed', 'true');
            
            initSplashParticles();
            
            const splashTimeout = setTimeout(hideSplash, 3000);
            
            // Skip instantly on click
            splash.addEventListener('click', () => {
                clearTimeout(splashTimeout);
                hideSplash();
            });
        }
    }

    function initSplashParticles() {
        const canvas = document.getElementById('splash-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        const resizeHandler = () => {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        };
        window.addEventListener('resize', resizeHandler);
        
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvasHeight;
            }
            
            reset() {
                this.x = Math.random() * canvasWidth;
                this.y = canvasHeight + Math.random() * 20;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedY = Math.random() * 0.5 + 0.15;
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.alpha = Math.random() * 0.4 + 0.1;
                this.fadeSpeed = Math.random() * 0.0015 + 0.0005;
                this.color = `rgba(228, 203, 172, ${this.alpha})`;
            }
            
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.alpha -= this.fadeSpeed;
                
                if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > canvasWidth + 10) {
                    this.reset();
                } else {
                    this.color = `rgba(228, 203, 172, ${this.alpha})`;
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
        
        const particleCount = Math.min(45, Math.floor(canvasWidth / 25));
        const particles = Array.from({ length: particleCount }, () => new Particle());
        let animId;
        
        function drawFrame() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            animId = requestAnimationFrame(drawFrame);
        }
        
        drawFrame();
        
        setTimeout(() => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resizeHandler);
        }, 4500);
    }

    // --- 1. Sidebar Mobile Toggle ---
    const toggleBtn = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    // --- 2. Create Flow Wizard Logic ---
    const steps = document.querySelectorAll('.step-content');
    const dots = document.querySelectorAll('.step-dot');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');

    let currentStep = 0;

    const showStep = (index) => {
        steps.forEach((step, i) => {
            step.classList.remove('active');
            if (i === index) step.classList.add('active');
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'completed');
            if (i < index) {
                dot.classList.add('completed');
            } else if (i === index) {
                dot.classList.add('active');
            }
        });
        
        // Scroll to top when changing steps
        document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (nextBtns.length > 0) {
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                    showStep(currentStep);
                }
            });
        });
    }

    // --- 3. Live Preview Updater (Create Flow Step 2 -> Step 3) ---
    const groomInput = document.getElementById('groomName');
    const brideInput = document.getElementById('brideName');
    const dateInput = document.getElementById('weddingDate');
    const msgInput = document.getElementById('inviteMessage');

    const previewNames = document.getElementById('preview-names');
    const previewDate = document.getElementById('preview-date');
    const previewMsg = document.getElementById('preview-message');

    const updatePreview = () => {
        if (previewNames && groomInput && brideInput) {
            const groom = groomInput.value || 'Groom';
            const bride = brideInput.value || 'Bride';
            previewNames.innerHTML = `${groom} <br>&<br> ${bride}`;
        }
        
        if (previewDate && dateInput) {
            if(dateInput.value) {
                const d = new Date(dateInput.value);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                previewDate.textContent = d.toLocaleDateString('en-US', options);
            } else {
                previewDate.textContent = 'Date TBD';
            }
        }
        
        if (previewMsg && msgInput) {
            previewMsg.textContent = msgInput.value || 'Join us as we begin forever';
        }
    };

    if (groomInput) {
        [groomInput, brideInput, dateInput, msgInput].forEach(input => {
            input.addEventListener('input', updatePreview);
        });
    }

    // --- 4. Template Selection ---
    const templates = document.querySelectorAll('.template-box');
    templates.forEach(template => {
        template.addEventListener('click', () => {
            templates.forEach(t => t.classList.remove('selected'));
            template.classList.add('selected');
        });
    });

    // --- 5. Checkout Simulator ---
    const payBtn = document.getElementById('pay-btn');
    if (payBtn) {
        payBtn.addEventListener('click', () => {
            payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            payBtn.style.pointerEvents = 'none';
            setTimeout(() => {
                alert('Payment Successful! Your invitation is now live.');
                window.location.href = 'invitations.html';
            }, 2000);
        });
    }

    // --- 6. Logout Session Clearer ---
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sessionStorage.removeItem('splashPlayed');
        });
    });
});
