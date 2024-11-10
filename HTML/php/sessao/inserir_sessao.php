<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    // if(isset($_POST["nome_disciplina"]) || isset($_POST["carga_horaria_disciplina"]) isset($_POST["ementa_disciplina"])){

        $input = file_get_contents("php://input");
        $decode = json_decode($input, true);


        $data_sesao = $decode["data_sesao"];
        $horario_inicio_sessao = $decode["horario_inicio_sessao"];
        $horario_fim_sessao = $decode["horario_fim_sessao"];
        $local_sessao = $decode["local_sessao"];
        $descricao_sessao = $decode["descricao_sessao"];
        $id_monitor = $decode["id_monitor"];
        $id_projeto = $decode["id_projeto"];

        $conn = conectar();

        $sql = "INSERT INTO sessao (data_sesao, horario_inicio_sessao, horario_fim_sessao, local_sessao, descricao_sessao, id_monitor, id_projeto) 
        VALUES ('{$data_sesao}', '{$horario_inicio_sessao}', '{$horario_fim_sessao}', '{$local_sessao}', '{$descricao_sessao}', {$id_monitor}, {$id_projeto})";

        $run_sql = mysqli_query($conn, $sql);

        if($run_sql){
            echo json_encode(["success"=>true, "message" => "Escola adicionada com sucesso!"]);
        }else{
            echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
        }

        fechar_conexao($conn);
    // }

?>