<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    // if(isset($_POST["nome_disciplina"]) || isset($_POST["carga_horaria_disciplina"]) isset($_POST["ementa_disciplina"])){

        $input = file_get_contents("php://input");
        $decode = json_decode($input, true);


        $nome_disciplina = $decode["nome_disciplina"];
        $carga_horaria_disciplina = $decode["carga_horaria_disciplina"];
        $ementa_disciplina = $decode["ementa_disciplina"];
        $id_curso = $decode["id_curso"];

        $conn = conectar();

        $sql = "INSERT INTO disciplina (nome_disciplina, carga_horaria_disciplina, ementa_disciplina, id_curso) 
        VALUES ('{$nome_disciplina}', {$carga_horaria_disciplina}, '{$ementa_disciplina}', {$id_curso})";
        $run_sql = mysqli_query($conn, $sql);

        if($run_sql){
            echo json_encode(["success"=>true, "message" => "Escola adicionada com sucesso!"]);
        }else{
            echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
        }

        fechar_conexao($conn);
    // }

?>