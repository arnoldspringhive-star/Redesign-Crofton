/* ═══════════════════════════════════════════════════════════════
   CROFTON DENTAL CENTER — INDEX 3 INTERACTIONS
   Scroll Reveal · Header Logic · Parallax · Mobile Menu
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── DOM CACHE ──────────────────────────────────────
    const header        = document.getElementById('main-header');
    const menuToggle    = document.getElementById('menu-toggle');
    const mobileMenu    = document.getElementById('mobile-menu');
    const hero          = document.getElementById('hero');
    const revealEls     = document.querySelectorAll('[data-reveal]');
    const parallaxSections = document.querySelectorAll('[data-parallax]');
    const mobileLinks   = document.querySelectorAll('.mobile-menu__link, .mobile-menu__dropdown-link');

    // ─── HEADER: TRANSPARENT → SOLID ON SCROLL ──────────
    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('header--scrolled');
            if (hero) header.classList.remove('header--hero');
        } else {
            header.classList.remove('header--scrolled');
            if (hero) header.classList.add('header--hero');
        }
    }

    // ─── MOBILE MENU TOGGLE ────────────────────────────
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('active');

        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
        menuToggle.setAttribute('aria-expanded', !isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });


    // ─── INTERSECTION OBSERVER: REVEAL ANIMATIONS ──────
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.delay || 0, 10);
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        }
    );

    revealEls.forEach(el => revealObserver.observe(el));


    // ─── PARALLAX: SUBTLE SCROLL EFFECT ON IMAGES ──────
    function updateParallax() {
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewH = window.innerHeight;

            if (rect.top < viewH && rect.bottom > 0) {
                const progress = (viewH - rect.top) / (viewH + rect.height);
                const offset = (progress - 0.5) * 60; // ±30px range
                const img = section.querySelector('.cinematic-break__img');
                if (img) {
                    img.style.transform = `translateY(${offset}px) scale(1.05)`;
                }
            }
        });
    }


    // ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ─── THROTTLED SCROLL HANDLER ──────────────────────
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });


    // ─── BEFORE/AFTER GALLERY SLIDER ────────────────────
    function initSmileSliders() {
        const sliderCompares = document.querySelectorAll('.slider-compare');
        sliderCompares.forEach(container => {
            const input = container.querySelector('.gallery__slider-input');
            const before = container.querySelector('.gallery__before');
            const handle = container.querySelector('.gallery__slider-handle');

            if (!input || !before || !handle) return;

            // Set initial state
            before.style.clipPath = `polygon(0 0, 50% 0, 50% 100%, 0 100%)`;
            handle.style.left = `50%`;

            // Listen for input slider changes
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                before.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
                handle.style.left = `${value}%`;
            });
        });
    }


    // ─── REAL FORM SUBMISSION HANDLER (INSTRUCTION #9) ───
    function initBookingForm() {
        const forms = document.querySelectorAll('form[action*="formsubmit.co"]');
        if (!forms.length) return;

        forms.forEach(form => {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();

                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.75';
                    submitBtn.innerHTML = 'Sending securely...';
                }

                const prevAlert = form.parentNode.querySelector('.form-submission-alert');
                if (prevAlert) prevAlert.remove();

                const formData = new FormData(form);
                let endpoint = form.getAttribute('action') || 'https://formsubmit.co/info@croftondentalcenter.com';
                if (!endpoint.includes('/ajax/')) {
                    endpoint = endpoint.replace('formsubmit.co/', 'formsubmit.co/ajax/');
                }

                try {
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        form.reset();
                        const existingSuccess = form.parentNode.querySelector('.booking__success-message');
                        if (existingSuccess) {
                            form.style.display = 'none';
                            existingSuccess.style.display = 'flex';
                        } else {
                            const successDiv = document.createElement('div');
                            successDiv.className = 'form-submission-alert form-submission-alert--success';
                            successDiv.innerHTML = `<h4>Request Submitted Successfully!</h4><p>Thank you for reaching out to Crofton Dental Center. Our team has received your submission and will get in touch with you shortly.</p>`;
                            form.parentNode.insertBefore(successDiv, form.nextSibling);
                            form.style.display = 'none';
                        }
                    } else {
                        throw new Error('Form submission failed with status ' + response.status);
                    }
                } catch (err) {
                    console.error('Submission error:', err);
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'form-submission-alert form-submission-alert--error';
                    errorDiv.innerHTML = `<h4>Unable to Send Submission</h4><p>We encountered a connection issue. Please give our office a call at <a href="tel:+13012613800" style="text-decoration:underline; font-weight:600;">(301) 261-3800</a> so we can assist you directly.</p>`;
                    form.parentNode.insertBefore(errorDiv, form);
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.innerHTML = originalBtnHtml;
                    }
                }
            });
        });
    }


    // ─── HERO VIDEO SOUND TOGGLE ────────────────────────
    function initHeroAudio() {
        const heroVideo = document.querySelector('.hero__bg-video');
        const soundToggle = document.getElementById('hero-sound-toggle');
        if (!heroVideo || !soundToggle) return;

        const iconMuted = soundToggle.querySelector('.sound-icon--muted');
        const iconUnmuted = soundToggle.querySelector('.sound-icon--unmuted');
        const soundText = soundToggle.querySelector('.hero__sound-text');

        function updateAudioState() {
            if (heroVideo.muted) {
                if (iconMuted) iconMuted.style.display = 'block';
                if (iconUnmuted) iconUnmuted.style.display = 'none';
                if (soundText) soundText.textContent = 'Enable Sound';
                soundToggle.classList.remove('is-active');
            } else {
                if (iconMuted) iconMuted.style.display = 'none';
                if (iconUnmuted) iconUnmuted.style.display = 'block';
                if (soundText) soundText.textContent = 'Mute Sound';
                soundToggle.classList.add('is-active');
            }
        }

        soundToggle.addEventListener('click', () => {
            heroVideo.muted = !heroVideo.muted;
            if (!heroVideo.muted) {
                heroVideo.play().catch(e => console.log('Autoplay audio play error:', e));
            }
            updateAudioState();
        });
    }

    // ──────────────────────────────────────────
    // FAQ Accordion
    // ──────────────────────────────────────────
    function initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.closest('.faq-item');
                const answer = item.querySelector('.faq-answer');
                
                // Close currently active items (optional - makes it an accordion)
                const currentlyActive = document.querySelector('.faq-item.active');
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                    currentlyActive.querySelector('.faq-answer').style.maxHeight = null;
                }
                
                // Toggle current item
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = null;
                }
            });
        });
    }

    /* =========================================
       Image Lightbox
    ========================================= */
    function initLightbox() {
        const lightbox = document.getElementById('image-lightbox');
        if (!lightbox) return;

        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox__close');
        const galleryImages = document.querySelectorAll('.community__flyer-img');

        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.classList.add('lightbox--active');
                lightboxImg.src = img.src;
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('lightbox--active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('lightbox--active');
            }
        });
    }

    // ──────────────────────────────────────────
    // INIT ON LOAD
    // ──────────────────────────────────────────
    updateHeader();
    initSmileSliders();
    initBookingForm();
    initHeroAudio();
    initFAQ();
    initLightbox();

    // Small delay for hero reveal elements to feel intentional
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

})();



    // â”€â”€â”€ MOBILE MENU ACCORDION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const accordionBtn = document.querySelector('.mobile-menu__accordion-btn');
    const accordionDropdown = document.querySelector('.mobile-menu__dropdown');
    
    if (accordionBtn) {
        accordionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
