$directory = "."
$oldRegex = '(?s)<img src="assets/logo_footer\.png" alt="Crofton Dental Center" class="footer__logo">'
$newLogo = '<a href="index.html"><img src="assets/logo_footer.png" alt="Crofton Dental Center" class="footer__logo"></a>'

$count = 0
Get-ChildItem -Path $directory -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    if ($null -ne $content -and $content -match $oldRegex) {
        $content = $content -replace $oldRegex, $newLogo
        Set-Content -Path $_.FullName -Value $content -Encoding UTF8
        $count++
        Write-Host "Updated $($_.Name)"
    }
}
Write-Host "Total updated: $count"
