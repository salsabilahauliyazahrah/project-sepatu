<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <link rel="stylesheet" href="{{ asset('css/login-style.css') }}">
</head>
<body>
    <div class="login-box">
        <h2>Login</h2>
        @if(session('error'))
            <div class="alert alert-danger">{{ session('error')}}</div>
        @endif
        
        <form action="{{ route('login.proses') }}" method="post">
            @csrf <input type="text" name="username" class="form-control"
                    value="{{ request()->cookie('username') ?? ''}}" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>           
            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="remember" name="remember">
                <label class="form-check-label" for="remember">Remember me</label>
            </div>
            
            <br>
            <input type="submit" value="Login">
            
            <div class="text-center mt-3">
                <a href="index.php" class="text-white">Kembali ke Berannda</a>
            </div>
        </form>
    </div>
</body>
</html>