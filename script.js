// script.js - Updated with FormSubmit Integration and Fixed Form Validation
// Complete with proper form handling for both Quote and Contact forms

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Set page URLs and timestamps for forms
    setFormTrackingData();
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize dropdowns
    initDropdowns();
    
    // Initialize product filtering
    initProductFilter();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize progress bars
    initProgressBars();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize animations on cards
    initCardAnimations();
    
    // Initialize loading messages
    initLoadingMessages();
    
    // Initialize client logos
    initClientLogos();
    
    // Initialize quote popup
    initQuotePopup();
    
    // Initialize phone number formatting
    initPhoneFormatting();
}

// Set form tracking data
function setFormTrackingData() {
    const currentUrl = window.location.href;
    const timestamp = new Date().toISOString();
    
    // Set for quote popup
    const pageUrlField = document.getElementById('pageUrl');
    const timestampField = document.getElementById('timestamp');
    if (pageUrlField) pageUrlField.value = currentUrl;
    if (timestampField) timestampField.value = timestamp;
    
    // Set for contact form
    const contactPageUrl = document.getElementById('contactPageUrl');
    const contactTimestamp = document.getElementById('contactTimestamp');
    if (contactPageUrl) contactPageUrl.value = currentUrl;
    if (contactTimestamp) contactTimestamp.value = timestamp;
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.querySelector('.progress-fill-loading');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loading screen after progress completes
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                
                // Show main content
                document.body.style.overflow = 'auto';
                
                // Trigger initial animations
                triggerInitialAnimations();
                
                // Start loading messages animation
                startLoadingMessages();
                
                // Start client logos animation
                startClientLogosAnimation();
            }, 500);
        }
        
        // Update progress bar width
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }, 100);
}

