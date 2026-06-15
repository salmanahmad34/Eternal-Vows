document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // STATE MANAGEMENT
    // ==========================================================================
    let activeTab = 'design';
    let currentTheme = 'champagne';
    let currentLayout = 'list';
    let currentFont = 'outfit';
    
    // Pages State
    let pages = [
        { id: 'home', name: 'Home', active: true }
    ];
    let currentPageId = 'home';
    
    // Folders State
    let folders = [
        { id: 'folder-socials', name: 'Social Links' }
    ];
    let openFolderId = null; // tracks if viewing nested folder inside phone

    // Blocks State
    let blocks = [
        { id: 'b1', pageId: 'home', folderId: null, type: 'header', title: 'Featured Content', url: '', visible: true },
        { id: 'b2', pageId: 'home', folderId: null, type: 'link', title: 'My Online Shop 🛍️', url: 'https://shop.creator.com', visible: true },
        { id: 'b3', pageId: 'home', folderId: 'folder-socials', type: 'link', title: 'Follow on Instagram 📸', url: 'https://instagram.com/creator', visible: true },
        { id: 'b4', pageId: 'home', folderId: 'folder-socials', type: 'link', title: 'Watch on TikTok 🎬', url: 'https://tiktok.com/@creator', visible: true },

        { id: 'b6', pageId: 'home', folderId: null, type: 'video', title: 'Behind the Scenes Vlog 📹', url: 'https://www.youtube.com/watch?v=BTSvlog', visible: true },
        { id: 'b7', pageId: 'home', folderId: null, type: 'form', title: 'Newsletter Signup ✉️', url: '', visible: true }
    ];

    // ==========================================================================
    // DOM CACHING
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const previewScreen = document.getElementById('phone-preview-screen');
    const previewUrlLink = document.getElementById('preview-url-link');
    
    // Elements lists
    const editorBlocksList = document.getElementById('editor-blocks-list');
    const editorFoldersList = document.getElementById('editor-folders-list');
    const editorPagesList = document.getElementById('editor-pages-list');
    const phoneMockBlocks = document.getElementById('phone-mock-blocks');
    const mockPhoneNav = document.getElementById('mock-phone-nav');
    
    // Modals
    const addBlockModal = document.getElementById('add-block-modal');
    const addBlockTrigger = document.getElementById('add-block-trigger');
    const closeModalTrigger = document.getElementById('close-modal-trigger');
    const blockTypeBtns = document.querySelectorAll('.block-type-btn');

    // Folder Panel in Phone
    const mockFolderView = document.getElementById('mock-folder-view');
    const mockFolderTitle = document.getElementById('mock-folder-title');
    const mockFolderBlocks = document.getElementById('mock-folder-blocks');
    const btnCloseFolder = document.getElementById('btn-close-folder');

    // Add Page Trigger
    const addPageTrigger = document.getElementById('add-page-trigger');
    const createFolderBtn = document.getElementById('create-folder-btn');
    const newFolderNameInput = document.getElementById('new-folder-name');

    // Settings
    const customDomainInput = document.getElementById('custom-domain-input');
    const linkDomainBtn = document.getElementById('link-domain-btn');
    const instagramSyncSwitch = document.getElementById('instagram-sync-switch');

    // ==========================================================================
    // TAB NAVIGATION
    // ==========================================================================
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            activeTab = targetTab;
            
            const targetPanel = document.getElementById(`panel-${targetTab}`);
            if (targetPanel) targetPanel.classList.add('active');
            
            // Re-render chart if analytics tab opened
            if (targetTab === 'analytics') {
                renderAnalyticsChart();
            }
        });
    });

    // ==========================================================================
    // CORE RENDER FUNCTIONS
    // ==========================================================================
    
    // Render editor blocks tab
    const renderEditorBlocks = () => {
        editorBlocksList.replaceChildren();
        
        // Filter blocks belonging to current active page
        const pageBlocks = blocks.filter(b => b.pageId === currentPageId);
        
        pageBlocks.forEach((block, index) => {
            const card = document.createElement('div');
            card.className = 'editor-block-card';
            card.setAttribute('data-id', block.id);
            
            // Drag handle
            const dragHandle = document.createElement('div');
            dragHandle.className = 'block-drag-handle';
            const dragIcon = document.createElement('i');
            dragIcon.className = 'fas fa-ellipsis-v';
            dragHandle.appendChild(dragIcon);
            card.appendChild(dragHandle);
            
            // Icon indicator based on type
            const iconWrap = document.createElement('div');
            iconWrap.className = 'block-icon-indicator';
            const icon = document.createElement('i');
            switch(block.type) {
                case 'link': icon.className = 'fas fa-link'; break;
                case 'image': icon.className = 'fas fa-image'; break;
                case 'video': icon.className = 'fab fa-youtube'; break;
                case 'form': icon.className = 'fas fa-envelope'; break;
                case 'header': icon.className = 'fas fa-heading'; break;
            }
            iconWrap.appendChild(icon);
            card.appendChild(iconWrap);
            
            // Inputs panel
            const inputsDiv = document.createElement('div');
            inputsDiv.className = 'block-editor-inputs';
            
            // Title Input
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.value = block.title;
            titleInput.placeholder = 'Block Title';
            titleInput.addEventListener('input', (e) => {
                block.title = e.target.value;
                syncMockPreview();
            });
            inputsDiv.appendChild(titleInput);
            
            // URL Input (only for Link, Video, Music)
            if (block.type === 'link' || block.type === 'video') {
                const urlInput = document.createElement('input');
                urlInput.type = 'text';
                urlInput.value = block.url;
                urlInput.placeholder = 'Redirect URL';
                urlInput.className = 'input-sub-val';
                urlInput.addEventListener('input', (e) => {
                    block.url = e.target.value;
                    syncMockPreview();
                });
                inputsDiv.appendChild(urlInput);
            }
            
            // Folder assignment dropdown (only for link blocks)
            if (block.type === 'link') {
                const folderSelect = document.createElement('select');
                folderSelect.className = 'input-sub-val';
                folderSelect.style.width = '100%';
                folderSelect.style.marginTop = '4px';
                folderSelect.style.background = '#0d1117';
                folderSelect.style.color = '#ccc';
                folderSelect.style.border = '1px solid var(--editor-border-color)';
                folderSelect.style.padding = '4px';
                folderSelect.style.borderRadius = '4px';
                
                const optNone = document.createElement('option');
                optNone.value = '';
                optNone.textContent = '📁 No Folder (Main Page)';
                folderSelect.appendChild(optNone);
                
                folders.forEach(f => {
                    const opt = document.createElement('option');
                    opt.value = f.id;
                    opt.textContent = `📁 Folder: ${f.name}`;
                    if (block.folderId === f.id) opt.selected = true;
                    folderSelect.appendChild(opt);
                });
                
                folderSelect.addEventListener('change', (e) => {
                    block.folderId = e.target.value || null;
                    syncMockPreview();
                    renderEditorBlocks();
                });
                inputsDiv.appendChild(folderSelect);
            }
            
            card.appendChild(inputsDiv);
            
            // Action buttons (visibility switch & delete)
            const actionsDiv = document.createElement('div');
            card.appendChild(actionsDiv);
            actionsDiv.className = 'block-card-actions';
            
            const toggleLabel = document.createElement('label');
            toggleLabel.className = 'switch-toggle';
            
            const toggleInput = document.createElement('input');
            toggleInput.type = 'checkbox';
            toggleInput.checked = block.visible;
            toggleInput.addEventListener('change', (e) => {
                block.visible = e.target.checked;
                syncMockPreview();
            });
            
            const toggleSpan = document.createElement('span');
            toggleSpan.className = 'slider-round';
            
            toggleLabel.appendChild(toggleInput);
            toggleLabel.appendChild(toggleSpan);
            actionsDiv.appendChild(toggleLabel);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-trash';
            const trashIcon = document.createElement('i');
            trashIcon.className = 'fas fa-trash-alt';
            deleteBtn.appendChild(trashIcon);
            deleteBtn.addEventListener('click', () => {
                blocks = blocks.filter(b => b.id !== block.id);
                renderEditorBlocks();
                syncMockPreview();
            });
            actionsDiv.appendChild(deleteBtn);
            
            editorBlocksList.appendChild(card);
        });
    };

    // Render elements inside the phone mockup viewport
    const syncMockPreview = () => {
        phoneMockBlocks.replaceChildren();
        mockPhoneNav.replaceChildren();
        
        // Render multi-page nav menu if we have more than 1 page
        if (pages.length > 1) {
            mockPhoneNav.style.display = 'flex';
            pages.forEach(p => {
                const navItem = document.createElement('span');
                navItem.className = 'phone-nav-item';
                navItem.textContent = p.name;
                if (p.id === currentPageId) navItem.classList.add('active');
                
                navItem.addEventListener('click', () => {
                    currentPageId = p.id;
                    syncMockPreview();
                    renderEditorBlocks();
                    renderEditorPages();
                });
                mockPhoneNav.appendChild(navItem);
            });
        } else {
            mockPhoneNav.style.display = 'none';
        }
        
        // Filter visible blocks belonging to the current page
        const pageBlocks = blocks.filter(b => b.pageId === currentPageId && b.visible);
        
        // Helper map to group link blocks by folder
        const renderedFolderIds = new Set();
        
        pageBlocks.forEach(block => {
            // If block is a link and belongs to a folder
            if (block.type === 'link' && block.folderId) {
                // If we haven't rendered this folder row card yet
                if (!renderedFolderIds.has(block.folderId)) {
                    renderedFolderIds.add(block.folderId);
                    
                    const folderObj = folders.find(f => f.id === block.folderId);
                    if (folderObj) {
                        const folderEl = document.createElement('div');
                        folderEl.className = 'mock-link-block mock-folder-row';
                        
                        const folderIcon = document.createElement('i');
                        folderIcon.className = 'fas fa-folder';
                        folderIcon.style.marginRight = '8px';
                        folderEl.appendChild(folderIcon);
                        
                        const folderTitle = document.createElement('strong');
                        folderTitle.textContent = folderObj.name;
                        folderEl.appendChild(folderTitle);
                        
                        // Click folder opens overlay
                        folderEl.addEventListener('click', () => {
                            openFolderOverlay(folderObj.id, folderObj.name);
                        });
                        phoneMockBlocks.appendChild(folderEl);
                    }
                }
            } else {
                // Render regular block on the main screen
                const blockEl = createMockBlockElement(block);
                phoneMockBlocks.appendChild(blockEl);
            }
        });
        
        // If Instagram sync toggle is checked, append mock posts grid
        if (instagramSyncSwitch.checked) {
            const instaGrid = document.createElement('div');
            instaGrid.style.display = 'grid';
            instaGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            instaGrid.style.gap = '6px';
            instaGrid.style.width = '100%';
            instaGrid.style.marginTop = '15px';
            instaGrid.className = 'mock-header-block'; // spans full grid column width
            
            const photos = [
                'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=150&q=80',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=150&q=80',
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=150&q=80'
            ];
            
            photos.forEach(src => {
                const imgWrap = document.createElement('div');
                imgWrap.style.aspectRatio = '1/1';
                imgWrap.style.borderRadius = '6px';
                imgWrap.style.overflow = 'hidden';
                
                const img = document.createElement('img');
                img.src = src;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                
                imgWrap.appendChild(img);
                instaGrid.appendChild(imgWrap);
            });
            phoneMockBlocks.appendChild(instaGrid);
        }
    };

    // Helper: Create individual block visual node for phone preview
    const createMockBlockElement = (block) => {
        let blockEl;
        
        switch(block.type) {
            case 'header':
                blockEl = document.createElement('div');
                blockEl.className = 'mock-header-block';
                blockEl.textContent = block.title;
                break;
                
            case 'link':
                blockEl = document.createElement('a');
                blockEl.className = 'mock-link-block';
                blockEl.textContent = block.title;
                blockEl.href = '#';
                blockEl.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert(`Navigating to: ${block.url || 'No URL specified'}`);
                });
                break;
                
            case 'image':
                blockEl = document.createElement('div');
                blockEl.className = 'mock-image-block';
                const img = document.createElement('img');
                img.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80';
                img.alt = block.title || 'Banner';
                blockEl.appendChild(img);
                break;
                
            case 'video':
                blockEl = document.createElement('div');
                blockEl.className = 'mock-video-block';
                const videoPrev = document.createElement('div');
                videoPrev.className = 'mock-video-preview';
                videoPrev.style.backgroundImage = 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=300&q=80")';
                blockEl.appendChild(videoPrev);
                
                const playBtn = document.createElement('div');
                playBtn.className = 'mock-video-play-btn';
                const playIcon = document.createElement('i');
                playIcon.className = 'fas fa-play';
                playBtn.appendChild(playIcon);
                blockEl.appendChild(playBtn);
                break;
                
            case 'form':
                blockEl = document.createElement('div');
                blockEl.className = 'mock-form-block';
                
                const formTitle = document.createElement('h4');
                formTitle.textContent = block.title || 'Contact Us';
                blockEl.appendChild(formTitle);
                
                const formInput = document.createElement('input');
                formInput.type = 'email';
                formInput.placeholder = 'Enter email address';
                blockEl.appendChild(formInput);
                
                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Submit';
                submitBtn.addEventListener('click', () => {
                    alert('Submission received securely!');
                });
                blockEl.appendChild(submitBtn);
                break;
        }
        
        return blockEl;
    };

    // Open nested folder view overlay inside phone
    const openFolderOverlay = (folderId, folderName) => {
        openFolderId = folderId;
        mockFolderTitle.textContent = folderName;
        
        mockFolderBlocks.replaceChildren();
        
        // Filter links belonging to this folder on this page
        const folderLinks = blocks.filter(b => b.pageId === currentPageId && b.folderId === folderId && b.visible);
        
        folderLinks.forEach(block => {
            const blockEl = createMockBlockElement(block);
            mockFolderBlocks.appendChild(blockEl);
        });
        
        mockFolderView.style.display = 'flex';
    };

    // Close folder overlay inside phone
    btnCloseFolder.addEventListener('click', () => {
        openFolderId = null;
        mockFolderView.style.display = 'none';
    });

    // ==========================================================================
    // DESIGN TAB OPTIONS
    // ==========================================================================
    
    // Theme Selector Buttons
    const themeSelectors = document.querySelectorAll('.theme-selector');
    themeSelectors.forEach(selector => {
        selector.addEventListener('click', () => {
            themeSelectors.forEach(s => s.classList.remove('active'));
            selector.classList.add('active');
            
            const selTheme = selector.getAttribute('data-theme');
            currentTheme = selTheme;
            
            previewScreen.classList.remove('theme-champagne', 'theme-rose', 'theme-dark', 'theme-cyber');
            previewScreen.classList.add(`theme-${selTheme}`);
            
            // Re-generate QR Code to match selected theme color branding
            renderThemeBrandedQR();
        });
    });

    // Font family Buttons
    const fontBtns = document.querySelectorAll('.font-btn');
    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            fontBtns.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            
            const selFont = btn.getAttribute('data-font');
            currentFont = selFont;
            
            previewScreen.classList.remove('font-outfit', 'font-inter', 'font-playfair');
            previewScreen.classList.add(`font-${selFont}`);
        });
    });

    // Layout presets Buttons
    const layoutBtns = document.querySelectorAll('.layout-btn');
    layoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            layoutBtns.forEach(l => l.classList.remove('active'));
            btn.classList.add('active');
            
            const selLayout = btn.getAttribute('data-layout');
            currentLayout = selLayout;
            
            previewScreen.classList.remove('layout-list', 'layout-grid');
            previewScreen.classList.add(`layout-${selLayout}`);
            syncMockPreview();
        });
    });

    // Preset Templates selector click
    const presetBoxes = document.querySelectorAll('.preset-box');
    presetBoxes.forEach(box => {
        box.addEventListener('click', () => {
            presetBoxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');
            
            const presetType = box.getAttribute('data-preset');
            loadPresetTemplate(presetType);
        });
    });

    // Load preset configurations
    const loadPresetTemplate = (presetType) => {
        // Change theme and font triggers
        let targetTheme = 'champagne';
        let targetFont = 'outfit';
        let targetLayout = 'list';
        
        switch(presetType) {
            case 'creator':
                targetTheme = 'champagne';
                targetFont = 'outfit';
                targetLayout = 'list';
                break;
            case 'business':
                targetTheme = 'rose';
                targetFont = 'inter';
                targetLayout = 'list';
                break;
            case 'shop':
                targetTheme = 'dark';
                targetFont = 'playfair';
                targetLayout = 'grid';
                break;
            case 'cyber':
                targetTheme = 'cyber';
                targetFont = 'inter';
                targetLayout = 'grid';
                break;
        }

        // Apply active CSS classes to design panel buttons
        document.querySelector(`.theme-selector[data-theme="${targetTheme}"]`).click();
        document.querySelector(`.font-btn[data-font="${targetFont}"]`).click();
        document.querySelector(`.layout-btn[data-layout="${targetLayout}"]`).click();
    };

    // ==========================================================================
    // ADD BLOCK PICKER MODAL
    // ==========================================================================
    addBlockTrigger.addEventListener('click', () => {
        addBlockModal.classList.add('show');
    });

    closeModalTrigger.addEventListener('click', () => {
        addBlockModal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === addBlockModal) {
            addBlockModal.classList.remove('show');
        }
    });

    blockTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const blockType = btn.getAttribute('data-type');
            
            // Append default details
            let title = 'New Block';
            let url = '';
            
            switch(blockType) {
                case 'link': title = 'Custom Redirect Link 🔗'; url = 'https://link.com'; break;
                case 'image': title = 'Banner Image Layout 🖼️'; break;
                case 'video': title = 'Watch My Video 🎬'; url = 'https://youtube.com'; break;

                case 'form': title = 'Get in Touch ✉️'; break;
                case 'header': title = 'Section Divider Label'; break;
            }
            
            const newBlock = {
                id: 'b-' + Date.now(),
                pageId: currentPageId,
                folderId: null,
                type: blockType,
                title: title,
                url: url,
                visible: true
            };
            
            blocks.push(newBlock);
            addBlockModal.classList.remove('show');
            
            renderEditorBlocks();
            syncMockPreview();
        });
    });

    // ==========================================================================
    // FOLDER MANAGER
    // ==========================================================================
    
    // Create new folder click
    createFolderBtn.addEventListener('click', () => {
        const folderName = newFolderNameInput.value.trim();
        if (!folderName) {
            alert('Please enter a folder name');
            return;
        }
        
        const folderId = 'folder-' + Date.now();
        folders.push({ id: folderId, name: folderName });
        newFolderNameInput.value = '';
        
        renderEditorFolders();
        renderEditorBlocks(); // refresh selector list options inside block cards
        syncMockPreview();
    });

    // Render editor folder list
    const renderEditorFolders = () => {
        editorFoldersList.replaceChildren();
        
        folders.forEach(folder => {
            const folderRow = document.createElement('div');
            folderRow.className = 'folder-row-item';
            
            const leftInfo = document.createElement('div');
            leftInfo.style.display = 'flex';
            leftInfo.style.alignItems = 'center';
            
            const folderIcon = document.createElement('i');
            folderIcon.className = 'fas fa-folder';
            leftInfo.appendChild(folderIcon);
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = folder.name;
            leftInfo.appendChild(nameSpan);
            
            folderRow.appendChild(leftInfo);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-trash';
            const trashIcon = document.createElement('i');
            trashIcon.className = 'fas fa-trash-alt';
            deleteBtn.appendChild(trashIcon);
            deleteBtn.addEventListener('click', () => {
                // Remove folder object
                folders = folders.filter(f => f.id !== folder.id);
                // Reset blocks linked to this folder back to main page
                blocks.forEach(b => {
                    if (b.folderId === folder.id) b.folderId = null;
                });
                renderEditorFolders();
                renderEditorBlocks();
                syncMockPreview();
            });
            folderRow.appendChild(deleteBtn);
            
            editorFoldersList.appendChild(folderRow);
        });
    };

    // ==========================================================================
    // MULTI-PAGE NAVIGATION MANAGER
    // ==========================================================================
    
    // Add page click
    addPageTrigger.addEventListener('click', () => {
        const pageName = prompt('Enter sub-page name (e.g. Shop, Contact, Bio):');
        if (!pageName) return;
        
        const pageId = 'page-' + Date.now();
        pages.push({ id: pageId, name: pageName.trim(), active: true });
        
        renderEditorPages();
        syncMockPreview();
    });

    // Render editor page list
    const renderEditorPages = () => {
        editorPagesList.replaceChildren();
        
        pages.forEach(page => {
            const pageRow = document.createElement('div');
            pageRow.className = 'page-row-item';
            if (page.id === currentPageId) {
                pageRow.style.borderColor = 'var(--editor-accent-blue)';
            }
            
            const leftInfo = document.createElement('div');
            leftInfo.style.display = 'flex';
            leftInfo.style.alignItems = 'center';
            leftInfo.style.cursor = 'pointer';
            
            const fileIcon = document.createElement('i');
            fileIcon.className = 'fas fa-file';
            leftInfo.appendChild(fileIcon);
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = page.name;
            leftInfo.appendChild(nameSpan);
            
            // Clicking page select page for editing
            leftInfo.addEventListener('click', () => {
                currentPageId = page.id;
                renderEditorPages();
                renderEditorBlocks();
                syncMockPreview();
            });
            pageRow.appendChild(leftInfo);
            
            // Delete button (cannot delete main Home page)
            if (page.id !== 'home') {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn-trash';
                const trashIcon = document.createElement('i');
                trashIcon.className = 'fas fa-trash-alt';
                deleteBtn.appendChild(trashIcon);
                deleteBtn.addEventListener('click', () => {
                    pages = pages.filter(p => p.id !== page.id);
                    // Delete all blocks linked to this deleted page
                    blocks = blocks.filter(b => b.pageId !== page.id);
                    if (currentPageId === page.id) currentPageId = 'home';
                    renderEditorPages();
                    renderEditorBlocks();
                    syncMockPreview();
                });
                pageRow.appendChild(deleteBtn);
            }
            
            editorPagesList.appendChild(pageRow);
        });
    };

    // ==========================================================================
    // SETTINGS & DOMAINS
    // ==========================================================================
    
    // Custom domain linker simulator
    linkDomainBtn.addEventListener('click', () => {
        const customUrl = customDomainInput.value.trim();
        if (!customUrl) {
            alert('Please enter a valid domain address');
            return;
        }
        
        previewUrlLink.textContent = customUrl;
        previewUrlLink.href = 'https://' + customUrl;
        alert(`Domain successfully linked! Live profile is now accessible at https://${customUrl}`);
    });

    // Instagram auto-sync grids switch toggle
    instagramSyncSwitch.addEventListener('change', () => {
        syncMockPreview();
        if (instagramSyncSwitch.checked) {
            alert('Instagram Auto-Publish active. Latest grid posts synced on your live profile.');
        }
    });

    // Generate Custom SVG QR Code matching the theme
    const renderThemeBrandedQR = () => {
        const qrGraphic = document.getElementById('qr-code-graphic');
        if (!qrGraphic) return;
        
        // Define color based on theme selection
        let brandColor = '#d4af37'; // gold
        switch(currentTheme) {
            case 'champagne': brandColor = '#d4af37'; break;
            case 'dark': brandColor = '#1f2937'; break;
            case 'rose': brandColor = '#b76e79'; break;
            case 'cyber': brandColor = '#3b82f6'; break;
        }
        
        qrGraphic.replaceChildren();
        
        // Draw matching branded QR Code mock SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.style.width = '140px';
        svg.style.height = '140px';
        
        // QR Outer border finder boxes (mocking real code layout elements)
        const rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect1.setAttribute("x", "5"); rect1.setAttribute("y", "5"); rect1.setAttribute("width", "25"); rect1.setAttribute("height", "25");
        rect1.setAttribute("fill", brandColor);
        svg.appendChild(rect1);
        
        const rect1Inner = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect1Inner.setAttribute("x", "10"); rect1Inner.setAttribute("y", "10"); rect1Inner.setAttribute("width", "15"); rect1Inner.setAttribute("height", "15");
        rect1Inner.setAttribute("fill", "#ffffff");
        svg.appendChild(rect1Inner);

        const rect1Dot = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect1Dot.setAttribute("x", "14"); rect1Dot.setAttribute("y", "14"); rect1Dot.setAttribute("width", "7"); rect1Dot.setAttribute("height", "7");
        rect1Dot.setAttribute("fill", brandColor);
        svg.appendChild(rect1Dot);

        const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect2.setAttribute("x", "70"); rect2.setAttribute("y", "5"); rect2.setAttribute("width", "25"); rect2.setAttribute("height", "25");
        rect2.setAttribute("fill", brandColor);
        svg.appendChild(rect2);
        
        const rect2Inner = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect2Inner.setAttribute("x", "75"); rect2Inner.setAttribute("y", "10"); rect2Inner.setAttribute("width", "15"); rect2Inner.setAttribute("height", "15");
        rect2Inner.setAttribute("fill", "#ffffff");
        svg.appendChild(rect2Inner);

        const rect2Dot = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect2Dot.setAttribute("x", "79"); rect2Dot.setAttribute("y", "14"); rect2Dot.setAttribute("width", "7"); rect2Dot.setAttribute("height", "7");
        rect2Dot.setAttribute("fill", brandColor);
        svg.appendChild(rect2Dot);

        const rect3 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect3.setAttribute("x", "5"); rect3.setAttribute("y", "70"); rect3.setAttribute("width", "25"); rect3.setAttribute("height", "25");
        rect3.setAttribute("fill", brandColor);
        svg.appendChild(rect3);

        const rect3Inner = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect3Inner.setAttribute("x", "10"); rect3Inner.setAttribute("y", "75"); rect3Inner.setAttribute("width", "15"); rect3Inner.setAttribute("height", "15");
        rect3Inner.setAttribute("fill", "#ffffff");
        svg.appendChild(rect3Inner);

        const rect3Dot = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect3Dot.setAttribute("x", "14"); rect3Dot.setAttribute("y", "79"); rect3Dot.setAttribute("width", "7"); rect3Dot.setAttribute("height", "7");
        rect3Dot.setAttribute("fill", brandColor);
        svg.appendChild(rect3Dot);
        
        // Mock randomized pixels
        const mockPixels = [
            { x: 38, y: 8, w: 6, h: 6 },
            { x: 48, y: 12, w: 12, h: 4 },
            { x: 38, y: 22, w: 4, h: 10 },
            { x: 50, y: 24, w: 8, h: 8 },
            { x: 8, y: 45, w: 8, h: 4 },
            { x: 22, y: 40, w: 10, h: 14 },
            { x: 42, y: 45, w: 15, h: 6 },
            { x: 74, y: 45, w: 12, h: 12 },
            { x: 40, y: 65, w: 8, h: 18 },
            { x: 62, y: 74, w: 15, h: 4 },
            { x: 70, y: 82, w: 10, h: 10 }
        ];
        
        mockPixels.forEach(px => {
            const mockPx = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            mockPx.setAttribute("x", px.x); mockPx.setAttribute("y", px.y); mockPx.setAttribute("width", px.w); mockPx.setAttribute("height", px.h);
            mockPx.setAttribute("fill", brandColor);
            svg.appendChild(mockPx);
        });

        // Add brand icon center logo block (link icon)
        const logoBack = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        logoBack.setAttribute("x", "40"); logoBack.setAttribute("y", "40"); logoBack.setAttribute("width", "20"); logoBack.setAttribute("height", "20");
        logoBack.setAttribute("fill", "#ffffff"); logoBack.setAttribute("rx", "4");
        svg.appendChild(logoBack);

        const logoDot = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        logoDot.setAttribute("x", "44"); logoDot.setAttribute("y", "44"); logoDot.setAttribute("width", "12"); logoDot.setAttribute("height", "12");
        logoDot.setAttribute("fill", brandColor); logoDot.setAttribute("rx", "2");
        svg.appendChild(logoDot);
        
        qrGraphic.appendChild(svg);
    };

    // Download QR Code Action
    document.getElementById('download-qr-btn').addEventListener('click', () => {
        alert('Downloading high-resolution branded QR Code...');
    });

    // ==========================================================================
    // TRAFFIC ANALYTICS GRAPH
    // ==========================================================================
    const renderAnalyticsChart = () => {
        const barsGroup = document.getElementById('analytics-chart-bars');
        if (!barsGroup) return;
        
        barsGroup.replaceChildren();
        
        // Mock weekly click metrics data
        const weeklyData = [45, 60, 30, 80, 95, 70, 85]; // Mon-Sun heights in percentages
        
        weeklyData.forEach((pct, index) => {
            const barWrap = document.createElement('div');
            barWrap.className = 'bar-wrap';
            
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = '0%'; // initial animation state
            
            barWrap.appendChild(bar);
            barsGroup.appendChild(barWrap);
            
            // Animate height growth smoothly after appending
            setTimeout(() => {
                bar.style.height = pct + '%';
            }, 100 + (index * 50));
        });
    };

    // ==========================================================================
    // INITIALIZATION RUN
    // ==========================================================================
    
    // Publish Button Simulation
    document.getElementById('publish-btn').addEventListener('click', () => {
        alert('✨ Congratulations! Your Liinks profile page changes are published live.');
    });

    // Initial render sequences
    renderEditorBlocks();
    renderEditorFolders();
    renderEditorPages();
    syncMockPreview();
    renderThemeBrandedQR();

});
