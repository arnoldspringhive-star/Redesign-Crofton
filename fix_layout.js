const fs = require('fs');
const path = require('path');

// Fix HTML files
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove literal `r`n strings caused by powershell regex mistake
    content = content.replace(/`r`n/g, '');
    
    // Remove the previously injected CTA button
    content = content.replace(/\s*<a href="appointment\.html" class="header__laptop-cta[^>]*>.*?<\/a>\s*/g, '\n            ');
    
    // Inject the CTA button AFTER the hamburger menu
    const hamburgerRegex = /(<button class="header__menu-toggle"[\s\S]*?<\/button>)/;
    content = content.replace(hamburgerRegex, '$1\n            <a href="appointment.html" class="header__laptop-cta btn btn--primary">Book An Appointment</a>');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
});

// Fix CSS margin
const cssFile = path.join(dir, 'style.css');
let cssContent = fs.readFileSync(cssFile, 'utf8');
cssContent = cssContent.replace('margin-right: 1.5rem;', 'margin-left: 1.5rem;');
fs.writeFileSync(cssFile, cssContent, 'utf8');
console.log('Fixed CSS');
