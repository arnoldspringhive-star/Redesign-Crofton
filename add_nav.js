const fs = require('fs');
const path = require('path');

const directory = '.';

fs.readdirSync(directory).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(directory, file);
        let content = fs.readFileSync(filePath, 'utf8');

        if (content.includes('smile-club.html') && file !== 'smile-club.html') {
            return;
        }

        // Desktop Nav
        content = content.replace(
            /(<a href="new-patient\.html" class="header__link(?: active)?">New Patients<\/a>)/g,
            '$1\n                <a href="smile-club.html" class="header__link">Smile Club</a>'
        );

        // Mobile Nav
        content = content.replace(
            /(<a href="new-patient\.html" class="mobile-menu__link(?: active)?">New Patients<\/a>)/g,
            '$1\n            <a href="smile-club.html" class="mobile-menu__link">Smile Club</a>'
        );

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
