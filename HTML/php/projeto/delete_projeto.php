<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';


    $conn = conectar();
    $id_projeto = $_GET["id_projeto"];
    
    $sql = "SET FOREIGN_KEY_CHECKS = 0;";

    $run_sql = mysqli_query($conn, $sql);

    $sql = "DELETE FROM projeto WHERE id_projeto='{$id_projeto}'";
    $run_sql = mysqli_query($conn, $sql);

    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola deletada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    $sql = "SET FOREIGN_KEY_CHECKS = 1;";
    $run_sql = mysqli_query($conn, $sql);

    fechar_conexao($conn);
?>