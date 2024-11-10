<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    if(isset($_GET["id_estudante"])){
            $id_estudante=$_GET["id_estudante"];

        $conn = conectar();
        $sql = "SELECT * FROM estudante WHERE id_estudante = {$id_estudante}";
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