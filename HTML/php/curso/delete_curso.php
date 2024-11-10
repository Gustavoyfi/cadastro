<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';


    $conn = conectar();
    $id_curso = $_GET["id_curso"];
    $sql = "DELETE FROM curso WHERE id_curso='{$id_curso}'";
    $run_sql = mysqli_query($conn, $sql);
    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola deletada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>