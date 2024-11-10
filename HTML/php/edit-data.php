<?php

    require_once("config.php");

    if(isset($_GET["id_escola_campus"])){
            $id_escola_campus=$_GET["id_escola_campus"];

        $conn = conectar();
        $sql = "SELECT * FROM escola_campus WHERE id_escola_campus = '{$id_escola_campus}'";
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

        
    }
?>