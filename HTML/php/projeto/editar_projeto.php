<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    if(isset($_GET["id_projeto"])){
            $id_projeto=$_GET["id_projeto"];

        $conn = conectar();
        $sql = "SELECT * FROM projeto WHERE id_projeto = {$id_projeto}";
        $run_sql = mysqli_query($conn, $sql);
        $output = [];
        if(mysqli_num_rows($run_sql) > 0 ){
            while($row=mysqli_fetch_assoc($run_sql)){
                $output [] = $row;
            }
        }else{
            $output["empty"] = "empty";
        }

        echo json_encode($output);

        fechar_conexao($conn);
    }
?>