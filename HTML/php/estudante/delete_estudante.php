<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';


    $conn = conectar();
    $id_estudante = $_GET["id_estudante"];
    $sql = "DELETE FROM estudante WHERE id_estudante='{$id_estudante}'";
    $run_sql = mysqli_query($conn, $sql);
    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Estudante deletado com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>