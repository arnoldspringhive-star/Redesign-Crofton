import os
import re

directory = '.'

old_footer = """                <div class="footer__links">
                    <h4 class="footer__col-title">Navigate</h4>
                    <a href="index.html" class="footer__link">Home</a>
                    <a href="why-choose-us.html" class="footer__link">Why Choose Us</a>
                    <a href="the-crofton-experience.html" class="footer__link">Crofton Experience</a>
                    <a href="technology.html" class="footer__link">Technology</a>
                    <a href="meet-the-team.html" class="footer__link">Meet the Team</a>
                    <a href="new-patient.html" class="footer__link">New Patients</a>
                    <a href="smile-gallery.html" class="footer__link">Smile Gallery</a>
                    <a href="index.html#community" class="footer__link">Community</a>
                    <a href="contact.html" class="footer__link">Contact Us</a>
                </div>"""

new_footer = """                <div class="footer__links">
                    <h4 class="footer__col-title">Navigate</h4>
                    <a href="index.html" class="footer__link">Home</a>
                    <a href="services.html" class="footer__link">Services</a>
                    <a href="why-choose-us.html" class="footer__link">Why Choose Us</a>
                    <a href="the-crofton-experience.html" class="footer__link">Crofton Experience</a>
                    <a href="technology.html" class="footer__link">Technology</a>
                    <a href="meet-the-team.html" class="footer__link">Meet the Team</a>
                    <a href="new-patient.html" class="footer__link">New Patients</a>
                    <a href="smile-club.html" class="footer__link">Smile Club</a>
                    <a href="smile-gallery.html" class="footer__link">Smile Gallery</a>
                    <a href="index.html#community" class="footer__link">Community</a>
                    <a href="contact.html" class="footer__link">Contact Us</a>
                </div>"""

count = 0
for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old_footer in content:
            content = content.replace(old_footer, new_footer)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f"Updated {filename}")
        else:
            # Fallback regex in case indentation is slightly off
            pass

print(f"Total updated: {count}")