// Initialize Quote Popup - FIXED VERSION
function initQuotePopup() {
    const quotePopup = document.getElementById('quotePopup');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const quoteForm = document.getElementById('quoteForm');
    const popupMessageDisplay = document.getElementById('popupMessageDisplay');
    
    // Get all quote buttons
    const quotePopupBtn = document.getElementById('quotePopupBtn');
    const heroQuoteBtn = document.getElementById('heroQuoteBtn');
    const aboutQuoteBtn = document.getElementById('aboutQuoteBtn');
    const ctaQuoteBtn = document.getElementById('ctaQuoteBtn');
    const productQuoteBtns = document.querySelectorAll('.product-quote-btn');
    
    // Open popup function
    function openQuotePopup() {
        quotePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const nameInput = document.getElementById('popupName');
            if (nameInput) nameInput.focus();
        }, 300);
    }
    
    // Close popup function
    function closeQuotePopup() {
        quotePopup.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clear any existing messages
        if (popupMessageDisplay) {
            popupMessageDisplay.textContent = '';
            popupMessageDisplay.className = 'form-message';
            popupMessageDisplay.style.display = 'none';
        }
    }
    
    // Event listeners for opening popup
    if (quotePopupBtn) {
        quotePopupBtn.addEventListener('click', openQuotePopup);
    }
    
    if (heroQuoteBtn) {
        heroQuoteBtn.addEventListener('click', openQuotePopup);
    }
    
    if (aboutQuoteBtn) {
        aboutQuoteBtn.addEventListener('click', openQuotePopup);
    }
    
    if (ctaQuoteBtn) {
        ctaQuoteBtn.addEventListener('click', openQuotePopup);
    }
    
    // Event listeners for product quote buttons
    productQuoteBtns.forEach(btn => {
        btn.addEventListener('click', openQuotePopup);
    });
    
    // Close popup when clicking overlay or close button
    if (popupOverlay) {
        popupOverlay.addEventListener('click', closeQuotePopup);
    }
    
    if (popupClose) {
        popupClose.addEventListener('click', closeQuotePopup);
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && quotePopup.classList.contains('active')) {
            closeQuotePopup();
        }
    });
    
    // Form submission handling - FIXED VERSION
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            // First, check if all required fields are filled
            const requiredFields = quoteForm.querySelectorAll('[required]');
            let allValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allValid = false;
                    // Add visual feedback for empty required field
                    field.style.borderColor = '#d32f2f';
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!allValid) {
                e.preventDefault();
                showPopupMessage('Please fill in all required fields marked with *', 'error');
                return;
            }
            
            // Validate email format if email field exists
            const emailField = document.getElementById('popupEmail');
            if (emailField && emailField.value.trim()) {
                const email = emailField.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    e.preventDefault();
                    showPopupMessage('Please enter a valid email address.', 'error');
                    emailField.style.borderColor = '#d32f2f';
                    setTimeout(() => {
                        emailField.style.borderColor = '';
                    }, 2000);
                    return;
                }
            }
            
            // Validate phone number format - FIXED
            const phoneField = document.getElementById('popupPhone');
            if (phoneField && phoneField.value.trim()) {
                const phone = phoneField.value.trim();
                // Remove all non-digits
                const cleanedPhone = phone.replace(/\D/g, '');
                // Remove country code (91) if present and check for 10 digits
                const digitsOnly = cleanedPhone.replace(/^91/, '');
                if (digitsOnly.length !== 10) {
                    e.preventDefault();
                    showPopupMessage('Please enter a valid 10-digit phone number.', 'error');
                    phoneField.style.borderColor = '#d32f2f';
                    setTimeout(() => {
                        phoneField.style.borderColor = '';
                    }, 2000);
                    return;
                }
            }
            
            // Check consent checkbox
            const consentCheckbox = document.getElementById('popupConsent');
            if (consentCheckbox && !consentCheckbox.checked) {
                e.preventDefault();
                showPopupMessage('Please agree to receive quotes and updates.', 'error');
                return;
            }
            
            // If all validations pass, show loading state
            if (popupMessageDisplay) {
                popupMessageDisplay.textContent = 'Submitting your request... Please wait.';
                popupMessageDisplay.className = 'form-message';
                popupMessageDisplay.style.display = 'block';
                
                // Scroll to message for better visibility
                popupMessageDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Disable submit button to prevent double submission
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            }
            
            // FormSubmit will handle the submission and redirect
            // No need to prevent default if all validations pass
        });
    }
    
    // Show popup message
    function showPopupMessage(text, type) {
        if (!popupMessageDisplay) return;
        
        popupMessageDisplay.textContent = text;
        popupMessageDisplay.className = `form-message ${type}`;
        popupMessageDisplay.style.display = 'block';
        
        // Scroll to message
        popupMessageDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide message after 5 seconds for errors
        if (type === 'error') {
            setTimeout(() => {
                popupMessageDisplay.style.opacity = '0';
                setTimeout(() => {
                    popupMessageDisplay.style.opacity = '1';
                    popupMessageDisplay.style.display = 'none';
                }, 500);
            }, 5000);
        }
    }
    
    // Phone number formatting for popup - FIXED
    const popupPhoneInput = document.getElementById('popupPhone');
    if (popupPhoneInput) {
        // Set default value
        if (!popupPhoneInput.value.trim() || popupPhoneInput.value === '+91 ') {
            popupPhoneInput.value = '+91 ';
        }
        
        popupPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                // If starts with 91, keep it, otherwise add +91
                if (!value.startsWith('91')) {
                    value = '91' + value;
                }
                // Keep only first 12 digits (91 + 10 digits)
                value = value.substring(0, 12);
                // Format with +91 prefix
                const formatted = '+91 ' + value.substring(2);
                e.target.value = formatted;
            } else {
                e.target.value = '+91 ';
            }
        });
        
        // Ensure format on blur
        popupPhoneInput.addEventListener('blur', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0 && !value.startsWith('91')) {
                value = '91' + value;
                value = value.substring(0, 12);
                e.target.value = '+91 ' + value.substring(2);
            }
        });
    }
}

