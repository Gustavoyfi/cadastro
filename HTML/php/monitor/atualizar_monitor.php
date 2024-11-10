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
    

    $id_monitor = $decode["id_monitor"];
    $nome_monitor = $decode["nome_monitor"];
    $periodo_monitor = $decode["periodo_monitor"];
    $email_monitor = $decode["email_monitor"];
    $id_curso = $decode["id_curso"];
    $id_disciplina = $decode["id_disciplina"];
    $id_projeto = $decode["id_projeto"];
    $senha_monitor = $decode["senha_monitor"];

    $sql = "UPDATE monitor 
            SET nome_monitor='{$nome_monitor}', 
                periodo_monitor='{$periodo_monitor}', 
                email_monitor='{$email_monitor}', 
                id_curso={$id_curso}, 
                id_disciplina={$id_disciplina}, 
                id_projeto={$id_projeto}, 
                senha_monitor='{$senha_monitor}'
            WHERE id_monitor={$id_monitor}";

    $run_sql = mysqli_query($conn, $sql);


    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola atualizada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>