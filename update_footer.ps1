$directory = "."
$oldRegex = '(?s)<div class="footer__links">\s*<h4 class="footer__col-title">Navigate</h4>.*?</div>'

$newFooter = @"
                <div class="footer__links">
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
                </div>
"@

$count = 0
Get-ChildItem -Path $directory -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    if ($null -ne $content -and $content -match $oldRegex) {
        $content = $content -replace $oldRegex, $newFooter
        Set-Content -Path $_.FullName -Value $content -Encoding UTF8
        $count++
        Write-Host "Updated $($_.Name)"
    }
}
Write-Host "Total updated: $count"