// Navigation
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.getElementById('mainHeader');
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            if (mainNav) mainNav.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Toggle dropdown on mobile
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
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
                if (mainNav) mainNav.classList.remove('active');
                
                // Close all dropdowns
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    });
    
    // Sticky header on scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active nav link based on scroll position
            updateActiveNavLink();
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav && mainNav.contains(event.target);
        const isClickOnToggle = mobileToggle && mobileToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && mainNav && mainNav.classList.contains('active')) {
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            mainNav.classList.remove('active');
            
            // Close all dropdowns
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            if (mainNav) mainNav.classList.remove('active');
            
            // Close all dropdowns
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
}

// Initialize dropdowns
function initDropdowns() {
    const specToggles = document.querySelectorAll('.spec-toggle');
    const featuresToggles = document.querySelectorAll('.features-toggle');
    
    // Specification dropdowns
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
    
    // Features dropdowns
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

// Product filtering
function initProductFilter() {
    const categoryBtns = document.querySelectorAll('.category-filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!categoryBtns.length) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'flex';
                    // Add animation
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

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip external links
        if (anchor.getAttribute('href').includes('.html')) return;
        
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
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

// Update active navigation link based on scroll position
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

// Scroll Animations
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

// Trigger initial animations after loading
function triggerInitialAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
    
    // Trigger scroll animations immediately for elements in viewport
    const event = new Event('scroll');
    window.dispatchEvent(event);
}

// Initialize card animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.product-card, .feature-card, .service-card, .industry-card, .trust-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Progress Bars
function initProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(progress => {
        const width = progress.getAttribute('data-width');
        
        // Animate progress bars when in viewport
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

// Loading Messages
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
    
    // Duplicate messages for seamless animation
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

// Start loading messages animation
function startLoadingMessages() {
    const messagesTrack = document.getElementById('loadingMessagesTrack');
    if (messagesTrack) {
        messagesTrack.style.animation = 'slideMessages 30s linear infinite';
    }
}

// Initialize Client Logos
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
    
    // Duplicate logos for seamless animation
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

// Start client logos animation
function startClientLogosAnimation() {
    const logosTrack = document.getElementById('clientLogosTrack');
    if (logosTrack) {
        logosTrack.style.animation = 'slideLogos 40s linear infinite';
    }
}

// Contact Form - FIXED VERSION
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        // First, check if all required fields are filled
        const requiredFields = contactForm.querySelectorAll('[required]');
        let allValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allValid = false;
                // Add visual feedback for empty required field
                field.style.borderColor = '#d32f2f';
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 2000);
            }
        });
        
        if (!allValid) {
            e.preventDefault();
            showContactFormMessage('Please fill in all required fields marked with *', 'error');
            return;
        }
        
        // Validate email format
        const emailField = document.getElementById('email');
        if (emailField && emailField.value.trim()) {
            const email = emailField.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showContactFormMessage('Please enter a valid email address.', 'error');
                emailField.style.borderColor = '#d32f2f';
                setTimeout(() => {
                    emailField.style.borderColor = '';
                }, 2000);
                return;
            }
        }
        
        // Validate phone number format - FIXED
        const phoneField = document.getElementById('phone');
        if (phoneField && phoneField.value.trim()) {
            const phone = phoneField.value.trim();
            // Remove all non-digits
            const cleanedPhone = phone.replace(/\D/g, '');
            // Remove country code (91) if present and check for 10 digits
            const digitsOnly = cleanedPhone.replace(/^91/, '');
            if (digitsOnly.length !== 10) {
                e.preventDefault();
                showContactFormMessage('Please enter a valid 10-digit phone number.', 'error');
                phoneField.style.borderColor = '#d32f2f';
                setTimeout(() => {
                    phoneField.style.borderColor = '';
                }, 2000);
                return;
            }
        }
        
        // If all validations pass, show loading state
        if (formMessage) {
            formMessage.textContent = 'Sending your message... Please wait.';
            formMessage.className = 'form-message';
            formMessage.style.display = 'block';
            
            // Scroll to message for better visibility
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Disable submit button to prevent double submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
        
        // FormSubmit will handle the submission and redirect
        // No need to prevent default if all validations pass
    });
    
    // Show contact form message
    function showContactFormMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds for errors
        if (type === 'error') {
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.style.opacity = '1';
                    formMessage.style.display = 'none';
                }, 500);
            }, 5000);
        }
    }
}

