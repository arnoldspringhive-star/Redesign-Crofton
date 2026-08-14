$directory = "."
$files = Get-ChildItem -Path $directory -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    if ($content -match "smile-club\.html" -and $file.Name -ne "smile-club.html") {
        continue
    }

    # Replace Desktop Nav
    $content = [regex]::Replace($content, '(<a href="new-patient\.html" class="header__link(?: active)?">New Patients</a>)', "`$1`n                <a href=`"smile-club.html`" class=`"header__link`">Smile Club</a>")
    
    # Replace Mobile Nav
    $content = [regex]::Replace($content, '(<a href="new-patient\.html" class="mobile-menu__link(?: active)?">New Patients</a>)', "`$1`n            <a href=`"smile-club.html`" class=`"mobile-menu__link`">Smile Club</a>")
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}
