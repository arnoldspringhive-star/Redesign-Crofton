$content = Get-Content -Raw -Path new-patient.html -Encoding UTF8
$startStr = '                    <form id="np-inquiry-form"'
$endStr = '                </div>`r`n`r`n                <!-- SECTION 2'

$startIndex = $content.IndexOf($startStr)
$endIndex = $content.IndexOf("                </div>`r`n`r`n                <!-- SECTION 2", $startIndex)

# Alternative fallback search string for LF vs CRLF
if ($endIndex -eq -1) {
    $endIndex = $content.IndexOf("                </div>`n`n                <!-- SECTION 2", $startIndex)
}

if ($startIndex -ne -1 -and $endIndex -ne -1) {
    $newContent = $content.Substring(0, $startIndex) +
        "                    <div style=`"min-height: 500px; margin-top: 1rem;`">`r`n                        <div class=`"formaloo--root-container`" data-form-slug=`"C5GxrICS`" data-transparent-background=`"false`" data-hide-title=`"false`" data-hide-cover-and-logo=`"false`" data-fill-container-width=`"true`" data-auto-height=`"false`" data-skip-welcome-page=`"false`"></div>`r`n                        <script src=`"https://embed.formaloo.me/v1/main.js`" defer></script>`r`n                    </div>`r`n" + $content.Substring($endIndex)
    Set-Content -Path new-patient.html -Value $newContent -NoNewline -Encoding UTF8
    Write-Host "Success"
} else {
    Write-Host "Could not find boundaries. startIndex=$startIndex, endIndex=$endIndex"
}
