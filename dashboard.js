document.addEventListener('DOMContentLoaded', () => {
    // Redirect settings.html immediately as it is disabled
    if (window.location.pathname.endsWith('settings.html')) {
        window.location.href = 'dashboard.html';
        return;
    }
    
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

    let currentUser = null;
    
    async function initAuth() {
        try {
            if (supabaseClient) {
                const { data: { session }, error } = await supabaseClient.auth.getSession();
                if (!error && session) {
                    currentUser = session.user;
                }
            }
        } catch (err) {
            console.error('Session guard error:', err);
        }
        
        // Fallback to mock user if not authenticated (allows testing without Supabase auth)
        if (!currentUser) {
            console.warn('Using local mock user for testing');
            currentUser = { 
                id: 'mock-user-123', 
                email: 'test@eternalvowz.com', 
                user_metadata: { full_name: 'Test User' },
                created_at: new Date().toISOString()
            };
        }
        
        // Update username and email in topbar/dropdown
        const userNameEl = document.querySelector('.user-name');
        let displayName = 'User';
        if (userNameEl && currentUser.email) {
            displayName = currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
            userNameEl.textContent = displayName;
        }
        const userEmailEl = document.querySelector('.dropdown-user-email');
        if (userEmailEl && currentUser.email) {
            userEmailEl.textContent = currentUser.email;
        }
        
        // Update avatar initials
        const userAvatars = document.querySelectorAll('.user-avatar');
        userAvatars.forEach(avatar => {
            // Don't overwrite if it has an image or special content, but we know we removed the image
            if (!avatar.hasAttribute('id') || avatar.id !== 'profile-page-avatar') {
                avatar.textContent = displayName.charAt(0).toUpperCase();
            }
        });
        
        setupDashboard();
    }
    
    initAuth();

    let updateSidebarBadge;

    function setupDashboard() {
        // --- 0.2 Sidebar Badge Count Logic ---
        updateSidebarBadge = async function(customCount) {
            let count = 0;
            if (typeof customCount === 'number') {
                count = customCount;
            } else {
                try {
                    if (supabaseClient && currentUser) {
                        const { count: dbCount, error } = await supabaseClient
                            .from('invitations')
                            .select('*', { count: 'exact', head: true })
                            .eq('user_id', currentUser.id);
                        if (!error && dbCount !== null) {
                            count = dbCount;
                        }
                    }
                } catch (err) {
                    console.error('Error fetching badge count from Supabase:', err);
                }
                
                try {
                    const localInvites = JSON.parse(localStorage.getItem('eternal_vowz_local_invitations') || '[]');
                    count += localInvites.length;
                } catch (e) {
                    console.error('Error parsing local invites for badge:', e);
                }
            }
            
            const badgeEls = document.querySelectorAll('.menu-links .badge-count');
            badgeEls.forEach(badge => {
                badge.textContent = count;
                if (count === 0) {
                    badge.style.display = 'none';
                } else {
                    badge.style.display = 'inline-block';
                }
            });
        };
        updateSidebarBadge();

        // Inject Mobile Bottom Nav dynamically
        function injectMobileBottomNav() {
            if (document.getElementById('mobile-bottom-nav')) return;
            
            const nav = document.createElement('nav');
            nav.id = 'mobile-bottom-nav';
            nav.className = 'mobile-bottom-nav';
            
            const items = [
                { href: 'dashboard.html', icon: 'fas fa-home', label: 'Home' },
                { href: 'create.html', icon: 'fas fa-magic', label: 'Create' },
                { href: 'invitations.html', icon: 'fas fa-envelope-open-text', label: 'Invites' },
                { href: 'profile.html', icon: 'fas fa-user', label: 'Profile' }
            ];
            
            const path = window.location.pathname;
            const pageName = path.substring(path.lastIndexOf('/') + 1) || 'dashboard.html';
            
            items.forEach(item => {
                const a = document.createElement('a');
                a.href = item.href;
                a.className = 'mobile-nav-item';
                
                if (pageName === item.href || (pageName === '' && item.href === 'dashboard.html')) {
                    a.classList.add('active');
                }
                
                const icon = document.createElement('i');
                icon.className = item.icon;
                
                const label = document.createElement('span');
                label.textContent = item.label;
                
                a.appendChild(icon);
                a.appendChild(label);
                nav.appendChild(a);
            });
            
            document.body.appendChild(nav);
        }
        
        injectMobileBottomNav();

        // --- 1.0 Profile Dropdown Toggle ---
        const userProfile = document.getElementById('user-profile-menu');
        const dropdown = document.getElementById('profile-dropdown');
        
        if (userProfile && dropdown) {
            userProfile.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });
            
            document.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });
        }

        // --- 1. Sidebar Mobile Toggle ---
        const toggleBtn = document.getElementById('mobile-toggle');
        const sidebar = document.getElementById('sidebar');

        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            });
        }

        // --- 2. Create Flow Wizard Logic ---
        const steps = document.querySelectorAll('.step-content');
        const wizardDots = document.querySelectorAll('.step-dot');
        const nextBtns = document.querySelectorAll('.next-step');
        const prevBtns = document.querySelectorAll('.prev-step');

        let currentStep = 0;

        const showStep = (index) => {
            steps.forEach((step, i) => {
                step.classList.remove('active');
                if (i === index) step.classList.add('active');
            });

            wizardDots.forEach((dot, i) => {
                dot.classList.remove('active', 'completed');
                if (i < index) {
                    dot.classList.add('completed');
                } else if (i === index) {
                    dot.classList.add('active');
                }
            });

            // If entering Step 3 (index 2), compile and load the selected template preview inside the iframe
            if (index === 2) {
                updateLivePreview();
            }
            
            document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
        };

        function updateLivePreview() {
            const iframe = document.getElementById('live-preview-iframe');
            if (!iframe) return;
            
            const selectedBox = document.querySelector('.template-box.selected');
            const templateId = selectedBox ? selectedBox.getAttribute('data-template-id') : 'royal-gold-burgundy';
            
            const groom = document.getElementById('groomName')?.value || 'Groom';
            const bride = document.getElementById('brideName')?.value || 'Bride';
            const ceremony = document.getElementById('ceremonyName')?.value || 'Wedding Ceremony';
            const dateVal = document.getElementById('weddingDate')?.value;
            const timeVal = document.getElementById('weddingTime')?.value || '19:00';
            const venueName = document.getElementById('venueName')?.value || 'Grand Venue';
            const venueLoc = document.getElementById('venueLocation')?.value || 'Location';
            const inviteMsg = document.getElementById('inviteMessage')?.value || 'Join us as we celebrate love';
            
            // Premium fields
            const quran = document.getElementById('quranVerse')?.value || '';
            const subtitle = document.getElementById('inviteSubtitle')?.value || '';
            const c2Name = document.getElementById('ceremony2Name')?.value || '';
            const c2Date = document.getElementById('ceremony2Date')?.value || '';
            const c2Time = document.getElementById('ceremony2Time')?.value || '';
            const c3Name = document.getElementById('ceremony3Name')?.value || '';
            const c3Date = document.getElementById('ceremony3Date')?.value || '';
            const c3Time = document.getElementById('ceremony3Time')?.value || '';
            const c4Name = document.getElementById('ceremony4Name')?.value || '';
            const c4Date = document.getElementById('ceremony4Date')?.value || '';
            const c4Time = document.getElementById('ceremony4Time')?.value || '';
            const rsvpQuoteVal = document.getElementById('rsvpQuote')?.value || '';
            
            let formattedDate = 'Date TBD';
            let countdownDateStr = '';
            if (dateVal) {
                try {
                    const [year, month, day] = dateVal.split('-');
                    const [hourStr, minuteStr] = timeVal.split(':');
                    const hour = parseInt(hourStr, 10);
                    const minute = parseInt(minuteStr, 10);
                    
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const monthName = months[parseInt(month, 10) - 1] || 'Jan';
                    
                    const amampm = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour % 12 || 12;
                    const displayMinute = minute.toString().padStart(2, '0');
                    const displayHourStr = displayHour.toString().padStart(2, '0');
                    
                    formattedDate = `${parseInt(day, 10)} ${monthName} ${year}, ${displayHourStr}:${displayMinute} ${amampm}`;
                    countdownDateStr = `${monthName} ${parseInt(day, 10)}, ${year} ${timeVal}:00`;
                } catch (e) {
                    console.error("Error formatting date: ", e);
                    formattedDate = dateVal;
                }
            }
            
            const data = {
                groom_name: groom,
                bride_name: bride,
                ceremony_name: ceremony,
                wedding_date: formattedDate,
                wedding_time: timeVal,
                venue_name: venueName,
                venue_location: venueLoc,
                invite_message: inviteMsg,
                countdown_date: countdownDateStr,
                // Premium fields
                quran_verse: quran,
                invite_message_subtitle: subtitle,
                ceremony2_name: c2Name,
                ceremony2_date: c2Date,
                ceremony2_time: c2Time,
                ceremony3_name: c3Name,
                ceremony3_date: c3Date,
                ceremony3_time: c3Time,
                ceremony4_name: c4Name,
                ceremony4_date: c4Date,
                ceremony4_time: c4Time,
                rsvp_quote: rsvpQuoteVal
            };
            
            if (typeof WeddingTemplates !== 'undefined' && WeddingTemplates[templateId]) {
                let htmlStr = WeddingTemplates[templateId].compile(data);
                
                // Inject static RSVP preview block
                const rsvpPreviewBlock = `
                <style>
                    .ev-rsvp-bar-preview {
                        position: fixed; bottom: 0; left: 0; right: 0; 
                        background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
                        padding: 15px; display: flex; justify-content: center; gap: 15px; z-index: 1000;
                        border-top: 1px solid rgba(255,255,255,0.1);
                    }
                    .ev-rsvp-btn-preview {
                        padding: 10px 24px; border-radius: 30px; font-weight: 600; cursor: pointer; border: none; font-family: sans-serif; transition: 0.2s; pointer-events: none;
                    }
                    .ev-btn-accept-preview { background: #10B981; color: white; }
                    .ev-btn-reject-preview { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.5); }
                </style>
                <div class="ev-rsvp-bar-preview">
                    <button class="ev-rsvp-btn-preview ev-btn-accept-preview">Attend</button>
                    <button class="ev-rsvp-btn-preview ev-btn-reject-preview">Decline</button>
                </div>
                `;
                
                if (htmlStr.includes('</body>')) {
                    htmlStr = htmlStr.replace('</body>', rsvpPreviewBlock + '\\n</body>');
                } else {
                    htmlStr += rsvpPreviewBlock;
                }

                // Fallback to srcdoc, but also write manually for compatibility
                iframe.srcdoc = htmlStr;
                try {
                    const doc = iframe.contentWindow ? iframe.contentWindow.document : iframe.contentDocument;
                    if (doc) {
                        doc.open();
                        doc.write(htmlStr);
                        doc.close();
                    }
                } catch(e) { console.error('Iframe write error:', e); }
            }
        }

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
            
            // Intercept checkout redirect and save values to localStorage
            const checkoutLink = document.querySelector('a[href="checkout.html"]');
            if (checkoutLink) {
                checkoutLink.addEventListener('click', (e) => {
                    const selectedBox = document.querySelector('.template-box.selected');
                    const templateId = selectedBox ? selectedBox.getAttribute('data-template-id') : 'royal-gold-burgundy';
                    const templateName = selectedBox ? selectedBox.querySelector('h3').textContent : 'Royal Gold & Burgundy';
                    const category = selectedBox ? selectedBox.getAttribute('data-category') : 'standard';
                    const price = category === 'premium' ? 79 : 39;
                    
                    const groom = document.getElementById('groomName')?.value || 'Groom';
                    const bride = document.getElementById('brideName')?.value || 'Bride';
                    const ceremony = document.getElementById('ceremonyName')?.value || 'Wedding Ceremony';
                    const dateVal = document.getElementById('weddingDate')?.value || '';
                    const timeVal = document.getElementById('weddingTime')?.value || '';
                    const venueName = document.getElementById('venueName')?.value || '';
                    const venueLoc = document.getElementById('venueLocation')?.value || '';
                    const msg = document.getElementById('inviteMessage')?.value || '';
                    
                    // Premium fields
                    const quran = document.getElementById('quranVerse')?.value || '';
                    const subtitle = document.getElementById('inviteSubtitle')?.value || '';
                    const c2Name = document.getElementById('ceremony2Name')?.value || '';
                    const c2Date = document.getElementById('ceremony2Date')?.value || '';
                    const c2Time = document.getElementById('ceremony2Time')?.value || '';
                    const c3Name = document.getElementById('ceremony3Name')?.value || '';
                    const c3Date = document.getElementById('ceremony3Date')?.value || '';
                    const c3Time = document.getElementById('ceremony3Time')?.value || '';
                    const c4Name = document.getElementById('ceremony4Name')?.value || '';
                    const c4Date = document.getElementById('ceremony4Date')?.value || '';
                    const c4Time = document.getElementById('ceremony4Time')?.value || '';
                    const rsvpQuoteVal = document.getElementById('rsvpQuote')?.value || '';
                    
                    const pendingData = {
                        groom_name: groom,
                        bride_name: bride,
                        ceremony_name: ceremony,
                        wedding_date: dateVal,
                        wedding_time: timeVal,
                        venue_name: venueName,
                        venue_location: venueLoc,
                        invite_message: msg,
                        template_id: templateId,
                        template_name: templateName,
                        price: price,
                        category: category,
                        // Premium fields
                        quran_verse: quran,
                        invite_message_subtitle: subtitle,
                        ceremony2_name: c2Name,
                        ceremony2_date: c2Date,
                        ceremony2_time: c2Time,
                        ceremony3_name: c3Name,
                        ceremony3_date: c3Date,
                        ceremony3_time: c3Time,
                        ceremony4_name: c4Name,
                        ceremony4_date: c4Date,
                        ceremony4_time: c4Time,
                        rsvp_quote: rsvpQuoteVal
                    };
                    localStorage.setItem('eternal_vowz_pending_invite', JSON.stringify(pendingData));
                });
            }
        }

        // --- 3. Pre-populate handles from landing page ---
        const groomInput = document.getElementById('groomName');
        const brideInput = document.getElementById('brideName');

        if (groomInput) {
            const claimedHandle = sessionStorage.getItem('eternal_vowz_claimed_handle');
            if (claimedHandle) {
                const parts = claimedHandle.split(/[-& +]/).filter(p => p.length > 0);
                if (parts.length >= 2) {
                    groomInput.value = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
                    brideInput.value = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                } else if (parts.length === 1) {
                    groomInput.value = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
                }
                sessionStorage.removeItem('eternal_vowz_claimed_handle');
            }
        }

        // --- 4. Template Selection & Preview Logic ---
        const templates = document.querySelectorAll('.template-box');
        const previewModal = document.getElementById('template-preview-modal');
        const previewIframe = document.getElementById('template-preview-iframe');
        const closeModalBtn = document.getElementById('close-template-preview');

        function onTemplateSelected(template) {
            const category = template.getAttribute('data-category');
            const premiumFields = document.getElementById('premium-fields');
            const checkoutBtn = document.querySelector('a[href="checkout.html"]');
            
            if (category === 'premium') {
                if (premiumFields) premiumFields.style.display = 'block';
                if (checkoutBtn) checkoutBtn.textContent = 'Create — ₹79';
            } else {
                if (premiumFields) premiumFields.style.display = 'none';
                if (checkoutBtn) checkoutBtn.textContent = 'Create — ₹39';
            }
            if(typeof updateLivePreview === 'function') updateLivePreview();
        }

        // Initialize state for currently selected template on page load
        const initialSelected = document.querySelector('.template-box.selected');
        if (initialSelected) {
            onTemplateSelected(initialSelected);
        }

        // Category Tab Switcher
        const categoryTabs = document.querySelectorAll('.pricing-tab');
        if (categoryTabs.length > 0) {
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    const category = tab.getAttribute('data-category');
                    let firstVisible = null;
                    templates.forEach(t => {
                        if (t.getAttribute('data-category') === category) {
                            t.style.display = '';
                            if (!firstVisible) firstVisible = t;
                        } else {
                            t.style.display = 'none';
                        }
                    });
                    
                    if (firstVisible) {
                        firstVisible.click();
                    }
                });
            });
        }

        templates.forEach(template => {
            // Inject clear preview button into each template box
            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn-secondary';
            prevBtn.style.cssText = 'width: 100%; margin-top: 10px; padding: 6px; font-size: 0.8rem; border-radius: 4px; border: 1px solid var(--border-color); cursor: pointer;';
            prevBtn.innerHTML = '<i class="far fa-eye"></i> Full Preview';
            template.appendChild(prevBtn);
            
            // Hide the old "Click again to preview" small text
            const smallText = template.querySelector('small');
            if (smallText) smallText.style.display = 'none';

            // Select template on click, or preview if already selected
            template.addEventListener('click', (e) => {
                if (e.target.closest('button') === prevBtn) {
                    e.stopPropagation();
                    return;
                }
                if (template.classList.contains('selected')) {
                    const templateId = template.getAttribute('data-template-id');
                    if (typeof WeddingTemplates !== 'undefined' && WeddingTemplates[templateId] && previewModal && previewIframe) {
                        const templateObj = WeddingTemplates[templateId];
                        previewIframe.srcdoc = templateObj.compile(templateObj.defaultData);
                        previewModal.style.display = 'flex';
                    }
                } else {
                    templates.forEach(t => t.classList.remove('selected'));
                    template.classList.add('selected');
                    onTemplateSelected(template);
                }
            });
            
            // Handle Preview Button Click
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const templateId = template.getAttribute('data-template-id');
                if (typeof WeddingTemplates !== 'undefined' && WeddingTemplates[templateId] && previewModal && previewIframe) {
                    const templateObj = WeddingTemplates[templateId];
                    let htmlStr = templateObj.compile(templateObj.defaultData);
                    
                    // Inject static RSVP preview block
                    const rsvpPreviewBlock = `
                    <style>
                        .ev-rsvp-bar-preview {
                            position: fixed; bottom: 0; left: 0; right: 0; 
                            background: rgba(0,0,0,0.8); backdrop-filter: blur(10px);
                            padding: 15px; display: flex; justify-content: center; gap: 15px; z-index: 1000;
                            border-top: 1px solid rgba(255,255,255,0.1);
                        }
                        .ev-rsvp-btn-preview {
                            padding: 10px 24px; border-radius: 30px; font-weight: 600; cursor: pointer; border: none; font-family: sans-serif; transition: 0.2s; pointer-events: none;
                        }
                        .ev-btn-accept-preview { background: #10B981; color: white; }
                        .ev-btn-reject-preview { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.5); }
                    </style>
                    <div class="ev-rsvp-bar-preview">
                        <button class="ev-rsvp-btn-preview ev-btn-accept-preview">Attend</button>
                        <button class="ev-rsvp-btn-preview ev-btn-reject-preview">Decline</button>
                    </div>
                    `;
                    
                    if (htmlStr.includes('</body>')) {
                        htmlStr = htmlStr.replace('</body>', rsvpPreviewBlock + '\\n</body>');
                    } else {
                        htmlStr += rsvpPreviewBlock;
                    }
                    
                    previewIframe.srcdoc = htmlStr;
                    try {
                        const doc = previewIframe.contentWindow ? previewIframe.contentWindow.document : previewIframe.contentDocument;
                        if (doc) {
                            doc.open();
                            doc.write(htmlStr);
                            doc.close();
                        }
                    } catch(err) {}
                    previewModal.style.display = 'flex';
                }
            });

            // Double click triggers preview button
            template.addEventListener('dblclick', () => {
                prevBtn.click();
            });
        });

        if (closeModalBtn && previewModal) {
            closeModalBtn.addEventListener('click', () => {
                previewModal.style.display = 'none';
                if (previewIframe) previewIframe.srcdoc = '';
            });

            previewModal.addEventListener('click', (e) => {
                if (e.target === previewModal) {
                    previewModal.style.display = 'none';
                    if (previewIframe) previewIframe.srcdoc = '';
                }
            });
        }

        // --- 5. Checkout Simulator & Supabase Database Insert ---
        const payBtn = document.getElementById('pay-btn');
        if (payBtn) {
            // Dynamically update order summary based on pending invite price
            const pendingInviteStrOnLoad = localStorage.getItem('eternal_vowz_pending_invite');
            if (pendingInviteStrOnLoad) {
                try {
                    const inviteData = JSON.parse(pendingInviteStrOnLoad);
                    const isPremium = inviteData.template_id === 'royal-union-scratch';
                    const basePrice = isPremium ? 79 : (inviteData.price || 39);
                    const itemName = isPremium ? '1 Premium Digital Invitation' : '1 Standard Digital Invitation';
                    const gst = Math.round(basePrice * 0.05);
                    const total = basePrice + gst;
                    
                    const itemNameEl = document.getElementById('checkout-item-name');
                    const basePriceEl = document.getElementById('checkout-base-price');
                    const gstEl = document.getElementById('checkout-gst');
                    const totalEl = document.getElementById('checkout-total-price');
                    
                    if (itemNameEl) itemNameEl.textContent = itemName;
                    if (basePriceEl) basePriceEl.textContent = `₹${basePrice}`;
                    if (gstEl) gstEl.textContent = `₹${gst}`;
                    if (totalEl) totalEl.textContent = `₹${total}`;
                } catch (e) {
                    console.error("Error dynamically updating checkout summary:", e);
                }
            }

            payBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                payBtn.style.pointerEvents = 'none';
                
                // Simulating Payment Success & DB Push
                setTimeout(async () => {
                    const pendingInviteStr = localStorage.getItem('eternal_vowz_pending_invite');
                    if (pendingInviteStr) {
                        const inviteData = JSON.parse(pendingInviteStr);
                        
                        try {
                            if (!supabaseClient) throw new Error('Supabase client not loaded');
                            
                             const serializedMsg = JSON.stringify({
                                 message: inviteData.invite_message,
                                 ceremony_name: inviteData.ceremony_name,
                                 venue_name: inviteData.venue_name,
                                 venue_location: inviteData.venue_location,
                                 wedding_time: inviteData.wedding_time,
                                 template_id: inviteData.template_id,
                                 // Premium fields
                                 quran_verse: inviteData.quran_verse || '',
                                 invite_message_subtitle: inviteData.invite_message_subtitle || '',
                                 ceremony2_name: inviteData.ceremony2_name || '',
                                 ceremony2_date: inviteData.ceremony2_date || '',
                                 ceremony2_time: inviteData.ceremony2_time || '',
                                 ceremony3_name: inviteData.ceremony3_name || '',
                                 ceremony3_date: inviteData.ceremony3_date || '',
                                 ceremony3_time: inviteData.ceremony3_time || '',
                                 ceremony4_name: inviteData.ceremony4_name || '',
                                 ceremony4_date: inviteData.ceremony4_date || '',
                                 ceremony4_time: inviteData.ceremony4_time || '',
                                 rsvp_quote: inviteData.rsvp_quote || ''
                             });

                             const userId = currentUser ? currentUser.id : null;
                             const { data, error } = await supabaseClient
                                 .from('invitations')
                                 .insert([
                                     {
                                         user_id: userId,
                                         groom_name: inviteData.groom_name,
                                         bride_name: inviteData.bride_name,
                                         wedding_date: inviteData.wedding_date,
                                         invite_message: serializedMsg,
                                         template_name: inviteData.template_name,
                                         status: 'Active',
                                         views: 0
                                     }
                                 ]);
                             if (error) throw error;
                             
                             localStorage.removeItem('eternal_vowz_pending_invite');
                             showToast('Invitation successfully saved to Supabase!', 'success');
                         } catch (err) {
                             console.error('Supabase insert failed. Falling back to LocalStorage:', err);
                             
                             // Local Fallback
                             const serializedMsgFallback = JSON.stringify({
                                 message: inviteData.invite_message,
                                 ceremony_name: inviteData.ceremony_name,
                                 venue_name: inviteData.venue_name,
                                 venue_location: inviteData.venue_location,
                                 wedding_time: inviteData.wedding_time,
                                 template_id: inviteData.template_id,
                                 // Premium fields
                                 quran_verse: inviteData.quran_verse || '',
                                 invite_message_subtitle: inviteData.invite_message_subtitle || '',
                                 ceremony2_name: inviteData.ceremony2_name || '',
                                 ceremony2_date: inviteData.ceremony2_date || '',
                                 ceremony2_time: inviteData.ceremony2_time || '',
                                 ceremony3_name: inviteData.ceremony3_name || '',
                                 ceremony3_date: inviteData.ceremony3_date || '',
                                 ceremony3_time: inviteData.ceremony3_time || '',
                                 ceremony4_name: inviteData.ceremony4_name || '',
                                 ceremony4_date: inviteData.ceremony4_date || '',
                                 ceremony4_time: inviteData.ceremony4_time || '',
                                 rsvp_quote: inviteData.rsvp_quote || ''
                             });
                             
                             const localInvites = JSON.parse(localStorage.getItem('eternal_vowz_local_invitations') || '[]');
                             localInvites.push({
                                 id: 'local_' + Date.now(),
                                 groom_name: inviteData.groom_name,
                                 bride_name: inviteData.bride_name,
                                 wedding_date: inviteData.wedding_date,
                                 invite_message: serializedMsgFallback,
                                 template_name: inviteData.template_name,
                                 status: 'Active',
                                 views: 0,
                                 created_at: new Date().toISOString()
                             });
                             localStorage.setItem('eternal_vowz_local_invitations', JSON.stringify(localInvites));
                             localStorage.removeItem('eternal_vowz_pending_invite');
                            
                            showToast('Saved locally (Offline mode).', 'info');
                        }
                    }
                    
                    showToast('Payment Successful!', 'success');
                    setTimeout(() => {
                        window.location.href = 'invitations.html';
                    }, 1000);
                }, 2000);
            });
        }

        // --- 6. Fetching and Listing (Dashboard Home & Invitations Page) ---
        const recentList = document.querySelector('.invitation-list');
        const inviteTableBody = document.querySelector('table tbody');
        
        if (recentList || inviteTableBody) {
            loadInvitationsData();
        }
        
        async function loadInvitationsData() {
            let invites = [];
            let allRsvps = [];
            let loadedFromDB = false;
            
            try {
                if (!supabaseClient) throw new Error('Supabase client not loaded');
                
                const userId = currentUser ? currentUser.id : null;
                if (userId) {
                    const { data, error } = await supabaseClient
                        .from('invitations')
                        .select('*')
                        .eq('user_id', userId)
                        .order('created_at', { ascending: false });
                    if (error) throw error;
                    
                    invites = data || [];
                    loadedFromDB = true;
                    
                    // Fetch RSVPs for these invitations
                    if (invites.length > 0) {
                        const inviteIds = invites.map(i => i.id);
                        const { data: rsvpData, error: rsvpError } = await supabaseClient
                            .from('rsvps')
                            .select('*')
                            .in('invitation_id', inviteIds);
                        if (!rsvpError) {
                            allRsvps = rsvpData || [];
                        }
                    }
                }
            } catch (err) {
                console.error('Fetch invitations from Supabase failed, reading from localStorage:', err);
            }
            
            // Merge local storage items if any
            const localInvites = JSON.parse(localStorage.getItem('eternal_vowz_local_invitations') || '[]');
            invites = [...invites, ...localInvites];
            
            // Attach RSVPs array to each invite for easy access in renderers
            invites.forEach(invite => {
                invite.rsvps = allRsvps.filter(r => r.invitation_id === invite.id);
            });
            
            // 1. If we are on dashboard.html: load Stats & 5 Recent
            if (recentList) {
                updateDashboardStats(invites);
                renderRecentPanel(invites.slice(0, 5));
            }
            
            // 2. If we are on invitations.html: render complete table
            if (inviteTableBody) {
                renderTable(invites);
            }

            if (typeof updateSidebarBadge === 'function') {
                updateSidebarBadge(invites.length);
            }
        }
        
        function updateDashboardStats(invites) {
            const statsValues = document.querySelectorAll('.stat-value');
            if (statsValues.length >= 3) {
                // 1. Invitations Created
                statsValues[0].textContent = invites.length;
                
                // 2. Guests Total (Calculate total views)
                const totalViews = invites.reduce((sum, item) => sum + (item.views || 0), 0);
                statsValues[1].textContent = totalViews;
                
                // 3. Days Until Event (Find nearest wedding date in future)
                let nearestDays = 'TBD';
                const now = new Date().getTime();
                let minDiff = Infinity;
                
                invites.forEach(invite => {
                    if (invite.wedding_date) {
                        const target = new Date(invite.wedding_date).getTime();
                        const diff = target - now;
                        if (diff > 0 && diff < minDiff) {
                            minDiff = diff;
                            nearestDays = Math.floor(diff / (1000 * 60 * 60 * 24));
                        }
                    }
                });
                statsValues[2].textContent = nearestDays;
            }
        }
        
        function renderRecentPanel(invites) {
            recentList.replaceChildren(); // Safe DOM clear
            
            if (invites.length === 0) {
                const emptyMsg = document.createElement('p');
                emptyMsg.style.color = 'var(--text-sec)';
                emptyMsg.style.textAlign = 'center';
                emptyMsg.style.padding = '20px 0';
                emptyMsg.textContent = 'No invitations created yet.';
                recentList.appendChild(emptyMsg);
                return;
            }
            
            invites.forEach(invite => {
                const card = document.createElement('div');
                card.className = 'invitation-card';
                
                const leftPart = document.createElement('div');
                
                const badge = document.createElement('span');
                badge.className = 'status-badge ' + (invite.status === 'Expired' ? 'expired' : '');
                badge.textContent = invite.status || 'Active';
                leftPart.appendChild(badge);
                
                const details = document.createElement('div');
                details.className = 'invite-details';
                
                const h4 = document.createElement('h4');
                h4.textContent = `${invite.groom_name} & ${invite.bride_name}'s Wedding`;
                details.appendChild(h4);
                
                const meta = document.createElement('div');
                meta.className = 'invite-meta';
                
                const dateSpan = document.createElement('span');
                dateSpan.innerHTML = '<i class="far fa-calendar"></i> ';
                const dateText = invite.wedding_date ? new Date(invite.wedding_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD';
                dateSpan.appendChild(document.createTextNode(dateText));
                meta.appendChild(dateSpan);
                
                const viewSpan = document.createElement('span');
                viewSpan.innerHTML = '<i class="far fa-eye"></i> ';
                viewSpan.appendChild(document.createTextNode(`${invite.views || 0} Unique Views`));
                meta.appendChild(viewSpan);
                
                // RSVPs Count
                if (invite.rsvps && invite.rsvps.length > 0) {
                    const rsvpSpan = document.createElement('span');
                    const acceptedCount = invite.rsvps.filter(r => r.status === 'accepted').length;
                    rsvpSpan.innerHTML = `<i class="fas fa-envelope-open-text"></i> ${acceptedCount}/${invite.rsvps.length} Accepted`;
                    rsvpSpan.style.color = 'var(--accent-gold)';
                    rsvpSpan.style.cursor = 'pointer';
                    rsvpSpan.title = 'View RSVP details in Invitations Tab';
                    meta.appendChild(rsvpSpan);
                }
                
                details.appendChild(meta);
                
                // Parse premium details if they exist
                try {
                    if (invite.invite_message) {
                        const parsed = JSON.parse(invite.invite_message);
                        const hasPremiumDetails = parsed.quran_verse || parsed.ceremony2_name || parsed.ceremony3_name || parsed.ceremony4_name || parsed.rsvp_quote;
                        
                        if (hasPremiumDetails) {
                            const premiumDiv = document.createElement('div');
                            premiumDiv.style.marginTop = '10px';
                            premiumDiv.style.padding = '10px';
                            premiumDiv.style.background = 'rgba(212, 175, 55, 0.05)';
                            premiumDiv.style.border = '1px solid rgba(212, 175, 55, 0.2)';
                            premiumDiv.style.borderRadius = '8px';
                            premiumDiv.style.fontSize = '0.85rem';
                            premiumDiv.style.color = 'var(--text-sec)';
                            
                            let premiumText = '<strong>Premium Details Included:</strong><br>';
                            if (parsed.quran_verse) premiumText += '• Sacred Verse included<br>';
                            if (parsed.ceremony2_name) premiumText += `• ${parsed.ceremony2_name}<br>`;
                            if (parsed.ceremony3_name) premiumText += `• ${parsed.ceremony3_name}<br>`;
                            if (parsed.ceremony4_name) premiumText += `• ${parsed.ceremony4_name}<br>`;
                            if (parsed.rsvp_quote) premiumText += '• Custom RSVP Quote<br>';
                            
                            premiumDiv.innerHTML = premiumText;
                            details.appendChild(premiumDiv);
                        }
                    }
                } catch(e) {}
                
                leftPart.appendChild(details);
                card.appendChild(leftPart);
                
                // Actions
                const actions = document.createElement('div');
                actions.className = 'invite-actions';
                
                const viewLink = document.createElement('a');
                viewLink.href = `invite.html?id=${invite.id}`;
                viewLink.target = '_blank';
                viewLink.className = 'action-btn';
                viewLink.title = 'View';
                viewLink.innerHTML = '<i class="far fa-eye"></i>';
                actions.appendChild(viewLink);
                
                const shareBtn = document.createElement('button');
                shareBtn.className = 'action-btn';
                shareBtn.title = 'Share';
                shareBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
                shareBtn.addEventListener('click', () => {
                    const shareUrl = `${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/invite.html?id=${invite.id}`;
                    const text = `You are cordially invited to the wedding of ${invite.groom_name} and ${invite.bride_name}! View details: ${shareUrl}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                });
                actions.appendChild(shareBtn);
                
                card.appendChild(actions);
                recentList.appendChild(card);
            });
        }
        
        function renderTable(invites) {
            inviteTableBody.replaceChildren(); // Safe DOM clear
            
            if (invites.length === 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = 5;
                td.style.textAlign = 'center';
                td.style.padding = '40px';
                td.style.color = 'var(--text-sec)';
                td.textContent = 'No invitations found. Click "New Invitation" to create one.';
                tr.appendChild(td);
                inviteTableBody.appendChild(tr);
                return;
            }
            
            invites.forEach(invite => {
                const tr = document.createElement('tr');
                
                // Column 1: Names & template
                const nameTd = document.createElement('td');
                const namesDiv = document.createElement('div');
                namesDiv.style.fontWeight = '600';
                namesDiv.style.color = 'var(--text-main)';
                namesDiv.textContent = `${invite.groom_name} & ${invite.bride_name}`;
                nameTd.appendChild(namesDiv);
                
                const templateDiv = document.createElement('div');
                templateDiv.style.fontSize = '0.8rem';
                templateDiv.style.color = 'var(--text-sec)';
                templateDiv.textContent = invite.template_name || 'Dark Luxe Premium';
                nameTd.appendChild(templateDiv);
                tr.appendChild(nameTd);
                
                // Column 2: Date
                const dateTd = document.createElement('td');
                const dText = invite.wedding_date ? new Date(invite.wedding_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD';
                dateTd.textContent = dText;
                tr.appendChild(dateTd);
                
                // Column 3: Status
                const statusTd = document.createElement('td');
                const statusSpan = document.createElement('span');
                statusSpan.className = 'status-badge ' + (invite.status === 'Expired' ? 'status-expired' : 'status-active');
                statusSpan.innerHTML = invite.status === 'Expired' ? '<i class="fas fa-times-circle"></i> Expired' : '<i class="fas fa-check-circle"></i> Active';
                statusSpan.appendChild(document.createTextNode(' ' + (invite.status || 'Active')));
                statusTd.appendChild(statusSpan);
                tr.appendChild(statusTd);
                
                // Column 4: Shared Count (views) & RSVPs
                const viewsTd = document.createElement('td');
                const viewsDiv = document.createElement('div');
                viewsDiv.innerHTML = '<i class="far fa-eye" style="color: var(--text-light); margin-right: 6px;"></i> ';
                viewsDiv.appendChild(document.createTextNode(`${invite.views || 0} Unique Views`));
                viewsTd.appendChild(viewsDiv);
                
                if (invite.rsvps && invite.rsvps.length > 0) {
                    const rsvpDiv = document.createElement('div');
                    rsvpDiv.style.marginTop = '4px';
                    rsvpDiv.style.fontSize = '0.85rem';
                    rsvpDiv.style.color = 'var(--accent-gold)';
                    rsvpDiv.style.cursor = 'pointer';
                    
                    const accepted = invite.rsvps.filter(r => r.status === 'accepted');
                    const rejected = invite.rsvps.filter(r => r.status === 'rejected');
                    
                    rsvpDiv.innerHTML = `<i class="fas fa-envelope-open-text"></i> ${accepted.length} Accepted, ${rejected.length} Declined`;
                    
                    // Simple click to view RSVP details
                    rsvpDiv.addEventListener('click', () => {
                        let msg = `RSVPs for ${invite.groom_name} & ${invite.bride_name}\\n\\n`;
                        msg += `--- ATTENDING ---\\n`;
                        accepted.forEach(r => msg += `• ${r.guest_name} ${r.message ? '('+r.message+')' : ''}\\n`);
                        if(accepted.length === 0) msg += `None yet.\\n`;
                        
                        msg += `\\n--- NOT ATTENDING ---\\n`;
                        rejected.forEach(r => msg += `• ${r.guest_name} ${r.message ? '(Reason: '+r.message+')' : ''}\\n`);
                        if(rejected.length === 0) msg += `None yet.\\n`;
                        
                        alert(msg);
                    });
                    
                    viewsTd.appendChild(rsvpDiv);
                }
                
                tr.appendChild(viewsTd);
                
                // Column 5: Actions
                const actionsTd = document.createElement('td');
                actionsTd.style.textAlign = 'right';
                const actionsWrapper = document.createElement('div');
                actionsWrapper.className = 'invite-actions';
                actionsWrapper.style.justifyContent = 'flex-end';
                actionsWrapper.style.border = 'none';
                actionsWrapper.style.padding = '0';
                
                const viewLink = document.createElement('a');
                viewLink.href = `invite.html?id=${invite.id}`;
                viewLink.target = '_blank';
                viewLink.className = 'btn-icon';
                viewLink.title = 'View';
                viewLink.innerHTML = '<i class="far fa-eye"></i>';
                actionsWrapper.appendChild(viewLink);
                
                const shareBtn = document.createElement('button');
                shareBtn.className = 'btn-icon';
                shareBtn.title = 'Share on WhatsApp';
                shareBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
                shareBtn.addEventListener('click', () => {
                    const shareUrl = `${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/invite.html?id=${invite.id}`;
                    const text = `You are cordially invited to the wedding of ${invite.groom_name} and ${invite.bride_name}! View details: ${shareUrl}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                });
                actionsWrapper.appendChild(shareBtn);
                
                const delBtn = document.createElement('button');
                delBtn.className = 'btn-icon';
                delBtn.title = 'Delete';
                delBtn.style.color = '#ef4444';
                delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
                delBtn.addEventListener('click', async () => {
                    if (confirm(`Are you sure you want to delete ${invite.groom_name} & ${invite.bride_name}'s invitation?`)) {
                        try {
                            if (String(invite.id).startsWith('local_')) {
                                // Delete from local storage
                                const local = JSON.parse(localStorage.getItem('eternal_vowz_local_invitations') || '[]');
                                const filtered = local.filter(i => String(i.id) !== String(invite.id));
                                localStorage.setItem('eternal_vowz_local_invitations', JSON.stringify(filtered));
                                tr.remove();
                                showToast('Invitation deleted successfully', 'success');
                            } else {
                                if (!supabaseClient) throw new Error('Supabase client not loaded');
                                const { error } = await supabaseClient.from('invitations').delete().eq('id', invite.id);
                                if (error) throw error;
                                tr.remove();
                                showToast('Invitation deleted from database', 'success');
                            }
                            
                            // Reload stats if recent list is active
                            if (recentList) {
                                loadInvitationsData();
                            }
                            if (typeof updateSidebarBadge === 'function') {
                                updateSidebarBadge();
                            }
                        } catch (err) {
                            console.error('Delete failed:', err);
                            showToast('Failed to delete invitation', 'error');
                        }
                    }
                });
                actionsWrapper.appendChild(delBtn);
                
                actionsTd.appendChild(actionsWrapper);
                tr.appendChild(actionsTd);
                inviteTableBody.appendChild(tr);
            });
        }

        // --- 7. Logout Session Clearer ---
        const logoutBtns = document.querySelectorAll('.logout-btn');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                sessionStorage.removeItem('splashPlayed');
                
                try {
                    if (supabaseClient) {
                        await supabaseClient.auth.signOut();
                    }
                } catch (err) {
                    console.error('Logout error:', err);
                }
                
                showToast('Logged out successfully.', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 800);
            });
        });
    }
});
