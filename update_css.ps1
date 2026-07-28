 = 'style.css'
 = Get-Content  -Raw

 = 'background: url("assets/crofton_lobby_new.png") no-repeat center center/cover;'
 = "background-image: url('assets/crofton_lobby_new.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;"

 = .Replace(, )
[IO.File]::WriteAllText((Join-Path (Get-Location) ), )
