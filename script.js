const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const appCards = document.querySelectorAll('.app-card');
const modal = document.getElementById('appModal');
const modalClose = document.querySelector('.modal-close');
const ctaButton = document.querySelector('.cta-button');

const appData = {
   cumulus: {
    icon: 'img/cumulus.png',
    title: 'Cumulus',
    description: 'Cumulus is a sleek iOS weather app built with SwiftUI and powered by WeatherKit. It delivers accurate, real-time forecasts with elegant gradient visuals, dynamic widgets, and a beautifully themed interface. Designed for both iPhone and iPad, Cumulus puts powerful weather insights at your fingertips.',
    screenshots: [
        'img/cumulus/sc1.png',
        'img/cumulus/sc2.png',
        'img/cumulus/sc3.png'
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/cumulus/id6742735497',
    testFlightUrl: 'https://testflight.apple.com/join/3FTY37Fg',
    detailPageUrl: 'cumulus.html'
},

   tailtag: {
    icon: 'img/tailtag.png',
    title: 'TailTag',
    description: 'TailTag is the ultimate plane spotting companion. Log aircraft sightings, tag them by registration, airline, or flight, and upload photos to create your personal aviation archive. With a sleek SwiftUI interface, TailTag makes it easy to organize and relive your aviation moments.',
    screenshots: [
        'img/tailtag/sc1.png',
        'img/tailtag/sc2.png',
        'img/tailtag/sc3.png'
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/tailtag/id6747738157',
    testFlightUrl: 'https://testflight.apple.com/join/zXMv5qHd',
    detailPageUrl: 'tailtag.html'
},
pinboard: {
    icon: 'img/pinboard.png',
    title: 'PinBoard - Better Notes',
    description: 'PinBoard is a modern sticky note utility for iOS that keeps your thoughts front and center. Create colorful, resizable notes with custom icons, fonts, and themes. Stay organized with Live Activities, widgets, and seamless syncing — all wrapped in a polished SwiftUI interface.',
    screenshots: [
        'img/pinboard/sc1.png',
        'img/pinboard/sc2.png',
        'img/pinboard/sc3.png'
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/pinboard-better-notes/id6747376814',
    testFlightUrl: 'https://testflight.apple.com/join/NmpwygSt',
    detailPageUrl: 'pinboard.html'
}

};

const preloadedImages = new Map();

function preloadScreenshots() {
    const allScreenshots = [];
    

    Object.values(appData).forEach(app => {
        allScreenshots.push(...app.screenshots);
        allScreenshots.push(app.icon);
    });
    
    allScreenshots.forEach(src => {
        const img = new Image();
        img.onload = () => {
            preloadedImages.set(src, img);
        };
        img.onerror = () => {
            console.warn(`Failed to preload image: ${src}`);
        };
        img.src = src;
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadScreenshots);
} else {
    preloadScreenshots();
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

ctaButton.addEventListener('click', () => {
    document.getElementById('apps').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

appCards.forEach(card => {
    card.addEventListener('click', () => {
        const appType = card.getAttribute('data-app');
        openModal(appType);
    });

    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

function openModal(appType) {
    const app = appData[appType];
    if (!app) return;

    const modalIcon = document.querySelector('.modal-icon');
    modalIcon.innerHTML = `<img src="${app.icon}" alt="${app.title} Icon" style="width: 100%; height: 100%; object-fit: cover; border-radius: 25px;">`;
    document.querySelector('.modal-title').textContent = app.title;
    document.querySelector('.modal-description').textContent = app.description;

    const screenshotsContainer = document.querySelector('.modal-screenshots');
    screenshotsContainer.innerHTML = '';
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const screenshot = app.screenshots[1];
        const screenshotDiv = document.createElement('div');
        screenshotDiv.className = 'screenshot-item';
        
        const preloadedImg = preloadedImages.get(screenshot);
        if (preloadedImg) {
            const clonedImg = preloadedImg.cloneNode();
            clonedImg.alt = `${app.title} Screenshot`;
            clonedImg.className = 'screenshot-img';
            screenshotDiv.appendChild(clonedImg);
        } else {
            screenshotDiv.innerHTML = `
                <img src="${screenshot}" alt="${app.title} Screenshot" class="screenshot-img">
            `;
        }
        
        screenshotsContainer.appendChild(screenshotDiv);
    } else {
        app.screenshots.forEach((screenshot, index) => {
            const screenshotDiv = document.createElement('div');
            screenshotDiv.className = 'screenshot-item';
            
            const preloadedImg = preloadedImages.get(screenshot);
            if (preloadedImg) {
                const clonedImg = preloadedImg.cloneNode();
                clonedImg.alt = `${app.title} Screenshot ${index + 1}`;
                clonedImg.className = 'screenshot-img';
                screenshotDiv.appendChild(clonedImg);
            } else {
                screenshotDiv.innerHTML = `
                    <img src="${screenshot}" alt="${app.title} Screenshot ${index + 1}" class="screenshot-img">
                `;
            }
            
            screenshotsContainer.appendChild(screenshotDiv);
        });
    }

    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.onclick = () => {
            window.open(app.appStoreUrl, '_blank');
        };
    }

    const betaButton = document.querySelector('.beta-button');
    if (betaButton) {
        betaButton.onclick = () => {
            window.open(app.testFlightUrl, '_blank');
        };
    }

    const learnMoreButton = document.querySelector('.learn-more-button');
    if (learnMoreButton) {
        learnMoreButton.onclick = () => {
            window.location.href = app.detailPageUrl;
        };
    }

    modal.style.display = 'flex';
    modal.setAttribute('data-app-type', appType);
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    modal.removeAttribute('data-app-type');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

appCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        const speed = scrolled * 0.5;
        heroVisual.style.transform = `translateY(${speed}px)`;
    }
});

function staggerAnimation() {
    const cards = document.querySelectorAll('.app-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
}

function animateFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomRotate = Math.random() * 10 - 5;
        
        card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    });
}

setInterval(animateFloatingCards, 3000);

const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 50;
        const yPos = (y - 0.5) * speed * 50;
        
        card.style.transform += ` translate(${xPos}px, ${yPos}px)`;
    });
});

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
});

