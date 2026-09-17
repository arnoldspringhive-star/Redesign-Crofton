$content = Get-Content -Raw -Path index.html -Encoding UTF8
$startStr = '<!-- Inline Luxury Booking Form -->'
$endStr = '                <div class="booking__details"'

$startIndex = $content.IndexOf($startStr)
$endIndex = $content.IndexOf($endStr, $startIndex)

if ($startIndex -ne -1 -and $endIndex -ne -1) {
    $newContent = $content.Substring(0, $startIndex) +
        "<!-- Inline Luxury Booking Form -->`r`n                    <div data-reveal data-delay=`"300`" style=`"min-height: 500px;`">`r`n                        <div class=`"formaloo--root-container`" data-form-slug=`"8KybFYus`" data-transparent-background=`"false`" data-hide-title=`"false`" data-hide-cover-and-logo=`"false`" data-fill-container-width=`"true`" data-auto-height=`"false`" data-skip-welcome-page=`"false`"></div>`r`n                        <script src=`"https://embed.formaloo.me/v1/main.js`" defer></script>`r`n                    </div>`r`n                </div>`r`n" + $content.Substring($endIndex)
    Set-Content -Path index.html -Value $newContent -NoNewline -Encoding UTF8
    Write-Host "Success"
} else {
    Write-Host "Could not find boundaries"
}
