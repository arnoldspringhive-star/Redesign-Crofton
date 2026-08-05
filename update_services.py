import re

html_file = "services.html"
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

services_html = '''        <section class="service-details">
            <div class="container">
                <!-- Family Dentistry -->
                <article id="family" class="service-detail-block" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>General & Family Dentistry</h2>
                        <p>Preventive and routine care is the absolute foundation of a lasting, beautiful smile. We provide comprehensive professional cleanings, advanced digital screenings, and tailored hygiene plans for patients of every age. From your child's very first visit to maintaining a grandparent's smile, our gentle, compassionate approach ensures that every member of your family feels completely at ease in our luxury environment.</p>
                        <a href="family-dentistry.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/service_family.png" alt="Family Dentistry">
                    </div>
                </article>

                <!-- Cosmetic Dentistry -->
                <article id="cosmetic" class="service-detail-block service-detail-block--reverse" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Cosmetic Dentistry</h2>
                        <p>Your smile is your signature, and we treat it as a work of fine art. Our premium cosmetic treatments are meticulously designed to enhance your natural beauty while preserving your underlying oral health. From subtle, professional brightening to complete, life-changing smile makeovers using porcelain veneers, we utilize only the highest quality materials and digital precision to deliver stunning, lifelike, and long-lasting results.</p>
                        <a href="cosmetic-dentistry.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/service_cosmetic.png" alt="Cosmetic Dentistry">
                    </div>
                </article>

                <!-- Dental Implants -->
                <article id="implants" class="service-detail-block" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Dental Implants</h2>
                        <p>Restore both the flawless function and the seamless aesthetics of your smile with our state of the art restorative dentistry. We specialize in complex restorative cases and dental implant placements, utilizing advanced 3D CBCT guided imaging for unparalleled precision and safety. Whether you need a single same-day crown or a full-arch restoration, we ensure your new teeth look, feel, and function exactly like your natural teeth.</p>
                        <a href="dental-implants.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/service_implants.png" alt="Dental Implants">
                    </div>
                </article>

                <!-- Teeth Whitening -->
                <article id="whitening" class="service-detail-block service-detail-block--reverse" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Teeth Whitening</h2>
                        <p>Brighten your smile dramatically with our professional, clinical-strength teeth whitening treatments. We offer both rapid in-office whitening for immediate, stunning results and custom take-home trays so you can comfortably whiten your teeth on your own schedule. Say goodbye to coffee, tea, and wine stains and unveil a brilliant, youthful smile.</p>
                        <a href="teeth-whitening.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/hero_gallery.png" alt="Teeth Whitening">
                    </div>
                </article>

                <!-- Invisalign -->
                <article id="invisalign" class="service-detail-block" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Invisalign® Clear Aligners</h2>
                        <p>Achieve a perfectly straight, beautifully aligned smile discreetly with Invisalign therapy. Rather than using traditional metal brackets and wires, Invisalign uses a series of customized, virtually invisible clear aligners to gently and predictably shift your teeth into their ideal position. It is a fast, highly comfortable treatment tailored perfectly to fit your active lifestyle without any dietary restrictions.</p>
                        <a href="invisalign.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/service_invisalign.png" alt="Invisalign">
                    </div>
                </article>

                <!-- Crowns -->
                <article id="crowns" class="service-detail-block service-detail-block--reverse" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Dental Crowns</h2>
                        <p>Restore the strength, function, and beauty of damaged teeth with our custom-crafted porcelain dental crowns. Using advanced digital impressions and high-quality materials, we create crowns that blend seamlessly with your natural smile, providing long-lasting protection and a flawless appearance.</p>
                        <a href="dental-crowns.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/hero_technology.png" alt="Dental Crowns">
                    </div>
                </article>

                <!-- Bridges -->
                <article id="bridges" class="service-detail-block" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Dental Bridges</h2>
                        <p>Bridge the gap in your smile and restore your ability to chew and speak with confidence. Our expertly designed dental bridges offer a stable, highly aesthetic solution for replacing one or more missing teeth, preventing adjacent teeth from shifting and maintaining your natural facial contours.</p>
                        <a href="dental-bridges.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/hero_apple.png" alt="Dental Bridges">
                    </div>
                </article>

                <!-- Dentures -->
                <article id="dentures" class="service-detail-block service-detail-block--reverse" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Dentures & Partials</h2>
                        <p>Experience a complete, fully functional smile with our modern, exceptionally comfortable dentures. Whether you need partial dentures to replace a few missing teeth or a full set for total restoration, our custom-fitted prosthetics are designed to look naturally beautiful and feel completely secure.</p>
                        <a href="dentures.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/crofton_lobby.png" alt="Dentures">
                    </div>
                </article>

                <!-- Root Canal -->
                <article id="root-canal" class="service-detail-block" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Root Canal Therapy</h2>
                        <p>Save your natural tooth and eliminate severe pain with our gentle, highly effective root canal therapy. Utilizing the latest technology and advanced anesthetics, we ensure your procedure is as comfortable and stress-free as a routine filling, preserving your smile's health and integrity.</p>
                        <a href="root-canal.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/hero_team.png" alt="Root Canal Therapy">
                    </div>
                </article>

                <!-- Emergency Dentistry -->
                <article id="emergency" class="service-detail-block service-detail-block--reverse" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Emergency Dental Care</h2>
                        <p>We know that dental emergencies happen unexpectedly and can be incredibly stressful. We prioritize your comfort and health above all else by offering prompt, same-day emergency appointments for severe pain, broken teeth, lost crowns, or sudden trauma. Do not wait in pain; our compassionate team is here to relieve your discomfort immediately.</p>
                        <a href="emergency-dentistry.html" class="btn btn--error" style="margin-top: 1rem;">Emergency Services Info</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/service_emergency.png" alt="Emergency Dentistry">
                    </div>
                </article>

                <!-- Children's Dentistry -->
                <article id="children" class="service-detail-block" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Children\'s Dentistry</h2>
                        <p>Establish a lifetime of excellent oral health for your child in a warm, welcoming, and fun environment. Our gentle pediatric services focus on education, prevention, and building positive dental experiences from their very first tooth, ensuring they look forward to every visit.</p>
                        <a href="childrens-dentistry.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/hero_experience.png" alt="Children's Dentistry">
                    </div>
                </article>

                <!-- Preventive Dentistry -->
                <article id="preventive" class="service-detail-block service-detail-block--reverse" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Preventive Dentistry</h2>
                        <p>Stop dental issues before they ever begin. Our proactive preventive care includes comprehensive exams, professional cleanings, oral cancer screenings, and specialized treatments designed to fortify your teeth and gums, ensuring your smile remains radiantly healthy for years to come.</p>
                        <a href="preventive-dentistry.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/dr_sood.png" alt="Preventive Dentistry">
                    </div>
                </article>

                <!-- Botox Therapeutics -->
                <article id="botox" class="service-detail-block" data-reveal>
                    <div class="service-detail-block__text">
                        <h2>Botox Therapeutics</h2>
                        <p>Experience the therapeutic and aesthetic benefits of Botox at Crofton Dental Center. As experts in facial anatomy, our team is uniquely qualified to administer Botox safely and precisely to relieve TMJ pain, reduce teeth grinding, and smooth fine lines, framing your radiant new smile perfectly.</p>
                        <a href="botox.html" class="btn btn--primary" style="margin-top: 1rem;">Learn More</a>
                    </div>
                    <div class="service-detail-block__img">
                        <img src="assets/hero_aman.png" alt="Botox Therapeutics">
                    </div>
                </article>
            </div>
        </section>'''

# Replace the section
start_tag = '<section class="service-details">'
end_tag = '</section>'

start_idx = content.find(start_tag)
if start_idx != -1:
    end_idx = content.find(end_tag, start_idx) + len(end_tag)
    new_content = content[:start_idx] + services_html + content[end_idx:]
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced services section.")
else:
    print("Could not find services section.")

