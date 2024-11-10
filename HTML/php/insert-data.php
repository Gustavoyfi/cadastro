<?php
    require_once("config.php");

    // if(isset($_POST["nome_escola"]) || isset($_POST["local_escola"]) isset($_POST["bloco_escola"])){

        $input = file_get_contents("php://input");
        $decode = json_decode($input, true);

        $nome_escola = $decode["nome_escola"];
        $local_escola = $decode["local_escola"];
        $bloco_escola = $decode["bloco_escola"];

        $conn = conectar();

        $sql = "INSERT INTO escola_campus (nome_escola, local_escola, bloco_escola) 
        VALUES ('{$nome_escola}', '{$local_escola}', '{$bloco_escola}')";
        $run_sql = mysqli_query($conn, $sql);

        if($run_sql){
            echo json_encode(["success"=>true, "message" => "Escola adicionada com sucesso!"]);
        }else{
            echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
        }

        fechar_conexao($conn);
    // }

?>