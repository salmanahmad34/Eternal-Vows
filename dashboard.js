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

    // --- 0.1 Auth Session Guard & Dashboard Loader ---
    let currentUser = null;
    
    async function initAuth() {
        if (!supabaseClient) {
            console.warn('Supabase client not available. Running in local fallback mode.');
            setupDashboard();
            return;
        }
        
        try {
            const { data: { session }, error } = await supabaseClient.auth.getSession();
            if (error) throw error;
            
            if (!session) {
                // Not authenticated! Redirect to index.html with query flag
                window.location.href = 'index.html?openAuth=true';
                return;
            }
            
            currentUser = session.user;
            
            // Update username in topbar
            const userNameEl = document.querySelector('.user-name');
            if (userNameEl && currentUser.email) {
                userNameEl.textContent = currentUser.email.split('@')[0];
            }
            
            setupDashboard();
        } catch (err) {
            console.error('Session guard error:', err);
            setupDashboard();
        }
    }
    
    initAuth();

    function setupDashboard() {
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
            
            // Intercept checkout redirect and save values to localStorage
            const checkoutLink = document.querySelector('a[href="checkout.html"]');
            if (checkoutLink) {
                checkoutLink.addEventListener('click', (e) => {
                    const groom = document.getElementById('groomName')?.value || '';
                    const bride = document.getElementById('brideName')?.value || '';
                    const date = document.getElementById('weddingDate')?.value || '';
                    const msg = document.getElementById('inviteMessage')?.value || '';
                    const selectedBox = document.querySelector('.template-box.selected h3');
                    const templateName = selectedBox ? selectedBox.textContent : 'Dark Luxe Premium';
                    
                    const pendingData = {
                        groom_name: groom,
                        bride_name: bride,
                        wedding_date: date,
                        invite_message: msg,
                        template_name: templateName
                    };
                    localStorage.setItem('eternal_vowz_pending_invite', JSON.stringify(pendingData));
                });
            }
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
                if (dateInput.value) {
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
            
            // Check if there was a pre-populated handle from landing page claim bar
            const claimedHandle = sessionStorage.getItem('eternal_vowz_claimed_handle');
            if (claimedHandle) {
                const parts = claimedHandle.split(/[-& +]/).filter(p => p.length > 0);
                if (parts.length >= 2) {
                    groomInput.value = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
                    brideInput.value = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                } else if (parts.length === 1) {
                    groomInput.value = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
                }
                updatePreview();
                sessionStorage.removeItem('eternal_vowz_claimed_handle');
            }
        }

        // --- 4. Template Selection ---
        const templates = document.querySelectorAll('.template-box');
        templates.forEach(template => {
            template.addEventListener('click', () => {
                templates.forEach(t => t.classList.remove('selected'));
                template.classList.add('selected');
            });
        });

        // --- 5. Checkout Simulator & Supabase Database Insert ---
        const payBtn = document.getElementById('pay-btn');
        if (payBtn) {
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
                            
                            const userId = currentUser ? currentUser.id : null;
                            const { data, error } = await supabaseClient
                                .from('invitations')
                                .insert([
                                    {
                                        user_id: userId,
                                        groom_name: inviteData.groom_name,
                                        bride_name: inviteData.bride_name,
                                        wedding_date: inviteData.wedding_date,
                                        invite_message: inviteData.invite_message,
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
                            const localInvites = JSON.parse(localStorage.getItem('eternal_vowz_local_invitations') || '[]');
                            localInvites.push({
                                id: 'local_' + Date.now(),
                                groom_name: inviteData.groom_name,
                                bride_name: inviteData.bride_name,
                                wedding_date: inviteData.wedding_date,
                                invite_message: inviteData.invite_message,
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
                }
            } catch (err) {
                console.error('Fetch invitations from Supabase failed, reading from localStorage:', err);
            }
            
            // Merge local storage items if any
            const localInvites = JSON.parse(localStorage.getItem('eternal_vowz_local_invitations') || '[]');
            invites = [...invites, ...localInvites];
            
            // 1. If we are on dashboard.html: load Stats & 5 Recent
            if (recentList) {
                updateDashboardStats(invites);
                renderRecentPanel(invites.slice(0, 5));
            }
            
            // 2. If we are on invitations.html: render complete table
            if (inviteTableBody) {
                renderTable(invites);
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
                viewSpan.appendChild(document.createTextNode(`${invite.views || 0} Views`));
                meta.appendChild(viewSpan);
                
                details.appendChild(meta);
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
                
                // Column 4: Shared Count (views)
                const viewsTd = document.createElement('td');
                viewsTd.innerHTML = '<i class="fas fa-link" style="color: var(--text-light); margin-right: 6px;"></i> ';
                viewsTd.appendChild(document.createTextNode(invite.views || 0));
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
