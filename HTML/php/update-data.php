<?php
    require_once("config.php");

    $conn = conectar();

    $input = file_get_contents("php://input");
    $decode = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["success" => false, "message" => "Erro ao decodificar JSON: " . json_last_error_msg()]);
        exit;
    }

    $id_escola_campus = $decode["id_escola_campus"];
    $nome_escola = $decode["nome_escola"];
    $local_escola = $decode["local_escola"];
    $bloco_escola = $decode["bloco_escola"];



    $sql = "UPDATE escola_campus SET  nome_escola='{$nome_escola}', local_escola='{$local_escola}', bloco_escola='{$bloco_escola}' WHERE id_escola_campus='{$id_escola_campus}'";
    $run_sql = mysqli_query($conn, $sql);

    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola atualizada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>