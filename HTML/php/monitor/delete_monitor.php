<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';


    $conn = conectar();
    $id_monitor = $_GET["id_monitor"];
    $sql = "DELETE FROM monitor WHERE id_monitor='{$id_monitor}'";
    $run_sql = mysqli_query($conn, $sql);
    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola deletada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>