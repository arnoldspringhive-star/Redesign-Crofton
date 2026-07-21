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
    const mobileLinks   = document.querySelectorAll('.mobile-menu__link');

    // ─── HEADER: TRANSPARENT → SOLID ON SCROLL ──────────
    function updateHeader() {
        const scrollY = window.scrollY;
        const heroBottom = hero ? hero.offsetHeight - 100 : 0;

        if (scrollY > 50) {
            header.classList.add('header--scrolled');
            header.classList.remove('header--hero');
        } else {
            header.classList.remove('header--scrolled');
            header.classList.add('header--hero');
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


    // ─── BOOKING FORM HANDLER ───────────────────────────
    function initBookingForm() {
        const form = document.getElementById('booking-form');
        const successMessage = document.getElementById('booking-success');

        if (!form || !successMessage) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('.booking__form-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = 'Requesting...';

            // Simulate server request delay
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'flex';
            }, 1200);
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


    // ─── INIT ON LOAD ──────────────────────────────────
    updateHeader();
    initSmileSliders();
    initBookingForm();
    initHeroAudio();

    // Small delay for hero reveal elements to feel intentional
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

})();
