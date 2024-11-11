<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';
    $conn = conectar();

    $input = file_get_contents("php://input");
    $decode = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["success" => false, "message" => "Erro ao decodificar JSON: " . json_last_error_msg()]);
        exit;
    }

    $id_projeto = $decode["id_projeto"];
    $data_inicio_projeto = $decode["data_inicio_projeto"];
    $status_monitor = $decode["status_monitor"];
    $forma_atendimento = $decode["forma_atendimento"];
    $horas_aula = $decode["horas_aula"];
    $horas_extraclasse = $decode["horas_extraclasse"];
    $modalidade = $decode["modalidade"];
    $horas_bolsa = $decode["horas_bolsa"];
    $horas_voluntario = $decode["horas_voluntario"];
    $valor_bolsa = $decode["valor_bolsa"];
    $id_disciplina = $decode["id_disciplina"];
    $id_escola_campus = $decode["id_escola"]; // `id_escola` no JSON



    $sql = "UPDATE projeto 
            SET data_inicio_projeto = '{$data_inicio_projeto}', status_monitor = '{$status_monitor}', forma_atendimento = '{$forma_atendimento}', 
                horas_aula = {$horas_aula}, horas_extraclasse = {$horas_extraclasse}, modalidade = '{$modalidade}', 
                horas_bolsa = {$horas_bolsa}, horas_voluntario = {$horas_voluntario}, valor_bolsa = {$valor_bolsa}, 
                id_disciplina = {$id_disciplina}, id_escola_campus = {$id_escola_campus}
            WHERE id_projeto = {$id_projeto}";

    $run_sql = mysqli_query($conn, $sql);

    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola atualizada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>