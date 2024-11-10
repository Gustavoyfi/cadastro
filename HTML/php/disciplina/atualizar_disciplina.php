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
    

    $id_disciplina = $decode["id_disciplina"];
    $nome_disciplina = $decode["nome_disciplina"];
    $carga_horaria_disciplina = $decode["carga_horaria_disciplina"];
    $ementa_disciplina = $decode["ementa_disciplina"];
    $id_curso = $decode["id_curso"];


    $sql = "UPDATE disciplina SET  nome_disciplina='{$nome_disciplina}', carga_horaria_disciplina={$carga_horaria_disciplina}, ementa_disciplina='{$ementa_disciplina}', id_curso={$id_curso} WHERE id_disciplina={$id_disciplina}";
    $run_sql = mysqli_query($conn, $sql);

    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola atualizada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>