<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    // if(isset($_POST["nome_disciplina"]) || isset($_POST["carga_horaria_disciplina"]) isset($_POST["ementa_disciplina"])){

        $input = file_get_contents("php://input");
        $decode = json_decode($input, true);


        $nome_estudante = $decode["nome_estudante"];
        $email_estudante = $decode["email_estudante"];
        $periodo_estudante = $decode["periodo_estudante"];
        $turma_estudante = $decode["turma_estudante"];
        $id_disciplina = $decode["id_disciplina"];
        $id_curso = $decode["id_curso"];
        $senha_estudante = $decode["senha_estudante"];

        $conn = conectar();

        $sql = "INSERT INTO estudante (nome_estudante, email_estudante, periodo_estudante, turma_estudante, id_disciplina, id_curso, senha_estudante) 
        VALUES ('{$nome_estudante}', '{$email_estudante}', '{$periodo_estudante}', '{$turma_estudante}', {$id_disciplina}, {$id_curso}, '{$senha_estudante}')";
        $run_sql = mysqli_query($conn, $sql);

        if($run_sql){
            echo json_encode(["success"=>true, "message" => "Escola adicionada com sucesso!"]);
        }else{
            echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
        }

        fechar_conexao($conn);
    // }

?>