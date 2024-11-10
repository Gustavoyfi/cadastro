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
    
    $id_estudante = $decode["id_estudante"];
    $id_disciplina = $decode["id_disciplina"];
    $nome_estudante = $decode["nome_estudante"];
    $email_estudante = $decode["email_estudante"];
    $periodo_estudante = $decode["periodo_estudante"];
    $turma_estudante = $decode["turma_estudante"];
    $id_curso = $decode["id_curso"];
    $senha_estudante = $decode["senha_estudante"];

    $sql = "UPDATE estudante SET 
        nome_estudante='{$nome_estudante}', 
        email_estudante='{$email_estudante}', 
        periodo_estudante='{$periodo_estudante}', 
        turma_estudante='{$turma_estudante}', 
        id_disciplina={$id_disciplina}, 
        id_curso={$id_curso},
        senha_estudante = '{$senha_estudante}'
        WHERE id_estudante={$id_estudante}";
    $run_sql = mysqli_query($conn, $sql);

    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola atualizada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

    fechar_conexao($conn);
?>