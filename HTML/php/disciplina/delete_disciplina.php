<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';


    $conn = conectar();
    $id_disciplina = $_GET["id_disciplina"];
    $sql = "DELETE FROM disciplina WHERE id_disciplina='{$id_disciplina}'";
    $run_sql = mysqli_query($conn, $sql);
    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola deletada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>