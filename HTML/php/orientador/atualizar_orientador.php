<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';
     
    header("Access-Control-Allow-Origin: *");

    $conn = conectar();

    $input = file_get_contents("php://input");
    $decode = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["success" => false, "message" => "Erro ao decodificar JSON: " . json_last_error_msg()]);
        exit;
    }

    $id_orientador = $decode["id_orientador"];
    $nome_orientador = $decode["nome_orientador"];
    $email_orientador = $decode["email_orientador"];
    $telefone_orientador = $decode["telefone_orientador"];
    $senha_orientador = $decode["senha_orientador"];

    $sql = "UPDATE orientador SET nome_orientador='{$nome_orientador}', email_orientador='{$email_orientador}', telefone_orientador='{$telefone_orientador}', senha_orientador = '{$senha_orientador}' WHERE id_orientador={$id_orientador}";
    $run_sql = mysqli_query($conn, $sql);

    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola atualizada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>