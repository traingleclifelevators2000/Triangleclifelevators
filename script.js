// script.js - UPDATED with FormSubmit-Compatible Validation
// Fixed: Removes JS form submission handling that conflicts with FormSubmit

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    setFormTrackingData();
    initLoadingScreen();
    initNavigation();
    initDropdowns();
    initProductFilter();
    initScrollAnimations();
    initProgressBars();
    initContactForm();
    initSmoothScrolling();
    initCardAnimations();
    initLoadingMessages();
    initClientLogos();
    initQuotePopup();
}

function setFormTrackingData() {
    const currentUrl = window.location.href;
    const timestamp = new Date().toISOString();
    
    const pageUrlField = document.getElementById('pageUrl');
    const timestampField = document.getElementById('timestamp');
    if (pageUrlField) pageUrlField.value = currentUrl;
    if (timestampField) timestampField.value = timestamp;
    
    const contactPageUrl = document.getElementById('contactPageUrl');
    const contactTimestamp = document.getElementById('contactTimestamp');
    if (contactPageUrl) contactPageUrl.value = currentUrl;
    if (contactTimestamp) contactTimestamp.value = timestamp;
}

// Loading Screen - UNCHANGED
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.querySelector('.progress-fill-loading');
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
                triggerInitialAnimations();
                startLoadingMessages();
                startClientLogosAnimation();
            }, 500);
        }
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }, 100);
}

// ✅ FIXED: Quote Popup - FormSubmit Compatible
function initQuotePopup() {
    const quotePopup = document.getElementById('quotePopup');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const quoteForm = document.getElementById('quoteForm');
    
    const quotePopupBtn = document.getElementById('quotePopupBtn');
    const heroQuoteBtn = document.getElementById('heroQuoteBtn');
    const aboutQuoteBtn = document.getElementById('aboutQuoteBtn');
    const ctaQuoteBtn = document.getElementById('ctaQuoteBtn');
    const productQuoteBtns = document.querySelectorAll('.product-quote-btn');
    
    // ✅ FIXED: Open popup only
    function openQuotePopup() {
        quotePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            document.getElementById('popupName').focus();
        }, 300);
    }
    
    // ✅ FIXED: Close popup only
    function closeQuotePopup() {
        quotePopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Open popup event listeners
    if (quotePopupBtn) quotePopupBtn.addEventListener('click', openQuotePopup);
    if (heroQuoteBtn) heroQuoteBtn.addEventListener('click', openQuotePopup);
    if (aboutQuoteBtn) aboutQuoteBtn.addEventListener('click', openQuotePopup);
    if (ctaQuoteBtn) ctaQuoteBtn.addEventListener('click', openQuotePopup);
    
    productQuoteBtns.forEach(btn => {
        btn.addEventListener('click', openQuotePopup);
    });
    
    // Close popup listeners
    if (popupOverlay) popupOverlay.addEventListener('click', closeQuotePopup);
    if (popupClose) popupClose.addEventListener('click', closeQuotePopup);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && quotePopup.classList.contains('active')) {
            closeQuotePopup();
        }
    });
    
    // ✅ FIXED: REMOVED JS form submission handling
    // Let FormSubmit handle everything
    
    // Phone number formatting only (no submission interference)
    const phoneInput = document.getElementById('popupPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('91')) {
                value = value.substring(2);
            }
            
            if (value.length > 0) {
                value = '+91 ' + value.substring(0, 10);
            }
            
            e.target.value = value;
        });
    }
}

// Navigation - UNCHANGED
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.getElementById('mainHeader');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            if (mainNav) mainNav.classList.toggle('active');
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
                if (mainNav) mainNav.classList.remove('active');
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    });
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            updateActiveNavLink();
        });
    }
    
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav && mainNav.contains(event.target);
        const isClickOnToggle = mobileToggle && mobileToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && mainNav && mainNav.classList.contains('active')) {
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            mainNav.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            if (mainNav) mainNav.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
}