window.addEventListener('load', () => {
    staggerAnimation();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

let ticking = false;

function updateAnimations() {
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

if ('ontouchstart' in window) {
    document.addEventListener('touchstart', () => {
        document.body.classList.add('touch-device');
    });
}

window.addEventListener('resize', () => {
    if (modal.classList.contains('active')) {
        const activeAppType = modal.getAttribute('data-app-type');
        if (activeAppType) {
            const app = appData[activeAppType];
            if (app) {
                const screenshotsContainer = document.querySelector('.modal-screenshots');
                screenshotsContainer.innerHTML = '';
                
                const isMobile = window.innerWidth <= 768;
                
                if (isMobile) {
                    const screenshot = app.screenshots[1];
                    const screenshotDiv = document.createElement('div');
                    screenshotDiv.className = 'screenshot-item';
                    
                    const preloadedImg = preloadedImages.get(screenshot);
                    if (preloadedImg) {
                        const clonedImg = preloadedImg.cloneNode();
                        clonedImg.alt = `${app.title} Screenshot`;
                        clonedImg.className = 'screenshot-img';
                        screenshotDiv.appendChild(clonedImg);
                    } else {
                        screenshotDiv.innerHTML = `
                            <img src="${screenshot}" alt="${app.title} Screenshot" class="screenshot-img">
                        `;
                    }
                    screenshotsContainer.appendChild(screenshotDiv);
                } else {
                    app.screenshots.forEach((screenshot, index) => {
                        const screenshotDiv = document.createElement('div');
                        screenshotDiv.className = 'screenshot-item';
                        
                        const preloadedImg = preloadedImages.get(screenshot);
                        if (preloadedImg) {
                            const clonedImg = preloadedImg.cloneNode();
                            clonedImg.alt = `${app.title} Screenshot ${index + 1}`;
                            clonedImg.className = 'screenshot-img';
                            screenshotDiv.appendChild(clonedImg);
                        } else {
                            screenshotDiv.innerHTML = `
                                <img src="${screenshot}" alt="${app.title} Screenshot ${index + 1}" class="screenshot-img">
                            `;
                        }
                        
                        screenshotsContainer.appendChild(screenshotDiv);
                    });
                }
            }
        }
    }
});
