import os
import re

directory = '.'

for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already added
        if 'smile-club.html' in content and filename != 'smile-club.html':
            continue

        # Desktop Nav
        # Find: <a href="new-patient.html" class="header__link(?: active)?">New Patients</a>
        content = re.sub(
            r'(<a href="new-patient\.html" class="header__link(?: active)?">New Patients</a>)',
            r'\1\n                <a href="smile-club.html" class="header__link">Smile Club</a>',
            content
        )
        
        # Mobile Nav
        # Find: <a href="new-patient.html" class="mobile-menu__link(?: active)?">New Patients</a>
        content = re.sub(
            r'(<a href="new-patient\.html" class="mobile-menu__link(?: active)?">New Patients</a>)',
            r'\1\n            <a href="smile-club.html" class="mobile-menu__link">Smile Club</a>',
            content
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated {filename}")
