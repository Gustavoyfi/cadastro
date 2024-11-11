<?php
      session_start();
      session_destroy();
      header("Location: ../HTML/escolha_de_perfil.php");
?>