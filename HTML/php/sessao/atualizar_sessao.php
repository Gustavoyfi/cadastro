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
    

    $id_sessoes = $decode["id_sessoes"];
    $data_sesao = $decode["data_sesao"];
    $horario_inicio_sessao = $decode["horario_inicio_sessao"];
    $horario_fim_sessao = $decode["horario_fim_sessao"];
    $local_sessao = $decode["local_sessao"];
    $descricao_sessao = $decode["descricao_sessao"];
    $id_monitor = $decode["id_monitor"];
    $id_projeto = $decode["id_projeto"];
    
    $sql = "UPDATE sessao SET 
        data_sesao='{$data_sesao}', 
        horario_inicio_sessao='{$horario_inicio_sessao}', 
        horario_fim_sessao='{$horario_fim_sessao}', 
        local_sessao='{$local_sessao}', 
        descricao_sessao='{$descricao_sessao}', 
        id_monitor={$id_monitor}, 
        id_projeto={$id_projeto} 
    WHERE id_sessoes={$id_sessoes}";
    $run_sql = mysqli_query($conn, $sql);

    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola atualizada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>