function initDropdowns() {
    const specToggles = document.querySelectorAll('.spec-toggle');
    const featuresToggles = document.querySelectorAll('.features-toggle');
    
    specToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            this.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    featuresToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            this.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

function initProductFilter() {
    const categoryBtns = document.querySelectorAll('.category-filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!categoryBtns.length) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'flex';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'cardAppear 0.6s ease forwards';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href').includes('.html')) return;
        
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const header = document.getElementById('mainHeader');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    const header = document.getElementById('mainHeader');
    const headerHeight = header ? header.offsetHeight : 0;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - headerHeight - 100 &&
            window.scrollY < sectionTop + sectionHeight - headerHeight - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .service-card, .industry-card, .tech-item, .trust-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

function triggerInitialAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
    
    const event = new Event('scroll');
    window.dispatchEvent(event);
}

function initCardAnimations() {
    const cards = document.querySelectorAll('.product-card, .feature-card, .service-card, .industry-card, .trust-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function initProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(progress => {
        const width = progress.getAttribute('data-width');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progress.style.width = width + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(progress);
    });
}

function initLoadingMessages() {
    const messages = [
        { text: "🛗 Preparing a smooth ride for you…", icon: "fas fa-elevator" },
        { text: "🔼 Elevating your experience…", icon: "fas fa-arrow-up" },
        { text: "⚡ Loading smart elevator solutions…", icon: "fas fa-bolt" },
        { text: "🏢 Taking you to the next level…", icon: "fas fa-building" },
        { text: "🛠️ Engineering comfort & safety…", icon: "fas fa-tools" },
        { text: "🚀 Almost there… hold tight!", icon: "fas fa-rocket" },
        { text: "🔐 Safety checks in progress…", icon: "fas fa-shield-alt" },
        { text: "📊 Optimizing performance…", icon: "fas fa-chart-line" },
        { text: "✨ Designing seamless vertical travel…", icon: "fas fa-magic" }
    ];
    
    const messagesTrack = document.getElementById('loadingMessagesTrack');
    
    if (!messagesTrack) return;
    
    const duplicatedMessages = [...messages, ...messages];
    
    duplicatedMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'loading-message';
        messageElement.innerHTML = `
            <i class="${message.icon}"></i>
            <span>${message.text}</span>
        `;
        messagesTrack.appendChild(messageElement);
    });
}

function startLoadingMessages() {
    const messagesTrack = document.getElementById('loadingMessagesTrack');
    if (messagesTrack) {
        messagesTrack.style.animation = 'slideMessages 30s linear infinite';
    }
}

function initClientLogos() {
    const bangaloreCompanies = [
        "Prestige Group", "Brigade Group", "Sobha Limited", "Godrej Properties",
        "DLF Limited", "Mantri Developers", "Salarpuria Sattva", "Total Environment",
        "Puravankara", "Shriram Properties", "RMZ Corp", "Embassy Group",
        "Manyata Tech Park", "Bagmane Tech Park", "K Raheja Corp", "Phoenix Marketcity",
        "L&T Realty", "Tata Housing", "Ashiana Housing", "Vaishnavi Group",
        "Confident Group", "Purvankara", "SNN Raj Corp", "Hiranandani",
        "Kolkata", "Bangalore", "Mysore", "Hubli", "Belagavi", "Mangalore"
    ];
    
    const logosTrack = document.getElementById('clientLogosTrack');
    
    if (!logosTrack) return;
    
    const duplicatedLogos = [...bangaloreCompanies, ...bangaloreCompanies];
    
    duplicatedLogos.forEach(company => {
        const logoElement = document.createElement('div');
        logoElement.className = 'client-logo-item';
        logoElement.innerHTML = `
            <div class="client-logo-icon">
                <i class="fas fa-building"></i>
            </div>
            <div class="client-logo-name">${company}</div>
        `;
        logosTrack.appendChild(logoElement);
    });
}

function startClientLogosAnimation() {
    const logosTrack = document.getElementById('clientLogosTrack');
    if (logosTrack) {
        logosTrack.style.animation = 'slideLogos 40s linear infinite';
    }
}

// ✅ FIXED: Contact Form - FormSubmit Compatible
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // ✅ FIXED: REMOVED JS form submission handling
    // Let FormSubmit handle everything
    
    // Phone number formatting only
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('91')) {
                value = value.substring(2);
            }
            
            if (value.length > 0) {
                value = '+91 ' + value.substring(0, 10);
            }
            
            e.target.value = value;
        });
    }
}
