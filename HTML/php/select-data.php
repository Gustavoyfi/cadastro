<?php
    require_once("config.php");



    $conn = conectar();

    $sql = "SELECT * FROM escola_campus ORDER BY id_escola_campus DESC";
    $run_sql = mysqli_query($conn, $sql);
    $output = [];
    if(mysqli_num_rows($run_sql) > 0 ){
        while($row=mysqli_fetch_assoc($run_sql)){
            $output [] = $row;
        }
    } else{
        echo "erro";
        $output["empty"] = "empty";
    }

    echo json_encode($output);

    fechar_conexao($conn);


    
    
?>