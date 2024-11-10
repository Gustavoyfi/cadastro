<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    $conn = conectar();
    
    $sql = "SELECT contarCursos() AS total_cursos;";
    $run_sql = mysqli_query($conn, $sql);
    
    if ($run_sql) {
        // Obtemos a linha do resultado
        $row = mysqli_fetch_assoc($run_sql);
        
        // Acessamos o valor da coluna total_cursos
        $total_cursos = $row['total_cursos'];
        
        // Retornamos o total em formato JSON
        echo json_encode(["success" => true, "total_cursos" => $total_cursos]);
    } else {
        // Caso ocorra um erro na consulta
        echo json_encode(["success" => false, "message" => "Erro ao executar a consulta."]);
    }
    
    fechar_conexao($conn);

?>