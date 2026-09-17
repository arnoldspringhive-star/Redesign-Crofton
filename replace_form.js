const fs = require('fs');

const filePath = 'index.html';
let content = fs.readFileSync(filePath, 'utf8');

const startStr = '<!-- Inline Luxury Booking Form -->';
const endStr = '                <div class="booking__details"';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) +
        `<!-- Inline Luxury Booking Form -->
                    <div data-reveal data-delay="300" style="min-height: 500px;">
                        <div class="formaloo--root-container" data-form-slug="8KybFYus" data-transparent-background="false" data-hide-title="false" data-hide-cover-and-logo="false" data-fill-container-width="true" data-auto-height="false" data-skip-welcome-page="false"></div>
                        <script src="https://embed.formaloo.me/v1/main.js" defer></script>
                    </div>
                </div>\n` + content.substring(endIndex);

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Success');
} else {
    console.log('Could not find boundaries');
}
