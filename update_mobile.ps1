$html = @"
    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        <nav class="mobile-menu__nav">
            <a href="index.html" class="mobile-menu__link">Home</a>
            <div style="text-align: center; width: 100%;">
                <span class="mobile-menu__link" style="opacity: 1; transform: none; display:block; margin-bottom: 0.5rem; pointer-events:none;">Services</span>
                <div class="mobile-menu__dropdown">
                    <a href="family-dentistry.html" class="mobile-menu__dropdown-link">Family Dentistry</a>
                    <a href="cosmetic-dentistry.html" class="mobile-menu__dropdown-link">Cosmetic Dentistry</a>
                    <a href="dental-implants.html" class="mobile-menu__dropdown-link">Dental Implants</a>
                    <a href="teeth-whitening.html" class="mobile-menu__dropdown-link">Whitening</a>
                    <a href="invisalign.html" class="mobile-menu__dropdown-link">Invisalign</a>
                    <a href="dental-crowns.html" class="mobile-menu__dropdown-link">Crowns</a>
                    <a href="dental-bridges.html" class="mobile-menu__dropdown-link">Bridges</a>
                    <a href="dentures.html" class="mobile-menu__dropdown-link">Dentures</a>
                    <a href="root-canal.html" class="mobile-menu__dropdown-link">Root Canal</a>
                    <a href="emergency-dentistry.html" class="mobile-menu__dropdown-link">Emergency Dentistry</a>
                    <a href="childrens-dentistry.html" class="mobile-menu__dropdown-link">Children's Dentistry</a>
                    <a href="preventive-dentistry.html" class="mobile-menu__dropdown-link">Preventive Dentistry</a>
                    <a href="botox.html" class="mobile-menu__dropdown-link">Botox</a>
                </div>
            </div>
            <a href="why-choose-us.html" class="mobile-menu__link">Why Choose Us</a>
            <a href="the-crofton-experience.html" class="mobile-menu__link">Crofton Experience</a>
            <a href="technology.html" class="mobile-menu__link">Technology</a>
            <a href="meet-the-team.html" class="mobile-menu__link">Meet the Team</a>
            <a href="new-patient.html" class="mobile-menu__link">New Patients</a>
            <a href="smile-gallery.html" class="mobile-menu__link">Smile Gallery</a>
            <a href="index.html#community" class="mobile-menu__link">Community</a>
            <a href="contact.html" class="mobile-menu__link mobile-menu__link--cta">Book Appointment</a>
        </nav>
    </div>
"@

Get-ChildItem -Filter *.html | ForEach-Object {
    if ($_.Name -eq "unified_footer.html") { return }
    $content = Get-Content $_.FullName -Raw
    
    # In index.html, there's <!-- HERO SECTION --> and <section id="hero">, not <main> right away.
    # So we want to replace from </header> to the very next HTML element (<main, <section, <!--, etc)
    # Wait, the easiest way is to match `</header>` and anything up to `</div>` if `<!-- Mobile Menu Overlay -->` exists.
    # If it DOES NOT exist, just insert after `</header>`.
    
    # First, strip out existing mobile menu completely if it exists.
    $content = $content -replace '(?s)<!-- Mobile Menu Overlay -->.*?</div>\s*', ''
    
    # Now just inject it right after `</header>`
    $content = $content -replace '(?i)</header>', "</header>`r`n`r`n$html`r`n"
    
    Set-Content $_.FullName -Value $content -NoNewline
    Write-Host "Updated $($_.Name)"
}
