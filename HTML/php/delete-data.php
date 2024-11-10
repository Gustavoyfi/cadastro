<?php
    require_once("config.php");


    $conn = conectar();
    $id_escola_campus = $_GET["id_escola_campus"];
    $sql = "DELETE FROM escola_campus WHERE id_escola_campus='{$id_escola_campus}'";
    $run_sql = mysqli_query($conn, $sql);
    if($run_sql){
        echo json_encode(["success"=>true, "message" => "Escola deletada com sucesso!"]);
    }else{
        echo json_encode(["success"=>false, "message" => "Servidor com problema!"]);
    }

?>