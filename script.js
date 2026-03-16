const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const appCards = document.querySelectorAll('.app-card');
const modal = document.getElementById('appModal');
const modalClose = document.querySelector('.modal-close');
const ctaButton = document.querySelector('.cta-button');

const appData = {
    cumulus: {
        icon: 'img/cumulus.png',
        title: 'Cumulus',
        description: 'Cumulus is a sleek iOS weather app built with SwiftUI and powered by WeatherKit. It delivers accurate, real-time forecasts with elegant gradient visuals, dynamic widgets, and a beautifully themed interface. Designed for both iPhone and iPad, Cumulus puts powerful weather insights at your fingertips.',
        screenshots: ['img/cumulus/sc1.png', 'img/cumulus/sc2.png', 'img/cumulus/sc3.png'],
        appStoreUrl: 'https://apps.apple.com/us/app/cumulus/id6742735497',
        testFlightUrl: 'https://testflight.apple.com/join/3FTY37Fg',
        detailPageUrl: 'cumulus.html'
    },
    tailtag: {
        icon: 'img/tailtag.png',
        title: 'TailTag',
        description: 'TailTag is the ultimate plane spotting companion. Log aircraft sightings, tag them by registration, airline, or flight, and upload photos to create your personal aviation archive. With a sleek SwiftUI interface, TailTag makes it easy to organize and relive your aviation moments.',
        screenshots: ['img/tailtag/sc1.png', 'img/tailtag/sc2.png', 'img/tailtag/sc3.png'],
        appStoreUrl: 'https://apps.apple.com/us/app/tailtag/id6747738157',
        testFlightUrl: 'https://testflight.apple.com/join/zXMv5qHd',
        detailPageUrl: 'tailtag.html'
    },
    latch: {
        icon: 'img/latch.png',
        title: 'Latch',
        description: 'Latch is a local-first credential vault built with SwiftUI. It stores passwords and TOTP secrets in Apple Keychain, includes password generation and CSV import, and helps you review account security.',
        screenshots: ['img/latch/sc1.png', 'img/latch/sc2.png', 'img/latch/sc3.png'],
        appStoreUrl: 'https://testflight.apple.com/join/Zz9YuRC2',
        testFlightUrl: 'https://testflight.apple.com/join/Zz9YuRC2',
        detailPageUrl: 'latch.html'
    },
    pinboard: {
        icon: 'img/pinboard.png',
        title: 'PinBoard - Better Notes',
        description: 'PinBoard is a modern sticky note utility for iOS that keeps your thoughts front and center. Create colorful, resizable notes with custom icons, fonts, and themes. Stay organized with Live Activities, widgets, and seamless syncing — all wrapped in a polished SwiftUI interface.',
        screenshots: ['img/pinboard/sc1.png', 'img/pinboard/sc2.png', 'img/pinboard/sc3.png'],
        appStoreUrl: 'https://apps.apple.com/us/app/pinboard-better-notes/id6747376814',
        testFlightUrl: 'https://testflight.apple.com/join/NmpwygSt',
        detailPageUrl: 'pinboard.html'
    },
    flipcards: {
        icon: 'img/flipcards.png',
        title: 'FlipCards',
        description: 'FlipCards is your ultimate flashcard study companion, designed to revolutionize the way you learn and retain information. Create custom study sets, organize them by subject, and master any topic with interactive flashcards that adapt to your learning pace.',
        screenshots: ['img/flipcards/sc1.png', 'img/flipcards/sc2.png', 'img/flipcards/sc3.png'],
        appStoreUrl: 'https://apps.apple.com/gb/app/flipcards-revision-made-easy/id6749154468',
        testFlightUrl: 'https://testflight.apple.com/join/2hBxWMNR',
        detailPageUrl: 'flipcards.html'
    },
    pulse: {
        icon: 'img/pulse.png',
        title: 'Pulse',
        description: 'Pulse is a diagnostics app designed to help verify the core functionality of your iPhone,from buttons to sensors. Built with SwiftUI and with no data collection.',
        screenshots: ['img/pulse/sc1.png', 'img/pulse/sc2.png', 'img/pulse/sc3.png'],
        appStoreUrl: 'https://apps.apple.com/gb/app/pulse-mobile-diagnostics/id6757356341',
        testFlightUrl: 'https://apps.apple.com/gb/app/pulse-mobile-diagnostics/id6757356341',
        detailPageUrl: 'pulse.html'
    },
    moments: {
        icon: 'img/moments.png',
        title: 'Moments',
        description: 'Moments is a simple app designed to use live activites and widgets to count down to what matters to you, built with SwiftUI and optimized for iOS.',
        screenshots: ['img/moments/sc1.png', 'img/moments/sc2.png', 'img/moments/sc3.png'],
        appStoreUrl: 'https://apps.apple.com/gb/app/moments-countdown/id6759080639',
        testFlightUrl: 'https://testflight.apple.com/join/a8gPamuc',
        detailPageUrl: 'moments.html'
    }
};

