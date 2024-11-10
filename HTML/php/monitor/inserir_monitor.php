<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    // if(isset($_POST["nome_disciplina"]) || isset($_POST["carga_horaria_disciplina"]) isset($_POST["ementa_disciplina"])){

        $input = file_get_contents("php://input");
        $decode = json_decode($input, true);


        $nome_monitor = $decode["nome_monitor"];
        $periodo_monitor = $decode["periodo_monitor"];
        $email_monitor = $decode["email_monitor"];
        $id_curso = $decode["id_curso"];
        $id_disciplina = $decode["id_disciplina"];
        $id_projeto = $decode["id_projeto"];
        $senha_monitor = $decode["senha_monitor"];

        $conn = conectar();

        $sql = "INSERT INTO monitor (nome_monitor, periodo_monitor, email_monitor, id_curso, id_disciplina, id_projeto, senha_monitor) 
        VALUES ('{$nome_monitor}', '{$periodo_monitor}', '{$email_monitor}', {$id_curso}, {$id_disciplina}, {$id_projeto}, '{$senha_monitor}')";

        $run_sql = mysqli_query($conn, $sql);

        if($run_sql){
            echo json_encode(["success"=>true, "message" => "Escola adicionada com sucesso!"]);
        }else{
            echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
        }

        fechar_conexao($conn);
    // }

?>