<?php
    require_once $_SERVER['DOCUMENT_ROOT'] . '/cadastro/HTML/php/config.php';



    $conn = conectar();

    $sql = "SELECT * FROM vw_sessoes_monitor;";
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