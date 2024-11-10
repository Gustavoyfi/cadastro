<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    // if(isset($_POST["nome_orientador"]) || isset($_POST["carga_horaria_disciplina"]) isset($_POST["telefone_orientador"])){

        $input = file_get_contents("php://input");
        $decode = json_decode($input, true);


        $nome_orientador = $decode["nome_orientador"];
        $email_orientador = $decode["email_orientador"];
        $telefone_orientador = $decode["telefone_orientador"];
        $senha_orientador = $decode["senha_orientador"];

        $conn = conectar();

        $sql = "INSERT INTO orientador (nome_orientador, email_orientador, telefone_orientador, senha_orientador) 
        VALUES ('{$nome_orientador}', '{$email_orientador}', '{$telefone_orientador}', '{$senha_orientador}')";
        $run_sql = mysqli_query($conn, $sql);

        if($run_sql){
            echo json_encode(["success"=>true, "message" => "Escola adicionada com sucesso!"]);
        }else{
            echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
        }

        fechar_conexao($conn);
    // }

?>