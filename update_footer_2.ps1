$directory = "."
$oldRegex = '(?s)<ul class="footer__links">.*?</ul>'

$newFooter = @"
                    <ul class="footer__links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="why-choose-us.html">Why Choose Us</a></li>
                        <li><a href="the-crofton-experience.html">Crofton Experience</a></li>
                        <li><a href="technology.html">Technology</a></li>
                        <li><a href="meet-the-team.html">Meet the Team</a></li>
                        <li><a href="new-patient.html">New Patients</a></li>
                        <li><a href="smile-club.html">Smile Club</a></li>
                        <li><a href="smile-gallery.html">Smile Gallery</a></li>
                        <li><a href="index.html#community">Community</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
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
