<?php
    require_once("config.php");

    $conn = conectar();
    
    $sql = "SELECT contarEscolas() AS total_escolas;";
    $run_sql = mysqli_query($conn, $sql);
    
    if ($run_sql) {
        // Obtemos a linha do resultado
        $row = mysqli_fetch_assoc($run_sql);
        
        // Acessamos o valor da coluna total_escolas
        $total_escolas = $row['total_escolas'];
        
        // Retornamos o total em formato JSON
        echo json_encode(["success" => true, "total_escolas" => $total_escolas]);
    } else {
        // Caso ocorra um erro na consulta
        echo json_encode(["success" => false, "message" => "Erro ao executar a consulta."]);
    }
    
    fechar_conexao($conn);

?>