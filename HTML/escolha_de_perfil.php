<?php 
   session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/style2.css">
    <title>Login</title>
</head>
<body>
      <div class="container">
        <div class="box form-box">
            <header>Escolha seu tipo de perfil</header>
            <form action="" method="post">
                <div class="field">
                    <a href="login_administrador.php" class="btn">Administrador</a>
                    <a href="login_orientador.php" class="btn">Orientador</a>
                    <a href="login_monitor.php" class="btn">Monitor</a>
                    <a href="login_estudante.php" class="btn">Estudante</a>
            </form>
        </div>
      </div>
</body>
</html>