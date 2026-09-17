$content = Get-Content -Raw -Path appointment.html -Encoding UTF8
$startStr = '<!-- APPOINTMENT FORM ONLY (CLIENT INSTRUCTION #6) -->'
$endStr = '                    <div class="booking__details"'

$startIndex = $content.IndexOf($startStr)
$endIndex = $content.IndexOf($endStr, $startIndex)

if ($startIndex -ne -1 -and $endIndex -ne -1) {
    $newContent = $content.Substring(0, $startIndex) +
        "<!-- APPOINTMENT FORM ONLY (CLIENT INSTRUCTION #6) -->`r`n                        <div data-reveal data-delay=`"300`" style=`"min-height: 500px; margin-left: -2.5rem; margin-top: -3rem; width: calc(100% + 2.5rem);`">`r`n                            <div class=`"formaloo--root-container`" data-form-slug=`"jGcOQrxC`" data-transparent-background=`"false`" data-hide-title=`"false`" data-hide-cover-and-logo=`"false`" data-fill-container-width=`"true`" data-auto-height=`"false`" data-skip-welcome-page=`"false`"></div>`r`n                            <script src=`"https://embed.formaloo.me/v1/main.js`" defer></script>`r`n                        </div>`r`n" + $content.Substring($endIndex)
    Set-Content -Path appointment.html -Value $newContent -NoNewline -Encoding UTF8
    Write-Host "Success"
} else {
    Write-Host "Could not find boundaries"
}
