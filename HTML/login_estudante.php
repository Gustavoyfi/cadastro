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
        <?php 
             
             require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';
               if(isset($_POST['submit'])){
                 
                 $conn = conectar();
     
                 $email = mysqli_real_escape_string($conn,$_POST['email']);
                 $senha = mysqli_real_escape_string($conn,$_POST['senha']);
 
                 $result = mysqli_query($conn,"SELECT * FROM estudante WHERE email_estudante='$email' AND senha_estudante='$senha' ") or die("Select Error");
                 $row = mysqli_fetch_assoc($result);
 
                 if (is_array($row) && !empty($row)) {
                    
                    $_SESSION['valid'] = $row['email'];
                    header("Location: 3-cadastrar_escola.html");
                    exit(); 
                } else {
                    echo "<div class='message'>
                       <p>Email ou senha incorretos</p>
                        </div> <br>";
                    echo "<a href='escolha_de_perfil.php'><button class='btn'>Go Back</button>";
                }
               }else{
 
             
             ?>
            <header>Acesse sua conta estudante</header>
            <form action="" method="post">
                <div class="field input">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" autocomplete="off" required>
                </div>

                <div class="field input">
                    <label for="senha">Senha</label>
                    <input type="password" name="senha" id="senha" autocomplete="off" required>
                </div>

                <div class="field">
                    
                    <input type="submit" class="btn" name="submit" value="Login" required>
                </div>
                <div class="links">
                    <a href="escolha_de_perfil.php">Voltar</a>
                </div>
            </form>
        </div>
        <?php } ?>
      </div>
</body>
</html>