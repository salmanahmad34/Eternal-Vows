const WeddingTemplates = {
    'royal-gold-burgundy': {
        name: 'Royal Gold & Burgundy',
        defaultData: {
            groom_name: 'Ayaan',
            bride_name: 'Zoya',
            ceremony_name: 'Nikkah Ceremony',
            wedding_date: '24 May 2026, 07:30 PM',
            venue_name: 'Grand Palace Banquet Hall',
            venue_location: 'Lucknow, Uttar Pradesh',
            invite_message: 'We request the honor of your presence and prayers on our special day.',
            countdown_date: 'May 24, 2026 19:30:00'
        },
        compile: function(data) {
            const d = { ...this.defaultData, ...data };
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${d.groom_name} & ${d.bride_name} Wedding Invitation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-rose: #a64d5d;
            --burgundy: #800a20;
            --accent-gold: #c5a059;
            --dark-gold: #8a6f27;
            --light-gold: #fcf6ba;
        }

        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #fcf8f2;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }

        .main-bg {
            background-image: linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), 
                              url('https://raw.githubusercontent.com/salmanahmad34/Assets/main/copilot_image_1775682746342.jpeg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            position: relative;
            overflow: hidden;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floating {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes goldShimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }

        .reveal {
            opacity: 0;
            animation: fadeInUp 1s ease-out forwards;
        }

        .name-font {
            font-family: 'Great Vibes', cursive;
            background: linear-gradient(135deg, var(--dark-gold) 0%, var(--accent-gold) 25%, var(--light-gold) 50%, var(--accent-gold) 75%, var(--dark-gold) 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: goldShimmer 4s linear infinite;
            display: inline-block;
            line-height: 1.1;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        .heart-particle {
            position: absolute;
            bottom: -50px;
            color: rgba(197, 160, 89, 0.25);
            font-size: 20px;
            pointer-events: none;
            z-index: 1;
            animation: floating linear infinite;
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 24px;
            box-shadow: 0 8px 32px 0 rgba(197, 160, 89, 0.1);
        }

        .info-pill {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(252, 248, 242, 0.95));
            border-radius: 22px;
            padding: 16px 20px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 15px rgba(197, 160, 89, 0.08);
            width: 100%;
            max-width: 400px;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(255, 255, 255, 0.7);
        }

        .info-pill:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 20px rgba(197, 160, 89, 0.15);
        }

        .icon-box {
            background: rgba(252, 248, 242, 0.9);
            width: 50px;
            height: 50px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            color: var(--accent-gold);
            border: 1px solid rgba(197, 160, 89, 0.2);
        }

        .timer-box {
            background: rgba(255, 255, 255, 0.9);
            padding: 12px;
            border-radius: 16px;
            min-width: 72px;
            text-align: center;
            border: 1px solid rgba(197, 160, 89, 0.15);
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .divider-line {
            height: 1px;
            width: 60px;
            background: var(--accent-gold);
            margin: 0 12px;
        }
    </style>
</head>
<body>

    <div class="main-bg" id="card-container">
        
        <div class="flex justify-center mb-6 reveal" style="animation-delay: 0.1s;">
            <svg width="90" height="55" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="38" cy="30" r="21" stroke="url(#goldGradient1)" stroke-width="4" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
                <circle cx="62" cy="30" r="21" stroke="url(#goldGradient2)" stroke-width="4" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
                <defs>
                    <linearGradient id="goldGradient1" x1="17" y1="9" x2="59" y2="51" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="#8a6f27"/>
                        <stop offset="30%" stop-color="#e8c86b"/>
                        <stop offset="50%" stop-color="#fff6cc"/>
                        <stop offset="70%" stop-color="#e8c86b"/>
                        <stop offset="100%" stop-color="#8a6f27"/>
                    </linearGradient>
                    <linearGradient id="goldGradient2" x1="41" y1="9" x2="83" y2="51" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="#8a6f27"/>
                        <stop offset="30%" stop-color="#e8c86b"/>
                        <stop offset="50%" stop-color="#fff6cc"/>
                        <stop offset="70%" stop-color="#e8c86b"/>
                        <stop offset="100%" stop-color="#8a6f27"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>

        <div class="text-center mb-6 reveal" style="animation-delay: 0.2s; width: 100%; max-width: 450px;">
            <p class="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-semibold mb-2">Together with their families</p>
            <h2 class="text-lg font-bold text-[var(--burgundy)] tracking-wide uppercase">You're invited to the</h2>
            <h2 class="text-lg font-bold text-[var(--accent-gold)] tracking-widest uppercase mb-2">Wedding Celebration</h2>
            
            <div class="flex items-center justify-center my-4">
                <div class="divider-line"></div>
                <span class="text-lg text-[var(--accent-gold)]">❤</span>
                <div class="divider-line"></div>
            </div>

            <div class="relative w-full max-w-[350px] mx-auto flex flex-col items-center py-4">
                <h1 class="name-font text-7xl md:text-8xl select-none text-center">${d.groom_name}</h1>
                
                <div class="z-20 my-3">
                    <div class="bg-[var(--accent-gold)] text-white w-9 h-9 rounded-full flex items-center justify-center text-lg italic shadow-md border-2 border-white font-bold">&</div>
                </div>
                
                <h1 class="name-font text-7xl md:text-8xl select-none text-center">${d.bride_name}</h1>

                <div class="inline-flex items-center justify-center px-8 py-2.5 bg-[var(--accent-gold)] text-white rounded-full text-[11px] font-bold uppercase tracking-widest mt-8 shadow-md border border-yellow-100/40">
                    ❤ ${d.ceremony_name} ❤
                </div>
            </div>
        </div>

        <div class="w-full max-w-md space-y-4 px-4">
            <div class="info-pill reveal" style="animation-delay: 0.4s;">
                <div class="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Wedding Date & Time</p>
                    <p class="text-[var(--burgundy)] font-bold text-lg">${d.wedding_date}</p>
                </div>
            </div>

            <div class="info-pill reveal" style="animation-delay: 0.6s;">
                <div class="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Venue</p>
                    <p class="text-[var(--burgundy)] font-bold text-lg leading-tight">${d.venue_name}</p>
                    <p class="text-[11px] text-gray-500 font-medium mt-0.5">${d.venue_location}</p>
                </div>
            </div>
        </div>

        <div class="glass-card mt-8 p-5 text-center max-w-[90%] w-full reveal" style="animation-delay: 0.8s;">
            <p class="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-bold mb-2">✦ Welcome Message ✦</p>
            <p class="serif italic text-[var(--burgundy)] text-base leading-relaxed">
                "${d.invite_message}"
            </p>
        </div>

        <div class="mt-8 text-center w-full reveal" style="animation-delay: 1s;">
            <div class="flex items-center justify-center mb-3">
                <div class="divider-line"></div>
                <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Wedding Day In</span>
                <div class="divider-line"></div>
            </div>
            
            <div id="countdown" class="flex justify-center gap-2">
                <div class="timer-box">
                    <span id="days" class="block text-xl font-bold text-[var(--accent-gold)]">00</span>
                    <span class="text-[9px] uppercase text-gray-400 font-medium">Days</span>
                </div>
                <div class="timer-box">
                    <span id="hours" class="block text-xl font-bold text-[var(--accent-gold)]">00</span>
                    <span class="text-[9px] uppercase text-gray-400 font-medium">Hrs</span>
                </div>
                <div class="timer-box">
                    <span id="minutes" class="block text-xl font-bold text-[var(--accent-gold)]">00</span>
                    <span class="text-[9px] uppercase text-gray-400 font-medium">Min</span>
                </div>
                <div class="timer-box">
                    <span id="seconds" class="block text-xl font-bold text-[var(--accent-gold)]">00</span>
                    <span class="text-[9px] uppercase text-gray-400 font-medium">Sec</span>
                </div>
            </div>
        </div>

        <div class="mt-10 w-full max-w-md reveal" style="animation-delay: 1.2s;">
             <div class="glass-card p-4 text-center bg-pink-100/30">
                <span class="text-[var(--accent-gold)] text-xl animate-bounce inline-block">❤</span>
                <p class="serif text-lg font-bold text-[var(--burgundy)]">We Eagerly Await Your Presence</p>
                <p class="italic text-[10px] text-gray-500">to bless the couple on their special day</p>
             </div>
        </div>

        <div class="mt-6 text-center text-[10px] tracking-widest text-gray-400 uppercase flex items-center mb-6">
            <span class="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-white mr-2 text-[10px]">❤</span>
            Eternal Vowz — Digital Wedding Invitations
        </div>
    </div>

    <script>
        const container = document.getElementById('card-container');
        const particles = ['❤', '✨', '🌸'];

        function createParticle() {
            const p = document.createElement('div');
            p.classList.add('heart-particle');
            p.innerHTML = particles[Math.floor(Math.random() * particles.length)];
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDuration = (Math.random() * 3 + 5) + 's';
            p.style.fontSize = (Math.random() * 10 + 10) + 'px';
            container.appendChild(p);
            setTimeout(() => p.remove(), 7000);
        }
        setInterval(createParticle, 800);

        const weddingDate = new Date("${d.countdown_date}").getTime();
        function updateCountdown() {
            const now = new Date().getTime();
            const d = weddingDate - now;
            
            if (d < 0) {
                document.getElementById("days").innerText = "00";
                document.getElementById("hours").innerText = "00";
                document.getElementById("minutes").innerText = "00";
                document.getElementById("seconds").innerText = "00";
                return;
            }
            
            const days = Math.floor(d / (1000 * 60 * 60 * 24));
            const hrs = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const min = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
            const sec = Math.floor((d % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hrs.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = min.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = sec.toString().padStart(2, '0');
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();
    </script>
</body>
</html>`;
        }
    },
    'midnight-luxury': {
        name: 'Midnight Luxury',
        defaultData: {
            groom_name: 'Ayaan',
            bride_name: 'Zoya',
            ceremony_name: 'Nikkah & Reception',
            wedding_date: '24 May 2026, 07:30 PM',
            venue_name: 'Grand Palace Banquet Hall',
            venue_location: 'Lucknow, Uttar Pradesh',
            invite_message: 'We request the honor of your presence and prayers on our special day.',
            countdown_date: 'May 24, 2026 19:30:00'
        },
        compile: function(data) {
            const d = { ...this.defaultData, ...data };
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${d.groom_name} & ${d.bride_name} Wedding Invitation | Eternal Vowz</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-theme: #7d1d2b; 
            --name-color: #5c0c1a; 
            --soft-bg: #fffcf7;
            --accent-gold: #b8860b;
            --glass-white: rgba(255, 255, 255, 0.75);
        }

        body {
            font-family: 'Montserrat', sans-serif;
            background-color: var(--soft-bg);
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }

        .main-bg {
            background-image: url('https://raw.githubusercontent.com/salmanahmad34/Assets/main/file_0000000052b4720b8c09f708799f0fa6.png');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            position: relative;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes pulseHeart {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(125, 29, 43, 0.4); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(125, 29, 43, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(125, 29, 43, 0); }
        }

        .animate-reveal {
            animation: fadeInUp 1s ease-out forwards;
            opacity: 0;
        }

        .floating-heart {
            position: absolute;
            bottom: -50px;
            color: var(--primary-theme);
            font-size: 20px;
            pointer-events: none;
            z-index: 0;
            animation: float 10s linear infinite;
        }

        .pulse-element {
            animation: pulseHeart 2s infinite;
        }

        .name-font {
            font-family: 'Great Vibes', cursive;
            color: var(--name-color);
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .glass-card {
            background: var(--glass-white);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.4s ease;
        }

        .info-pill {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            padding: 15px 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            width: 100%;
            max-width: 400px;
            transition: all 0.3s ease;
            border-left: 4px solid var(--accent-gold);
            position: relative;
            z-index: 1;
        }

        .info-pill:hover {
            background: white;
            border-left: 6px solid var(--primary-theme);
            transform: translateX(5px);
        }

        .icon-box {
            background: #fff5f6;
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: var(--primary-theme);
        }

        .timer-box {
            background: rgba(255, 255, 255, 0.9);
            padding: 12px;
            border-radius: 15px;
            min-width: 70px;
            border: 1px solid rgba(184, 134, 11, 0.2);
        }

        .divider-line {
            height: 1px;
            width: 60px;
            background: var(--accent-gold);
            margin: 0 15px;
        }

        .serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body>

    <div class="main-bg" id="particles-container">
        <!-- Header -->
        <div class="text-center mb-6 animate-reveal" style="animation-delay: 0.2s;">
            <p class="text-[10px] tracking-[0.3em] uppercase text-gray-800 font-bold mb-2">Together with their families</p>
            <h2 class="text-lg font-semibold text-[var(--primary-theme)] mb-4 tracking-wider uppercase">You're invited to the<br>Wedding Celebration</h2>
            
            <div class="flex items-center justify-center my-4">
                <div class="divider-line"></div>
                <span class="text-xl text-[var(--accent-gold)]">❤</span>
                <div class="divider-line"></div>
            </div>

            <h1 class="name-font text-7xl md:text-8xl my-2">${d.groom_name}</h1>
            <div class="pulse-element bg-[var(--primary-theme)] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto text-xl italic my-6 shadow-xl">&</div>
            <h1 class="name-font text-7xl md:text-8xl my-2">${d.bride_name}</h1>

            <div class="inline-block px-8 py-2 bg-white/90 rounded-full text-[var(--primary-theme)] font-bold mt-8 border-2 border-[var(--accent-gold)] shadow-md">
                ✦ ${d.ceremony_name ? d.ceremony_name.toUpperCase() : 'NIKKAH CEREMONY'} ✦
            </div>
        </div>

        <!-- Details -->
        <div class="w-full max-w-md space-y-4 px-4">
            <div class="info-pill animate-reveal" style="animation-delay: 0.4s;">
                <div class="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Wedding Date & Time</p>
                    <p class="text-[var(--primary-theme)] font-bold text-lg">${d.wedding_date}</p>
                </div>
            </div>

            <div class="info-pill animate-reveal" style="animation-delay: 0.6s;">
                <div class="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Venue</p>
                    <p class="text-[var(--primary-theme)] font-bold text-lg">${d.venue_name}</p>
                    <p class="text-xs text-gray-600">${d.venue_location}</p>
                </div>
            </div>

            <div class="info-pill animate-reveal" style="animation-delay: 0.8s;">
                <div class="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Celebration Type</p>
                    <p class="text-[var(--primary-theme)] font-bold text-lg">${d.ceremony_name}</p>
                </div>
            </div>
        </div>

        <!-- Message -->
        <div class="glass-card mt-8 p-8 text-center max-w-[90%] w-full animate-reveal" style="animation-delay: 1s;">
            <p class="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-bold mb-3">✦ Welcome Message ✦</p>
            <p class="serif italic text-[var(--primary-theme)] text-lg leading-relaxed font-medium">
                "${d.invite_message}"
            </p>
        </div>

        <!-- Countdown -->
        <div class="mt-10 text-center w-full animate-reveal" style="animation-delay: 1.2s;">
            <div class="flex items-center justify-center mb-6">
                <div class="divider-line"></div>
                <span class="text-xs uppercase tracking-[0.2em] font-bold text-gray-800">Wedding Day In</span>
                <div class="divider-line"></div>
            </div>
            
            <div id="countdown" class="flex justify-center gap-3">
                <div class="timer-box">
                    <span id="days" class="block text-2xl font-bold text-[var(--primary-theme)]">00</span>
                    <span class="text-[10px] uppercase tracking-tighter text-gray-500">Days</span>
                </div>
                <div class="timer-box">
                    <span id="hours" class="block text-2xl font-bold text-[var(--primary-theme)]">00</span>
                    <span class="text-[10px] uppercase tracking-tighter text-gray-500">Hrs</span>
                </div>
                <div class="timer-box">
                    <span id="minutes" class="block text-2xl font-bold text-[var(--primary-theme)]">00</span>
                    <span class="text-[10px] uppercase tracking-tighter text-gray-500">Min</span>
                </div>
                <div class="timer-box">
                    <span id="seconds" class="block text-2xl font-bold text-[var(--primary-theme)]">00</span>
                    <span class="text-[10px] uppercase tracking-tighter text-gray-500">Sec</span>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 w-full max-w-md animate-reveal" style="animation-delay: 1.4s;">
             <div class="glass-card p-6 text-center border-t-4 border-[var(--accent-gold)]">
                <span class="text-[var(--accent-gold)] text-2xl">❤</span>
                <p class="serif text-2xl font-bold text-[var(--primary-theme)] mt-2">We Eagerly Await Your Presence</p>
                <p class="italic text-sm text-gray-700 mt-1">to bless the couple on their special day</p>
             </div>
        </div>

        <!-- Updated Brand Name -->
        <div class="mt-12 text-center text-[10px] tracking-widest text-gray-800 uppercase flex items-center mb-10 font-bold animate-reveal" style="animation-delay: 1.6s;">
            <span class="w-6 h-6 bg-[var(--primary-theme)] rounded-full flex items-center justify-center text-white mr-2 shadow-sm pulse-element">❤</span>
            Eternal Vowz — Digital Wedding Invitations
        </div>
    </div>

    <script>
        const weddingDate = new Date("${d.countdown_date}").getTime();
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            if (distance < 0) {
                document.getElementById("countdown").innerHTML = "<p class='text-[var(--primary-theme)] font-bold text-xl'>The celebration has begun!</p>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();

        function createHearts() {
            const container = document.getElementById('particles-container');
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
            heart.style.opacity = Math.random() * 0.7;
            heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
            
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 10000);
        }
        setInterval(createHearts, 1000);
    </script>
</body>
</html>`;
        }
    },
    'royal-heritage': {
        name: 'Royal Heritage',
        defaultData: {
            groom_name: 'Ayaan',
            bride_name: 'Zoya',
            ceremony_name: 'Nikkah',
            wedding_date: 'Sunday, 24 May 2026',
            venue_name: 'Grand Palace Banquet Hall',
            venue_location: 'Gomti Nagar, Lucknow',
            invite_message: 'Together with our families, we cordially invite you to celebrate the Nikkah of',
            countdown_date: 'May 24, 2026 19:30:00'
        },
        compile: function(data) {
            const d = { ...this.defaultData, ...data };
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${d.groom_name} & ${d.bride_name} | Eternal Vowz</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@100;300;400;600&family=Playfair+Display:ital,wght@0,400;1,700&display=swap" rel="stylesheet">
    <style>
        :root {
            --gold: #d4af37;
            --soft-gold: #f4e4bc;
            --deep-navy: #040816;
        }

        body {
            font-family: 'Montserrat', sans-serif;
            background-color: var(--deep-navy);
            margin: 0;
            color: white;
            overflow-x: hidden;
        }

        .bg-fixed-image {
            background-image: linear-gradient(rgba(4, 8, 22, 0.5), rgba(4, 8, 22, 0.5)), 
                              url('https://raw.githubusercontent.com/salmanahmad34/Assets/main/file_000000007b28720b832332fa24ffdeb7.png');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 15px;
        }

        /* The Glass Card */
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 40px 0 40px 0;
            width: 100%;
            max-width: 480px;
            padding: 50px 30px;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            position: relative;
        }

        .glass-card::before {
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 5px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
            border-radius: 40px 0 0 0;
        }

        .cursive { font-family: 'Great Vibes', cursive; }
        .serif { font-family: 'Playfair Display', serif; }

        .name-glow {
            font-size: clamp(3.5rem, 15vw, 5.5rem);
            background: linear-gradient(to bottom, #fff, var(--soft-gold), var(--gold));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
            line-height: 1.2;
            display: block;
            margin: 0 -10px;
        }

        .info-box {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 0;
            margin: 30px 0;
        }

        .countdown-item {
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 12px;
            padding: 10px;
            min-width: 65px;
        }

        .presence-highlight {
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%);
            border-left: 2px solid var(--gold);
            padding: 20px;
            border-radius: 0 15px 15px 0;
            margin-top: 40px;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade { animation: fadeIn 1s ease-out forwards; }
    </style>
</head>
<body>

    <div class="bg-fixed-image">
        <div class="glass-card animate-fade">
            <!-- Header Icon -->
            <div class="mb-6 opacity-60">
                <svg class="mx-auto" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>

            <p class="tracking-[0.4em] text-[9px] uppercase text-white/50 mb-4">Bismillah-ir-Rahman-ir-Rahim</p>
            
            <!-- Invitation Message -->
            <div class="px-2 mb-2">
                <p class="serif italic text-sm md:text-base text-white/80 leading-relaxed">
                    ${d.invite_message}
                </p>
            </div>

            <!-- Names Section -->
            <div class="my-4 py-2">
                <h1 class="cursive name-glow">${d.groom_name}</h1>
                <div class="flex items-center justify-center gap-3 my-2">
                    <div class="h-[1px] w-6 bg-gold-500/30"></div>
                    <span class="serif italic text-lg opacity-40">&amp;</span>
                    <div class="h-[1px] w-6 bg-gold-500/30"></div>
                </div>
                <h1 class="cursive name-glow">${d.bride_name}</h1>
            </div>

            <!-- Event Details -->
            <div class="info-box">
                <div class="mb-4">
                    <p class="text-[9px] tracking-[0.2em] text-gold-500 font-semibold mb-1 uppercase">Save The Date</p>
                    <p class="serif text-xl md:text-2xl font-bold tracking-wide">${d.wedding_date}</p>
                </div>
                <div>
                    <p class="text-[9px] tracking-[0.2em] text-gold-500 font-semibold mb-1 uppercase">At The Venue</p>
                    <p class="text-xs md:text-sm font-light tracking-widest uppercase">${d.venue_name}</p>
                    <p class="text-[9px] text-white/40 tracking-wider mt-1">${d.venue_location}</p>
                </div>
            </div>

            <!-- Countdown -->
            <div class="mt-6">
                <p class="text-[8px] tracking-[0.3em] text-white/40 mb-4 uppercase">Countdown to ${d.ceremony_name || 'Nikah'}</p>
                <div id="countdown" class="flex justify-center gap-2 md:gap-3">
                    <div class="countdown-item">
                        <span id="days" class="block text-xl md:text-2xl font-bold text-white">00</span>
                        <span class="text-[7px] uppercase tracking-tighter text-white/40">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span id="hours" class="block text-xl md:text-2xl font-bold text-white">00</span>
                        <span class="text-[7px] uppercase tracking-tighter text-white/40">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span id="minutes" class="block text-xl md:text-2xl font-bold text-white">00</span>
                        <span class="text-[7px] uppercase tracking-tighter text-white/40">Mins</span>
                    </div>
                    <div class="countdown-item">
                        <span id="seconds" class="block text-xl md:text-2xl font-bold text-white">00</span>
                        <span class="text-[7px] uppercase tracking-tighter text-white/40">Secs</span>
                    </div>
                </div>
            </div>

            <!-- Presence Highlight -->
            <div class="presence-highlight text-left">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-[var(--gold)] text-xs">❤</span>
                    <h3 class="serif text-[11px] md:text-xs font-bold text-white tracking-widest uppercase">We Eagerly Await Your Presence</h3>
                </div>
                <p class="italic text-[10px] text-white/60 ml-5">to bless the couple on their special day</p>
            </div>

            <!-- Site Branding -->
            <div class="mt-10 opacity-30 flex items-center justify-center gap-2">
                <div class="h-[1px] w-6 bg-white/50"></div>
                <p class="text-[7px] tracking-[0.4em] uppercase">Eternal Vowz</p>
                <div class="h-[1px] w-6 bg-white/50"></div>
            </div>
        </div>
    </div>

    <script>
        const weddingDate = new Date("${d.countdown_date}").getTime();
        function updateTimer() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            if (distance < 0) {
                document.getElementById("countdown").innerHTML = "<p class='text-[var(--gold)] font-bold text-sm'>The celebration has begun!</p>";
                return;
            }

            const dVal = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hVal = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mVal = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const sVal = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = dVal.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hVal.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = mVal.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = sVal.toString().padStart(2, '0');
        }
        setInterval(updateTimer, 1000);
        updateTimer();
    </script>
</body>
</html>`;
        }
    },
    'blushing-blossom': {
        name: 'Blushing Blossom',
        defaultData: {
            groom_name: 'Ayaan',
            bride_name: 'Zoya',
            ceremony_name: 'Nikkah Ceremony',
            wedding_date: 'Sunday, 24 May 2026, 07:30 PM',
            venue_name: 'Grand Palace Banquet Hall',
            venue_location: 'Lucknow, Uttar Pradesh',
            invite_message: 'We request the honor of your presence and prayers on our special day.',
            countdown_date: 'May 24, 2026 19:30:00'
        },
        compile: function(data) {
            const d = { ...this.defaultData, ...data };
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${d.groom_name} & ${d.bride_name} Wedding | Eternal Vowz</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-pink: #d18a8a;
            --accent-gold: #c5a059;
            --dark-text: #5a3e3e;
            --soft-bg: rgba(255, 245, 245, 0.9);
            --glass-bg: rgba(255, 255, 255, 0.4);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background-color: #fce4ec;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Falling Petals Background Effect */
        #petal-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .petal {
            position: absolute;
            background-color: #ffc0cb;
            border-radius: 150% 0 150% 0;
            opacity: 0.7;
            animation: fall linear infinite;
        }

        @keyframes fall {
            0% { transform: translate(0, -10%) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translate(100px, 110vh) rotate(360deg); opacity: 0; }
        }

        /* Invitation Card Wrapper */
        .card-wrapper {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 450px;
            padding: 15px;
        }

        .card-container {
            background-image: url('https://raw.githubusercontent.com/salmanahmad34/Assets/main/file_0000000031dc720bbe1b0df497681e88.png');
            background-size: cover;
            background-position: center;
            border-radius: 40px;
            box-shadow: 0 30px 60px rgba(122, 58, 58, 0.25);
            overflow: hidden;
            color: var(--dark-text);
            text-align: center;
            border: 4px solid white;
            animation: cardEntrance 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes cardEntrance {
            from { opacity: 0; transform: scale(0.9) translateY(50px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .content-overlay {
            padding: 45px 25px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(2px);
        }

        /* Typography & Header */
        .header-text {
            font-size: 0.75rem;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: 500;
            margin-bottom: 8px;
            color: #8d6e63;
            opacity: 0;
            animation: fadeIn 1s ease-out 0.5s forwards;
        }

        .main-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.2rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 25px;
            color: #7a3a3a;
            opacity: 0;
            animation: fadeIn 1s ease-out 0.7s forwards;
        }

        .couple-names {
            font-family: 'Playfair Display', serif;
            font-size: 3.8rem;
            font-weight: 700;
            line-height: 1.1;
            margin: 15px 0;
            color: #6d3a3a;
            opacity: 0;
            animation: scaleIn 1.2s cubic-bezier(0.17, 0.67, 0.83, 0.67) 1s forwards;
        }

        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
        }

        .ampersand {
            font-family: 'Great Vibes', cursive;
            display: block;
            font-size: 2.8rem;
            margin: -10px 0;
            color: var(--primary-pink);
            animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); text-shadow: 0 0 0px transparent; }
            50% { transform: scale(1.1); text-shadow: 0 0 10px rgba(209, 138, 138, 0.4); }
        }

        .event-badge {
            display: inline-block;
            background: linear-gradient(135deg, #fce4ec, #f8dada);
            padding: 10px 30px;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            margin: 25px 0;
            border: 1px solid white;
            box-shadow: 0 5px 15px rgba(209, 138, 138, 0.2);
            animation: fadeIn 1s ease-out 1.3s forwards;
            opacity: 0;
        }

        /* Info Boxes with Hover Effects */
        .info-section {
            display: flex;
            flex-direction: column;
            gap: 18px;
            margin: 35px 0;
        }

        .info-box {
            background: var(--soft-bg);
            border-radius: 24px;
            padding: 18px;
            display: flex;
            align-items: center;
            text-align: left;
            box-shadow: 0 8px 20px rgba(209, 138, 138, 0.1);
            border: 1px solid rgba(255,255,255,0.8);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            opacity: 0;
            transform: translateX(-20px);
        }

        .info-box:nth-child(1) { animation: slideInLeft 0.8s ease-out 1.5s forwards; }
        .info-box:nth-child(2) { animation: slideInLeft 0.8s ease-out 1.7s forwards; }
        .info-box:nth-child(3) { animation: slideInLeft 0.8s ease-out 1.9s forwards; }

        @keyframes slideInLeft {
            to { opacity: 1; transform: translateX(0); }
        }

        .info-box:hover {
            transform: scale(1.03);
            background: white;
            box-shadow: 0 12px 25px rgba(209, 138, 138, 0.2);
        }

        .icon-wrapper {
            width: 55px;
            height: 55px;
            background: linear-gradient(135deg, #f8dada, #fce4ec);
            border-radius: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 18px;
            flex-shrink: 0;
            transition: transform 0.5s ease;
        }

        .info-box:hover .icon-wrapper {
            transform: rotateY(360deg);
        }

        .icon-wrapper svg {
            width: 26px;
            height: 26px;
            fill: #7a3a3a;
        }

        .info-content h4 {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #9e7a7a;
            margin-bottom: 4px;
        }

        .info-content p {
            font-weight: 600;
            font-size: 1rem;
            color: #4a3333;
        }

        /* Welcome Message with Glow */
        .welcome-message {
            background: linear-gradient(rgba(250, 224, 224, 0.6), rgba(255, 255, 255, 0.4));
            margin-bottom: 35px;
            padding: 30px;
            border-radius: 25px;
            position: relative;
            border: 2px solid rgba(209, 138, 138, 0.3);
            overflow: hidden;
            animation: fadeIn 1s ease-out 2.1s forwards;
            opacity: 0;
        }

        .welcome-message::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent);
            transform: rotate(45deg);
            animation: shimmer 4s infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        /* Countdown Timer */
        .countdown-container {
            margin: 40px 0;
            animation: fadeIn 1s ease-out 2.3s forwards;
            opacity: 0;
        }

        .timer {
            display: flex;
            justify-content: center;
            gap: 12px;
        }

        .timer-box {
            background: linear-gradient(135deg, #ffffff, #f8dada);
            width: 70px;
            height: 85px;
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 6px 15px rgba(0,0,0,0.06);
            border: 1px solid white;
        }

        .timer-val {
            font-size: 1.6rem;
            font-weight: 700;
            color: #7a3a3a;
        }

        /* Footer & Branding */
        .footer-banner {
            background: linear-gradient(to right, transparent, rgba(209, 138, 138, 0.3), transparent);
            margin: 40px 0 25px 0;
            padding: 25px;
            border-radius: 25px;
            animation: fadeIn 1.2s ease-out 2.5s forwards;
            opacity: 0;
        }

        .branding {
            font-size: 0.7rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #9e7a7a;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
            animation: fadeIn 1s ease-out 2.7s forwards;
            opacity: 0;
        }

        .brand-icon {
            width: 24px;
            height: 24px;
            background: #4a3333;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Utility */
        .text-italic { font-style: italic; }
        .text-bold { font-weight: 700; }

    </style>
</head>
<body>

    <!-- Falling Petals -->
    <div id="petal-container"></div>

    <div class="card-wrapper">
        <div class="card-container">
            <div class="content-overlay">
                <p class="header-text">Together with their families</p>
                <h1 class="main-title">Wedding Celebration</h1>
                
                <div class="couple-names">
                    ${d.groom_name}
                    <span class="ampersand">&amp;</span>
                    ${d.bride_name}
                </div>

                <div class="event-badge">✨ ${d.ceremony_name} ✨</div>

                <!-- Info Cards -->
                <div class="info-section">
                    <div class="info-box">
                        <div class="icon-wrapper">
                            <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
                        </div>
                        <div class="info-content">
                            <h4>Date &amp; Time</h4>
                            <p>${d.wedding_date}</p>
                        </div>
                    </div>

                    <div class="info-box">
                        <div class="icon-wrapper">
                            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        </div>
                        <div class="info-content">
                            <h4>The Venue</h4>
                            <p>${d.venue_name}</p>
                            <span>${d.venue_location}</span>
                        </div>
                    </div>

                    <div class="info-box">
                        <div class="icon-wrapper">
                            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </div>
                        <div class="info-content">
                            <h4>Functions</h4>
                            <p>${d.ceremony_name}</p>
                        </div>
                    </div>
                </div>

                <div class="welcome-message">
                    <p class="text-italic">"${d.invite_message}"</p>
                </div>

                <!-- Countdown -->
                <div class="countdown-container">
                    <h4 style="font-size: 0.8rem; margin-bottom: 15px; letter-spacing: 2px;">COUNTING DOWN THE DAYS</h4>
                    <div class="timer">
                        <div class="timer-box">
                            <span class="timer-val" id="days">00</span>
                            <span style="font-size: 0.6rem; color: #9e7a7a;">DAYS</span>
                        </div>
                        <div class="timer-box">
                            <span class="timer-val" id="hours">00</span>
                            <span style="font-size: 0.6rem; color: #9e7a7a;">HRS</span>
                        </div>
                        <div class="timer-box">
                            <span class="timer-val" id="minutes">00</span>
                            <span style="font-size: 0.6rem; color: #9e7a7a;">MIN</span>
                        </div>
                        <div class="timer-box">
                            <span class="timer-val" id="seconds">00</span>
                            <span style="font-size: 0.6rem; color: #9e7a7a;">SEC</span>
                        </div>
                    </div>
                </div>

                <div class="footer-banner">
                    <p class="text-bold text-italic">We Eagerly Await Your Presence</p>
                </div>

                <div class="branding">
                    <div class="brand-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                    <span>ETERNAL VOWZ — Digital Invitations</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        function createPetals() {
            const container = document.getElementById('petal-container');
            const petalCount = 20;

            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                
                const size = Math.random() * 15 + 10 + 'px';
                petal.style.width = size;
                petal.style.height = size;
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDuration = Math.random() * 5 + 5 + 's';
                petal.style.animationDelay = Math.random() * 5 + 's';
                
                const colors = ['#ffc0cb', '#ffb6c1', '#ffd1dc', '#fae1e5'];
                petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                container.appendChild(petal);
            }
        }

        const weddingDate = new Date("${d.countdown_date}").getTime();

        function updateTimer() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                document.querySelector(".countdown-container h4").innerHTML = "TODAY IS THE BIG DAY!";
                return;
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = String(d).padStart(2, '0');
            document.getElementById("hours").innerText = String(h).padStart(2, '0');
            document.getElementById("minutes").innerText = String(m).padStart(2, '0');
            document.getElementById("seconds").innerText = String(s).padStart(2, '0');
        }

        window.onload = () => {
            createPetals();
            setInterval(updateTimer, 1000);
            updateTimer();
        };
    </script>
</body>
</html>`;
        }
    },
    'modern-emerald': {
        name: 'Modern Emerald',
        defaultData: {
            groom_name: 'Ayaan',
            bride_name: 'Zoya',
            ceremony_name: 'Nikkah Ceremony',
            wedding_date: '24 May 2026, 07:30 PM',
            venue_name: 'Grand Palace Banquet Hall',
            venue_location: 'Lucknow, Uttar Pradesh',
            invite_message: 'We request the honor of your presence and prayers on our special day.',
            countdown_date: 'May 24, 2026 19:30:00'
        },
        compile: function(data) {
            const d = { ...this.defaultData, ...data };
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${d.groom_name} & ${d.bride_name} Wedding Invitation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-rose: #8d1b3d; 
            --name-color: #b38b4d; 
            --soft-pink: #fdfaf2;  
            --accent-gold: #c5a059;
            --dark-emerald: #1a2f23;
        }

        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #fff;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }

        .main-bg {
            background-image: url('https://raw.githubusercontent.com/salmanahmad34/Assets/main/copilot_image_1775682687205.jpeg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 100px 20px 60px 20px;
        }

        .serif {
            font-family: 'Playfair Display', serif;
        }

        .name-font {
            font-family: 'Great Vibes', cursive;
            color: var(--name-color);
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
        }

        .info-pill {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 240, 0.98));
            border-radius: 20px;
            padding: 15px 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            width: 100%;
            max-width: 400px;
            transition: transform 0.3s ease;
            border: 1px solid rgba(179, 139, 77, 0.2);
            opacity: 0;
        }

        .info-pill:hover {
            transform: translateY(-5px);
        }

        .icon-box {
            background: #fcf1f3;
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: var(--primary-rose);
        }

        .timer-box {
            background: rgba(255, 255, 255, 0.95);
            padding: 12px;
            border-radius: 15px;
            min-width: 70px;
            text-align: center;
            border: 1px solid var(--accent-gold);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .divider-line {
            height: 1px;
            width: 60px;
            background: var(--accent-gold);
            margin: 0 15px;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }

        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .animate-up { animation: fadeInUp 1s ease-out forwards; }
        .animate-down { animation: fadeInDown 1s ease-out forwards; }
        .animate-zoom { animation: zoomIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-float { animation: floating 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 4s ease-in-out infinite; }

        .stagger-1 { animation-delay: 0.4s; }
        .stagger-2 { animation-delay: 0.6s; }
        .stagger-3 { animation-delay: 0.8s; }
        .stagger-4 { animation-delay: 1.0s; }
        .stagger-5 { animation-delay: 1.2s; }
    </style>
</head>
<body>

    <div class="main-bg">
        <div class="text-center mb-6 animate-down mt-12">
            <p class="text-[10px] tracking-[0.3em] uppercase text-gray-700 mb-2 font-bold">Together with their families</p>
            <h2 class="text-lg font-semibold text-[var(--primary-rose)] mb-4 tracking-wider uppercase">You're invited to the<br><span class="text-[var(--accent-gold)]">Wedding Celebration</span></h2>
            
            <div class="flex items-center justify-center my-4">
                <div class="divider-line"></div>
                <span class="text-xl text-[var(--accent-gold)] animate-float">❤</span>
                <div class="divider-line"></div>
            </div>

            <div class="animate-zoom stagger-1">
                <h1 class="name-font text-7xl md:text-8xl my-2">${d.groom_name}</h1>
                <div class="bg-[var(--accent-gold)] text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto text-xl italic my-4 shadow-md animate-pulse-slow">&amp;</div>
                <h1 class="name-font text-7xl md:text-8xl my-2">${d.bride_name}</h1>
            </div>

            <div class="inline-block px-6 py-2 bg-[var(--accent-gold)] text-white rounded-full text-sm font-medium mt-6 border border-white/40 tracking-widest uppercase animate-up stagger-2 shadow-sm">
                ❤ ${d.ceremony_name} ❤
            </div>
        </div>

        <div class="w-full max-w-md space-y-4 px-4">
            <div class="info-pill animate-up stagger-3">
                <div class="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Wedding Date & Time</p>
                    <p class="text-[var(--primary-rose)] font-bold text-lg">${d.wedding_date}</p>
                </div>
            </div>

            <div class="info-pill animate-up stagger-4">
                <div class="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Venue</p>
                    <p class="text-[var(--primary-rose)] font-bold text-lg">${d.venue_name}</p>
                    <p class="text-xs text-gray-600">${d.venue_location}</p>
                </div>
            </div>

            <div class="info-pill animate-up stagger-5">
                <div class="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
                </div>
                <div>
                    <p class="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Celebration Type</p>
                    <p class="text-[var(--primary-rose)] font-bold text-lg">${d.ceremony_name}</p>
                </div>
            </div>
        </div>

        <div class="glass-card mt-8 p-6 text-center max-w-[90%] w-full opacity-0 animate-up" style="animation-delay: 1.4s;">
            <p class="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-bold mb-3">✦ Welcome Message ✦</p>
            <p class="serif italic text-[var(--primary-rose)] text-lg leading-relaxed">
                "${d.invite_message}"
            </p>
        </div>

        <div class="mt-10 text-center w-full opacity-0 animate-up" style="animation-delay: 1.6s;">
            <div class="flex items-center justify-center mb-4">
                <div class="divider-line"></div>
                <span class="text-xs uppercase tracking-[0.2em] font-bold text-gray-800">Wedding Day In</span>
                <div class="divider-line"></div>
            </div>
            
            <div id="countdown" class="flex justify-center gap-3">
                <div class="timer-box">
                    <span id="days" class="block text-2xl font-bold text-[var(--primary-rose)]">00</span>
                    <span class="text-[10px] uppercase tracking-tighter text-gray-500">Days</span>
                </div>
                <div class="timer-box">
                    <span id="hours" class="block text-2xl font-bold text-[var(--primary-rose)]">00</span>
                    <span class="text-[10px] uppercase tracking-tighter text-gray-500">Hrs</span>
                </div>
                <div class="timer-box">
                    <span id="minutes" class="block text-2xl font-bold text-[var(--primary-rose)]">00</span>
                    <span class="text-[10px] uppercase tracking-tighter text-gray-500">Min</span>
                </div>
                <div class="timer-box">
                    <span id="seconds" class="block text-2xl font-bold text-[var(--primary-rose)]">00</span>
                    <span class="text-[10px] uppercase tracking-tighter text-gray-500">Sec</span>
                </div>
            </div>
        </div>

        <div class="mt-12 w-full max-w-md opacity-0 animate-up" style="animation-delay: 1.8s;">
             <div class="glass-card p-6 text-center border-t-4 border-[var(--accent-gold)]">
                <span class="text-[var(--accent-gold)] text-xl animate-pulse-slow block">❤</span>
                <p class="serif text-xl font-bold text-[var(--primary-rose)] mt-1">We Eagerly Await Your Presence</p>
                <p class="italic text-xs text-gray-600 mt-2">to bless the couple on their special day</p>
             </div>
        </div>

        <div class="mt-8 text-center text-[10px] tracking-widest text-gray-600 uppercase flex items-center mb-10 opacity-0 animate-up" style="animation-delay: 2s;">
            <span class="w-6 h-6 bg-[var(--accent-gold)] rounded-full flex items-center justify-center text-white mr-2 shadow-sm">❤</span>
            Eternal Vowz — Digital Wedding Invitations
        </div>
    </div>

    <script>
        const weddingDate = new Date("${d.countdown_date}").getTime();
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            if (distance < 0) {
                document.getElementById("countdown").innerHTML = "<p class='text-gray-800 font-bold italic'>The celebration has begun!</p>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();
    </script>
</body>
</html>`;
        }
    },
    'royal-union-scratch': {
        name: 'Royal Union (Scratch Card)',
        defaultData: {
            groom_name: 'Ayesha',
            bride_name: 'Zayd',
            quran_verse: '"And We created you in pairs" (78:8)',
            invite_message_subtitle: 'invite you to celebrate their wedding',
            invite_message: 'With the grace of Allah, we cordially invite you to join us in celebrating the union of Ayesha and Zayd. Your presence and blessings on this special day would mean the world to us.',
            scratch_title: 'Please Scratch to Reveal the Date',
            ceremony_name: 'Nikah Ceremony',
            wedding_date: '24 May 2026, 10:00 AM',
            wedding_time: '10:00 AM',
            ceremony2_name: 'Valima Reception',
            ceremony2_date: '2026-05-25',
            ceremony2_time: '20:00',
            ceremony3_name: '',
            ceremony3_date: '',
            ceremony3_time: '',
            ceremony4_name: '',
            ceremony4_date: '',
            ceremony4_time: '',
            rsvp_quote: 'A night of joy, with loved ones near,<br>A shower of prayers, as a new journey begins here.',
            countdown_date: 'May 24, 2026 10:00:00'
        },
        compile: function(data) {
            const d = { ...this.defaultData, ...data };
            
            // Parse scratch date
            let scratchMonth = 'MAY';
            let scratchDay = '24';
            let scratchYear = '2026';
            if (d.countdown_date) {
                try {
                    const parsedDate = new Date(d.countdown_date);
                    if (!isNaN(parsedDate.getTime())) {
                        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                        scratchMonth = months[parsedDate.getMonth()];
                        scratchDay = parsedDate.getDate().toString();
                        scratchYear = parsedDate.getFullYear().toString();
                    }
                } catch (e) {
                    console.error("Error parsing scratch date: ", e);
                }
            }

            function formatCeremonyDate(dateVal, timeVal) {
                if (!dateVal) return '';
                if (dateVal.includes('-')) {
                    try {
                        const [year, month, day] = dateVal.split('-');
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        const monthName = months[parseInt(month, 10) - 1] || 'Jan';
                        
                        let timeStr = '';
                        if (timeVal) {
                            const [hourStr, minuteStr] = timeVal.split(':');
                            const hour = parseInt(hourStr, 10);
                            const minute = parseInt(minuteStr, 10);
                            const amampm = hour >= 12 ? 'PM' : 'AM';
                            const displayHour = hour % 12 || 12;
                            const displayMinute = minute.toString().padStart(2, '0');
                            timeStr = `, ${displayHour.toString().padStart(2, '0')}:${displayMinute} ${amampm}`;
                        }
                        return `${parseInt(day, 10)} ${monthName} ${year}${timeStr}`;
                    } catch (e) {
                        console.error("Error formatting date:", e);
                        return dateVal + (timeVal ? ` | ${timeVal}` : '');
                    }
                }
                return dateVal + (timeVal ? ` | ${timeVal}` : '');
            }

            let formattedC2Date = formatCeremonyDate(d.ceremony2_date || '2026-05-25', d.ceremony2_time || '20:00');
            let formattedC3Date = formatCeremonyDate(d.ceremony3_date, d.ceremony3_time);
            let formattedC4Date = formatCeremonyDate(d.ceremony4_date, d.ceremony4_time);

            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${d.groom_name} &amp; \${d.bride_name} Wedding Invite</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <style>
        :root {
            --sage-green: #737e5c; 
            --cream: #f9f6f0;      
            --gold-line: #b59a6d;  
            --invite-gold: #b59a6d;
            --bg-dark: #5b6449; 
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body, html {
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: 'Cormorant Garamond', serif;
            background-color: var(--bg-dark); 
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* Mobile Frame for Laptops */
        #app-frame {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 450px; 
            max-height: 900px;
            background-color: var(--cream);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            overflow: hidden;
        }
        @media (max-width: 500px) {
            #app-frame {
                max-width: 100%;
                max-height: 100%;
                box-shadow: none;
            }
        }

        #loading-screen {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: var(--sage-green);
            display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            z-index: 9999;
            color: white;
            transition: opacity 0.5s ease;
        }

        .spinner {
            width: 40px; height: 40px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Envelope */
        .envelope-container {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0; left: 0;
            background-color: var(--sage-green);
            display: none; 
            flex-direction: column;
            cursor: pointer;
            perspective: 1500px;
            z-index: 2000;
        }

        .top-flap {
            position: absolute; top: 0; left: 0; width: 100%; height: 55%;
            background-color: var(--cream);
            clip-path: polygon(0 0, 100% 0, 50% 100%);
            z-index: 10;
            display: flex; justify-content: center; align-items: flex-start;
            padding-top: 8vh;
            transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: top;
        }

        .wax-seal {
            position: absolute; top: 55%; left: 50%;
            transform: translate(-50%, -50%);
            width: 100px; height: 100px;
            background: radial-gradient(circle at 30% 30%, #e8d09a, #c3a364, #8a6d3b);
            border-radius: 50%;
            z-index: 20;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3), inset 0 0 15px rgba(0,0,0,0.2);
            display: flex; justify-content: center; align-items: center;
            transition: transform 1s ease, opacity 0.6s ease;
        }

        .is-open .top-flap { transform: rotateX(180deg); z-index: 1; }
        .is-open .wax-seal { transform: translate(-50%, -150%) scale(0); opacity: 0; }
        .is-open .main-text-env, .is-open .tap-hint { opacity: 0; }

        .flash-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: white; opacity: 0; pointer-events: none; z-index: 3000;
        }
        .animate-flash { animation: flashKeyframe 1s ease-out forwards; }
        @keyframes flashKeyframe { 0% { opacity: 0; } 40% { opacity: 1; } 100% { opacity: 0; } }

        /* Main Invitation Content */
        .main-wrapper {
            height: 100%;
            width: 100%;
            overflow-y: auto;
            scroll-snap-type: y mandatory;
            scroll-behavior: auto; 
            scrollbar-width: none;
            display: none; 
            background-color: var(--cream);
        }
        .main-wrapper::-webkit-scrollbar { display: none; }

        .screen {
            height: 100%; 
            width: 100%;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            position: relative;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            background-size: cover; 
            background-position: center;
            background-repeat: no-repeat;
            text-align: center; padding: 2rem; overflow: hidden;
            background-color: var(--cream);
        }

        .curly { font-family: 'Great Vibes', cursive; }
        .playfair { font-family: 'Playfair Display', serif; }
        .gold-text { color: var(--invite-gold); }

        .animate-text {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .is-visible .animate-text { opacity: 1; transform: translateY(0); }

        .hand-guide {
            position: absolute; top: 50%; left: 50%;
            width: 60px; height: 60px;
            z-index: 15; pointer-events: none;
            animation: hand-scratch 2s infinite ease-in-out;
            opacity: 0.8;
        }
        @keyframes hand-scratch {
            0% { transform: translate(-30%, -30%) rotate(0deg); }
            25% { transform: translate(10%, -10%) rotate(-10deg); }
            50% { transform: translate(-30%, 10%) rotate(0deg); }
            75% { transform: translate(10%, -30%) rotate(10deg); }
            100% { transform: translate(-30%, -30%) rotate(0deg); }
        }

        #scratch-container {
            position: relative; width: 260px; height: 260px;
            border-radius: 50%; margin: 15px auto;
            border: 2px solid var(--invite-gold); overflow: hidden;
            background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        #scratch-canvas { position: absolute; top: 0; left: 0; z-index: 10; cursor: pointer; touch-action: none; }
        .reveal-info { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 5; background: white; }

        .timer-card { border: 1px solid var(--invite-gold); padding: 8px; min-width: 65px; text-align: center; background: rgba(255,255,255,0.1); }
        .invite-input { width: 100%; background: transparent; border: none; border-bottom: 1.2px solid var(--invite-gold); padding: 10px; margin-bottom: 1.2rem; outline: none; text-align: center; font-size: 1.1rem; }

        .scroll-arrow { position: absolute; bottom: 25px; cursor: pointer; z-index: 50; animation: bounce 1.2s infinite; }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }

        canvas#fireworks { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5000; }
    </style>
</head>
<body>

    <div id="app-frame">

        <!-- Preloader -->
        <div id="loading-screen">
            <div class="spinner"></div>
            <p class="playfair italic tracking-widest">Designing your invitation...</p>
        </div>

        <div class="flash-overlay" id="flash"></div>

        <!-- Envelope -->
        <div class="envelope-container" id="envelope" onclick="openEnvelope()">
            <div class="top-flap">
                <svg style="width:140px; height:auto;" viewBox="0 0 100 160" fill="none" stroke="var(--gold-line)" stroke-width="1.2">
                    <path d="M50 150 C50 150 50 100 50 20" />
                    <path d="M50 130 Q70 120 78 100 Q65 90 50 100" />
                    <path d="M50 130 Q30 120 22 100 Q35 90 50 100" />
                    <path d="M50 95 Q75 80 82 55 Q65 45 50 65" />
                    <path d="M50 95 Q25 80 18 55 Q35 45 50 65" />
                    <path d="M50 60 Q65 40 68 15 Q50 10 50 30" />
                    <path d="M50 60 Q35 40 32 15 Q50 10 50 30" />
                </svg>
            </div>
            <div class="wax-seal">
                <svg style="width:40px; height:auto; opacity:0.5; filter:brightness(0.2);" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 20 Q70 40 50 80 Q30 40 50 20 M50 20 Q80 50 50 90 Q20 50 50 20" />
                </svg>
            </div>
            <div class="main-text-env px-4 text-center w-full">
                <h1 class="text-3xl font-light leading-relaxed animate-pulse text-white">A Wedding Invitation<br>(A Blessed Union)</h1>
            </div>
            <div class="tap-hint absolute bottom-10 w-full text-center text-white/70">
                <p class="text-sm tracking-widest uppercase">Tap to Open</p>
                <svg class="mx-auto mt-2 w-5 h-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </div>
        </div>

        <canvas id="fireworks"></canvas>
        <div class="main-wrapper" id="main-content">
            <!-- Screen 1: Welcome -->
            <section id="screen1" class="screen section">
                <div class="flex flex-col items-center">
                    <p class="animate-text uppercase tracking-[0.6em] text-[10px] gold-text mb-12">Wedding Invitation</p>
                    <h1 class="animate-text curly text-7xl md:text-8xl gold-text mb-4">\${d.groom_name}</h1>
                    <p class="animate-text curly text-4xl gold-text my-2">&amp;</p>
                    <h1 class="animate-text curly text-7xl md:text-8xl gold-text mb-6">\${d.bride_name}</h1>
                    <p class="animate-text playfair text-lg gold-text tracking-widest mt-4 opacity-80">\${d.invite_message_subtitle || 'invite you to celebrate their wedding'}</p>
                    <p class="animate-text text-[11px] uppercase tracking-widest opacity-60 mt-10">\${d.quran_verse || '"And We created you in pairs" (78:8)'}</p>
                </div>
                <div class="scroll-arrow" onclick="jumpTo(2)">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b59a6d" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
                </div>
            </section>

            <!-- Screen 2: Scratch -->
            <section id="screen2" class="screen section">
                <div class="w-full">
                    <p class="animate-text italic text-lg mb-4 text-gray-800">\${d.scratch_title || 'Please Scratch to Reveal the Date'}</p>
                    <p class="animate-text text-sm text-gray-600 px-8 mb-8 leading-relaxed italic">
                        "\${d.invite_message}"
                    </p>
                    <div class="animate-text flex justify-center relative">
                        <div id="hand-indicator" class="hand-guide">
                            <svg viewBox="0 0 100 100" fill="#737e5c">
                                <path d="M30 60 Q35 50 40 60 T50 60 T60 60 T70 60 V80 Q70 90 50 90 T30 80 V60 M40 60 V40 Q40 30 50 30 T60 40 V60" stroke="white" stroke-width="2"/>
                            </svg>
                        </div>
                        <div id="scratch-container">
                            <div class="reveal-info">
                                <p class="playfair text-xl uppercase tracking-widest leading-none">\${scratchMonth}</p>
                                <p class="playfair text-6xl font-bold gold-text my-2 leading-none">\${scratchDay}</p>
                                <p class="playfair text-xl leading-none">\${scratchYear}</p>
                            </div>
                            <canvas id="scratch-canvas" width="260" height="260"></canvas>
                        </div>
                    </div>
                    <p id="scratch-hint-msg" class="animate-text text-[11px] uppercase tracking-widest opacity-60 mt-8 px-10">Please Scroll Down to Continue ↓</p>
                </div>
                <div class="scroll-arrow" onclick="jumpTo(3)">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#737e5c" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
                </div>
            </section>

            <!-- Screen 3: Countdown -->
            <section id="screen3" class="screen section">
                <div class="w-full">
                    <h2 class="animate-text playfair text-4xl gold-text mb-6">Countdown to our Big Day</h2>
                    <div class="animate-text flex justify-center gap-3 mb-6">
                        <div class="timer-card"><p id="days" class="playfair text-2xl gold-text">00</p><p class="text-[8px] uppercase tracking-widest opacity-70">Days</p></div>
                        <div class="timer-card"><p id="hours" class="playfair text-2xl gold-text">00</p><p class="text-[8px] uppercase tracking-widest opacity-70">Hours</p></div>
                        <div class="timer-card"><p id="mins" class="playfair text-2xl gold-text">00</p><p class="text-[8px] uppercase tracking-widest opacity-70">Mins</p></div>
                        <div class="timer-card"><p id="secs" class="playfair text-2xl gold-text">00</p><p class="text-[8px] uppercase tracking-widest opacity-70">Secs</p></div>
                    </div>
                    <div class="space-y-4 px-8" style="max-height: 280px; overflow-y: auto;">
                        <div class="animate-text border-l-2 border-[#b59a6d] pl-5 text-left">
                            <p class="gold-text font-bold text-xs uppercase tracking-widest mb-1">\${d.ceremony_name || 'Nikah Ceremony'}</p>
                            <p class="text-base">\${d.wedding_date}</p>
                        </div>
                        \${formattedC2Date && d.ceremony2_name ? `
                        <div class="animate-text border-l-2 border-[#737e5c] pl-5 text-left">
                            <p class="sage-text font-bold text-xs uppercase tracking-widest mb-1">\${d.ceremony2_name}</p>
                            <p class="text-base">\${formattedC2Date}</p>
                        </div>` : ''}
                        \${formattedC3Date && d.ceremony3_name ? `
                        <div class="animate-text border-l-2 border-[#b59a6d] pl-5 text-left">
                            <p class="gold-text font-bold text-xs uppercase tracking-widest mb-1">\${d.ceremony3_name}</p>
                            <p class="text-base">\${formattedC3Date}</p>
                        </div>` : ''}
                        \${formattedC4Date && d.ceremony4_name ? `
                        <div class="animate-text border-l-2 border-[#737e5c] pl-5 text-left">
                            <p class="sage-text font-bold text-xs uppercase tracking-widest mb-1">\${d.ceremony4_name}</p>
                            <p class="text-base">\${formattedC4Date}</p>
                        </div>` : ''}
                    </div>
                </div>
                <div class="scroll-arrow" onclick="jumpTo(4)">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b59a6d" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
                </div>
            </section>

            <!-- Screen 4: Form -->
            <section id="screen4" class="screen section">
                <div class="w-full max-w-xs">
                    <div class="animate-text playfair italic text-xl text-[#737e5c] mb-12 px-4 leading-relaxed">
                        "\${d.rsvp_quote || 'A night of joy, with loved ones near,<br>A shower of prayers, as a new journey begins here.'}"
                    </div>
                    <form class="animate-text space-y-4">
                        <input type="text" placeholder="Your Name" class="invite-input">
                        <textarea placeholder="Your Blessings..." class="invite-input" rows="2"></textarea>
                        <button type="button" onclick="celebrateRSVP()" class="w-full py-4 bg-[#737e5c] text-white text-[10px] uppercase tracking-[0.4em] rounded mt-4">Send Blessings ♡</button>
                    </form>
                </div>
                <div class="scroll-arrow" onclick="jumpTo(5)">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#737e5c" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
                </div>
            </section>

            <!-- Screen 5: Thank You -->
            <section id="screen5" class="screen section">
                <div class="flex flex-col items-center">
                    <h1 class="animate-text curly text-8xl md:text-9xl gold-text mb-6">Thank you!</h1>
                    <div class="animate-text w-20 h-px bg-[#b59a6d] mb-10"></div>
                    <p class="animate-text playfair text-2xl gold-text tracking-widest italic opacity-90 px-6">we can't wait to celebrate you</p>
                    <p class="animate-text mt-16 text-[10px] uppercase tracking-[0.6em] opacity-40">See you on the Big Day</p>
                </div>
            </section>
        </div>

    </div>

    <script>
        const imageUrls = [
            'https://github.com/salmanahmad34/Assets/blob/main/Gemini_Generated_Image_z50i56z50i56z50i.png?raw=true', 
            'https://github.com/salmanahmad34/Assets/blob/main/Gemini_Generated_Image_wa2fr3wa2fr3wa2f.png?raw=true', 
            'https://github.com/salmanahmad34/Assets/blob/main/Gemini_Generated_Image_q7pgfmq7pgfmq7pg.png?raw=true', 
            'https://github.com/salmanahmad34/Assets/blob/main/Gemini_Generated_Image_9pndkn9pndkn9pnd.png?raw=true'  
        ];

        let loadedCount = 0;
        const totalImages = imageUrls.length;

        function preloadImages() {
            imageUrls.forEach((url, index) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    loadedCount++;
                    if(index === 0) document.getElementById('screen1').style.backgroundImage = \`url('\${url}')\`;
                    if(index === 1) {
                        document.getElementById('screen2').style.backgroundImage = \`url('\${url}')\`;
                        document.getElementById('screen5').style.backgroundImage = \`url('\${url}')\`;
                    }
                    if(index === 2) document.getElementById('screen3').style.backgroundImage = \`url('\${url}')\`;
                    if(index === 3) document.getElementById('screen4').style.backgroundImage = \`url('\${url}')\`;
                    
                    if (loadedCount === totalImages) finishPreload();
                };
                img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) finishPreload();
                };
            });
            setTimeout(() => { if(loadedCount < totalImages) finishPreload(); }, 6000);
        }

        function finishPreload() {
            const loader = document.getElementById('loading-screen');
            const envelope = document.getElementById('envelope');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                envelope.style.display = 'flex';
            }, 500);
        }

        const observerOptions = {
            root: document.getElementById('main-content'),
            threshold: 0.25
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-visible');
                else entry.target.classList.remove('is-visible');
            });
        }, observerOptions);

        function openEnvelope() {
            const envelope = document.getElementById('envelope');
            const flash = document.getElementById('flash');
            const content = document.getElementById('main-content');

            if (!envelope.classList.contains('is-open')) {
                envelope.classList.add('is-open');
                setTimeout(() => {
                    flash.classList.add('animate-flash');
                    setTimeout(() => {
                        envelope.style.opacity = '0';
                        setTimeout(() => {
                            envelope.style.display = 'none';
                            content.style.display = 'block';
                            document.querySelectorAll('.section').forEach(el => observer.observe(el));
                            initScratch();
                        }, 600);
                    }, 300);
                }, 800);
            }
        }

        function jumpTo(id) {
            const target = document.getElementById(\`screen\${id}\`);
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        }

        const canvas = document.getElementById('scratch-canvas');
        const ctx = canvas.getContext('2d');
        const hand = document.getElementById('hand-indicator');
        let isDrawing = false, points = 0, revealed = false;

        function initScratch() {
            ctx.fillStyle = '#737e5c';
            ctx.fillRect(0, 0, 260, 260);
            ctx.fillStyle = 'rgba(255,255,255,0.12)';
            for(let i=0; i<35; i++) { ctx.beginPath(); ctx.arc(Math.random()*260, Math.random()*260, 18, 0, Math.PI*2); ctx.fill(); }
            ctx.fillStyle = '#fff'; ctx.font = 'bold 18px Cormorant Garamond'; ctx.textAlign = 'center'; ctx.fillText('SCRATCH HERE', 130, 135);
        }

        function handleScratch(x, y) {
            if (revealed) return;
            if(hand) hand.style.display = 'none';
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath(); ctx.arc(x, y, 28, 0, Math.PI * 2); ctx.fill();
            points++;
            if (points > 12 && !revealed) {
                revealed = true;
                canvas.style.transition = 'opacity 0.7s';
                canvas.style.opacity = '0';
                document.getElementById('scratch-hint-msg').innerText = "Revealed! See you there! ✨";
                triggerPataka();
                setTimeout(() => canvas.style.display = 'none', 700);
            }
        }

        canvas.addEventListener('mousedown', () => isDrawing = true);
        canvas.addEventListener('touchstart', () => isDrawing = true);
        window.addEventListener('mouseup', () => isDrawing = false);
        window.addEventListener('touchend', () => isDrawing = false);
        canvas.addEventListener('mousemove', (e) => { if(isDrawing) { const r = canvas.getBoundingClientRect(); handleScratch(e.clientX-r.left, e.clientY-r.top); } });
        canvas.addEventListener('touchmove', (e) => { if(isDrawing) { e.preventDefault(); const r = canvas.getBoundingClientRect(); handleScratch(e.touches[0].clientX-r.left, e.touches[0].clientY-r.top); } }, {passive:false});

        const fwCanvas = document.getElementById('fireworks');
        const fwCtx = fwCanvas.getContext('2d');
        let particles = [];
        function resize() {
            const frame = document.getElementById('app-frame');
            if(frame) {
                fwCanvas.width = frame.clientWidth;
                fwCanvas.height = frame.clientHeight;
            }
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor(x, y, color) { 
                this.x = x; this.y = y; this.color = color; 
                this.velocity = { x: (Math.random()-0.5)*18, y: (Math.random()-0.5)*18 }; 
                this.alpha = 1; this.friction = 0.95; 
            }
            draw() { fwCtx.globalAlpha = this.alpha; fwCtx.beginPath(); fwCtx.arc(this.x, this.y, 3, 0, Math.PI*2); fwCtx.fillStyle = this.color; fwCtx.fill(); }
            update() { 
                this.velocity.x *= this.friction; this.velocity.y *= this.friction;
                this.x += this.velocity.x; this.y += this.velocity.y; this.alpha -= 0.015; 
            }
        }

        function triggerPataka() {
            const colors = ['#b59a6d', '#ffffff', '#737e5c', '#ffd700'];
            const x = fwCanvas.width / 2, y = fwCanvas.height / 2;
            for(let i=0; i<140; i++) particles.push(new Particle(x, y, colors[Math.floor(Math.random()*colors.length)]));
            animatePataka();
        }

        function animatePataka() {
            if (particles.length === 0) return;
            requestAnimationFrame(animatePataka);
            fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
            particles.forEach((p, i) => { if (p.alpha <= 0) particles.splice(i, 1); else { p.update(); p.draw(); } });
        }

        function celebrateRSVP() { triggerPataka(); alert('Blessings sent! Thank you.'); }

        const target = new Date("\${d.countdown_date}").getTime();
        setInterval(() => {
            const gap = target - new Date().getTime();
            if (gap <= 0) return;
            document.getElementById('days').innerText = Math.floor(gap / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById('hours').innerText = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById('mins').innerText = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById('secs').innerText = Math.floor((gap % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);

        preloadImages();
    </script>
</body>
</html>`;
        }
    }
};