// Phone number formatting for all phone inputs - FIXED VERSION
function initPhoneFormatting() {
    // Format phone input in contact form
    const contactPhoneInput = document.getElementById('phone');
    if (contactPhoneInput) {
        // Set default value
        if (!contactPhoneInput.value.trim() || contactPhoneInput.value === '+91 ') {
            contactPhoneInput.value = '+91 ';
        }
        
        contactPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                // If starts with 91, keep it, otherwise add +91
                if (!value.startsWith('91')) {
                    value = '91' + value;
                }
                // Keep only first 12 digits (91 + 10 digits)
                value = value.substring(0, 12);
                // Format with +91 prefix
                const formatted = '+91 ' + value.substring(2);
                e.target.value = formatted;
            } else {
                e.target.value = '+91 ';
            }
        });
        
        // Ensure format on blur
        contactPhoneInput.addEventListener('blur', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0 && !value.startsWith('91')) {
                value = '91' + value;
                value = value.substring(0, 12);
                e.target.value = '+91 ' + value.substring(2);
            }
        });
    }
    
    // Format popup phone input (already handled in initQuotePopup, but for safety)
    const popupPhoneInput = document.getElementById('popupPhone');
    if (popupPhoneInput && !popupPhoneInput.hasAttribute('data-formatted')) {
        popupPhoneInput.setAttribute('data-formatted', 'true');
        
        // Set default value
        if (!popupPhoneInput.value.trim() || popupPhoneInput.value === '+91 ') {
            popupPhoneInput.value = '+91 ';
        }
        
        popupPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (!value.startsWith('91')) {
                    value = '91' + value;
                }
                value = value.substring(0, 12);
                const formatted = '+91 ' + value.substring(2);
                e.target.value = formatted;
            } else {
                e.target.value = '+91 ';
            }
        });
    }
    
    // Format any other phone inputs that might exist
    const otherPhoneInputs = document.querySelectorAll('input[type="tel"]:not(#popupPhone):not(#phone):not([data-formatted])');
    otherPhoneInputs.forEach(input => {
        input.setAttribute('data-formatted', 'true');
        
        // Set default value
        if (!input.value.trim() || input.value === '+91 ') {
            input.value = '+91 ';
        }
        
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (!value.startsWith('91')) {
                    value = '91' + value;
                }
                value = value.substring(0, 12);
                const formatted = '+91 ' + value.substring(2);
                e.target.value = formatted;
            } else {
                e.target.value = '+91 ';
            }
        });
    });
}

// Optional: Add a function to check if redirect pages exist (for development)
function checkRedirectPages() {
    // This function can be used to verify that calculator.html and thank-you.html exist
    // You can call it during development to ensure the redirect will work
    console.log('Checking redirect pages...');
    
    fetch('calculator.html')
        .then(response => {
            if (!response.ok) {
                console.warn('⚠️ calculator.html not found. FormSubmit redirect will fail.');
                console.warn('Please create calculator.html in the same directory as index.html');
            } else {
                console.log('✅ calculator.html found and accessible');
            }
        })
        .catch(() => {
            console.warn('⚠️ calculator.html not found. FormSubmit redirect will fail.');
        });
    
    fetch('thank-you.html')
        .then(response => {
            if (!response.ok) {
                console.warn('⚠️ thank-you.html not found. FormSubmit redirect will fail.');
                console.warn('Please create thank-you.html in the same directory as index.html');
            } else {
                console.log('✅ thank-you.html found and accessible');
            }
        })
        .catch(() => {
            console.warn('⚠️ thank-you.html not found. FormSubmit redirect will fail.');
        });
}

// Call this function during development to verify files exist
// Uncomment the line below to check redirect pages on load
// window.addEventListener('load', checkRedirectPages);
