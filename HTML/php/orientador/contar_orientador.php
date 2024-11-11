<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    $conn = conectar();
    
    $sql = "SELECT contarOrientadores() AS total_orientadores;";
    $run_sql = mysqli_query($conn, $sql);
    
    if ($run_sql) {
       
        $row = mysqli_fetch_assoc($run_sql);
        
        
        $total_orientadores = $row['total_orientadores'];
        
     
        echo json_encode(["success" => true, "total_orientadores" => $total_orientadores]);
    } else {
      
        echo json_encode(["success" => false, "message" => "Erro ao executar a consulta."]);
    }
    
    fechar_conexao($conn);

?>