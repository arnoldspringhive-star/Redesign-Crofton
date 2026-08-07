import os
import re

dir_path = '.'

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Hours
    hours_pattern = r"Monday – Thursday: 8am – 5pm<br>\s*Friday: 8am – 2pm<br>\s*Saturday – Sunday: Closed"
    new_hours = "Monday: Closed<br>\n                            Tuesday: 9:00 AM – 5:00 PM<br>\n                            Wednesday: 9:00 AM – 5:00 PM<br>\n                            Thursday: Closed<br>\n                            Friday: 9:00 AM – 5:00 PM<br>\n                            Saturday: 8:00 AM – 2:00 PM (Open on the first Saturday of every month only)"
    content = re.sub(hours_pattern, new_hours, content)

    # 2. Add Fax
    contact_pattern = r"Phone: <a href=\"tel:\+13012613800\">\(\s*301\s*\)\s*261-3800</a><br>\s*Email: <a href=\"mailto:info@croftondentalcenter\.com\">info@croftondentalcenter\.com</a>"
    new_contact = "Phone: <a href=\"tel:+13012613800\">(301) 261-3800</a><br>\n                            Fax: 1 (301) 936-1633<br>\n                            Email: <a href=\"mailto:info@croftondentalcenter.com\">info@croftondentalcenter.com</a>"
    content = re.sub(contact_pattern, new_contact, content)
    
    # 2b. Add Fax (index.html variant without links)
    contact_pattern2 = r"Phone: \(\s*301\s*\)\s*261-3800<br>\s*Email: info@croftondentalcenter\.com"
    new_contact2 = "Phone: (301) 261-3800<br>\n                            Fax: 1 (301) 936-1633<br>\n                            Email: info@croftondentalcenter.com"
    content = re.sub(contact_pattern2, new_contact2, content)

    # 3. Update Dr Name
    content = content.replace("Dr. Rahat Sood", "Rahat Sood")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        replace_in_file(os.path.join(dir_path, filename))

print("Replacements complete.")
