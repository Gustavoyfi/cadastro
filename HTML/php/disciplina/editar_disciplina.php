<?php

    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';

    if(isset($_GET["id_disciplina"])){
            $id_disciplina=$_GET["id_disciplina"];

        $conn = conectar();
        $sql = "SELECT * FROM disciplina WHERE id_disciplina = {$id_disciplina}";
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