const preloadedImages = new Map();

function preloadScreenshots() {
    const assets = [];

    Object.values(appData).forEach((app) => {
        assets.push(app.icon, ...app.screenshots);
    });

    assets.forEach((src) => {
        const img = new Image();
        img.onload = () => preloadedImages.set(src, img);
        img.src = src;
    });
}

function toggleMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isMenuOpen = navMenu.classList.contains('active');
    document.body.classList.toggle('menu-open', isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
}

function closeMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
}

function renderModalScreenshots(app) {
    const screenshotsContainer = document.querySelector('.modal-screenshots');
    if (!screenshotsContainer) return;

    screenshotsContainer.innerHTML = '';
    const isMobile = window.innerWidth <= 800;
    const imagesToShow = isMobile ? [app.screenshots[1] || app.screenshots[0]] : app.screenshots;

    imagesToShow.forEach((screenshot, index) => {
        const screenshotDiv = document.createElement('div');
        screenshotDiv.className = 'screenshot-item';

        const cached = preloadedImages.get(screenshot);
        const imageEl = cached ? cached.cloneNode() : document.createElement('img');
        imageEl.src = screenshot;
        imageEl.alt = `${app.title} Screenshot ${index + 1}`;
        imageEl.className = 'screenshot-img';

        screenshotDiv.appendChild(imageEl);
        screenshotsContainer.appendChild(screenshotDiv);
    });
}

function openModal(appType) {
    const app = appData[appType];
    if (!app || !modal) return;

    const modalIcon = document.querySelector('.modal-icon');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const downloadButton = document.querySelector('.download-button');
    const betaButton = document.querySelector('.beta-button');

    if (modalIcon) {
        modalIcon.innerHTML = `<img src="${app.icon}" alt="${app.title} Icon" style="width:100%;height:100%;object-fit:cover;border-radius:22px;">`;
    }
    if (modalTitle) modalTitle.textContent = app.title;
    if (modalDescription) modalDescription.textContent = app.description;

    renderModalScreenshots(app);

    if (downloadButton) {
        downloadButton.onclick = () => window.open(app.appStoreUrl, '_blank');
    }
    if (betaButton) {
        betaButton.onclick = () => window.open(app.testFlightUrl, '_blank');
    }

    modal.style.display = 'flex';
    modal.setAttribute('data-app-type', appType);
    requestAnimationFrame(() => modal.classList.add('active'));
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;

    modal.classList.remove('active');
    modal.removeAttribute('data-app-type');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 220);
}

function revealOnScroll() {
    const revealElements = document.querySelectorAll('.app-card, .hero-copy, .hero-visual, .contact-content');
    revealElements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
}

function updateNavbarOnScroll() {
    if (!navbar) return;
    const scrolled = window.scrollY > 8;
    navbar.classList.toggle('scrolled', scrolled);
}

function updateActiveNavLink() {
    if (!navLinks.length) return;

    const sections = document.querySelectorAll('section[id]');
    const scrollMarker = window.scrollY + 140;
    let activeId = 'home';

    sections.forEach((section) => {
        if (scrollMarker >= section.offsetTop) {
            activeId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const isActive = href.slice(1) === activeId;
        link.classList.toggle('active', isActive);
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');
            if (!href) return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            closeMenu();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            navLinks.forEach((link) => {
                link.classList.toggle('active', link === anchor);
            });
        });
    });
}

function initialize() {
    preloadScreenshots();
    setupSmoothScroll();
    revealOnScroll();
    updateNavbarOnScroll();
    updateActiveNavLink();

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const appsSection = document.getElementById('apps');
            if (appsSection) {
                appsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', closeMenu));

    appCards.forEach((card) => {
        // Clicking the card navigates to the detail page
        card.addEventListener('click', (event) => {
            // Don't navigate if clicking the Learn More button
            if (event.target.classList.contains('app-button')) return;
            
            const appType = card.getAttribute('data-app');
            const app = appData[appType];
            if (app && app.detailPageUrl) {
                window.location.href = app.detailPageUrl;
            }
        });
        
        // Learn More button opens the modal
        const learnMoreBtn = card.querySelector('.app-button');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                const appType = card.getAttribute('data-app');
                if (appType) openModal(appType);
            });
        }
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    window.addEventListener('resize', () => {
        const activeAppType = modal ? modal.getAttribute('data-app-type') : null;
        if (modal && modal.classList.contains('active') && activeAppType && appData[activeAppType]) {
            renderModalScreenshots(appData[activeAppType]);
        }

        if (window.innerWidth > 800) {
            closeMenu();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}