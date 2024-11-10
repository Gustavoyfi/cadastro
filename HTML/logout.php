<?php
      session_start();
      session_destroy();
      header("Location: ../escolha_de_perfil.php");
?>