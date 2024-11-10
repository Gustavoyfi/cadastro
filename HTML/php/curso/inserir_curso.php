<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    // if(isset($_POST["nome_curso"]) || isset($_POST["duracao_curso"]) isset($_POST["carga_horaria_total"])){

        $input = file_get_contents("php://input");
        $decode = json_decode($input, true);
        $nome_curso = $decode["nome_curso"];
        $duracao_curso = $decode["duracao_curso"];
        $carga_horaria_total = $decode["carga_horaria_total"];
        $id_escola = $decode["id_escola"];

        $conn = conectar();

        $sql = "INSERT INTO curso (nome_curso, duracao_curso, carga_horaria_total, id_escola_campus) 
        VALUES ('{$nome_curso}', {$duracao_curso}, {$carga_horaria_total}, {$id_escola})";
        $run_sql = mysqli_query($conn, $sql);

        if($run_sql){
            echo json_encode(["success"=>true, "message" => "Escola adicionada com sucesso!"]);
        }else{
            echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
        }

        fechar_conexao($conn);
    // }

?>