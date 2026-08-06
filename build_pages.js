const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Find the split points
const heroStartIndex = indexHtml.indexOf('<!-- ═══════════════════════════════════════════════════ -->\r\n    <!-- HERO SECTION -->');
if (heroStartIndex === -1) {
    const heroUnix = indexHtml.indexOf('<!-- ═══════════════════════════════════════════════════ -->\n    <!-- HERO SECTION -->');
    if (heroUnix !== -1) {
        heroStartIndex = heroUnix;
    } else {
        console.error("Could not find hero start");
        process.exit(1);
    }
}

let footerStartIndex = indexHtml.indexOf('<!-- ═══════════════════════════════════════════════════ -->\r\n    <!-- FOOTER -->');
if (footerStartIndex === -1) {
    const footerUnix = indexHtml.indexOf('<!-- ═══════════════════════════════════════════════════ -->\n    <!-- FOOTER -->');
    if (footerUnix !== -1) {
        footerStartIndex = footerUnix;
    } else {
        console.error("Could not find footer start");
        process.exit(1);
    }
}

let headerTemplate = indexHtml.substring(0, heroStartIndex);
let footerTemplate = indexHtml.substring(footerStartIndex);

// Helper to replace page titles in header
const createPage = (filename, title, description, content) => {
    let customHeader = headerTemplate
        .replace('<title>Crofton Dental Center | Where Health and Happiness Meet</title>', \`<title>\${title} | Crofton Dental Center</title>\`)
        .replace('<meta name="description" content="Experience luxury dental care at Crofton Dental Center. Personalized, compassionate dentistry in a spa-like environment with advanced technology and expert care.">', \`<meta name="description" content="\${description}">\`);
    
    // Add inner page class to body if needed
    customHeader = customHeader.replace('<body>', '<body class="inner-page">');

    const fullHtml = \`\${customHeader}\n    <main class="main-content">\n\${content}\n    </main>\n\n    \${footerTemplate}\`;
    fs.writeFileSync(filename, fullHtml);
    console.log(\`Created \${filename}\`);
};

// ==========================================
// 1. ABOUT US PAGE
// ==========================================
const aboutContent = \`
    <section class="page-header" data-reveal>
        <div class="container">
            <span class="section-label">Our Philosophy</span>
            <h1 class="page-title">More than dentistry.<br><em>A commitment to care.</em></h1>
        </div>
    </section>

    <section class="about-intro">
        <div class="container">
            <div class="experience__grid">
                <div class="experience__text">
                    <h2 class="experience__heading" data-reveal>Redefining the Dental Experience</h2>
                    <p class="experience__body" data-reveal data-delay="100">
                        At Crofton Dental Center, we believe that exceptional dental care goes beyond clinical excellence. It's about how you feel from the moment you step into our sanctuary. We have purposefully designed an environment that replaces clinical anxiety with spa-like serenity.
                    </p>
                    <p class="experience__body" data-reveal data-delay="200">
                        Our philosophy is deeply rooted in genuine human connection. We take the time to listen, understand your goals, and tailor every treatment to your unique needs. You are never just a patient; you are our guest.
                    </p>
                </div>
                <div class="experience__visual" data-reveal data-delay="200">
                    <img src="assets/crofton_lobby.png" alt="Crofton Dental Center luxury lobby lounge" class="experience__image" style="border-radius: 12px; height: 100%; object-fit: cover;">
                </div>
            </div>
        </div>
    </section>

    <section class="doctor" style="padding-top: 0;">
        <div class="container">
            <div class="doctor__grid">
                <div class="doctor__info">
                    <span class="section-label" data-reveal>Meet the Doctor</span>
                    <h2 class="doctor__name" data-reveal data-delay="100">Dr. Rahat Sood, DMD</h2>
                    <p class="doctor__role" data-reveal data-delay="150">Founder & Lead Dentist</p>
                    
                    <blockquote class="doctor__quote" data-reveal data-delay="200">
                        "Our approach blends dental art with high-tech clinical accuracy. We design treatments that safeguard your health and highlight your confidence."
                    </blockquote>
                    
                    <p class="doctor__bio" data-reveal data-delay="250">
                        Recognized as a leading dental expert, Dr. Sood is featured on CNN, CNBC, and FOX News' Top Doctors Interview series. With a philosophy rooted in patient-centered care, she brings clinical precision and genuine warmth to every visit.
                    </p>
                    <p class="doctor__bio" data-reveal data-delay="300">
                        A graduate of Boston University Goldman School of Dental Medicine, she remains at the forefront of dental innovation, implementing 3D CBCT guided implant surgeries and digital workflows for minimally invasive care.
                    </p>
                    
                    <div class="doctor__credentials-bar" data-reveal data-delay="350">
                        <div class="doctor__stat">
                            <span class="doctor__stat-value">15+</span>
                            <span class="doctor__stat-label">Years Experience</span>
                        </div>
                        <div class="doctor__stat-divider"></div>
                        <div class="doctor__stat">
                            <span class="doctor__stat-value">5,000+</span>
                            <span class="doctor__stat-label">Happy Patients</span>
                        </div>
                        <div class="doctor__stat-divider"></div>
                        <div class="doctor__stat">
                            <span class="doctor__stat-value">4.9★</span>
                            <span class="doctor__stat-label">Patient Rating</span>
                        </div>
                    </div>
                </div>

                <div class="doctor__portrait-wrapper" data-reveal>
                    <div class="doctor__portrait">
                        <img src="assets/dr_sood.png" alt="Dr. Rahat Sood, DMD" class="doctor__image">
                        <div class="doctor__frame"></div>
                    </div>
                    <div class="doctor__badge">
                        <span class="doctor__badge-icon">🏆</span>
                        <div class="doctor__badge-text">
                            <strong>CNN Featured</strong>
                            <span>Top Medical Doctor</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="community section-padding-lg">
        <div class="container">
            <div class="community__header">
                <span class="section-label section-label--center" data-reveal>Community</span>
                <h2 class="community__heading" data-reveal data-delay="100">Beyond the chair, <em>into the community.</em></h2>
                <p class="community__intro" data-reveal data-delay="200">
                    We believe in giving back. From local food drives to SPCA partnerships, our commitment to Crofton extends far beyond dental care.
                </p>
            </div>
            <div class="community__grid">
                <div class="community__card" data-reveal data-delay="200">
                    <div class="community__card-img-wrap">
                        <img src="assets/community_food.png" alt="Community food drive" class="community__card-img">
                    </div>
                    <h3 class="community__card-title">Annual Food Drive</h3>
                    <p class="community__card-desc">Supporting local families through our yearly food collection initiative in partnership with Crofton community organizations.</p>
                </div>
                <div class="community__card" data-reveal data-delay="300">
                    <div class="community__card-img-wrap">
                        <img src="assets/ZOEYS.png" alt="SPCA partnership with Zoey" class="community__card-img">
                    </div>
                    <h3 class="community__card-title">SPCA Partnership</h3>
                    <p class="community__card-desc">Proud supporters of the Anne Arundel County SPCA, because caring for our community includes our four-legged friends too.</p>
                </div>
            </div>
        </div>
    </section>
\`;
createPage('about.html', 'About Us & Meet Dr. Sood', 'Learn about Crofton Dental Center, our luxury approach to dentistry, and meet our leading dentist Dr. Rahat Sood.', aboutContent);

// ==========================================
// 2. SERVICES PAGE
// ==========================================
const servicesContent = \`
    <section class="page-header" data-reveal>
        <div class="container">
            <span class="section-label">Our Services</span>
            <h1 class="page-title">Comprehensive Care,<br><em>Beautifully Delivered.</em></h1>
        </div>
    </section>

    <section class="service-details">
        <div class="container">
            <!-- General & Family -->
            <article id="family" class="service-detail-block" data-reveal>
                <div class="service-detail-block__text">
                    <h2>General & Family Dentistry</h2>
                    <p>Preventive care is the foundation of a lasting, beautiful smile. We provide comprehensive cleanings, advanced screenings, and tailored hygiene plans for patients of all ages. Our gentle approach ensures that children and adults alike feel completely at ease.</p>
                    <ul class="luxury-list">
                        <li>Comprehensive Exams & Cleanings</li>
                        <li>Digital X-Rays & 3D Imaging</li>
                        <li>Oral Cancer Screenings</li>
                        <li>Periodontal (Gum) Therapy</li>
                    </ul>
                    <a href="contact.html" class="btn btn--primary" style="margin-top: 1rem;">Book a Cleaning</a>
                </div>
                <div class="service-detail-block__img">
                    <img src="assets/service_family.png" alt="Family Dentistry">
                </div>
            </article>

            <!-- Cosmetic -->
            <article id="cosmetic" class="service-detail-block service-detail-block--reverse" data-reveal>
                <div class="service-detail-block__text">
                    <h2>Cosmetic Dentistry</h2>
                    <p>Your smile is your signature. Our cosmetic treatments are meticulously designed to enhance your natural beauty while preserving oral health. From subtle brightening to complete smile makeovers, we utilize the highest quality materials for stunning, lifelike results.</p>
                    <ul class="luxury-list">
                        <li>Porcelain Veneers & Lumineers</li>
                        <li>Professional Teeth Whitening</li>
                        <li>Composite Bonding</li>
                        <li>Complete Smile Makeovers</li>
                    </ul>
                    <a href="contact.html" class="btn btn--primary" style="margin-top: 1rem;">Consultation for Cosmetic Care</a>
                </div>
                <div class="service-detail-block__img">
                    <img src="assets/service_cosmetic.png" alt="Cosmetic Dentistry">
                </div>
            </article>

            <!-- Implants -->
            <article id="implants" class="service-detail-block" data-reveal>
                <div class="service-detail-block__text">
                    <h2>Implants & Restorative Care</h2>
                    <p>Restore the function and aesthetics of your smile with state of the art restorative dentistry. We specialize in implant placements using 3D CBCT guided imaging for unparalleled precision, ensuring your new teeth look, feel, and function like natural teeth.</p>
                    <ul class="luxury-list">
                        <li>Dental Implants (Single & Multiple)</li>
                        <li>All-on-4® Implant Supported Dentures</li>
                        <li>Same-Day Dental Crowns</li>
                        <li>Bridges & High-Quality Dentures</li>
                    </ul>
                    <a href="contact.html" class="btn btn--primary" style="margin-top: 1rem;">Explore Implant Options</a>
                </div>
                <div class="service-detail-block__img">
                    <img src="assets/service_implants.png" alt="Dental Implants">
                </div>
            </article>

            <!-- Invisalign -->
            <article id="invisalign" class="service-detail-block service-detail-block--reverse" data-reveal>
                <div class="service-detail-block__text">
                    <h2>Invisalign® Clear Aligners</h2>
                    <p>Achieve a perfectly straight smile discreetly. Invisalign uses customized, virtually invisible aligners to gently shift your teeth into place without the discomfort and appearance of traditional metal braces. Fast, comfortable, and tailored to your lifestyle.</p>
                    <a href="contact.html" class="btn btn--primary" style="margin-top: 1rem;">Book Invisalign Consultation</a>
                </div>
                <div class="service-detail-block__img">
                    <img src="assets/service_invisalign.png" alt="Invisalign">
                </div>
            </article>
            
            <!-- Sedation -->
            <article id="sedation" class="service-detail-block" data-reveal>
                <div class="service-detail-block__text">
                    <h2>Sedation Dentistry</h2>
                    <p>Dental anxiety is real, but it shouldn't prevent you from achieving optimal health. Our luxury practice offers various levels of sedation, from calming laughing gas to conscious sedation, allowing you to relax completely or even sleep through your treatment.</p>
                    <a href="contact.html" class="btn btn--primary" style="margin-top: 1rem;">Learn About Sedation</a>
                </div>
                <div class="service-detail-block__img">
                    <img src="assets/service_sedation.png" alt="Sedation Dentistry">
                </div>
            </article>
            
            <!-- Emergency -->
            <article id="emergency" class="service-detail-block service-detail-block--reverse" data-reveal>
                <div class="service-detail-block__text">
                    <h2>Emergency Dental Care</h2>
                    <p>Dental emergencies happen unexpectedly. We prioritize your comfort and health by offering same-day emergency appointments for severe pain, broken teeth, lost crowns, or trauma. We are here to relieve your pain immediately.</p>
                    <a href="tel:+13012613800" class="btn btn--ghost" style="margin-top: 1rem; color: var(--color-error); border-color: var(--color-error);">Call For Emergency: (301) 261-3800</a>
                </div>
                <div class="service-detail-block__img">
                    <img src="assets/service_emergency.png" alt="Emergency Dentistry">
                </div>
            </article>
        </div>
    </section>
\`;
createPage('services.html', 'Dental Services & Treatments', 'Explore our comprehensive luxury dental services including cosmetic, family, restorative, implants, and sedation dentistry.', servicesContent);

// ==========================================
// 3. WHY CHOOSE US
// ==========================================
const whyContent = \`
    <section class="page-header" data-reveal>
        <div class="container">
            <span class="section-label">Why Choose Us</span>
            <h1 class="page-title">The Crofton<br><em>Difference.</em></h1>
        </div>
    </section>

    <section class="difference" style="padding-top: 0;">
        <div class="container">
            <div class="difference__grid">
                <article class="pillar" data-reveal data-delay="100">
                    <span class="pillar__number">01</span>
                    <h3 class="pillar__title">Advanced<br>Technology</h3>
                    <p class="pillar__desc">3D CBCT imaging, digital impressions, and laser-assisted procedures for precision outcomes and faster recovery.</p>
                    <div class="pillar__line"></div>
                </article>
                <article class="pillar" data-reveal data-delay="200">
                    <span class="pillar__number">02</span>
                    <h3 class="pillar__title">Personalized<br>Care</h3>
                    <p class="pillar__desc">Every treatment plan is tailored to your unique needs, goals, and comfort — never a one-size-fits-all approach.</p>
                    <div class="pillar__line"></div>
                </article>
                <article class="pillar" data-reveal data-delay="300">
                    <span class="pillar__number">03</span>
                    <h3 class="pillar__title">Luxury<br>Environment</h3>
                    <p class="pillar__desc">Spa-like treatment rooms, calming aromatherapy, warm blankets, and noise-canceling headphones for ultimate comfort.</p>
                    <div class="pillar__line"></div>
                </article>
                <article class="pillar" data-reveal data-delay="400">
                    <span class="pillar__number">04</span>
                    <h3 class="pillar__title">Expert<br>Team</h3>
                    <p class="pillar__desc">A devoted team with decades of experience, committed to your wellbeing and delivering results that exceed expectations.</p>
                    <div class="pillar__line"></div>
                </article>
            </div>
        </div>
    </section>

    <section class="cinematic-break" data-parallax>
        <img src="assets/hero_apple.png" alt="Modern dental technology in a serene environment" class="cinematic-break__img">
        <div class="cinematic-break__overlay"></div>
        <div class="cinematic-break__content" data-reveal>
            <blockquote class="cinematic-break__quote">
                "We don't just treat teeth — we care for people."
            </blockquote>
        </div>
    </section>

    <section class="technology">
        <div class="container">
            <div class="technology__grid">
                <div class="technology__visual" data-reveal>
                    <div class="technology__image-wrapper">
                        <img src="assets/tech_cbct.png" alt="3D CBCT Scanner machine" class="technology__image">
                    </div>
                </div>
                
                <div class="technology__content">
                    <span class="section-label" data-reveal>Innovation</span>
                    <h2 class="technology__heading" data-reveal data-delay="100">Precision meets<br><em>compassion.</em></h2>
                    <p class="technology__body" data-reveal data-delay="200">
                        Our diagnostics aren't about clinical gadgets. They are chosen to ensure your absolute comfort, faster recovery, and precise outcomes.
                    </p>
                    
                    <div class="tech-menu" data-reveal data-delay="300">
                        <div class="tech-menu__item">
                            <span class="tech-menu__num">01</span>
                            <div class="tech-menu__details">
                                <h3 class="tech-menu__title">3D CBCT Guided Imaging</h3>
                                <p class="tech-menu__desc">High-resolution 3D virtual scans for guided implant surgery and diagnostics, utilizing minimal radiation.</p>
                            </div>
                        </div>
                        <div class="tech-menu__item">
                            <span class="tech-menu__num">02</span>
                            <div class="tech-menu__details">
                                <h3 class="tech-menu__title">Digital Intraoral Impressions</h3>
                                <p class="tech-menu__desc">Ditch the messy putty. Our color intraoral scanners capture virtual dental models in seconds.</p>
                            </div>
                        </div>
                        <div class="tech-menu__item">
                            <span class="tech-menu__num">03</span>
                            <div class="tech-menu__details">
                                <h3 class="tech-menu__title">Laser-Assisted Treatments</h3>
                                <p class="tech-menu__desc">Targeted lasers for gentler tissue therapy, minimal bleeding, and significantly accelerated healing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
\`;
createPage('why-choose-us.html', 'Why Choose Us | The Difference', 'Discover the advanced technology, personalized care, and luxury environment that sets Crofton Dental Center apart.', whyContent);

// ==========================================
// 4. NEW PATIENT & FAQ
// ==========================================
const newPatientContent = \`
    <section class="page-header" data-reveal>
        <div class="container">
            <span class="section-label">Patient Guide</span>
            <h1 class="page-title">Welcome to<br><em>our practice.</em></h1>
        </div>
    </section>

    <section class="patient-guide">
        <div class="container">
            <div class="patient-guide__grid">
                <div class="patient-guide__content" data-reveal>
                    <h2>What to Expect on Your First Visit</h2>
                    <p>Your first visit to Crofton Dental Center is designed to be a comprehensive and relaxing introduction to our luxury standard of care. Here is what you can expect:</p>
                    <ol class="luxury-list luxury-list--ordered">
                        <li><strong>A Warm Welcome:</strong> Enjoy a beverage in our serene lobby while we assist you with any final paperwork.</li>
                        <li><strong>Comprehensive Discovery:</strong> We conduct a thorough exam including 3D imaging, digital scans, and an oral cancer screening.</li>
                        <li><strong>Consultation:</strong> Dr. Sood will sit down with you to discuss your scans, listen to your goals, and craft a bespoke treatment plan.</li>
                        <li><strong>Hygiene Care:</strong> If scheduled, you will receive a gentle, meticulous cleaning by our expert hygienists.</li>
                    </ol>
                    <h3 style="margin-top: 3rem; font-family: var(--font-serif); font-size: 2rem;">Insurance & Financing</h3>
                    <p>We believe luxury care should be accessible. We accept most major PPO insurance plans and will complimentary file claims on your behalf to maximize your benefits. We also offer flexible financing options through CareCredit® and LendingClub.</p>
                </div>
                
                <div class="patient-guide__sidebar" data-reveal data-delay="200">
                    <div class="sidebar-box">
                        <h3>New Patient Forms</h3>
                        <p>Save time by securely filling out your patient forms online before your visit.</p>
                        <a href="#" class="btn btn--primary" style="width: 100%; text-align: center;">Complete Forms Online</a>
                    </div>
                    <div class="sidebar-box sidebar-box--dark">
                        <h3>Schedule Your Visit</h3>
                        <p>Ready to experience dentistry elevated?</p>
                        <a href="contact.html" class="btn btn--primary btn--light" style="width: 100%; text-align: center;">Book Now</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="faq-section section-padding-lg" style="background-color: var(--color-bg-alt);">
        <div class="container">
            <span class="section-label section-label--center" data-reveal>Questions?</span>
            <h2 class="section-heading text-center" data-reveal data-delay="100">Frequently Asked Questions</h2>
            
            <div class="faq-container" data-reveal data-delay="200">
                <div class="faq-item">
                    <button class="faq-question">Are you accepting new patients? <span class="faq-icon">+</span></button>
                    <div class="faq-answer">
                        <p>Yes, we are currently welcoming new patients to our dental family. We look forward to meeting you and helping you achieve your oral health goals.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">Do you offer sedation for anxious patients? <span class="faq-icon">+</span></button>
                    <div class="faq-answer">
                        <p>Absolutely. We understand dental anxiety is very common. We offer multiple forms of sedation, from nitrous oxide (laughing gas) to conscious oral sedation, ensuring you are completely comfortable and relaxed during your visit.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">What insurance do you accept? <span class="faq-icon">+</span></button>
                    <div class="faq-answer">
                        <p>We are an in-network provider for several major PPO dental plans and will gladly submit claims to out-of-network plans to help you maximize your benefits. Please call our office with your insurance details for specific verification.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">What should I do in a dental emergency? <span class="faq-icon">+</span></button>
                    <div class="faq-answer">
                        <p>If you are experiencing severe pain, swelling, or trauma to your teeth, please call our office immediately at (301) 261-3800. We reserve time in our schedule every day for emergency care.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
\`;
createPage('new-patient.html', 'New Patients & FAQ', 'Information for new patients at Crofton Dental Center, including what to expect, insurance details, and FAQs.', newPatientContent);

// ==========================================
// 5. TESTIMONIALS
// ==========================================
const testimonialsContent = \`
    <section class="page-header" data-reveal>
        <div class="container">
            <span class="section-label">Results & Stories</span>
            <h1 class="page-title">Transformations that<br><em>speak for themselves.</em></h1>
        </div>
    </section>

    <!-- Smile Gallery from original index -->
    <section class="gallery" style="padding-top: 0;">
        <div class="container">
            <div class="gallery__grid">
                <div class="gallery__item" data-reveal data-delay="100">
                    <div class="gallery__compare slider-compare">
                        <div class="gallery__after">
                            <img src="assets/gallery_after_1.png" alt="After treatment" class="gallery__img">
                            <span class="gallery__label gallery__label--after">After</span>
                        </div>
                        <div class="gallery__before">
                            <img src="assets/gallery_before_1.png" alt="Before treatment" class="gallery__img">
                            <span class="gallery__label">Before</span>
                        </div>
                        <div class="gallery__slider-handle">
                            <div class="gallery__slider-line"></div>
                            <div class="gallery__slider-arrows">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                        </div>
                        <input type="range" min="0" max="100" value="50" class="gallery__slider-input" aria-label="Before and after slider">
                    </div>
                    <p class="gallery__caption">Complete Smile Makeover — Porcelain Veneers</p>
                </div>
                <div class="gallery__item" data-reveal data-delay="200">
                    <div class="gallery__compare slider-compare">
                        <div class="gallery__after">
                            <img src="assets/gallery_after_2.png" alt="After treatment" class="gallery__img">
                            <span class="gallery__label gallery__label--after">After</span>
                        </div>
                        <div class="gallery__before">
                            <img src="assets/gallery_before_2.png" alt="Before treatment" class="gallery__img">
                            <span class="gallery__label">Before</span>
                        </div>
                        <div class="gallery__slider-handle">
                            <div class="gallery__slider-line"></div>
                            <div class="gallery__slider-arrows">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                        </div>
                        <input type="range" min="0" max="100" value="50" class="gallery__slider-input" aria-label="Before and after slider">
                    </div>
                    <p class="gallery__caption">Full Restoration — Implants & Crown Work</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials List -->
    <section class="testimonials-page section-padding-lg" style="background-color: var(--color-bg-alt);">
        <div class="container">
            <span class="section-label section-label--center" data-reveal>Patient Stories</span>
            <h2 class="section-heading text-center" data-reveal data-delay="100">Words from those <em>who trust us most.</em></h2>
            
            <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
                <div class="testimonial-card" data-reveal data-delay="100">
                    <div class="testimonial-card__stars">★★★★★</div>
                    <blockquote class="testimonial-card__quote">
                        "I've never felt more comfortable at a dentist. The entire team goes above and beyond to make sure you feel relaxed and cared for. The results speak for themselves — my smile has never looked better."
                    </blockquote>
                    <div class="testimonial-card__author">
                        <span class="testimonial-card__name">Sarah M.</span>
                        <span class="testimonial-card__detail">Cosmetic Patient</span>
                    </div>
                </div>
                <div class="testimonial-card" data-reveal data-delay="200">
                    <div class="testimonial-card__stars">★★★★★</div>
                    <blockquote class="testimonial-card__quote">
                        "Dr. Sood and her team are exceptional. They combine state of the art technology with genuine compassion. Every visit feels like a personalized experience, not just an appointment."
                    </blockquote>
                    <div class="testimonial-card__author">
                        <span class="testimonial-card__name">Michael R.</span>
                        <span class="testimonial-card__detail">Family Patient</span>
                    </div>
                </div>
                <div class="testimonial-card" data-reveal data-delay="300">
                    <div class="testimonial-card__stars">★★★★★</div>
                    <blockquote class="testimonial-card__quote">
                        "As someone who used to dread dental visits, Crofton Dental Center completely changed my perspective. The sedation options, the warm blankets, the calming environment — it's truly a different experience."
                    </blockquote>
                    <div class="testimonial-card__author">
                        <span class="testimonial-card__name">Jennifer L.</span>
                        <span class="testimonial-card__detail">Sedation Dentistry Patient</span>
                    </div>
                </div>
                <div class="testimonial-card" data-reveal data-delay="400">
                    <div class="testimonial-card__stars">★★★★★</div>
                    <blockquote class="testimonial-card__quote">
                        "The level of detail and care put into my implant procedure was incredible. They explained everything clearly and the recovery was much faster than I anticipated. Highly recommend."
                    </blockquote>
                    <div class="testimonial-card__author">
                        <span class="testimonial-card__name">David C.</span>
                        <span class="testimonial-card__detail">Implant Patient</span>
                    </div>
                </div>
            </div>
            
            <div class="text-center" style="margin-top: 4rem;" data-reveal>
                <a href="#" target="_blank" rel="noopener" class="btn btn--ghost">Read more reviews on Google</a>
            </div>
        </div>
    </section>
\`;
createPage('testimonials.html', 'Smile Gallery & Patient Testimonials', 'View before and after smile transformations and read reviews from actual patients of Crofton Dental Center.', testimonialsContent);

// ==========================================
// 6. CONTACT US
// ==========================================
const contactContent = \`
    <section class="page-header" data-reveal>
        <div class="container">
            <span class="section-label">Contact Us</span>
            <h1 class="page-title">We look forward to<br><em>hearing from you.</em></h1>
        </div>
    </section>

    <section class="booking" style="padding-top: 0;">
        <div class="container">
            <div class="booking__inner" data-reveal>
                <div class="booking__content">
                    <span class="section-label">Book a Visit</span>
                    <h2 class="booking__heading">Schedule Your <em>Luxury Care.</em></h2>
                    <p class="booking__text">
                        Fill out the form below to request an appointment. Our team will contact you shortly to confirm the details.
                    </p>
                    
                    <form id="contact-booking-form" action="https://formspree.io/f/your-email@example.com" method="POST" class="booking__form">
                        <div class="booking__form-grid">
                            <div class="booking__form-group">
                                <label for="book-name" class="booking__form-label">Full Name</label>
                                <input type="text" name="name" id="book-name" class="booking__form-input" required placeholder="Alexander Mercer">
                            </div>
                            <div class="booking__form-group">
                                <label for="book-phone" class="booking__form-label">Phone Number</label>
                                <input type="tel" name="phone" id="book-phone" class="booking__form-input" required placeholder="(301) 261-3800">
                            </div>
                            <div class="booking__form-group">
                                <label for="book-email" class="booking__form-label">Email Address</label>
                                <input type="email" name="email" id="book-email" class="booking__form-input" required placeholder="alex@resortwellness.com">
                            </div>
                            <div class="booking__form-group">
                                <label for="book-service" class="booking__form-label">Desired Care</label>
                                <div class="booking__form-select-wrapper">
                                    <select name="service" id="book-service" class="booking__form-input booking__form-select" required>
                                        <option value="" disabled selected>Select service</option>
                                        <option value="New Patient Exam">New Patient Exam</option>
                                        <option value="Cosmetic Consultation">Cosmetic Consultation</option>
                                        <option value="Invisalign">Invisalign Clear Aligners</option>
                                        <option value="Dental Implants">Dental Implants</option>
                                        <option value="General & Family">General & Family Dentistry</option>
                                        <option value="Emergency">Emergency</option>
                                    </select>
                                </div>
                            </div>
                            <div class="booking__form-group" style="grid-column: 1 / -1;">
                                <label for="book-message" class="booking__form-label">Message / Details</label>
                                <textarea name="message" id="book-message" class="booking__form-input" rows="4" placeholder="Any specific concerns or preferred appointment times?"></textarea>
                            </div>
                        </div>
                        <div class="booking__form-submit-row" style="margin-top: 2rem;">
                            <button type="submit" class="btn btn--primary booking__form-submit">
                                Send Request
                                <svg class="btn__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </button>
                        </div>
                    </form>
                    <div id="contact-booking-success" class="booking__success-message" style="display: none;">
                        <svg class="booking__success-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
                        <div>
                            <h4>Request Received</h4>
                            <p>Thank you. Our luxury care concierge will reach out within 24 hours to confirm your suite availability.</p>
                        </div>
                    </div>
                </div>
                
                <div class="booking__details" data-reveal data-delay="200">
                    <div class="booking__detail">
                        <h4 class="booking__detail-title">Location</h4>
                        <p class="booking__detail-text">1661 Crofton Blvd, Suite 1A<br>Crofton, MD 21114</p>
                    </div>
                    <div class="booking__detail">
                        <h4 class="booking__detail-title">Hours</h4>
                        <p class="booking__detail-text">
                            Monday – Thursday: 8am – 5pm<br>
                            Friday: 8am – 2pm<br>
                            Saturday – Sunday: Closed
                        </p>
                    </div>
                    <div class="booking__detail">
                        <h4 class="booking__detail-title">Contact</h4>
                        <p class="booking__detail-text">
                            Phone: <a href="tel:+13012613800">(301) 261-3800</a><br>
                            Email: <a href="mailto:info@croftondentalcenter.com">info@croftondentalcenter.com</a>
                        </p>
                    </div>
                    
                    <div class="map-container" style="margin-top: 2rem; border-radius: 12px; overflow: hidden; height: 250px; background: #e0e0e0;">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.4018260782755!2d-76.6853246235191!3d39.00620207170138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7eb93cc7cbe49%3A0xc3b1e3dd2d0b5ed6!2s1661%20Crofton%20Blvd%2C%20Crofton%2C%20MD%2021114!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
\`;
createPage('contact.html', 'Contact Us & Book Appointment', 'Contact Crofton Dental Center today to schedule your luxury dental experience. View our location, hours, and booking form.', contactContent);

console.log("Multipage generation complete.");


