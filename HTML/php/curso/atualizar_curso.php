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

    $id_curso = $decode["id_curso"];
    $nome_curso = $decode["nome_curso"];
    $duracao_curso = $decode["duracao_curso"];
    $carga_horaria_total = $decode["carga_horaria_total"];
    $id_escola = $decode["id_escola"];


    $sql = "UPDATE curso SET  nome_curso='{$nome_curso}', duracao_curso={$duracao_curso}, carga_horaria_total={$carga_horaria_total}, id_escola_campus={$id_escola} WHERE id_curso={$id_curso}";
    $run_sql = mysqli_query($conn, $sql);

    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola atualizada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>